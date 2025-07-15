import { useContext } from 'react';
import { useNavigate, useRouteLoaderData, useSearchParams } from 'react-router';
import { PhotoContext } from '../../services/PhotoContext';
import placeholder from '../../assets/placeholder.png';
import {
  DETAIL_PAGE_BUTTON_NAME,
  DETAIL_PAGE_CLASS,
  DETAIL_PAGE_LOADING,
  DETAIL_PAGE_TEST_ID,
} from './DetailPage.constants';

export function DetailPage() {
  const { data, error } = useRouteLoaderData('detail');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const photoData = useContext(PhotoContext);
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>{DETAIL_PAGE_LOADING}</div>;
  const { name, height, eye_color, hair_color, mass, skin_color } = data;

  return (
    <div className={DETAIL_PAGE_CLASS} data-testid={DETAIL_PAGE_TEST_ID}>
      <h3>{name}</h3>
      <ul>
        <li>
          <img
            src={
              photoData.find((elem) => elem.name === name)?.image ?? placeholder
            }
            alt="name"
          />
        </li>
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
      >
        {DETAIL_PAGE_BUTTON_NAME}
      </button>
    </div>
  );
}
