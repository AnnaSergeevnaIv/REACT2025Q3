import React from 'react';
import Link from 'next/link';
import { Card, type CardProps } from '../../components/Card';
import {
  ABOUT_PAGE_CLASS,
  ABOUT_PAGE_ME_DATA,
  ABOUT_PAGE_SCHOOL_DATA,
  ABOUT_PAGE_TEST_ID,
  ABOUT_PAGE_TEXT,
  ABOUT_PAGE_TEXT_CLASS,
} from './AboutPage.constants';
import { DetailBackButton } from '../../components/DetailBackButton/DetailBackButton';
import './AboutPage.css';

export const meDataWithHandler: CardProps = {
  ...ABOUT_PAGE_ME_DATA,
  image: ABOUT_PAGE_ME_DATA.image,
  isDetailPage: false,
};
export const schoolDataWithHandler: CardProps = {
  ...ABOUT_PAGE_SCHOOL_DATA,
  image: ABOUT_PAGE_SCHOOL_DATA.image,
  isDetailPage: false,
};
export default function AboutPage() {
  return (
    <div data-testid={ABOUT_PAGE_TEST_ID}>
      <div className={ABOUT_PAGE_CLASS}>
        <Link
          href="https://github.com/AnnaSergeevnaIv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card {...meDataWithHandler}></Card>
        </Link>
        <Link
          href="https://rs.school"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card {...schoolDataWithHandler}></Card>
        </Link>
      </div>
      <p className={ABOUT_PAGE_TEXT_CLASS}>{ABOUT_PAGE_TEXT}</p>
      <DetailBackButton />
    </div>
  );
}
