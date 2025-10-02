import React from 'react';
import { CardsLayout } from '../../components/CardsLayout';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default function Page({ searchParams }: PageProps) {
  return <CardsLayout searchParams={searchParams} />;
}
