import { headerCharacters } from '../constants/constants';
import { type FullCharacterData } from './network-requests/network-requests';

export function downloadCSV(data: FullCharacterData[], count: number) {
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
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${count}_items.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
