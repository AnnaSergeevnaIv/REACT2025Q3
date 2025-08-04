import {
  CARDS_LAYOUT_CONTAINER_CLASS,
  CARDS_LAYOUT_ERROR,
  CARDS_LAYOUT_NO_DATA,
} from './CardsLayout.constants';
import { Card } from '../Card';
import { Footer } from '../Footer/Footer';
import { Pagination } from '../Pagination';
import React from 'react';
import { baseURLCharacters } from '../../constants/constants';
import { ResponseCharacters } from '../../services/api';
import './CardsLayout.css';

export async function CardsLayout({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page || '1';
  const search = resolvedParams.search || '';

  const data = await fetch(
    `${baseURLCharacters}?page=${page}&search=${search}`
  );
  const dataJson: ResponseCharacters = await data.json();

  if (!dataJson?.results) {
    return <div>{CARDS_LAYOUT_NO_DATA}</div>;
  }
  if (data.status !== 200) {
    return <div>{CARDS_LAYOUT_ERROR}</div>;
  }
  return (
    <div>
      <div className={CARDS_LAYOUT_CONTAINER_CLASS} id="cards-layout">
        {dataJson.results.map((character) => (
          <Card {...character} isDetailPage={false} key={character.name} />
        ))}
      </div>

      <Pagination
        prevDisabled={!dataJson.previous}
        nextDisabled={!dataJson.next}
      />
      {/* <button
        className={CARDS_LAYOUT_REFETCH_BUTTON_CLASS}
        onClick={() => {
          refetch();
        }}
      >
        {CARDS_LAYOUT_REFETCH_BUTTON_NAME}
      </button> */}
      <Footer />
    </div>
  );
}
