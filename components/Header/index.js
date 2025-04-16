'use client';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-3 px-4 shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Next Extension</p>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-500 text-xs px-2 py-1 rounded">v1.0</span>
        </div>
      </div>
    </header>
  );
}
