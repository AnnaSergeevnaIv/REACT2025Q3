import { HEADER_CLASS, HEADER_IMAGE_CLASS } from './Header.constants';
import { SearchBar } from '@/components/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import Image from 'next/image';
import { AboutButton } from '@/components/AboutButton';
import './Header.css';
import React from 'react';
import { getTranslations } from 'next-intl/server';
export async function Header() {
  const t = await getTranslations('Header');
  return (
    <header className={HEADER_CLASS}>
      <Image
        src="/logo.png"
        alt={t('logo')}
        className={HEADER_IMAGE_CLASS}
        width={100}
        height={50}
      />
      <SearchBar />
      <AboutButton />
      <ThemeToggle />
    </header>
  );
}
