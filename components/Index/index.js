'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CustomSwitch } from '../ui/custom-switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function Index({ navigateToPage }) {
  const defaultConfig = {
    // API Configuration
    apiKey: '',
    bashUrl: 'https://www.zhipin.com/wapi',
    
    // Job Position Configuration
    positionCode: '100901',
    positions: {
      '100901': {
        name: '前端开发工程师',
        minWorkYear: 3,
        degrees: ['本科', '硕士'],
        minSalary: 10000,
        maxSalary: 100000,
        locations: ['北京', '杭州'],
        ageRange: '25-30',
        keywords: ['电商'],
        greeting: `你好呀{name}！关注到你有电商系统的开发经验，YCloud正在寻找能攻坚核心交易场景的技术伙伴。在这里你将：
主导复杂电商交易系统的前端架构设计
攻克极端性能优化挑战（如千人千面SKU渲染、弱网环境加载加速）
负责多端适配方案（覆盖iOS/Android/Web，确保全球用户体验一致性）
公司业务覆盖200+国家，提供晚餐等福利且不打卡。
欢迎投递简历，期待与你共同解决跨境电商的技术挑战！`
      },
      '110101': {
        name: '产品经理',
        minWorkYear: 8,
        degrees: ['本科', '硕士'],
        minSalary: 10000,
        maxSalary: 100000,
        locations: ['北京', '杭州'],
        ageRange: '25-35',
        keywords: ['电商'],
        greeting: `你好呀{name}！关注到你有丰富的电商行业经验，我们非常期待与你聊聊。
YCloud作为全球智能云通讯服务商，正在用AI技术赋能电商场景。
这里有大厂级的复杂项目（比如跨境电商、AI中台、跨境SASS服务）
但没有大厂的繁琐流程。弹性不打卡+晚餐等福利。
欢迎投递简历，期待与你共同解决电商的技术挑战！`
      }
    },
    
    // Auto Reply Settings
    autoReply: true,
    replyDelay: 5,
    
    // Candidate Filter Settings
    filterEnabled: true,
    filterSettings: {
      keywordMatch: true,
      minWorkYear: true,
      degreeCheck: true,
      salaryCheck: true,
      ageCheck: true,
    }
  };

  const [config, setConfig] = useState(defaultConfig);
  const [currentPosition, setCurrentPosition] = useState(defaultConfig.positions[defaultConfig.positionCode]);
  
  // 从本地存储加载配置（如果有）
  useEffect(() => {
    const savedConfig = localStorage.getItem('recruitmentConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        setCurrentPosition(parsedConfig.positions[parsedConfig.positionCode]);
      } catch (e) {
        console.error('Failed to parse saved configuration', e);
      }
    }
  }, []);
  
  const handleChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePositionSelect = (positionCode) => {
    setConfig(prev => ({
      ...prev,
      positionCode
    }));
    setCurrentPosition(config.positions[positionCode]);
  };

  const handlePositionChange = (field, value) => {
    setCurrentPosition(prev => ({
      ...prev,
      [field]: value
    }));
    
    setConfig(prev => ({
      ...prev,
      positions: {
        ...prev.positions,
        [config.positionCode]: {
          ...prev.positions[config.positionCode],
          [field]: value
        }
      }
    }));
  };

  const handleFilterSettingsChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      filterSettings: {
        ...prev.filterSettings,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving recruitment configuration:', config);
    localStorage.setItem('recruitmentConfig', JSON.stringify(config));
    alert('配置已保存成功！');
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-xl font-bold text-gray-800 mb-3">招聘助手配置</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">API配置</CardTitle>
              <CardDescription>
                配置Boss直聘API连接设置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API令牌</Label>
                <Input 
                  id="apiKey" 
                  type="password" 
                  value={config.apiKey} 
                  onChange={(e) => handleChange('apiKey', e.target.value)}
                  placeholder="请输入zp_token"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bashUrl">API基础URL</Label>
                <Input 
                  id="bashUrl" 
                  type="text" 
                  value={config.bashUrl} 
                  onChange={(e) => handleChange('bashUrl', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">职位设置</CardTitle>
              <CardDescription>
                配置招聘职位信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="positionCode">选择职位</Label>
                <select 
                  id="positionCode"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={config.positionCode} 
                  onChange={(e) => handlePositionSelect(e.target.value)}
                >
                  <option value="100901">前端开发工程师</option>
                  <option value="110101">产品经理</option>
                  <option value="140608">市场投放</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">职位名称</Label>
                <Input 
                  id="name" 
                  type="text" 
                  value={currentPosition.name} 
                  onChange={(e) => handlePositionChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minWorkYear">最低工作年限</Label>
                <Input 
                  id="minWorkYear" 
                  type="number" 
                  value={currentPosition.minWorkYear} 
                  onChange={(e) => handlePositionChange('minWorkYear', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ageRange">年龄范围</Label>
                <Input 
                  id="ageRange" 
                  type="text" 
                  value={currentPosition.ageRange} 
                  onChange={(e) => handlePositionChange('ageRange', e.target.value)}
                  placeholder="示例: 25-35"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">关键词（逗号分隔）</Label>
                <Input 
                  id="keywords" 
                  type="text" 
                  value={currentPosition.keywords.join(',')} 
                  onChange={(e) => handlePositionChange('keywords', e.target.value.split(','))}
                  placeholder="示例: 电商,React,Vue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="greeting">打招呼模板</Label>
                <textarea 
                  id="greeting"
                  className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={currentPosition.greeting} 
                  onChange={(e) => handlePositionChange('greeting', e.target.value)}
                  placeholder="使用{name}作为候选人姓名占位符"
                />
                <p className="text-xs text-gray-500">使用{"{name}"}作为候选人姓名占位符</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">自动回复设置</CardTitle>
              <CardDescription>
                配置自动回复行为
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoReply" className="cursor-pointer">启用自动回复</Label>
                <CustomSwitch 
                  id="autoReply" 
                  checked={config.autoReply} 
                  onCheckedChange={(checked) => handleChange('autoReply', checked)}
                />
              </div>
              
              {config.autoReply && (
                <div className="space-y-2">
                  <Label htmlFor="replyDelay">回复延迟（秒）</Label>
                  <select 
                    id="replyDelay"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={config.replyDelay} 
                    onChange={(e) => handleChange('replyDelay', parseInt(e.target.value))}
                  >
                    <option value="2">2 秒</option>
                    <option value="5">5 秒</option>
                    <option value="10">10 秒</option>
                    <option value="30">30 秒</option>
                  </select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">候选人筛选设置</CardTitle>
              <CardDescription>
                配置自动筛选候选人的条件
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="filterEnabled" className="cursor-pointer">启用自动筛选</Label>
                <CustomSwitch 
                  id="filterEnabled" 
                  checked={config.filterEnabled} 
                  onCheckedChange={(checked) => handleChange('filterEnabled', checked)}
                />
              </div>
              
              {config.filterEnabled && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="keywordMatch" className="cursor-pointer">关键词匹配检查</Label>
                    <CustomSwitch 
                      id="keywordMatch" 
                      checked={config.filterSettings.keywordMatch} 
                      onCheckedChange={(checked) => handleFilterSettingsChange('keywordMatch', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="minWorkYear" className="cursor-pointer">工作年限检查</Label>
                    <CustomSwitch 
                      id="minWorkYear" 
                      checked={config.filterSettings.minWorkYear} 
                      onCheckedChange={(checked) => handleFilterSettingsChange('minWorkYear', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="degreeCheck" className="cursor-pointer">学历检查</Label>
                    <CustomSwitch 
                      id="degreeCheck" 
                      checked={config.filterSettings.degreeCheck} 
                      onCheckedChange={(checked) => handleFilterSettingsChange('degreeCheck', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="salaryCheck" className="cursor-pointer">薪资检查</Label>
                    <CustomSwitch 
                      id="salaryCheck" 
                      checked={config.filterSettings.salaryCheck} 
                      onCheckedChange={(checked) => handleFilterSettingsChange('salaryCheck', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ageCheck" className="cursor-pointer">年龄检查</Label>
                    <CustomSwitch 
                      id="ageCheck" 
                      checked={config.filterSettings.ageCheck} 
                      onCheckedChange={(checked) => handleFilterSettingsChange('ageCheck', checked)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-auto pt-4">
          <Button type="submit" className="w-full">保存配置</Button>
        </div>
      </form>
    </div>
  );
}
