'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { updateSummary } from '@/store/resumeSlice';
import { FileText, Lightbulb, Zap } from 'lucide-react';

const SummaryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { summary } = useAppSelector((state) => state.resume.resumeData);
  const [wordCount, setWordCount] = useState(summary ? summary.split(' ').length : 0);

  const handleSummaryChange = (value: string) => {
    dispatch(updateSummary(value));
    setWordCount(value.split(' ').filter(word => word.length > 0).length);
  };

  const summaryTemplates = [
    {
      title: "Technical Professional",
      template: "Results-driven [Job Title] with [X] years of experience in [Key Technology/Field]. Proven track record of [Key Achievement] and expertise in [Core Skills]. Passionate about [Area of Interest] and committed to delivering high-quality solutions that drive business growth."
    },
    {
      title: "Management Leader", 
      template: "Dynamic [Job Title] with [X] years of leadership experience managing cross-functional teams and driving strategic initiatives. Successfully [Key Achievement] resulting in [Quantifiable Result]. Expert in [Core Skills] with a focus on operational excellence and team development."
    },
    {
      title: "Creative Professional",
      template: "Creative and analytical [Job Title] with [X] years of experience in [Industry/Field]. Skilled in [Key Skills] with a passion for [Area of Focus]. Proven ability to [Key Achievement] and deliver innovative solutions that enhance user experience and drive engagement."
    }
  ];

  const applyTemplate = (template: string) => {
    handleSummaryChange(template);
  };

  return (
    <div className="space-y-6">
      {/* Main Summary Input */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 mr-2" />
          Professional Summary
        </label>
        <textarea
          value={summary || ''}
          onChange={(e) => handleSummaryChange(e.target.value)}
          placeholder="Write a compelling 3-4 sentence summary that highlights your key strengths, experience, and career objectives. Focus on quantifiable achievements and relevant skills for your target role."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
        />
        
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>Word count: {wordCount}</span>
          <span className={`${wordCount >= 50 && wordCount <= 80 ? 'text-green-600' : wordCount < 50 ? 'text-orange-500' : 'text-red-500'}`}>
            {wordCount < 50 ? 'Too short' : wordCount > 80 ? 'Too long' : 'Optimal length'}
          </span>
        </div>
      </div>

      {/* Templates Section */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-medium text-gray-900">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          Summary Templates
        </h3>
        
        <div className="grid gap-4">
          {summaryTemplates.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <button
                  onClick={() => applyTemplate(item.template)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Use Template
                </button>
              </div>
              <p className="text-sm text-gray-600">{item.template}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Enhancement Section (Placeholder for Phase 2) */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-center mb-2">
          <Zap className="w-5 h-5 mr-2 text-purple-600" />
          <h4 className="font-semibold text-purple-900">AI Enhancement</h4>
          <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">Coming Soon</span>
        </div>
        <p className="text-sm text-purple-700 mb-3">
          Get AI-powered suggestions to enhance your summary with industry-specific keywords and compelling language.
        </p>
        <button
          disabled
          className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
        >
          Enhance with AI
        </button>
      </div>

      {/* Tips Section */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Writing Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with your job title and years of experience</li>
          <li>• Include 2-3 key skills relevant to your target role</li>
          <li>• Mention one quantifiable achievement</li>
          <li>• Keep it between 50-80 words for optimal impact</li>
          <li>• Use active voice and power words (achieved, managed, developed)</li>
          <li>• Avoid generic phrases like "hard-working" or "team player"</li>
          <li>• Tailor it to match the job description keywords</li>
        </ul>
      </div>
    </div>
  );
};

export default SummaryForm;
