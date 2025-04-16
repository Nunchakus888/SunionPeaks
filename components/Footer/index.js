'use client';

export default function Footer() {
  return (
    <footer className="bg-purple-900/20 backdrop-blur-sm text-purple-100 py-2 px-4 text-xs border-t border-purple-300/20">
      <div className="flex items-center justify-center">
        <span>© {new Date().getFullYear()} Next Extension</span>
      </div>
    </footer>
  );
}
