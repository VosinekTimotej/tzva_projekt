import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import si from './si.json';
  
i18n.use(initReactI18next).init({
  lng: 'si',
  fallbackLng: 'si',
  resources: {
    en: en,
    si: si,
  },
  interpolation: {
    escapeValue: false
  }
});
  
export default i18n;