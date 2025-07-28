import myPhoto from '../../assets/my.jpeg';
import schoolLogo from '../../assets/school-logo.jpg';
import type { CardProps } from '../../components/Card';

export const ABOUT_PAGE_CLASS = 'flex flex-wrap gap-7 justify-center mb-7';
export const ABOUT_PAGE_BUTTON_NAME = 'Back';
export const ABOUT_PAGE_TEST_ID = 'about';
export const ABOUT_PAGE_TEXT_CLASS = 'text-white mb-7';
export const ABOUT_PAGE_TEXT =
  'This application allows you to search and explore characters from the legendary Star Wars saga. You can browse through paginated results, view detailed character information, and enjoy a smooth navigation experience.';
export const ABOUT_PAGE_ME_DATA: CardProps = {
  name: 'Anna Ivanova',
  eye_color: 'black',
  height: 155,
  image: myPhoto,
  url: '',
  cardClickHandle: () => {},
} as const;

export const ABOUT_PAGE_SCHOOL_DATA: CardProps = {
  name: 'RS SCHOOL',
  eye_color: 'look forward',
  height: 9999,
  image: schoolLogo,
  url: '',
  cardClickHandle: () => {},
} as const;
