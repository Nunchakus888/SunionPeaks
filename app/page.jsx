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
    <div className="flex flex-col h-full bg-gray-50">
      <Header />
      <main className="flex-grow overflow-auto p-2">
        <div className="w-full h-full flex items-start justify-center">
          {activePage === 'index' && <Index navigateToPage={navigateToPage} />}
          {activePage === 'new' && <New navigateToPage={navigateToPage} />}
        </div>
      </main>
      <Footer />
    </div>
  );
} 