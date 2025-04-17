'use client';

import { useState } from 'react';

export default function CandidateList({ candidates, onContactCandidate }) {
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);

  const toggleExpand = (candidateId) => {
    setExpandedCandidateId(expandedCandidateId === candidateId ? null : candidateId);
  };

  if (!candidates || candidates.length === 0) {
    return (
      <div className="text-gray-400 p-4 text-center border border-gray-700 rounded">
        暂无候选人数据，请先选择职位并点击"获取候选人"按钮
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-96">
      <ul className="space-y-2">
        {candidates.map((candidate, index) => {
          if (!candidate || !candidate.geekCard) return null;
          
          const { geekCard, encryptGeekId, isFriend } = candidate;
          const { geekName, geekWorkYear, geekDegree, expectPositionName, expectLocationName, salary, ageDesc, lid } = geekCard;
          const isExpanded = expandedCandidateId === encryptGeekId;
          
          return (
            <li 
              key={encryptGeekId || `candidate-${index}`}
              className={`border p-3 rounded-lg ${isFriend ? 'border-green-700 bg-green-900/20' : 'border-gray-700 hover:border-gray-500'}`}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(encryptGeekId)}>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{geekName || '未知姓名'}</h3>
                    {isFriend && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-green-800 text-green-200 rounded-full">
                        已沟通
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    <span>{geekWorkYear || '--'}</span>
                    <span className="mx-1">·</span>
                    <span>{geekDegree || '--'}</span>
                    <span className="mx-1">·</span>
                    <span>{ageDesc || '--'}</span>
                    <span className="mx-1">·</span>
                    <span>{expectPositionName || '--'}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!isFriend && (
                    <button 
                      className="px-3 py-1 rounded text-sm bg-blue-600 hover:bg-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContactCandidate(candidate);
                      }}
                    >
                      打招呼
                    </button>
                  )}
                  <button className="p-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-700 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-400">期望职位</p>
                      <p>{expectPositionName || '--'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">期望城市</p>
                      <p>{expectLocationName || '--'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">期望薪资</p>
                      <p>{salary || '--'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">年龄</p>
                      <p>{ageDesc || '--'}</p>
                    </div>
                  </div>
                  
                  {candidate.geekCard.geekDesc && (
                    <div className="mt-3">
                      <p className="text-gray-400">个人描述</p>
                      <p className="mt-1 text-sm whitespace-pre-line">
                        {candidate.geekCard.geekDesc.content || '无个人描述'}
                      </p>
                    </div>
                  )}
                  
                  {Array.isArray(candidate.geekCard.geekEdus) && candidate.geekCard.geekEdus.length > 0 && (
                    <div className="mt-3">
                      <p className="text-gray-400">教育经历</p>
                      <div className="mt-1">
                        {candidate.geekCard.geekEdus.map((edu, index) => (
                          <div key={index} className="mb-1">
                            <p>{edu?.school || '--'} {edu?.major ? '· ' + edu.major : ''}</p>
                            <p className="text-gray-400 text-xs">
                              {edu?.degreeName || '--'} {edu?.timeDesc || ''}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {Array.isArray(candidate.geekWorks) && candidate.geekWorks.length > 0 && (
                    <div className="mt-3">
                      <p className="text-gray-400">工作经历</p>
                      <div className="mt-1">
                        {candidate.geekWorks.map((work, index) => (
                          <div key={index} className="mb-2">
                            <p>{work?.company || '--'} {work?.positionName ? '· ' + work.positionName : ''}</p>
                            <p className="text-gray-400 text-xs">{work?.timeDesc || ''}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
} 