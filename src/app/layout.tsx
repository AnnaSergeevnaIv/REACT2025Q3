import type { Metadata } from 'next';
import '../index.css';
import { ThemeProvider } from '../services/ThemeContext';
import { Header } from '../components/Header';
import { ReduxProvider } from '../components/ReduxProvider/ReduxProvider';
import { Photos } from '../services/PhotoContext/Photos';
import React from 'react';

export const metadata: Metadata = {
  title: 'Star Wars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ReduxProvider>
          <Photos>
            <div className="app-container">
              <div className="main-page">
                <Header />
                {children}
              </div>
            </div>
          </Photos>
        </ReduxProvider>
      </ThemeProvider>
    </html>
  );
}
