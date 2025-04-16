'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-2 px-4 text-xs border-t border-gray-200">
      <div className="flex items-center justify-center">
        <span>© {new Date().getFullYear()} Next Extension</span>
      </div>
    </footer>
  );
}
