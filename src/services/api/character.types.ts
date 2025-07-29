export interface FullCharacterData {
  name: string;
  eye_color: string;
  height: number;
  url: string;
  image?: string;
  hair_color: string;
  mass: string;
  skin_color: string;
}

export interface ResponseCharacters {
  results: FullCharacterData[];
  previous: string | undefined;
  next: string | undefined;
}
