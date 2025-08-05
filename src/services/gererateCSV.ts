'use server';
import { headerCharacters } from '../constants/constants';
import { type FullCharacterData } from './api';
export async function generateCSV(data: FullCharacterData[]) {
  const rows = data.map((char) => [
    char.name,
    char.eye_color,
    char.height.toString(),
    char.url,
    char.image ?? '',
    char.hair_color,
    char.mass,
    char.skin_color,
  ]);
  const csvContent = [headerCharacters, ...rows]
    .map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n');
  return csvContent;
}
