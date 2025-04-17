'use client';

import React, { createContext, useContext, useState } from 'react';

// Create the context with default values
const BossFormContext = createContext({
  formData: {},
  updateFormField: () => {},
  addJobForm: () => {},
  deleteJobForm: () => {},
});

export function BossFormProvider({ children }) {
  const [formData, setFormData] = useState({
    // Form definitions matching the original utils.form structure
    100901: {
      name: '前端开发工程师',
      _geekWorkYear: 3,
      _geekDegree: ['本科', '硕士'],
      _lowSalary: 10000,
      _highSalary: 100000,
      _expectLocationName: ['北京', '杭州'],
      _greeting: `你好呀____！关注到你有电商系统的开发经验，YCloud正在寻找能攻坚核心交易场景的技术伙伴。在这里你将：
        主导复杂电商交易系统的前端架构设计
        攻克极端性能优化挑战（如千人千面SKU渲染、弱网环境加载加速）
        负责多端适配方案（覆盖iOS/Android/Web，确保全球用户体验一致性）
        公司业务覆盖200+国家，提供晚餐等福利且不打卡。
        欢迎投递简历，期待与你共同解决跨境电商的技术挑战！
      `,
      keywords: ['电商'],
      _ageDesc: '25-30',
    },
    110101: {
      name: '产品经理',
      _geekWorkYear: 8,
      _geekDegree: ['本科', '硕士'],
      _lowSalary: 10000,
      _highSalary: 100000,
      _expectLocationName: ['北京', '杭州'],
      _greeting: `你好呀____！关注到你有丰富的电商行业经验，我们非常期待与你聊聊。
        YCloud作为全球智能云通讯服务商，正在用AI技术赋能电商场景。
        这里有大厂级的复杂项目（比如跨境电商、AI中台、跨境SASS服务）
        但没有大厂的繁琐流程。弹性不打卡+晚餐等福利。
        欢迎投递简历，期待与你共同解决电商的技术挑战！
      `,
      keywords: ['电商'],
      _ageDesc: '25-35',
    },
    140608: {
      name: '市场投放',
      _geekWorkYear: 3,
      _geekDegree: ['本科', '硕士'],
      _lowSalary: 10000,
      _highSalary: 100000,
      _expectLocationName: ['北京', '杭州'],
      _greeting: `你好呀____！注意到你有对__business__业务的独到见解，YCloud正在搭建全球化的智能营销网络。
        这个岗位将直接负责欧美/东南亚市场的增长策略，用我们的AI通讯工具玩转跨文化用户触达。
        团队英语为工作语言，上下班不打卡，晚餐等超多福利。
        欢迎投递简历，期待与你共同解决电商的技术挑战！
      `,
      keywords: ['海外投放', 'whatsapp', 'facebook', 'tiktok', 'kol', 'google', 'linkedin', 'instagram', 'twitter', 'youtube', 'pinterest', 'snapchat', 'youtube'],
      _ageDesc: '25-35',
    },
  });

  const updateFormField = (positionCode, field, value) => {
    setFormData(prev => ({
      ...prev,
      [positionCode]: {
        ...prev[positionCode],
        [field]: value
      }
    }));
  };

  const addJobForm = (positionCode, formData) => {
    setFormData(prev => ({
      ...prev,
      [positionCode]: {
        ...formData
      }
    }));
  };

  const deleteJobForm = (positionCode) => {
    setFormData(prev => {
      const newFormData = { ...prev };
      delete newFormData[positionCode];
      return newFormData;
    });
  };

  const contextValue = {
    formData, 
    updateFormField,
    addJobForm,
    deleteJobForm
  };

  return (
    <BossFormContext.Provider value={contextValue}>
      {children}
    </BossFormContext.Provider>
  );
}

export function useBossForm() {
  const context = useContext(BossFormContext);
  if (!context) {
    throw new Error('useBossForm must be used within a BossFormProvider');
  }
  return context;
} 