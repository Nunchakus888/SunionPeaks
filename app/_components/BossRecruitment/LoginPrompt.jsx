'use client';

import React from 'react';

export default function LoginPrompt({ onOpenBoss }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-gray-900 text-white text-center">
      <div className="mb-8">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#60A5FA" />
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">需要登录 BOSS直聘</h1>
      
      <p className="mb-6 text-gray-300">
        请先登录您的BOSS直聘账号，以便使用本插件的全部功能。登录后请刷新本插件。
      </p>
      
      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={onOpenBoss}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          去 BOSS直聘 登录
        </button>
        
        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span>或</span>
        </div>
        
        <button
          onClick={() => window.open('https://www.zhipin.com/', '_blank')}
          className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
        >
          新标签页打开 BOSS直聘
        </button>
      </div>
      
      <div className="mt-10 text-sm text-gray-500">
        <p>登录后,本插件将支持自动获取职位和候选人信息</p>
      </div>
    </div>
  );
} 