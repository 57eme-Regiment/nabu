import type { User } from '@57eme-regiment/auth-contracts';
import {
  cn,
  HttpError,
  useDebounce,
  wanAdminUserApi,
  wanApi,
} from '@57eme-regiment/nabu-frontend-utils';
import { Avatar } from '@base-ui/react/avatar';
import { Combobox } from '@base-ui/react/combobox';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon, ChevronsUpDownIcon, LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';

type UserAutocompleteSelectProps = {
  value?: string;
  defaultValue?: string;
  onSelected?: (user: User | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  excludeUserIds?: string[];
  placeholder?: string;
};

function useUsersQuery(search?: string) {
  const trimmed = search?.trim() ?? '';
  const enabled = trimmed.length >= 2;
  return useQuery({
    queryKey: ['users', 'search', trimmed],
    queryFn: async () => {
      const res = await wanAdminUserApi.search({
        query: { search: trimmed, limit: 25 },
      });
      if (res.status !== 200)
        throw new HttpError(res.status, 'Failed to fetch users');
      return res.body;
    },
    enabled,
    staleTime: 30 * 1000,
  });
}

function useUserByIdQuery(id?: string) {
  return useQuery<User>({
    queryKey: ['users', id],
    queryFn: async () => {
      const res = await wanApi.users.getById({ params: { userId: id! } });
      if (res.status !== 200)
        throw new HttpError(res.status, 'Failed to fetch user');
      return res.body;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

const userLabel = (user: User) => user.name;

export const UserAutocompleteSelect = ({
  value,
  defaultValue,
  onSelected,
  disabled = false,
  readOnly = false,
  excludeUserIds = [],
  placeholder = 'Search user…',
}: UserAutocompleteSelectProps) => {
  const [inputValue, setInputValue] = useState('');
  const [userPickedItem, setUserPickedItem] = useState<User | null>(null);
  const [defaultInputApplied, setDefaultInputApplied] = useState(false);
  const debouncedSearch = useDebounce(inputValue, 300);

  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useUsersQuery(debouncedSearch);

  const { data: defaultUser } = useUserByIdQuery(
    defaultValue && !userPickedItem ? defaultValue : undefined,
  );

  const selectedItem = userPickedItem ?? defaultUser ?? null;

  if (defaultUser && !defaultInputApplied && !userPickedItem) {
    setDefaultInputApplied(true);
    setInputValue(userLabel(defaultUser));
  }

  const isDisabled = disabled || readOnly;
  const showSpinner = isLoading || isFetching;
  const comboboxValue =
    value !== undefined
      ? selectedItem?.id === value
        ? selectedItem
        : null
      : selectedItem;

  return (
    <Combobox.Root<User>
      value={comboboxValue}
      onValueChange={item => {
        const resolved = item ?? null;
        setUserPickedItem(resolved);
        onSelected?.(resolved);
        setInputValue(resolved ? userLabel(resolved) : '');
      }}
      disabled={isDisabled}
      filter={null}
      itemToStringLabel={item => (item ? userLabel(item) : '')}
      itemToStringValue={item => item?.id ?? ''}
      isItemEqualToValue={(a, b) => a.id === b.id}>
      <Combobox.InputGroup
        className={cn(
          'flex h-8 w-full items-center gap-1 rounded-lg border border-input bg-transparent pl-2.5 pr-2 text-sm transition-colors',
          'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
          isDisabled && 'cursor-not-allowed opacity-50',
          readOnly && 'bg-muted',
        )}>
        <Combobox.Input
          placeholder={placeholder}
          readOnly={readOnly}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
        {showSpinner ? (
          <LoaderCircleIcon className="size-4 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          <Combobox.Trigger
            disabled={isDisabled}
            className="flex items-center disabled:cursor-not-allowed">
            <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
          </Combobox.Trigger>
        )}
      </Combobox.InputGroup>

      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4} className="isolate z-50">
          <Combobox.Popup className="w-(--anchor-width) max-h-60 overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 origin-(--transform-origin) data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-100">
            <Combobox.List className="p-1">
              {debouncedSearch.length < 2 && (
                <Combobox.Empty className="py-6 text-center text-sm text-muted-foreground">
                  Type at least 2 characters…
                </Combobox.Empty>
              )}
              {debouncedSearch.length >= 2 && !users.length && (
                <Combobox.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No user found.
                </Combobox.Empty>
              )}
              {users.map(user => (
                <Combobox.Item
                  key={user.id}
                  value={user}
                  disabled={excludeUserIds.includes(user.id)}
                  className="relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pl-1.5 pr-8 text-sm outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50">
                  <Combobox.ItemIndicator
                    render={
                      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
                    }>
                    <CheckIcon className="size-4" />
                  </Combobox.ItemIndicator>
                  <Avatar.Root className="size-6 shrink-0 overflow-hidden rounded-full">
                    {user.image && (
                      <Avatar.Image
                        src={user.image}
                        className="size-full object-cover"
                      />
                    )}
                    <Avatar.Fallback className="flex size-full items-center justify-center bg-muted text-xs text-muted-foreground">
                      {user.name[0]?.toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <span className="flex-1">{user.name}</span>
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
