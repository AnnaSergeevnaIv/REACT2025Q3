'use client';
import { stateCleared, selectCheckedCharacters } from '@/store/characterSlice';
import {
  FOOTER_CLASS,
  FOOTER_TEST_ID,
  FOOTER_TEXT_CLASS,
} from './Footer.constants';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { downloadCSV } from '@/services/downloadCSV';
import './Footer.css';
import { useTranslations } from 'next-intl';
import React from 'react';

export function Footer() {
  const t = useTranslations('Footer');
  const checkedCharacters = useAppSelector(selectCheckedCharacters);
  const checkedCount = checkedCharacters ? checkedCharacters.length : 0;
  const dispatch = useAppDispatch();
  const unselectClickHandle = () => {
    dispatch(stateCleared());
  };
  return checkedCount !== 0 ? (
    <footer className={FOOTER_CLASS} data-testid={FOOTER_TEST_ID}>
      <h2 className={FOOTER_TEXT_CLASS}>
        {t('test')} - {checkedCount}
      </h2>
      <button onClick={unselectClickHandle}>{t('unselect')}</button>
      <button
        onClick={() => {
          downloadCSV(checkedCharacters, checkedCount);
        }}
      >
        {t('downloadCSV')}
      </button>
    </footer>
  ) : (
    <></>
  );
}
