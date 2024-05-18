const DEFAULT_LANGUAGE = 'ms';

export default function getTranslation(item, currentLang) {
  if (item && item?.[currentLang]) {
    return item?.[currentLang];
  }
  return item?.[DEFAULT_LANGUAGE];
}