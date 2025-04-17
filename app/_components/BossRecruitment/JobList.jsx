'use client';

import { useState } from 'react';
import { useBossForm } from './BossFormContext';

export default function JobList({ jobs = [], currentJob, onSelectJob }) {
  const { formData } = useBossForm();
  const [expandedJobId, setExpandedJobId] = useState(null);

  const handleSelectJob = (job) => {
    if (job && onSelectJob) {
      onSelectJob(job);
      setExpandedJobId(job.encryptId);
    }
  };

  const toggleExpand = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-gray-400 p-4 text-center border border-gray-700 rounded">
        暂无招聘职位数据，请点击"获取招聘列表"按钮
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-96">
      <ul className="space-y-2">
        {jobs.map((job, index) => {
          if (!job || !job.encryptId) return null;
          
          const isExpanded = expandedJobId === job.encryptId;
          const isSelected = currentJob?.encryptId === job.encryptId;
          const formConfig = job.positionCode ? formData[job.positionCode] : null;
          
          return (
            <li 
              key={job.encryptId || `job-${index}`}
              className={`border p-3 rounded-lg transition-all ${isSelected ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-gray-500'}`}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(job.encryptId)}>
                <div>
                  <h3 className="font-medium">{job.jobName || '未命名职位'}</h3>
                  <div className="text-sm text-gray-400 mt-1">
                    <span>{job.positionName || '--'}</span>
                    <span className="mx-2">|</span>
                    <span>{job.locationName || '--'}</span>
                    <span className="mx-2">|</span>
                    <span>{job.salaryDesc || '--'}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 rounded text-sm ${isSelected ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectJob(job);
                    }}
                  >
                    {isSelected ? '已选择' : '选择'}
                  </button>
                  <button className="p-1" type="button">
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
                      <p className="text-gray-400">职位ID</p>
                      <p>{job.encryptId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">职位代码</p>
                      <p>{job.positionCode || '--'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">发布时间</p>
                      <p>{job.createTime || '--'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">状态</p>
                      <p>{job.status === 1 ? '在线' : '下线'}</p>
                    </div>
                  </div>
                  
                  {formConfig && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <h4 className="font-medium mb-2">筛选条件设置</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-gray-400">最低工作年限</p>
                          <p>{formConfig._geekWorkYear || 0}年</p>
                        </div>
                        <div>
                          <p className="text-gray-400">学历要求</p>
                          <p>{Array.isArray(formConfig._geekDegree) ? formConfig._geekDegree.join('、') : '--'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">最高接受薪资</p>
                          <p>{formConfig._highSalary || '--'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">年龄要求</p>
                          <p>{formConfig._ageDesc || '--'}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-400">关键词</p>
                          <p>{Array.isArray(formConfig.keywords) ? formConfig.keywords.join('、') : '--'}</p>
                        </div>
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