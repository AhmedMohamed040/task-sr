import i18n from 'src/locales/i18n';

export function getNameKeyLang(): 'name_en' | 'name_ar' {
  return i18n.language === 'en' ? 'name_en' : 'name_ar';
}

export function getCustomNameKeyLang(enKey:string,arKey:string){
  return i18n.language === 'en' ? enKey : arKey;
}
