'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export function DetailBackButton() {
  const router = useRouter();
  const params = useSearchParams();
  const backHandle = () => {
    router.push(`/?${params}`);
  };
  return <button onClick={backHandle}>Back</button>;
}
