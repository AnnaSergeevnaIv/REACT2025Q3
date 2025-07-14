import { useEffect } from 'react';
import type { PhotoCharacterData } from '../../App';
import { type CharacterData } from '../../services/network-requests';
import { Header } from '../../components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { localStorageSearchKey, MAIN_PAGE_CLASS } from './MainPage.constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export interface MainProps {
  photoData: PhotoCharacterData[];
}

export interface Data {
  data?: CharacterData[];
  error?: string;
}

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useLocalStorage<string>(
    localStorageSearchKey,
    ''
  );

  useEffect(() => {
    if (inputValue && location.pathname === '/') {
      navigate(`/?search=${inputValue}`);
    } else {
      navigate(`/?page=1`);
    }
  }, [inputValue]);

  const handleClick = (value: string) => {
    navigate(`/?search=${value}`);
    setInputValue(value);
  };

  return (
    <div className={MAIN_PAGE_CLASS}>
      <Header clickHandle={handleClick} value={inputValue} />
      <Outlet />
    </div>
  );
}
