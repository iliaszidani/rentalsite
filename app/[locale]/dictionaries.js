import 'server-only';

const dictionaries = {
  fr: () => import('../../messages/fr.json').then((module) => module.default),
  en: () => import('../../messages/en.json').then((module) => module.default),
  ar: () => import('../../messages/ar.json').then((module) => module.default),
  de: () => import('../../messages/de.json').then((module) => module.default),
  es: () => import('../../messages/es.json').then((module) => module.default),
  pt: () => import('../../messages/pt.json').then((module) => module.default),
  it: () => import('../../messages/it.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (!dictionaries[locale]) {
    // Handle cases where the locale is not found
    console.warn(`Locale "${locale}" not found, defaulting to "en"`);
    return dictionaries['fr']();  // Fallback to default locale
  }

  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Error loading dictionary for locale "${locale}":`, error);
    // Provide a fallback in case the import fails
    return dictionaries['fr']();
  }
};
