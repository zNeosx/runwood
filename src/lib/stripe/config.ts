export const EBOOK_PRICE_ID = process.env.STRIPE_EBOOK_PRICE_ID!;

export const LANGUAGES = [
  { code: 'FRA', label: 'Français', flag: '🇫🇷' },
  { code: 'ANG', label: 'Anglais', flag: '🇬🇧' },
  { code: 'ESP', label: 'Espagnol', flag: '🇪🇸' },
  { code: 'PRT', label: 'Portugais', flag: '🇵🇹' },
] as const;

export const LANGUAGE_LABELS = {
  FRA: 'Français',
  ANG: 'Anglais',
  ESP: 'Espagnol',
  PRT: 'Portugais',
};

export type Language = (typeof LANGUAGES)[number]['code'];

export const EBOOK_FILES: Record<Language, string> = {
  FRA: 'ebook-FRA.pdf',
  ANG: 'ebook-ANG.pdf',
  ESP: 'ebook-ESP.pdf',
  PRT: 'ebook-PRT.pdf',
};
