import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      ru: '/not-found',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
