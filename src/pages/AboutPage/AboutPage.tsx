import { useNavigate } from 'react-router';
import { Card } from '../../components/Card';
import {
  ABOUT_PAGE_BUTTON_NAME,
  ABOUT_PAGE_CLASS,
  ABOUT_PAGE_ME_DATA,
  ABOUT_PAGE_SCHOOL_DATA,
  ABOUT_PAGE_TEST_ID,
  ABOUT_PAGE_TEXT,
  ABOUT_PAGE_TEXT_CLASS,
} from './AboutPage.constants';

export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div data-testid={ABOUT_PAGE_TEST_ID}>
      <div className={ABOUT_PAGE_CLASS}>
        <a href="https://github.com/AnnaSergeevnaIv">
          <Card {...ABOUT_PAGE_ME_DATA}></Card>
        </a>
        <a to="https://rs.school">
          <Card {...ABOUT_PAGE_SCHOOL_DATA}></Card>
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
