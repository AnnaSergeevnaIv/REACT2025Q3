import {
  type CharacterData,
  type FullCharacterData,
} from '../services/network-requests';
import { type PhotoCharacterData } from '../App';
export const mockCharactersData: CharacterData[] = [
  {
    name: 'Darth Vader',
    height: 202,
    eye_color: 'yellow',
    url: '',
  },
  {
    name: 'Luke Skywalker',
    height: 172,
    eye_color: 'blue',
    url: '',
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
