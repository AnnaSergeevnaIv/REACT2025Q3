import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { localStorageSearchKey, MAIN_PAGE_CLASS } from './MainPage.constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useLocalStorage<string>(
    localStorageSearchKey,
    ''
  );

  useEffect(() => {
    if (location.pathname !== '/') return;
    const searchParams = new URLSearchParams(location.search);
    const hasPage = searchParams.has('page');
    const hasSearch = searchParams.has('search');

    if (hasPage || hasSearch) return;

    const targetUrl = inputValue ? `/?search=${inputValue}` : '/?page=1';
    navigate(targetUrl, { replace: true });
  }, [inputValue, location]);

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
