import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from './ui/button.js';
export function LanguageToggle({ language, languages = ['en', 'fr'], onToggle, }) {
    const currentIndex = languages.indexOf(language);
    const next = languages[(currentIndex + 1) % languages.length] ?? languages[0];
    return (_jsx(Button, { variant: "outline", size: "icon", onClick: () => onToggle(next), title: `Switch to ${next?.toUpperCase()}`, className: "font-bold whitespace-nowrap", children: language.toUpperCase() }));
}
