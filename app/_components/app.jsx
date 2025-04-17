'use client';

import React, { Suspense, Component, useEffect, useState } from 'react';
// Import directly instead of using dynamic import to avoid chunk loading issues
import BossRecruitment from './BossRecruitment';

// Loading component
function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-screen min-h-[400px] w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="text-center">
        <div className="text-lg font-semibold mb-4">加载中...</div>
      </div>
    </div>
  );
}

// Error boundary component
function ErrorFallback() {
  return (
    <div className="flex items-center justify-center h-screen min-h-[400px] w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="text-center">
        <div className="text-lg font-semibold mb-4">加载组件时出错</div>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
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
  }, []);
  
  if (!isMounted) {
    return <LoadingComponent />;
  }
  
  return (
    <div className="w-full h-full min-h-[812px] min-w-[375px]">
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