import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en-us', 'zh-cn', 'de-de', 'en-es', 'fr-fr', 'it-it', 'ja-jp', 'ko-kr', 'pt-pt', 'ro-ro', 'ru-ru'],
    localePrefix: 'as-needed',
    // Used when no locale matches
    defaultLocale: 'en-us'
});