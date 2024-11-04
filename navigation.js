import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['fr', 'en','ar','pt','es','de','it'];
export const localePrefix = 'as-needed';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });