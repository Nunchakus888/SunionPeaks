'use client';

import BossRecruitment from './_components/app';

export default function Home() {
  return (
    <div className="flex flex-col h-full min-h-[600px] w-full bg-gray-900">
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-2xl h-full py-4 px-4">
          <BossRecruitment />
        </div>
      </main>
    </div>
  );
} 