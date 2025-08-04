import { useLocation, useNavigate, useSearchParams } from 'react-router';
import {
  DETAIL_PAGE_BUTTON_CLASS,
  DETAIL_PAGE_BUTTON_NAME,
  DETAIL_PAGE_CLASS,
  DETAIL_PAGE_ERROR,
  DETAIL_PAGE_LOADING,
  DETAIL_PAGE_TEST_ID,
} from './DetailPage.constants';
import {
  useGetCharacterQuery,
  useGetCharactersQuery,
} from '../../services/api';
import { Card } from '../../components/Card';

export function DetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/').pop()?.split('?')[0] ?? '';
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const search = searchParams.get('search') ?? '';

  const {
    character: characterFromList,
    isLoading: isListLoading,
    isError: isListError,
  } = useGetCharactersQuery(
    {
      search,
      page,
    },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        character: data?.results.find((character) =>
          character.url.endsWith(`${id}/`)
        ),
        isLoading,
        isError,
      }),
    }
  );
  const {
    data: characterFromId,
    isLoading: isIdLoading,
    isError: isIdError,
  } = useGetCharacterQuery(id, {
    skip: !!characterFromList,
  });
  const character = characterFromList ?? characterFromId;
  const isLoading = isListLoading || (characterFromList == null && isIdLoading);
  const isError = isListError || isIdError;
  if (isError) return <div>{DETAIL_PAGE_ERROR}</div>;
  if (isLoading) return <div>{DETAIL_PAGE_LOADING}</div>;
  if (!character) return <div>{DETAIL_PAGE_LOADING}</div>;

  return (
    <div className={DETAIL_PAGE_CLASS} data-testid={DETAIL_PAGE_TEST_ID}>
      <Card {...character} isDetailPage={true} cardClickHandle={() => {}} />

      <button
        onClick={() => {
          navigate(`/?${searchParams}`);
        }}
        className={DETAIL_PAGE_BUTTON_CLASS}
      >
        {DETAIL_PAGE_BUTTON_NAME}
      </button>
    </div>
  );
}
