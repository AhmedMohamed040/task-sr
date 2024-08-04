'use client';

import { useCallback } from 'react';
import { setCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';

import axiosInstance from 'src/utils/axios';
import { localStorageGetItem } from 'src/utils/storage-available';

import { useSettingsContext } from 'src/components/settings';

import i18n from './i18n';
import { allLangs, defaultLang } from './config-lang';
// import { invalidateCaching } from 'src/actions/cache-invalidation';

// ----------------------------------------------------------------------

export function useLocales() {
  const langStorage = localStorageGetItem('i18nextLng');

  const currentLang = allLangs.find((lang) => lang.value === langStorage) || defaultLang;

  return {
    allLangs,
    currentLang,
  };
}

// ----------------------------------------------------------------------

export function useTranslate() {
  const { t, ready } = useTranslation();

  const settings = useSettingsContext();

  const onChangeLang = useCallback(
    (newlang: string = "en") => {
      document.documentElement.lang = `${newlang}`;
      i18n.changeLanguage(newlang);
      settings.onChangeDirectionByLang(newlang);
      // axiosInstance.defaults.headers.common['Accept-Language'] = newlang;
      // setCookie('Language', newlang);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n, settings]
  );

  return {
    t,
    i18n,
    ready,
    onChangeLang,
  };
}
