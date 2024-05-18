import defaultLocale from './locales/ms.json'

let SHARED_TEXT = { ...defaultLocale }

for (let key in SHARED_TEXT) {
  if (SHARED_TEXT.hasOwnProperty(key)) {
    SHARED_TEXT[key] = key;
  }
}

export default SHARED_TEXT