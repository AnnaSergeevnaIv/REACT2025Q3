import {
  CARDS_LAYOUT_CONTAINER_CLASS,
  CARDS_LAYOUT_ERROR,
  CARDS_LAYOUT_LOADING,
  CARDS_LAYOUT_NO_DATA,
  CARDS_LAYOUT_REFETCH_BUTTON_CLASS,
  CARDS_LAYOUT_REFETCH_BUTTON_NAME,
} from './CardsLayout.constants';
import { Card } from '../Card';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { Footer } from '../Footer/Footer';
import { useGetCharactersQuery } from '../../services/api';
import { Pagination } from '../Pagination';

export function CardsLayout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const { data, isLoading, isError, refetch } = useGetCharactersQuery({
    search,
    page,
  });
  const handlePagination = (next: boolean) => {
    const nextPage = next ? page + 1 : page - 1;
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', String(nextPage));

    navigate(`?${params.toString()}`);
  };

  const cardClickHandle = (id: string) => {
    navigate(`character/${id}?${searchParams.toString()}`);
  };

  if (isError) return <div>{CARDS_LAYOUT_ERROR}</div>;
  if (isLoading) return <div>{CARDS_LAYOUT_LOADING}</div>;
  if (!data?.results) return <div>{CARDS_LAYOUT_NO_DATA}</div>;
  return (
    <div>
      <div className="flex">
        <div className={CARDS_LAYOUT_CONTAINER_CLASS} id="cards-layout">
          {data.results.map((character) => (
            <Card
              {...character}
              cardClickHandle={cardClickHandle}
              isDetailPage={false}
              key={character.name}
            />
          ))}
        </div>
        <Outlet />
      </div>

      <Pagination
        onClick={handlePagination}
        prevDisabled={!data.previous}
        nextDisabled={!data.next}
      />
      <button
        className={CARDS_LAYOUT_REFETCH_BUTTON_CLASS}
        onClick={() => {
          refetch();
        }}
      >
        {CARDS_LAYOUT_REFETCH_BUTTON_NAME}
      </button>
      <Footer />
    </div>
  );
}
