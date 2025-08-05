import {
  NO_MATCH_CLASS,
  NO_MATCH_H1_CLASS,
  NO_MATCH_PARAGRAPH_CLASS,
  NO_MATCH_SECTION_SPACING_CLASS,
  NO_MATCH_TEST_ID,
} from './NoMatch.constants';
import React from 'react';
import { DetailBackButton } from '../DetailBackButton/DetailBackButton';
import { useTranslations } from 'next-intl';
export default function NoMatch() {
  const t = useTranslations('NoMatch');
  return (
    <div data-testid={NO_MATCH_TEST_ID} className={NO_MATCH_CLASS}>
      <h1 className={NO_MATCH_H1_CLASS}>{t('title')}</h1>
      <p className={NO_MATCH_PARAGRAPH_CLASS}>{t('firstParagraph')}</p>
      <p className={NO_MATCH_SECTION_SPACING_CLASS}>{t('secondParagraph')}</p>
      <DetailBackButton />
    </div>
  );
}
