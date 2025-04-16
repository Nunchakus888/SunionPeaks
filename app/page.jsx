'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Index from '../components/Index';
import New from '../components/New';

export default function Home() {
  const [activePage, setActivePage] = useState('index');

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="h-screen overflow-auto">
        <div className="container-custom mx-auto max-w-4xl">
          {activePage === 'index' && <Index navigateToPage={navigateToPage} />}
          {activePage === 'new' && <New navigateToPage={navigateToPage} />}
        </div>
      </main>
      <Footer />
    </div>
  );
} 