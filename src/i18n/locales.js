// Supported languages. `code` is the URL prefix (the default language has none) and the hreflang value.
export const DEFAULT_LOCALE = 'en';
export const LOCALES = [
  { code: 'en', name: 'English', dir: 'ltr', og: 'en_US', sitemap: 'en-US' },
  { code: 'es', name: 'Español', dir: 'ltr', og: 'es_ES', sitemap: 'es-ES' },
  { code: 'ja', name: '日本語', dir: 'ltr', og: 'ja_JP', sitemap: 'ja-JP' },
  { code: 'fr', name: 'Français', dir: 'ltr', og: 'fr_FR', sitemap: 'fr-FR' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', og: 'de_DE', sitemap: 'de-DE' },
  { code: 'pt', name: 'Português', dir: 'ltr', og: 'pt_BR', sitemap: 'pt-BR' },
  { code: 'ko', name: '한국어', dir: 'ltr', og: 'ko_KR', sitemap: 'ko-KR' },
  { code: 'it', name: 'Italiano', dir: 'ltr', og: 'it_IT', sitemap: 'it-IT' },
  { code: 'id', name: 'Indonesia', dir: 'ltr', og: 'id_ID', sitemap: 'id-ID' },
  { code: 'ru', name: 'Русский', dir: 'ltr', og: 'ru_RU', sitemap: 'ru-RU' },
  { code: 'th', name: 'ไทย', dir: 'ltr', og: 'th_TH', sitemap: 'th-TH' },
  { code: 'ar', name: 'العربية', dir: 'rtl', og: 'ar_AR', sitemap: 'ar' },
];
export const NON_DEFAULT = LOCALES.filter(l => l.code !== DEFAULT_LOCALE);
