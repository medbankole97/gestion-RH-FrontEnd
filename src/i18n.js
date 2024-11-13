// src/i18n.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

const messages = {
  en,
  fr,
  ar,
};

const i18n = createI18n({
  locale: 'en', // Langue par défaut
  fallbackLocale: 'en',
  messages,
});

export default i18n;
