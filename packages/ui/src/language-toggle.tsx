import { Button } from './ui/button.js';

type LanguageToggleProps = {
  language: string;
  languages?: string[];
  onToggle: (lang: string) => void;
};

export function LanguageToggle({
  language,
  languages = ['en', 'fr'],
  onToggle,
}: LanguageToggleProps) {
  const currentIndex = languages.indexOf(language);
  const next = languages[(currentIndex + 1) % languages.length] ?? languages[0];

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => onToggle(next)}
      title={`Switch to ${next?.toUpperCase()}`}
      className="font-bold whitespace-nowrap">
      {language.toUpperCase()}
    </Button>
  );
}
