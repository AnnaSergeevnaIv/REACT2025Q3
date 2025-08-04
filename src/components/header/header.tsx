import { HEADER_CLASS, HEADER_IMAGE_CLASS } from './Header.constants';
import { SearchBar } from '../SearchBar';
import { ThemeToggle } from '../ThemeToggle';
import Image from 'next/image';
import { AboutButton } from '../AboutButton';
import './Header.css';

export function Header() {
  return (
    <header className={HEADER_CLASS}>
      <Image
        src="/logo.png"
        alt="start wars logo"
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
