import { type CharacterData } from '../../services/network-requests';
import { CARDS_LAYOUT_CONTAINER_CLASS } from './CardsLayout.constants';
import { Card } from '../Card';
import { useRouteLoaderData } from 'react-router';
import { useContext, useMemo } from 'react';
import type { PhotoCharacterData } from '../../App';
import { PhotoContext } from '../../services/PhotoContext';

export function CardsLayout() {
  const { data, error } = useRouteLoaderData('cards-layout');

  const photoData = useContext(PhotoContext);

  const dataWithPhoto = useMemo(() => {
    if (!data) return [];
    return mapData(data, photoData);
  }, [data, photoData]);

  if (error) return <div>Error: {error}</div>;
  if (!dataWithPhoto) return <div>Loading...</div>;
  return (
    <div className={CARDS_LAYOUT_CONTAINER_CLASS} id="cards-layout">
      {dataWithPhoto.map((character) => (
        <Card {...character} key={character.name} />
      ))}
    </div>
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
