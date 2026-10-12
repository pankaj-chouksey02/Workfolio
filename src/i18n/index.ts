export const defaultLocale = 'en';

export const dictionaries = {
  en: {
    common: {
      appName: 'Atelier',
      explore: 'Explore Creators',
      disciplines: 'Disciplines',
      commissions: 'Commissions',
      about: 'About',
      signIn: 'Sign In',
      startAtelier: 'Start Your Atelier',
    },
    studio: {
      overview: 'Studio Overview',
      artworks: 'Artworks',
      collections: 'Collections',
      customizer: 'Portfolio Customizer',
      products: 'Products & Editions',
      orders: 'Orders',
      analytics: 'Analytics',
    },
  },
};

export function getDictionary(locale: 'en' = 'en') {
  return dictionaries[locale] || dictionaries.en;
}
