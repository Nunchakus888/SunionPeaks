'use client';

export default function Header() {
  return (
    <header className="bg-purple-900/30 backdrop-blur-sm text-white py-3 px-4 shadow-md border-b border-purple-300/20">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Next Extension</p>
        <div className="flex items-center space-x-2">
          <span className="bg-purple-700/50 text-xs px-2 py-1 rounded-full border border-purple-300/30">v1.0</span>
        </div>
      </div>
    </header>
  );
}
