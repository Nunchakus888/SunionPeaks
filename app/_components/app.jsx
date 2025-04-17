'use client';

import React, { Suspense, Component, useEffect, useState } from 'react';
// Import directly instead of using dynamic import to avoid chunk loading issues
import BossRecruitment from './BossRecruitment';

// Loading component
function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-screen min-h-[400px] w-full bg-gray-900 text-white">
      <div className="text-center">
        <div className="text-lg font-semibold mb-4">加载中...</div>
      </div>
    </div>
  );
}

// Error boundary component
function ErrorFallback() {
  return (
    <div className="flex items-center justify-center h-screen min-h-[400px] w-full bg-gray-900 text-white">
      <div className="text-center">
        <div className="text-lg font-semibold mb-4">加载组件时出错</div>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          重试
        </button>
      </div>
    </div>
  );
}

// Simple error boundary class component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// SafeComponent to only render in browser
function SafeComponent({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Set popup dimensions for Chrome extension
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
      // Running as a Chrome extension
      document.body.style.width = '600px';
      document.body.style.height = '600px';
      document.body.style.minWidth = '600px';
      document.body.style.minHeight = '600px';
      document.documentElement.style.width = '600px';
      document.documentElement.style.height = '600px';
      document.documentElement.style.minWidth = '600px';
      document.documentElement.style.minHeight = '600px';
    }
  }, []);
  
  if (!isMounted) {
    return <LoadingComponent />;
  }
  
  return (
    <div className="w-full h-full min-h-[600px] min-w-[600px]">
      {children}
    </div>
  );
}

export default function BossRecruitmentWrapper() {
  // Using the BossRecruitment component directly instead of dynamically importing it
  return (
    <SafeComponent>
      <ErrorBoundary>
        <Suspense fallback={<LoadingComponent />}>
          <BossRecruitment />
        </Suspense>
      </ErrorBoundary>
    </SafeComponent>
  );
} 