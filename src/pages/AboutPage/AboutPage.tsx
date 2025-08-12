import { useNavigate } from 'react-router';
import { Card, type CardProps } from '../../components/Card';
import {
  ABOUT_PAGE_BUTTON_NAME,
  ABOUT_PAGE_CLASS,
  ABOUT_PAGE_ME_DATA,
  ABOUT_PAGE_SCHOOL_DATA,
  ABOUT_PAGE_TEST_ID,
  ABOUT_PAGE_TEXT,
  ABOUT_PAGE_TEXT_CLASS,
} from './AboutPage.constants';
export const meDataWithHandler: CardProps = {
  ...ABOUT_PAGE_ME_DATA,
  cardClickHandle: () => {},
};
export const schoolDataWithHandler: CardProps = {
  ...ABOUT_PAGE_SCHOOL_DATA,
  cardClickHandle: () => {},
};
export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div data-testid={ABOUT_PAGE_TEST_ID}>
      <div className={ABOUT_PAGE_CLASS}>
        <a href="https://github.com/AnnaSergeevnaIv">
          <Card {...meDataWithHandler}></Card>
        </a>
        <a href="https://rs.school">
          <Card {...schoolDataWithHandler}></Card>
        </a>
      </div>
      <p className={ABOUT_PAGE_TEXT_CLASS}>{ABOUT_PAGE_TEXT}</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        {ABOUT_PAGE_BUTTON_NAME}
      </button>
    </div>
  );
}
