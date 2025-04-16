'use client';

export default function Index({ navigateToPage }) {
  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-xl font-bold text-gray-800 mb-3">Home</h1>
      <p className="text-gray-600 mb-4 text-sm">
        Welcome to your Next.js Chrome extension!
      </p>
      
      <div className="bg-white p-4 rounded-lg w-full mb-5 shadow-sm border border-gray-200">
        <h2 className="font-medium text-gray-700 mb-2">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="bg-gray-50 hover:bg-gray-100 p-3 rounded border border-gray-200 text-sm text-gray-700 transition-colors flex flex-col items-center"
          >
            <span className="text-xs mt-1">Action 1</span>
          </button>
          <button 
            className="bg-gray-50 hover:bg-gray-100 p-3 rounded border border-gray-200 text-sm text-gray-700 transition-colors flex flex-col items-center"
          >
            <span className="text-xs mt-1">Action 2</span>
          </button>
        </div>
      </div>
      
      <button 
        onClick={() => navigateToPage('new')}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
      >
        Go to New Page
      </button>
    </div>
  );
}
