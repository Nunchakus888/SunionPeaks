'use client';

import { useCallback } from 'react';

// Change to named export with explicit function declaration
export const useUtils = function useUtils(setStats, formData = {}) {
  // Helper functions that don't rely on utils object
  const randomId = (length) => {
    let result = '';
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.ceil(35 * Math.random()));
    }
    return result;
  };
  
  const getTraceId = () => {
    const generateId = () => {
      const timestamp = Date.now().toString(16);
      let random = "";
      for (let i = 0; i < 10; i++) {
        random += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(62 * Math.random())];
      }
      return `${timestamp.slice(-6)}${random}`;
    };
    return `F-${generateId()}`;
  };
  
  const generateTraceId = () => {
    return `${randomId(8)}-${randomId(4)}-${randomId(4)}-${randomId(4)}-${randomId(12)}`;
  };
  
  const getQueryString = (params) => {
    return Object.entries(params).map(([key, value]) => `${key}=${value || ''}`).join('&');
  };
  
  // Create previewGeekURL standalone function
  const previewGeekURL = (geekCard) => {
    const {
      expectId,
      isInnerAccount,
      isResume,
      isPreview,
      status,
      jobId,
      lid,
      securityId,
    } = geekCard;
    
    const params = {
      expectId,
      isInnerAccount,
      isResume,
      isPreview,
      status,
      jobId,
      lid,
      securityId,
    };
    
    return `https://m.zhipin.com/web/frame/recommend/resume?${getQueryString(params)}`;
  };

  // Create the utils object with properly structured methods
  const utils = {
    bashUrl: "https://www.zhipin.com/wapi",
    loggerItem: {},
    params: {
      zp_token: '',
    },
    
    // Import the standalone functions
    randomId,
    getTraceId,
    traceId: generateTraceId,
    getQueryString,
    previewGeekURL,
    
    // Form validation and formatting utils
    formatGreeting: (geekCard, greeting) => {
      const { geekName, keywords } = geekCard || {};
      if (!geekCard || !greeting) return greeting || '';
      
      if (keywords) {
        greeting = greeting.replace(/__business__/, keywords);
      }
      return greeting.replace(/____/, `${geekName || '候选人'}`);
    },
    
    formatGeekCard: (geekCard) => {
      if (!geekCard) return {};
      
      const { geekDesc, lid, jobId, securityId, geekEdus, geekName, geekWorkYear, salary, expectPositionCode, geekDegree, lowSalary, expectLocationName, applyStatusDesc, ageDesc } = geekCard;

      return {
        lid,
        jobId,
        securityId,
        geekName,
        geekWorkYear,
        salary,
        expectPositionCode,
        geekDegree,
        lowSalary,
        expectLocationName,
        applyStatusDesc,
        ageDesc,
        content: geekDesc?.content,
        geekUrl: previewGeekURL(geekCard),
        geekEdus: geekEdus?.map(i => `${i.school} ${i.major}`)?.join(';') || '',
      }
    },
    
    validation: (geekCard, stats) => {
      if (!geekCard) return false;
      
      const { geekWorkYear, expectPositionCode, geekDegree, lowSalary, ageDesc, geekDesc } = geekCard;
      if (!expectPositionCode || !formData) return false;

      const form = formData[expectPositionCode];
      const params = utils.formatGeekCard(geekCard);

      if (!form) {
        return false;
      }

      const { keywords } = form;
      const { content } = geekDesc || {};

      if (!content) return false;

      const kw = keywords.some(keyword => new RegExp(keyword, 'i').test(content))
      if (!kw) {
        if (stats && setStats) {
          setStats(prevStats => {
            const updatedStats = { ...prevStats };
            if (updatedStats[expectPositionCode]) {
              updatedStats[expectPositionCode] = {
                ...updatedStats[expectPositionCode],
                ngList: [
                  ...updatedStats[expectPositionCode].ngList,
                  { ...params, feedback: `关键词不符合: not in ${keywords}` }
                ]
              };
            }
            return updatedStats;
          });
        }
        return false;
      } else {
        // pick keywords and save keywords to current geekCard
        const matchedKeywords = keywords.filter(keyword => new RegExp(keyword, 'i').test(content)).join('、');
        geekCard.keywords = matchedKeywords;
      }

      // workYear
      if (!geekWorkYear) return false;
      
      const workYearMatch = geekWorkYear.match(/(\d*).*/);
      if (!workYearMatch) return false;
      
      const workYear = parseInt(workYearMatch[1]);
      if (workYear < form._geekWorkYear) {
        if (stats && setStats) {
          setStats(prevStats => {
            const updatedStats = { ...prevStats };
            if (updatedStats[expectPositionCode]) {
              updatedStats[expectPositionCode] = {
                ...updatedStats[expectPositionCode],
                ngList: [
                  ...updatedStats[expectPositionCode].ngList,
                  { ...params, feedback: `工作年限不符合: ${workYear} < ${form._geekWorkYear}` }
                ]
              };
            }
            return updatedStats;
          });
        }
        return false;
      }

      // degree
      if (!form._geekDegree.includes(geekDegree)) {
        if (stats && setStats) {
          setStats(prevStats => {
            const updatedStats = { ...prevStats };
            if (updatedStats[expectPositionCode]) {
              updatedStats[expectPositionCode] = {
                ...updatedStats[expectPositionCode],
                ngList: [
                  ...updatedStats[expectPositionCode].ngList,
                  { ...params, feedback: `学历不符合: ${geekDegree} not in ${form._geekDegree}` }
                ]
              };
            }
            return updatedStats;
          });
        }
        return false;
      }

      // salary
      if (form._highSalary) {
        if (lowSalary > form._highSalary) {
          if (stats && setStats) {
            setStats(prevStats => {
              const updatedStats = { ...prevStats };
              if (updatedStats[expectPositionCode]) {
                updatedStats[expectPositionCode] = {
                  ...updatedStats[expectPositionCode],
                  ngList: [
                    ...updatedStats[expectPositionCode].ngList,
                    { ...params, feedback: `薪资不符合: 最低预期${lowSalary} > ${form._highSalary}` }
                  ]
                };
              }
              return updatedStats;
            });
          }
          return false;
        }
      }

      // age
      if (form._ageDesc) {
        if (!ageDesc) return false;
        
        const ageMatch = ageDesc.match(/(\d*).*/);
        if (!ageMatch) return false;
        
        const [minAge, maxAge] = form._ageDesc.split('-').map(Number);
        const age = parseInt(ageMatch[1]);
        if (age < minAge || age > maxAge) {
          if (stats && setStats) {
            setStats(prevStats => {
              const updatedStats = { ...prevStats };
              if (updatedStats[expectPositionCode]) {
                updatedStats[expectPositionCode] = {
                  ...updatedStats[expectPositionCode],
                  ngList: [
                    ...updatedStats[expectPositionCode].ngList,
                    { ...params, feedback: `年龄不符合: ${age} not in ${form._ageDesc}` }
                  ]
                };
              }
              return updatedStats;
            });
          }
          return false;
        }
      }

      return true;
    },
    
    // API utilities
    fetchApi: async ({ url, method = 'GET', headers = {}, data, body }) => {
      try {
        if (typeof window === 'undefined') {
          return { code: -1, message: 'window is not defined' };
        }
        
        return window.fetch(`${utils.bashUrl + url}`, {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
            "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
            "priority": "u=1, i",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            ...utils.params,
            ...headers,
            traceid: getTraceId(),
          },
          body: body || (data ? JSON.stringify(data) : null),
          method,
          "referrer": typeof window !== 'undefined' ? window.location.href : '',
          "referrerPolicy": "strict-origin-when-cross-origin",
          "mode": "cors",
          "credentials": "include",
        })
          .then(res => res.json())
          .catch(err => {
            console.error('API Error:', err);
            return { code: -1, message: err.message };
          });
      } catch (err) {
        console.error('Fetch API error:', err);
        return { code: -1, message: err.message };
      }
    },
    
    // API call functions
    geekList: async (params) => {
      try {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/rec/geek/list?${getQueryString(params)}`,
        });

        if (code !== 0) {
          console.error('geekList', message);
          return {};
        }
        return zpData;
      } catch (error) {
        console.error('geekList error:', error);
        return {};
      }
    },
    
    getRefinedGeekList: async (params) => {
      try {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpitem/web/refinedGeek/list?${getQueryString(params)}`,
        });
        
        if (code !== 0) {
          console.error('getRefinedGeekList', message);
          return {};
        }
        return zpData;
      } catch (error) {
        console.error('getRefinedGeekList error:', error);
        return {};
      }
    },
    
    getGeekInfo: async (params) => {
      try {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/view/geek/info?${getQueryString(params)}`,
        });

        if (code !== 0) {
          console.error('getGeekInfo', message);
          return {};
        }
        return zpData;
      } catch (error) {
        console.error('getGeekInfo error:', error);
        return {};
      }
    },
    
    recJobList: async () => {
      try {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/job/recJobList`,
        });

        if (code !== 0) {
          console.error('recJobList', message);
          return [];
        }
        return zpData?.onlineJobList || [];
      } catch (error) {
        console.error('recJobList error:', error);
        return [];
      }
    },
    
    getRelatedInfo: async () => {
      try {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/rec/relatedInfo`,
        });

        if (code !== 0) {
          console.error('getRelatedInfo', message);
          return {};
        }
        return zpData?.relatedInfo?.geekCard4SearchBOS || {};
      } catch (error) {
        console.error('getRelatedInfo error:', error);
        return {};
      }
    },
    
    getZpToken: async () => {
      try {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zppassport/set/zpToken`,
          method: 'POST',
        });

        if (code !== 0) {
          console.error('getZpToken', message);
          return '';
        }
        
        // Safely extract the zp_token
        const cookieMatch = typeof document !== 'undefined' ? document.cookie.match(/bst=([^;]+)/) : null;
        const zp_token = cookieMatch ? cookieMatch[1] : '';
        return zp_token;
      } catch (error) {
        console.error('getZpToken error:', error);
        return '';
      }
    },
    
    startChat: async (params) => {
      try {
        const urlEncodedData = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            urlEncodedData.append(key, value);
          }
        });
        
        const { code, message, zpData } = await utils.fetchApi({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          url: `/zpjob/chat/start`,
          method: 'POST',
          body: urlEncodedData,
        });

        if (code !== 0) {
          console.error('startChat', message);
          return null;
        }
        return zpData;
      } catch (error) {
        console.error('startChat error:', error);
        return null;
      }
    },
    
    sleep: async (seconds) => {
      // sleep random 2000 - seconds * 1000
      return new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * seconds * 1000) + 2000));
    },
    
    get form() {
      return formData || {};
    }
  };
  
  return utils;
}

// Also add a default export to ensure compatibility with various import styles
export default useUtils; 