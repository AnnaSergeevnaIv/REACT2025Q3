import React from 'react';
import { CardsLayout } from '@/components/CardsLayout';
import { DetailPage } from '@/components/DetailPage';
import { baseURLCharacters } from '@/constants/constants';
import { FullCharacterData } from '@/services/api';
import './CharacterPage.css';
import { CHARACTER_PAGE_CLASS } from './CharacterPage.constants';
interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function CharacterPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const data = await fetch(`${baseURLCharacters}/${id}`);
  const dataJson: FullCharacterData = await data.json();
  return (
    <div className={CHARACTER_PAGE_CLASS}>
      <CardsLayout searchParams={searchParams} />
      <DetailPage data={dataJson} />
    </div>
  );
}
