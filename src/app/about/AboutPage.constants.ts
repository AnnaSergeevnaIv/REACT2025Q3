// В Next.js картинки из public импортируются по пути от корня

export const ABOUT_PAGE_CLASS = 'flex flex-wrap gap-7 justify-center mb-7';
export const ABOUT_PAGE_BUTTON_NAME = 'Back';
export const ABOUT_PAGE_TEST_ID = 'about';
export const ABOUT_PAGE_TEXT_CLASS = 'mb-7';
export const ABOUT_PAGE_TEXT =
  'This application allows you to search and explore characters from the legendary Star Wars saga. You can browse through paginated results, view detailed character information, and enjoy a smooth navigation experience.';
export const ABOUT_PAGE_ME_DATA = {
  name: 'Anna Ivanova',
  eye_color: 'black',
  height: 155,
  image: '/my.jpeg',
  url: '',
  hair_color: '',
  mass: '0',
  skin_color: 'white',
  isDetailPage: false,
} as const;

export const ABOUT_PAGE_SCHOOL_DATA = {
  name: 'RS SCHOOL',
  eye_color: 'look forward',
  height: 9999,
  image: '/school-logo.jpg',
  url: '',
  hair_color: '',
  mass: '0',
  skin_color: 'white',
  isDetailPage: false,
} as const;
