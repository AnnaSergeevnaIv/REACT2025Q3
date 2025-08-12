import { type CharacterData } from '../services/network-requests';
import { type PhotoCharacterData } from '../App';
export const mockCharactersData: CharacterData[] = [
  {
    name: 'Darth Vader',
    height: 202,
    eye_color: 'yellow',
  },
  {
    name: 'Luke Skywalker',
    height: 172,
    eye_color: 'blue',
  },
];

export const mockPhotoCharacterData: PhotoCharacterData[] = [
  {
    name: 'Darth Vader',
    image:
      'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
  },
];
