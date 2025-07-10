import { useEffect, useState } from 'react';
import type { PhotoCharacterData } from '../../App';
import { getCharacters } from '../../services/network-requests';
import { type CharacterData } from '../../services/network-requests';
import { CardsLayout } from '../../components/CardsLayout';
import { Header } from '../../components/Header';
import {
  LOADING_TEXT,
  localStorageSearchKey,
  MAIN_PAGE_CLASS,
  MAIN_PAGE_H1_CLASS,
} from './MainPage.constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export interface MainProps {
  photoData: PhotoCharacterData[];
}

export function MainPage({ photoData }: MainProps) {
  const [inputValue, setInputValue] = useLocalStorage<string>(
    localStorageSearchKey,
    ''
  );
  const [loading, setLoading] = useState(true);
  const [requestError, setRequestError] = useState('');
  const [data, setData] = useState<CharacterData[]>([]);

  useEffect(() => {
    async function getData(inputValue: string) {
      const data = await getCharacters(inputValue);
      if (typeof data !== 'string') {
        setLoading(false);
        setData(mapData(data, photoData));
      } else {
        setRequestError(data);
        setLoading(false);
      }
    }
    if (loading) {
      getData(inputValue);
    }
  }, [photoData, loading]);

  const handleClick = (value: string) => {
    setInputValue(value);
    setLoading(true);
  };

  return (
    <div className={MAIN_PAGE_CLASS}>
      <Header clickHandle={handleClick} value={inputValue} />
      {loading ? (
        <h1>{LOADING_TEXT}</h1>
      ) : requestError ? (
        <h1 className={MAIN_PAGE_H1_CLASS}>{requestError}</h1>
      ) : (
        <CardsLayout characters={data} />
      )}
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
