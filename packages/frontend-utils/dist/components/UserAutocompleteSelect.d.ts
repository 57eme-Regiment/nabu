import type { User } from '@57eme-regiment/auth-contracts';
type UserAutocompleteSelectProps = {
    value?: string;
    defaultValue?: string;
    onSelected?: (user: User | null) => void;
    disabled?: boolean;
    readOnly?: boolean;
    excludeUserIds?: string[];
    placeholder?: string;
};
export declare const UserAutocompleteSelect: ({ value, defaultValue, onSelected, disabled, readOnly, excludeUserIds, placeholder, }: UserAutocompleteSelectProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=UserAutocompleteSelect.d.ts.map