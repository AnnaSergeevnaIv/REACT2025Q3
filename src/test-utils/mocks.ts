import { type FullCharacterData } from '../services/network-requests/network-requests';
import { type PhotoCharacterData } from '../App';
export const mockCharactersData: FullCharacterData[] = [
  {
    name: 'Darth Vader',
    height: 202,
    eye_color: 'yellow',
    image: '/src/assets/placeholder.png',
    url: 'www.dhghdf/1/',
    hair_color: '',
    mass: '',
    skin_color: '',
  },
  {
    name: 'Luke Skywalker',
    height: 172,
    eye_color: 'blue',
    image: '/src/assets/placeholder.png',
    url: 'www.dhghdf/2/',
    hair_color: '',
    mass: '',
    skin_color: '',
  },
];
export const mockImage =
  'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg';

export const mockPhotoCharacterData: PhotoCharacterData[] = [
  {
    name: 'Darth Vader',
    image: mockImage,
  },
];

export const mockFullCharacterData: FullCharacterData = {
  name: 'Darth Vader',
  height: 202,
  eye_color: 'yellow',
  url: '',
  hair_color: '',
  mass: '',
  skin_color: '',
};
