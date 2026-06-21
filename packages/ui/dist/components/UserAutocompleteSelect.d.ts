import type { User } from '@57eme-regiment/auth-package';
type UserAutocompleteSelectProps = {
    value?: string;
    defaultValue?: string;
    onSelected?: (user: User | null) => void;
    disabled?: boolean;
    readOnly?: boolean;
    excludeUserIds?: string[];
    placeholder?: string;
};
export declare const UserAutocompleteSelect: ({ value, defaultValue, onSelected, disabled, readOnly, excludeUserIds, placeholder, }: UserAutocompleteSelectProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=UserAutocompleteSelect.d.ts.map