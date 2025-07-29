import {
  CARDS_LAYOUT_BUTTON_CONTAINER_CLASS,
  CARDS_LAYOUT_BUTTON_NEXT_NAME,
  CARDS_LAYOUT_BUTTON_PREV_NAME,
  CARDS_LAYOUT_CONTAINER_CLASS,
  CARDS_LAYOUT_ERROR,
  CARDS_LAYOUT_LOADING,
  CARDS_LAYOUT_REFETCH_BUTTON_CLASS,
} from './CardsLayout.constants';
import { Card } from '../Card';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { Footer } from '../Footer/Footer';
import { useGetCharactersQuery } from '../../services/api';

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
  if (!data) return <div>No data</div>;
  return (
    <div>
      <div className="flex">
        <div className={CARDS_LAYOUT_CONTAINER_CLASS} id="cards-layout">
          {data.results.map((character) => (
            <Card
              {...character}
              cardClickHandle={cardClickHandle}
              key={character.name}
            />
          ))}
        </div>
        <Outlet />
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
      <button
        className={CARDS_LAYOUT_REFETCH_BUTTON_CLASS}
        onClick={() => {
          refetch();
        }}
      >
        Refetch
      </button>
      <Footer />
    </div>
  );
}
