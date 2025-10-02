'use client';
import { FullCharacterData } from './api';
import { generateCSV } from './gererateCSV';

export async function downloadCSV(data: FullCharacterData[], count: number) {
  const csvContent = await generateCSV(data);
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
