'use client';

import React, { useState, useEffect } from 'react';
import { BossFormProvider, useBossForm } from './BossFormContext';

// Create a inner component to use the context
function BossRecruitmentInner() {
  const { formData, updateFormField, addJobForm, deleteJobForm } = useBossForm();
  const [currentJob, setCurrentJob] = useState(null);
  const [selectedCode, setSelectedCode] = useState('');
  const [codePreview, setCodePreview] = useState('');
  
  // Get the first job code as default when component mounts
  useEffect(() => {
    const jobCodes = Object.keys(formData);
    if (jobCodes.length > 0 && !currentJob) {
      setCurrentJob(jobCodes[0]);
    }
  }, [formData, currentJob]);

  // Handle job selection change
  const handleJobChange = (e) => {
    setCurrentJob(e.target.value);
  };

  // Handle adding a new job template
  const handleAddJob = () => {
    const newJobCode = Math.floor(Math.random() * 900000) + 100000;
    addJobForm(newJobCode, {
      name: '新职位模板',
      _geekWorkYear: 3,
      _geekDegree: ['本科'],
      _lowSalary: 10000,
      _highSalary: 50000,
      _expectLocationName: ['北京'],
      _greeting: `你好呀____！很高兴认识你。\n请填写您的招聘信息。`,
      keywords: [],
      _ageDesc: '25-35',
    });
    setCurrentJob(newJobCode.toString());
  };

  // Handle job deletion
  const handleDeleteJob = () => {
    if (!currentJob) return;
    
    deleteJobForm(currentJob);
    
    // Select another job if available
    const remainingJobs = Object.keys(formData).filter(code => code !== currentJob);
    if (remainingJobs.length > 0) {
      setCurrentJob(remainingJobs[0]);
    } else {
      setCurrentJob(null);
    }
  };

  // Handle field changes
  const handleFieldChange = (field, value) => {
    if (!currentJob) return;
    updateFormField(currentJob, field, value);
  };

  // Handle adding a new keyword
  const handleAddKeyword = () => {
    if (!currentJob) return;
    const currentKeywords = formData[currentJob].keywords || [];
    updateFormField(currentJob, 'keywords', [...currentKeywords, '']);
  };

  // Handle keyword change
  const handleKeywordChange = (index, value) => {
    if (!currentJob) return;
    const currentKeywords = [...(formData[currentJob].keywords || [])];
    currentKeywords[index] = value;
    updateFormField(currentJob, 'keywords', currentKeywords);
  };

  // Handle removing a keyword
  const handleRemoveKeyword = (index) => {
    if (!currentJob) return;
    const currentKeywords = [...(formData[currentJob].keywords || [])];
    currentKeywords.splice(index, 1);
    updateFormField(currentJob, 'keywords', currentKeywords);
  };

  // Handle adding a new location
  const handleAddLocation = () => {
    if (!currentJob) return;
    const currentLocations = formData[currentJob]._expectLocationName || [];
    updateFormField(currentJob, '_expectLocationName', [...currentLocations, '']);
  };

  // Handle location change
  const handleLocationChange = (index, value) => {
    if (!currentJob) return;
    const currentLocations = [...(formData[currentJob]._expectLocationName || [])];
    currentLocations[index] = value;
    updateFormField(currentJob, '_expectLocationName', currentLocations);
  };

  // Handle removing a location
  const handleRemoveLocation = (index) => {
    if (!currentJob) return;
    const currentLocations = [...(formData[currentJob]._expectLocationName || [])];
    currentLocations.splice(index, 1);
    updateFormField(currentJob, '_expectLocationName', currentLocations);
  };

  // Handle degree change
  const handleDegreeChange = (index, checked) => {
    if (!currentJob) return;
    const degrees = ['高中', '大专', '本科', '硕士', '博士'];
    const currentDegrees = [...(formData[currentJob]._geekDegree || [])];
    
    if (checked) {
      // Add degree if not already included
      if (!currentDegrees.includes(degrees[index])) {
        currentDegrees.push(degrees[index]);
      }
    } else {
      // Remove degree if included
      const degreeIndex = currentDegrees.indexOf(degrees[index]);
      if (degreeIndex !== -1) {
        currentDegrees.splice(degreeIndex, 1);
      }
    }
    
    updateFormField(currentJob, '_geekDegree', currentDegrees);
  };

  // Handle exporting config as JSON
  const handleExportConfig = () => {
    try {
      const configStr = JSON.stringify(formData, null, 2);
      const blob = new Blob([configStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recruitment_config.json';
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
    } catch (error) {
      console.error('Failed to export config:', error);
    }
  };

  // Generate code for using the selected template
  const handlePreviewCode = () => {
    if (!currentJob) return;
    
    const job = formData[currentJob];
    const code = `// 职位模板 - ${job.name}
const template = {
  name: '${job.name}',
  _geekWorkYear: ${job._geekWorkYear},
  _geekDegree: ${JSON.stringify(job._geekDegree)},
  _lowSalary: ${job._lowSalary},
  _highSalary: ${job._highSalary},
  _expectLocationName: ${JSON.stringify(job._expectLocationName)},
  _greeting: \`${job._greeting}\`,
  keywords: ${JSON.stringify(job.keywords)},
  _ageDesc: '${job._ageDesc}',
};
`;
    setCodePreview(code);
    setSelectedCode(code);
  };

  // Handle importing configuration
  const handleImportConfig = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedConfig = JSON.parse(event.target.result);
        
        // Validate imported config
        if (typeof importedConfig !== 'object') {
          throw new Error('Invalid config format');
        }
        
        // Replace current formData with imported config
        Object.keys(importedConfig).forEach(jobCode => {
          addJobForm(jobCode, importedConfig[jobCode]);
        });
        
        // Select the first job from imported config
        const firstJobCode = Object.keys(importedConfig)[0];
        if (firstJobCode) {
          setCurrentJob(firstJobCode);
        }
        
        // Reset the file input
        e.target.value = '';
      } catch (error) {
        console.error('Failed to import config:', error);
        alert('导入配置失败: ' + error.message);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4 text-white text-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">招聘模板配置</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handleExportConfig}
            className="px-2 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded hover:from-blue-700 hover:to-indigo-700 text-xs"
          >
            导出
          </button>
          <label className="px-2 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded hover:from-purple-700 hover:to-indigo-700 text-xs cursor-pointer">
            导入
            <input 
              type="file" 
              accept=".json" 
              onChange={handleImportConfig} 
              className="hidden" 
            />
          </label>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <select 
          value={currentJob || ''}
          onChange={handleJobChange}
          className="bg-gradient-to-r from-indigo-800/70 to-purple-800/70 border border-indigo-600 rounded px-3 py-2 w-full"
        >
          {Object.keys(formData).map(jobCode => (
            <option key={jobCode} value={jobCode}>
              {formData[jobCode].name} ({jobCode})
            </option>
          ))}
        </select>
        <div className="flex space-x-2">
          <button 
            onClick={handleAddJob}
            className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded hover:from-blue-700 hover:to-indigo-700 flex-1"
          >
            添加模板
          </button>
          <button 
            onClick={handleDeleteJob}
            className="px-3 py-2 bg-gradient-to-r from-purple-600 to-red-600 rounded hover:from-purple-700 hover:to-red-700 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!currentJob}
          >
            删除模板
          </button>
        </div>
      </div>
      
      {currentJob && (
        <div className="space-y-3 bg-gradient-to-br from-indigo-800/50 to-purple-800/50 backdrop-blur-sm rounded-lg p-3 border border-indigo-700/50">
          <div>
            <label className="block text-xs font-medium mb-1 text-blue-300">职位名称</label>
            <input 
              type="text"
              value={formData[currentJob].name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full bg-indigo-900/70 border border-indigo-700 rounded px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-blue-300">最低工作年限</label>
              <input 
                type="number"
                min="0"
                value={formData[currentJob]._geekWorkYear || 0}
                onChange={(e) => handleFieldChange('_geekWorkYear', parseInt(e.target.value))}
                className="w-full bg-indigo-900/70 border border-indigo-700 rounded px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1 text-blue-300">年龄范围</label>
              <input 
                type="text"
                value={formData[currentJob]._ageDesc || ''}
                onChange={(e) => handleFieldChange('_ageDesc', e.target.value)}
                className="w-full bg-indigo-900/70 border border-indigo-700 rounded px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                placeholder="例如: 25-35"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-blue-300">最低薪资</label>
              <input 
                type="number"
                min="0"
                value={formData[currentJob]._lowSalary || 0}
                onChange={(e) => handleFieldChange('_lowSalary', parseInt(e.target.value))}
                className="w-full bg-indigo-900/70 border border-indigo-700 rounded px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1 text-blue-300">最高薪资</label>
              <input 
                type="number"
                min="0"
                value={formData[currentJob]._highSalary || 0}
                onChange={(e) => handleFieldChange('_highSalary', parseInt(e.target.value))}
                className="w-full bg-indigo-900/70 border border-indigo-700 rounded px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1 text-blue-300">学历要求</label>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {['高中', '大专', '本科', '硕士', '博士'].map((degree, index) => (
                <label key={degree} className="flex items-center space-x-1">
                  <input 
                    type="checkbox"
                    checked={(formData[currentJob]._geekDegree || []).includes(degree)}
                    onChange={(e) => handleDegreeChange(index, e.target.checked)}
                    className="rounded bg-indigo-900/70 border-indigo-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-xs">{degree}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-blue-300">期望地点</label>
              <button 
                onClick={handleAddLocation}
                className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded hover:from-blue-700 hover:to-indigo-700"
              >
                添加
              </button>
            </div>
            <div className="space-y-2">
              {(formData[currentJob]._expectLocationName || []).map((location, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="text"
                    value={location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    className="flex-1 bg-indigo-900/70 border border-indigo-700 rounded px-3 py-1 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                  <button 
                    onClick={() => handleRemoveLocation(index)}
                    className="px-2 py-1 bg-gradient-to-r from-purple-600 to-red-600 rounded hover:from-purple-700 hover:to-red-700"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1 text-blue-300">招呼语</label>
            <textarea 
              value={formData[currentJob]._greeting || ''}
              onChange={(e) => handleFieldChange('_greeting', e.target.value)}
              className="w-full bg-indigo-900/70 border border-indigo-700 rounded px-3 py-2 min-h-[80px] text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              placeholder="打招呼用的模板文字..."
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-blue-300">关键词</label>
              <button 
                onClick={handleAddKeyword}
                className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded hover:from-blue-700 hover:to-indigo-700"
              >
                添加
              </button>
            </div>
            <div className="space-y-2">
              {(formData[currentJob].keywords || []).map((keyword, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="text"
                    value={keyword}
                    onChange={(e) => handleKeywordChange(index, e.target.value)}
                    className="flex-1 bg-indigo-900/70 border border-indigo-700 rounded px-3 py-1 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                  <button 
                    onClick={() => handleRemoveKeyword(index)}
                    className="px-2 py-1 bg-gradient-to-r from-purple-600 to-red-600 rounded hover:from-purple-700 hover:to-red-700"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t border-indigo-700/50">
            <button 
              onClick={handlePreviewCode}
              className="w-full px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded hover:from-indigo-700 hover:to-purple-700"
            >
              生成代码预览
            </button>
          </div>
          
          {codePreview && (
            <div className="mt-3">
              <label className="block text-xs font-medium mb-1 text-blue-300">代码预览</label>
              <div className="relative">
                <pre className="bg-indigo-950 rounded p-2 overflow-x-auto text-xs border border-indigo-800">
                  {codePreview}
                </pre>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedCode).catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                  }}
                  className="absolute top-1 right-1 px-2 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded hover:from-blue-700 hover:to-indigo-700 text-xs"
                >
                  复制
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BossRecruitment() {
  return (
    <BossFormProvider>
      <BossRecruitmentInner />
    </BossFormProvider>
  );
} 