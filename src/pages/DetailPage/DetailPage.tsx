import { useContext } from 'react';
import { useNavigate, useRouteLoaderData, useSearchParams } from 'react-router';
import { PhotoContext } from '../../services/PhotoContext';
import placeholder from '../../assets/placeholder.png';
import { DETAIL_PAGE_CLASS } from './DetailPage.constants';

export function DetailPage() {
  const { data, error } = useRouteLoaderData('detail');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const photoData = useContext(PhotoContext);

  const { name, height, eye_color, hair_color, mass, skin_color } = data;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className={DETAIL_PAGE_CLASS}>
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
        Back
      </button>
    </div>
  );
}
