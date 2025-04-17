'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BossFormProvider, useBossForm } from './BossFormContext';
import JobList from './JobList';
import CandidateList from './CandidateList';
import StatsDisplay from './StatsDisplay';
// Import both named and default exports to ensure compatibility
import useUtils from './hooks/useUtils';
import LoginPrompt from './LoginPrompt';

// Create a inner component to use the context
function BossRecruitmentInner() {
  const { formData } = useBossForm();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loopParams, setLoopParams] = useState({
    breakLoop: false,
    breakChat: false,
  });
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null means "checking"

  // Make sure we're using the correct utils instance
  const utils = useUtils(setStats, formData);

  // Check if we're in browser environment
  const isBrowser = typeof window !== 'undefined';
  const isChromeExtension = isBrowser && typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

  // Check login status
  const checkLoginStatus = useCallback(async () => {
    if (!isChromeExtension) {
      // If not running as a Chrome extension, assume logged in for development
      setIsLoggedIn(true);
      return;
    }

    try {
      // Check if we have login status in storage
      chrome.storage.local.get('bossLoginStatus', (result) => {
        if (chrome.runtime.lastError) {
          console.error('Error getting login status:', chrome.runtime.lastError);
          setIsLoggedIn(false);
          return;
        }

        const status = result.bossLoginStatus;
        if (status && status.isLoggedIn) {
          // Check if login status is still valid (not older than 30 minutes)
          const maxAge = 30 * 60 * 1000; // 30 minutes in milliseconds
          const isStale = Date.now() - status.timestamp > maxAge;
          
          setIsLoggedIn(!isStale && status.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      });
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
    }
  }, [isChromeExtension]);

  useEffect(() => {
    checkLoginStatus();
    
    // Set up listener for login status changes
    if (isChromeExtension) {
      const listener = (changes, area) => {
        if (area === 'local' && changes.bossLoginStatus) {
          const newStatus = changes.bossLoginStatus.newValue;
          if (newStatus) {
            setIsLoggedIn(newStatus.isLoggedIn);
          }
        }
      };
      
      chrome.storage.onChanged.addListener(listener);
      return () => chrome.storage.onChanged.removeListener(listener);
    }
  }, [checkLoginStatus, isChromeExtension]);

  useEffect(() => {
    if (!isBrowser || !isLoggedIn) return;
    
    // Initialize zpToken when component mounts and user is logged in
    const initializeToken = async () => {
      try {
        const token = await utils.getZpToken();
        if (token) {
          utils.params.zp_token = token;
        }
      } catch (error) {
        console.error('Failed to initialize token:', error);
        setError('获取令牌失败: ' + error.message);
      }
    };
    
    initializeToken();
  }, [utils, isBrowser, isLoggedIn]);

  const handleOpenBoss = () => {
    if (isChromeExtension) {
      // For Chrome extension, find and navigate to BOSS tab or open a new one
      chrome.tabs.query({url: '*://www.zhipin.com/*'}, (tabs) => {
        if (tabs && tabs.length > 0) {
          // Found an existing BOSS tab, activate it
          chrome.tabs.update(tabs[0].id, {active: true});
        } else {
          // No BOSS tab found, open a new one
          chrome.tabs.create({url: 'https://www.zhipin.com/'});
        }
      });
    } else {
      // Fallback for non-extension environment
      window.open('https://www.zhipin.com/', '_blank');
    }
  };

  const handleQueryJobs = async () => {
    if (!isBrowser || !isLoggedIn) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const jobList = await utils.recJobList();
      setJobs(Array.isArray(jobList) ? jobList : []);
    } catch (error) {
      console.error('Failed to query jobs:', error);
      setError('获取职位列表失败: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectJob = (job) => {
    if (!job) return;
    
    setCurrentJob(job);
    
    // Initialize stats for the job
    const jobStats = {
      name: job.jobName || '未命名职位',
      positionCode: job.positionCode,
      locationName: job.locationName || '',
      salaryDesc: job.salaryDesc || '',
      page: 1,
      recommand: 0,
      pick: 0,
      chat: 0,
      search: 0,
      isFriend: 0,
      chatList: [],
      ngList: [],
    };
    
    setStats(prevStats => ({
      ...prevStats,
      [job.positionCode]: jobStats
    }));

    // Clear candidates when switching job
    setCandidates([]);
  };

  const handleFetchCandidates = async () => {
    if (!currentJob || !isBrowser || !isLoggedIn) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const currentStats = stats[currentJob.positionCode] || { page: 1 };
      const response = await utils.geekList({
        age: 16,
        page: currentStats.page,
        jobId: currentJob.encryptId,
        major: 0,
        school: 0,
        gender: 0,
        salary: 0,
        degree: 0,
        keyword1: '',
        cardType: 0,
        intention: 0,
        experience: 0,
        activation: 0,
        recentNotView: 0,
        coverScreenMemory: 0,
        switchJobFrequency: 0,
        exchangeResumeWithColleague: 0,
      });
      
      const { geekList, hasMore, page } = response || {};
      setCandidates(Array.isArray(geekList) ? geekList : []);
      
      // Update page in stats if there's more
      if (hasMore) {
        setStats(prevStats => ({
          ...prevStats,
          [currentJob.positionCode]: {
            ...(prevStats[currentJob.positionCode] || {}),
            page: page + 1
          }
        }));
      }
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
      setError('获取候选人列表失败: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactCandidate = async (candidate) => {
    if (!currentJob || !candidate || !isBrowser || !isLoggedIn) return;
    
    try {
      const { geekCard } = candidate;
      if (!geekCard) {
        setError('候选人数据不完整');
        return;
      }
      
      const positionCode = currentJob.positionCode;
      
      if (!utils.form[positionCode]) {
        setError('职位配置不存在');
        return;
      }
      
      // Check if candidate meets criteria
      if (!utils.validation(geekCard, stats[positionCode])) {
        console.warn('Candidate does not meet criteria:', geekCard);
        return;
      }
      
      // Start chat
      setIsLoading(true);
      setError(null);
      
      const chatResult = await utils.startChat({
        lid: geekCard.lid,
        gid: candidate.encryptGeekId,
        jid: currentJob.encryptId,
        from: '',
        greet: utils.formatGreeting(geekCard, utils.form[positionCode]._greeting),
        expectId: geekCard.expectId,
        securityId: geekCard.securityId,
        geekDesc: geekCard.geekDesc?.content,
        customGreetingGuide: '-1',
      });
      
      // Update stats
      if (chatResult) {
        setStats(prevStats => {
          const jobStats = prevStats[positionCode] || { chat: 0, chatList: [] };
          const updatedChatList = [
            ...jobStats.chatList,
            {
              ...utils.formatGeekCard(geekCard),
              greeting: chatResult.greeting,
              greetingTip: chatResult.greetingTip,
              stateDesc: chatResult.stateDesc,
              status: chatResult.status,
            }
          ];
          
          return {
            ...prevStats,
            [positionCode]: {
              ...jobStats,
              chat: jobStats.chat + 1,
              chatList: updatedChatList
            }
          };
        });
      }
    } catch (error) {
      console.error('Failed to contact candidate:', error);
      setError('联系候选人失败: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchProcess = async () => {
    if (!currentJob || !isBrowser || !isLoggedIn) return;
    
    setIsLoading(true);
    setLoopParams({ breakLoop: false, breakChat: false });
    setError(null);
    
    try {
      for (const candidate of candidates) {
        if (loopParams.breakLoop) break;
        
        if (!candidate) continue;
        
        // Update stats
        setStats(prevStats => {
          const jobStats = prevStats[currentJob.positionCode] || { recommand: 0 };
          return {
            ...prevStats,
            [currentJob.positionCode]: {
              ...jobStats,
              recommand: jobStats.recommand + 1
            }
          };
        });
        
        const { isFriend } = candidate;
        
        if (isFriend) {
          setStats(prevStats => {
            const jobStats = prevStats[currentJob.positionCode] || { isFriend: 0 };
            return {
              ...prevStats,
              [currentJob.positionCode]: {
                ...jobStats,
                isFriend: jobStats.isFriend + 1
              }
            };
          });
          continue;
        }
        
        await handleContactCandidate(candidate);
        await utils.sleep(5); // Reduced to 5 seconds to avoid timeouts
      }
      
      // Get next page of candidates if needed and not stopped
      if (candidates.length > 0 && !loopParams.breakLoop) {
        await handleFetchCandidates();
      }
    } catch (error) {
      console.error('Batch process error:', error);
      setError('批量处理错误: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopProcess = () => {
    setLoopParams({
      breakLoop: true,
      breakChat: true
    });
  };

  const handleDownloadStats = () => {
    if (!isBrowser) return;
    
    try {
      const statsData = JSON.stringify(stats, null, 2);
      const blob = new Blob([statsData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `boss_recruitment_stats_${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error('Download stats error:', error);
      setError('下载统计数据失败: ' + error.message);
    }
  };

  // If login status is still being checked, show loading
  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] w-full p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">正在检查登录状态...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return <LoginPrompt onOpenBoss={handleOpenBoss} />;
  }

  // Main UI when logged in
  return (
    <div className="flex flex-col h-full min-h-[600px] w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Boss直聘招聘助手</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg border border-red-800">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-3">职位管理</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleQueryJobs}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? '加载中...' : '获取招聘列表'}
            </button>
            <button 
              className="bg-green-600 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDownloadStats}
              disabled={isLoading || Object.keys(stats).length === 0}
              type="button"
            >
              下载统计数据
            </button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <JobList 
              jobs={jobs} 
              currentJob={currentJob}
              onSelectJob={handleSelectJob}
            />
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-3">候选人管理</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleFetchCandidates}
              disabled={isLoading || !currentJob}
              type="button"
            >
              {isLoading ? '加载中...' : '获取候选人'}
            </button>
            <button 
              className="bg-green-600 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBatchProcess}
              disabled={isLoading || !currentJob || candidates.length === 0}
              type="button"
            >
              批量处理
            </button>
            <button 
              className="bg-red-600 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleStopProcess}
              disabled={!isLoading}
              type="button"
            >
              停止处理
            </button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <CandidateList 
              candidates={candidates}
              onContactCandidate={handleContactCandidate}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <StatsDisplay stats={stats} currentJob={currentJob} />
      </div>
    </div>
  );
}

// Wrapper component that provides the BossFormContext
export default function BossRecruitment() {
  return (
    <BossFormProvider>
      <BossRecruitmentInner />
    </BossFormProvider>
  );
} 