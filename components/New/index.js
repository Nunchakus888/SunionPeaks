'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CustomSwitch } from '../ui/custom-switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function New({ navigateToPage }) {
  const defaultSettings = {
    // Auto Execution Settings
    autoExecute: false,
    executionInterval: 30,
    maxExecutions: 10,
    
    // Logging Settings
    loggingEnabled: true,
    logLevel: 'info',
    saveLogsToFile: false,
    logFilePath: 'recruitment-logs.txt',
    
    // Resume on Fail
    resumeOnFail: true,
    maxRetries: 3,
    retryDelay: 5,
    
    // Smart Filtering
    smartFiltering: false,
    aiAssisted: false,
    blacklistedCompanies: '',
    preferredCompanies: '',
    candidateScoring: false,
    scoringThreshold: 70
  };

  const [settings, setSettings] = useState(defaultSettings);
  
  // 从本地存储加载设置（如果有）
  useEffect(() => {
    const savedSettings = localStorage.getItem('advancedRecruitmentSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
  }, []);
  
  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving advanced recruitment settings:', settings);
    localStorage.setItem('advancedRecruitmentSettings', JSON.stringify(settings));
    alert('高级设置已保存成功！');
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-xl font-bold text-gray-800 mb-3">招聘助手高级设置</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">自动执行设置</CardTitle>
              <CardDescription>
                配置自动执行任务的行为
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoExecute" className="cursor-pointer">启用自动执行</Label>
                <CustomSwitch 
                  id="autoExecute" 
                  checked={settings.autoExecute} 
                  onCheckedChange={(checked) => handleChange('autoExecute', checked)}
                />
              </div>
              
              {settings.autoExecute && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="executionInterval">执行间隔（分钟）</Label>
                    <Input 
                      id="executionInterval" 
                      type="number" 
                      value={settings.executionInterval} 
                      onChange={(e) => handleChange('executionInterval', parseInt(e.target.value))}
                      placeholder="建议不少于15分钟"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxExecutions">最大执行次数</Label>
                    <Input 
                      id="maxExecutions" 
                      type="number" 
                      value={settings.maxExecutions} 
                      onChange={(e) => handleChange('maxExecutions', parseInt(e.target.value))}
                      placeholder="0表示无限次"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">日志设置</CardTitle>
              <CardDescription>
                配置日志记录行为
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="loggingEnabled" className="cursor-pointer">启用日志记录</Label>
                <CustomSwitch 
                  id="loggingEnabled" 
                  checked={settings.loggingEnabled} 
                  onCheckedChange={(checked) => handleChange('loggingEnabled', checked)}
                />
              </div>
              
              {settings.loggingEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="logLevel">日志级别</Label>
                    <select 
                      id="logLevel"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={settings.logLevel} 
                      onChange={(e) => handleChange('logLevel', e.target.value)}
                    >
                      <option value="error">错误</option>
                      <option value="warn">警告</option>
                      <option value="info">信息</option>
                      <option value="debug">调试</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="saveLogsToFile" className="cursor-pointer">保存日志到文件</Label>
                    <CustomSwitch 
                      id="saveLogsToFile" 
                      checked={settings.saveLogsToFile} 
                      onCheckedChange={(checked) => handleChange('saveLogsToFile', checked)}
                    />
                  </div>
                  
                  {settings.saveLogsToFile && (
                    <div className="space-y-2">
                      <Label htmlFor="logFilePath">日志文件路径</Label>
                      <Input 
                        id="logFilePath" 
                        type="text" 
                        value={settings.logFilePath} 
                        onChange={(e) => handleChange('logFilePath', e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">失败恢复设置</CardTitle>
              <CardDescription>
                配置执行失败时的恢复行为
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="resumeOnFail" className="cursor-pointer">启用失败恢复</Label>
                <CustomSwitch 
                  id="resumeOnFail" 
                  checked={settings.resumeOnFail} 
                  onCheckedChange={(checked) => handleChange('resumeOnFail', checked)}
                />
              </div>
              
              {settings.resumeOnFail && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="maxRetries">最大重试次数</Label>
                    <Input 
                      id="maxRetries" 
                      type="number" 
                      value={settings.maxRetries} 
                      onChange={(e) => handleChange('maxRetries', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retryDelay">重试延迟（分钟）</Label>
                    <Input 
                      id="retryDelay" 
                      type="number" 
                      value={settings.retryDelay} 
                      onChange={(e) => handleChange('retryDelay', parseInt(e.target.value))}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">智能筛选设置</CardTitle>
              <CardDescription>
                配置高级智能筛选功能
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="smartFiltering" className="cursor-pointer">启用智能筛选</Label>
                <CustomSwitch 
                  id="smartFiltering" 
                  checked={settings.smartFiltering} 
                  onCheckedChange={(checked) => handleChange('smartFiltering', checked)}
                />
              </div>
              
              {settings.smartFiltering && (
                <>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="aiAssisted" className="cursor-pointer">AI辅助分析</Label>
                    <CustomSwitch 
                      id="aiAssisted" 
                      checked={settings.aiAssisted} 
                      onCheckedChange={(checked) => handleChange('aiAssisted', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blacklistedCompanies">黑名单公司（逗号分隔）</Label>
                    <Input 
                      id="blacklistedCompanies" 
                      type="text" 
                      value={settings.blacklistedCompanies} 
                      onChange={(e) => handleChange('blacklistedCompanies', e.target.value)}
                      placeholder="示例: 公司A,公司B,公司C"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredCompanies">优先公司（逗号分隔）</Label>
                    <Input 
                      id="preferredCompanies" 
                      type="text" 
                      value={settings.preferredCompanies} 
                      onChange={(e) => handleChange('preferredCompanies', e.target.value)}
                      placeholder="示例: 公司X,公司Y,公司Z"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="candidateScoring" className="cursor-pointer">候选人评分</Label>
                    <CustomSwitch 
                      id="candidateScoring" 
                      checked={settings.candidateScoring} 
                      onCheckedChange={(checked) => handleChange('candidateScoring', checked)}
                    />
                  </div>
                  
                  {settings.candidateScoring && (
                    <div className="space-y-2">
                      <Label htmlFor="scoringThreshold">评分阈值（0-100）</Label>
                      <Input 
                        id="scoringThreshold" 
                        type="number" 
                        min="0"
                        max="100"
                        value={settings.scoringThreshold} 
                        onChange={(e) => handleChange('scoringThreshold', parseInt(e.target.value))}
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-auto pt-4">
          <Button type="submit" className="w-full">保存设置</Button>
        </div>
      </form>
    </div>
  );
} 