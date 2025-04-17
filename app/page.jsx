'use client';

import BossRecruitment from './_components/app';

export default function Home() {
  return (
    <div className="flex flex-col h-full min-h-[812px] w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-auto h-full py-4">
          <BossRecruitment />
        </div>
      </main>
    </div>
  );
} 