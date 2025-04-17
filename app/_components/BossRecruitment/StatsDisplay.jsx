'use client';

import { useState } from 'react';

export default function StatsDisplay({ stats = {}, currentJob }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [expandedId, setExpandedId] = useState(null);

  if (!currentJob || !stats || Object.keys(stats).length === 0) {
    return (
      <div className="text-gray-400 p-4 text-center">
        请先选择职位以查看统计数据
      </div>
    );
  }

  const currentStats = stats[currentJob.positionCode] || null;
  
  if (!currentStats) {
    return (
      <div className="text-gray-400 p-4 text-center">
        当前职位暂无统计数据
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Safety fallbacks for stats values
  const safeStats = {
    recommand: currentStats.recommand || 0,
    pick: currentStats.pick || 0,
    chat: currentStats.chat || 0,
    isFriend: currentStats.isFriend || 0,
    chatList: Array.isArray(currentStats.chatList) ? currentStats.chatList : [],
    ngList: Array.isArray(currentStats.ngList) ? currentStats.ngList : [],
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">统计数据</h2>
      
      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'summary' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('summary')}
          type="button"
        >
          概览
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'contacted' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('contacted')}
          type="button"
        >
          已沟通 ({safeStats.chatList.length})
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'rejected' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('rejected')}
          type="button"
        >
          不符合 ({safeStats.ngList.length})
        </button>
      </div>
      
      {activeTab === 'summary' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="推荐人数" value={safeStats.recommand} />
          <StatCard title="符合条件" value={safeStats.pick} />
          <StatCard title="已沟通" value={safeStats.chat} />
          <StatCard title="已是好友" value={safeStats.isFriend} />
          <StatCard 
            title="通过率" 
            value={`${safeStats.recommand ? Math.round((safeStats.pick / safeStats.recommand) * 100) : 0}%`} 
            description={`${safeStats.pick}/${safeStats.recommand}`} 
          />
          <StatCard 
            title="沟通率" 
            value={`${safeStats.pick ? Math.round((safeStats.chat / safeStats.pick) * 100) : 0}%`} 
            description={`${safeStats.chat}/${safeStats.pick}`} 
          />
        </div>
      )}
      
      {activeTab === 'contacted' && (
        <div className="overflow-y-auto max-h-96">
          {safeStats.chatList.length === 0 ? (
            <div className="text-gray-400 p-4 text-center border border-gray-700 rounded">
              暂无沟通记录
            </div>
          ) : (
            <ul className="space-y-2">
              {safeStats.chatList.map((record, index) => {
                if (!record) return null;
                return (
                  <li 
                    key={`chat-item-${index}`}
                    className="border border-gray-700 p-3 rounded-lg hover:border-gray-500"
                  >
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(`chat-${index}`)}>
                      <div>
                        <h3 className="font-medium">{record.geekName || '未知姓名'}</h3>
                        <div className="text-sm text-gray-400 mt-1">
                          <span>{record.geekWorkYear || '--'}</span>
                          <span className="mx-1">·</span>
                          <span>{record.geekDegree || '--'}</span>
                          <span className="mx-1">·</span>
                          <span>{record.ageDesc || '--'}</span>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs">
                          {record.stateDesc || '已打招呼'}
                        </span>
                      </div>
                    </div>
                    
                    {expandedId === `chat-${index}` && (
                      <div className="mt-3 pt-3 border-t border-gray-700 text-sm">
                        <p className="text-gray-400">打招呼内容</p>
                        <p className="mt-1 text-sm whitespace-pre-line">{record.greeting || '无内容'}</p>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-gray-400">薪资要求</p>
                            <p>{record.salary || '--'}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">匹配关键词</p>
                            <p>{record.keywords || '未记录'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-400">教育背景</p>
                            <p>{record.geekEdus || '--'}</p>
                          </div>
                        </div>
                        
                        {record.geekUrl && (
                          <div className="mt-3">
                            <a 
                              href={record.geekUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              查看完整简历
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
      
      {activeTab === 'rejected' && (
        <div className="overflow-y-auto max-h-96">
          {safeStats.ngList.length === 0 ? (
            <div className="text-gray-400 p-4 text-center border border-gray-700 rounded">
              暂无不符合条件的候选人
            </div>
          ) : (
            <ul className="space-y-2">
              {safeStats.ngList.map((record, index) => {
                if (!record) return null;
                return (
                  <li 
                    key={`ng-item-${index}`}
                    className="border border-gray-700 p-3 rounded-lg hover:border-gray-500"
                  >
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(`ng-${index}`)}>
                      <div>
                        <h3 className="font-medium">{record.geekName || '未知姓名'}</h3>
                        <div className="text-sm text-gray-400 mt-1">
                          <span>{record.geekWorkYear || '--'}</span>
                          <span className="mx-1">·</span>
                          <span>{record.geekDegree || '--'}</span>
                          <span className="mx-1">·</span>
                          <span>{record.ageDesc || '--'}</span>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">
                          不符合条件
                        </span>
                      </div>
                    </div>
                    
                    {expandedId === `ng-${index}` && (
                      <div className="mt-3 pt-3 border-t border-gray-700 text-sm">
                        <div className="p-2 bg-red-900/20 text-red-400 rounded">
                          {record.feedback || '未知原因'}
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-gray-400">薪资要求</p>
                            <p>{record.salary || '--'}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">期望地点</p>
                            <p>{record.expectLocationName || '--'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-400">教育背景</p>
                            <p>{record.geekEdus || '--'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-400">个人描述</p>
                            <p className="whitespace-pre-line">{record.content || '无个人描述'}</p>
                          </div>
                        </div>
                        
                        {record.geekUrl && (
                          <div className="mt-3">
                            <a 
                              href={record.geekUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              查看完整简历
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, description }) {
  return (
    <div className="bg-gray-700/30 p-4 rounded-lg">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {description && <p className="text-gray-400 text-xs mt-1">{description}</p>}
    </div>
  );
} 