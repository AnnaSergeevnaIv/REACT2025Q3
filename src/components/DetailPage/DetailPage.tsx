import { DETAIL_PAGE_CLASS, DETAIL_PAGE_TEST_ID } from './DetailPage.constants';
import { FullCharacterData } from '../../services/api';
import { Card } from '../Card';
import './DetailPage.css';
import { DetailBackButton } from '../DetailBackButton/DetailBackButton';
import React from 'react';
export default function DetailPage({ data }: { data: FullCharacterData }) {
  return (
    <div className={DETAIL_PAGE_CLASS} data-testid={DETAIL_PAGE_TEST_ID}>
      <Card {...data} isDetailPage={true} />
      <DetailBackButton />
    </div>
  );
}
