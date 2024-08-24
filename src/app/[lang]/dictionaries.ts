import 'server-only';

export type Locale = 'ar' | 'en' | 'nl';

// Broader type to accommodate different shapes of the dictionaries
type Dictionary = Record<string, any>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ar: () => import('../../dictionaries/ar.json').then(module => module.default),
  en: () => import('../../dictionaries/en.json').then(module => module.default),
  nl: () => import('../../dictionaries/nl.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loadDictionary = dictionaries[locale];
  if (!loadDictionary) {
    throw new Error(`Locale ${locale} is not supported.`);
  }
  return loadDictionary();
};

/*
// Option 2: Use a Union Type

import 'server-only';

type Locale = 'en' | 'nl';

// Specific types for each dictionary structure
type EnDictionary = {
  [key: string]: string;
};

type NlDictionary = {
  products: {
    cart: string;
  };
};

// Union type to reflect different dictionary structures
type Dictionary = EnDictionary | NlDictionary;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default as EnDictionary),
  nl: () => import('../../dictionaries/nl.json').then((module) => module.default as NlDictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loadDictionary = dictionaries[locale];
  if (!loadDictionary) {
    throw new Error(`Locale ${locale} is not supported.`);
  }
  return loadDictionary();
};


*/
