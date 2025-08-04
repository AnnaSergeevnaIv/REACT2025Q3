import { DETAIL_PAGE_CLASS, DETAIL_PAGE_TEST_ID } from './DetailPage.constants';
import { FullCharacterData } from '../../services/api';
import { Card } from '../../components/Card';
import './DetailPage.css';
import { DetailBackButton } from '../../components/DetailBackButton/DetailBackButton';
import React from 'react';
export function DetailPage({ data }: { data: FullCharacterData }) {
  return (
    <div className={DETAIL_PAGE_CLASS} data-testid={DETAIL_PAGE_TEST_ID}>
      <Card {...data} isDetailPage={true} />
      <DetailBackButton />
    </div>
  );
}
