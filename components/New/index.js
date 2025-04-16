'use client';

export default function New({ navigateToPage }) {
  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-xl font-bold text-gray-800 mb-3">New Page</h1>
      <p className="text-gray-600 mb-4 text-sm">
        This is the second page of your extension.
      </p>
      
      <div className="bg-white p-4 rounded-lg w-full mb-5 shadow-sm border border-gray-200">
        <h2 className="font-medium text-gray-700 mb-2">Settings</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Setting 1</span>
            <div className="w-10 h-5 bg-gray-200 rounded-full flex items-center px-0.5 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Setting 2</span>
            <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center px-0.5 justify-end cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => navigateToPage('index')}
        className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium"
      >
        Back to Home
      </button>
    </div>
  );
} 