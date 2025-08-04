'use client';
import React from 'react';
import { ABOUT_BUTTON_NAME } from './AboutButton.constants';
import { useRouter } from 'next/navigation';

export function AboutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/about');
      }}
    >
      {ABOUT_BUTTON_NAME}
    </button>
  );
}
