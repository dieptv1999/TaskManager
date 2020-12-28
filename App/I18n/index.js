import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import uk from './languages/uk'
import vi from './languages/vi'

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('language');
    if (value !== null) {
      i18n.changeLanguage(value)
      return value;
    }
  } catch (error) {
    return null
  }
};

export default {
  initMultiLanguage: () => {
    _retrieveData()
    langDefault = "vi"
    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        resources: {
          vi,
          uk,
        },
        lng: langDefault,
        fallbackLng: langDefault,
        ns:['default'],
        interpolation: {
          escapeValue: false
        }
      });
  }
}
