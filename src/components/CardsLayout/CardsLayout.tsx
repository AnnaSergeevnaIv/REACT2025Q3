import { type CharacterData } from '../../services/network-requests';
import {
  CARDS_LAYOUT_BUTTON_CONTAINER_CLASS,
  CARDS_LAYOUT_BUTTON_NEXT_NAME,
  CARDS_LAYOUT_BUTTON_PREV_NAME,
  CARDS_LAYOUT_CONTAINER_CLASS,
  CARDS_LAYOUT_LOADING,
} from './CardsLayout.constants';
import { Card } from '../Card';
import { useNavigate, useRouteLoaderData, useSearchParams } from 'react-router';
import { useContext, useMemo } from 'react';
import type { PhotoCharacterData } from '../../App';
import { PhotoContext } from '../../services/PhotoContext';

export function CardsLayout() {
  const { data, error } = useRouteLoaderData('cards-layout');
  const navigate = useNavigate();
  const photoData = useContext(PhotoContext);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const dataWithPhoto = useMemo(() => {
    if (!data) return [];
    return mapData(data.results, photoData);
  }, [data, photoData]);

  const handlePagination = (next: boolean) => {
    const nextPage = next ? page + 1 : page - 1;
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', String(nextPage));

    navigate(`/?${params.toString()}`);
  };
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>{CARDS_LAYOUT_LOADING}</div>;
  return (
    <>
      <div className={CARDS_LAYOUT_CONTAINER_CLASS} id="cards-layout">
        {dataWithPhoto.map((character) => (
          <Card {...character} key={character.name} />
        ))}
      </div>
      <div className={CARDS_LAYOUT_BUTTON_CONTAINER_CLASS}>
        <button
          onClick={() => {
            handlePagination(false);
          }}
          disabled={!data.previous}
        >
          {CARDS_LAYOUT_BUTTON_PREV_NAME}
        </button>
        <button
          onClick={() => {
            handlePagination(true);
          }}
          disabled={!data.next}
        >
          {CARDS_LAYOUT_BUTTON_NEXT_NAME}
        </button>
      </div>
    </>
  );
}

function mapData(
  data: CharacterData[],
  photoData: PhotoCharacterData[]
): CharacterData[] {
  return data.map((character) => {
    character.image = photoData.find(
      (elem) => elem.name === character.name
    )?.image;
    return character;
  });
}
