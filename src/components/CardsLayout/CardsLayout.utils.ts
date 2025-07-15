import { type CharacterData } from '../../services/network-requests';
import type { PhotoCharacterData } from '../../App';

export function mapData(
  data: CharacterData[],
  photoData: PhotoCharacterData[]
): CharacterData[] {
  return data.map((character) => ({
    ...character,
    image: photoData.find((elem) => elem.name === character.name)?.image,
  }));
}
