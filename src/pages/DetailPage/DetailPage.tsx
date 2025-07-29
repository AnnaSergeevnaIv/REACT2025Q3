import { useLocation, useNavigate, useSearchParams } from 'react-router';
import placeholder from '../../assets/placeholder.png';
import {
  DETAIL_PAGE_BUTTON_CLASS,
  DETAIL_PAGE_BUTTON_NAME,
  DETAIL_PAGE_CLASS,
  DETAIL_PAGE_ERROR,
  DETAIL_PAGE_IMG_CLASS,
  DETAIL_PAGE_IMG_CONTAINER_CLASS,
  DETAIL_PAGE_LIST_CLASS,
  DETAIL_PAGE_LOADING,
  DETAIL_PAGE_TEST_ID,
  DETAIL_PAGE_TITLE_CLASS,
} from './DetailPage.constants';
import {
  useGetCharacterQuery,
  useGetCharactersQuery,
  useGetTransformedPhotosQuery,
} from '../../services/api';

export function DetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/').pop()?.split('?')[0] ?? '';
  const [searchParams] = useSearchParams();
  const photoRequest = useGetTransformedPhotosQuery(undefined);
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
  console.log(characterFromList);
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

  const { name, height, eye_color, hair_color, mass, skin_color } = character;

  const imageSrc = photoRequest.data?.[name]?.image ?? placeholder;
  return (
    <div className={`${DETAIL_PAGE_CLASS}`} data-testid={DETAIL_PAGE_TEST_ID}>
      <h3 className={DETAIL_PAGE_TITLE_CLASS}>{name}</h3>
      <div className={DETAIL_PAGE_IMG_CONTAINER_CLASS}>
        <img src={imageSrc} alt={name} className={DETAIL_PAGE_IMG_CLASS} />
      </div>

      <ul className={DETAIL_PAGE_LIST_CLASS}>
        <li>
          <strong>Height:</strong> {height}
        </li>
        <li>
          <strong>Eye Color:</strong> {eye_color}
        </li>
        <li>
          <strong>Hair Color:</strong> {hair_color}
        </li>
        <li>
          <strong>Mass:</strong> {mass}
        </li>
        <li>
          <strong>Skin Color:</strong> {skin_color}
        </li>
      </ul>

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
