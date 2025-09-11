'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setJobDescription, extractKeywords, setMatchAnalysis } from '@/store/jobMatchingSlice';
import { JobDescription, MatchAnalysis } from '@/types/resume';
import { Search, Upload, BarChart3, CheckCircle, AlertCircle, Target } from 'lucide-react';

const JobAnalyzer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentJobDescription, matchAnalysis, isAnalyzing } = useAppSelector((state) => state.jobMatching);
  const { resumeData } = useAppSelector((state) => state.resume);
  
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');

  const analyzeJobDescription = () => {
    if (!jobDescriptionText.trim()) return;

    const jobDesc: JobDescription = {
      title: jobTitle || 'Unknown Position',
      company: company || 'Unknown Company',
      description: jobDescriptionText,
      requirements: [], // Will be enhanced in Phase 2
      keywords: [],
      extractedSkills: [],
    };

    dispatch(setJobDescription(jobDesc));
    dispatch(extractKeywords(jobDescriptionText));
    
    // Calculate basic match analysis
    const analysis = calculateMatchAnalysis(jobDescriptionText);
    dispatch(setMatchAnalysis(analysis));
  };

  const calculateMatchAnalysis = (jobText: string): MatchAnalysis => {
    const jobKeywords = extractBasicKeywords(jobText.toLowerCase());
    const resumeSkills = resumeData.skills.map(skill => skill.name.toLowerCase());
    const resumeText = [
      resumeData.summary || '',
      ...resumeData.workExperience.map(exp => `${exp.jobTitle} ${exp.description} ${exp.achievements.join(' ')}`),
      ...resumeData.projects.map(proj => `${proj.name} ${proj.description} ${proj.technologies.join(' ')}`),
    ].join(' ').toLowerCase();

    // Find matching skills
    const matchedSkills = jobKeywords.filter(keyword => 
      resumeSkills.some(skill => skill.includes(keyword) || keyword.includes(skill)) ||
      resumeText.includes(keyword)
    );

    // Find missing skills
    const missingSkills = jobKeywords.filter(keyword => !matchedSkills.includes(keyword));

    // Calculate overall score
    const overallScore = jobKeywords.length > 0 
      ? Math.round((matchedSkills.length / jobKeywords.length) * 100)
      : 0;

    // Generate recommendations
    const recommendations = generateRecommendations(matchedSkills, missingSkills, overallScore);

    // Calculate keyword density
    const keywordDensity: Record<string, number> = {};
    jobKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = resumeText.match(regex);
      keywordDensity[keyword] = matches ? matches.length : 0;
    });

    return {
      overallScore,
      matchedSkills,
      missingSkills,
      recommendations,
      keywordDensity,
    };
  };

  const extractBasicKeywords = (text: string): string[] => {
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'do', 'does', 'did', 'get', 'got', 'make', 'made', 'take', 'took', 'come', 'came', 'go', 'went', 'see', 'saw', 'know', 'knew', 'think', 'thought', 'say', 'said', 'work', 'worked', 'use', 'used', 'find', 'found', 'give', 'gave', 'tell', 'told', 'ask', 'asked', 'try', 'tried', 'call', 'called', 'need', 'needed', 'feel', 'felt', 'become', 'became', 'leave', 'left', 'put', 'seem', 'seemed', 'keep', 'kept', 'let', 'begin', 'began', 'help', 'helped', 'show', 'showed', 'hear', 'heard', 'play', 'played', 'run', 'ran', 'move', 'moved', 'live', 'lived', 'believe', 'believed', 'bring', 'brought', 'happen', 'happened', 'write', 'wrote', 'sit', 'sat', 'stand', 'stood', 'lose', 'lost', 'pay', 'paid', 'meet', 'met', 'include', 'included', 'continue', 'continued', 'set', 'expect', 'expected', 'build', 'built', 'remain', 'remained', 'fall', 'fell', 'reach', 'reached'];
    
    const words = text
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.includes(word.toLowerCase()))
      .map(word => word.toLowerCase());
    
    const wordCount: Record<string, number> = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word);
  };

  const generateRecommendations = (matched: string[], missing: string[], score: number): string[] => {
    const recommendations: string[] = [];

    if (score < 50) {
      recommendations.push("Consider adding more relevant keywords from the job description to your resume");
      recommendations.push("Highlight transferable skills that relate to the missing keywords");
    } else if (score < 75) {
      recommendations.push("Good match! Consider incorporating some of the missing keywords naturally");
      recommendations.push("Quantify your achievements with specific numbers and metrics");
    } else {
      recommendations.push("Excellent match! Your resume aligns well with the job requirements");
      recommendations.push("Focus on optimizing the order of information to highlight key matches");
    }

    if (missing.length > 0) {
      recommendations.push(`Consider learning or highlighting experience with: ${missing.slice(0, 5).join(', ')}`);
    }

    return recommendations;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Search className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Job Description Analyzer</h3>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4">Analyze Job Posting</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google Inc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description *
          </label>
          <textarea
            value={jobDescriptionText}
            onChange={(e) => setJobDescriptionText(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          />
        </div>

        <button
          onClick={analyzeJobDescription}
          disabled={!jobDescriptionText.trim() || isAnalyzing}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <BarChart3 className="w-4 h-4" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Job Match'}</span>
        </button>
      </div>

      {/* Analysis Results */}
      {matchAnalysis && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Match Analysis</h4>
              <div className={`px-4 py-2 rounded-lg font-semibold ${
                matchAnalysis.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                matchAnalysis.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {matchAnalysis.overallScore}% Match
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div>
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h5 className="font-medium text-gray-900">Matched Keywords ({matchAnalysis.matchedSkills.length})</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchAnalysis.matchedSkills.slice(0, 10).map((skill: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <div className="flex items-center mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                  <h5 className="font-medium text-gray-900">Missing Keywords ({matchAnalysis.missingSkills.length})</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchAnalysis.missingSkills.slice(0, 10).map((skill: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <h5 className="font-medium text-blue-900">Recommendations</h5>
            </div>
            <ul className="space-y-2">
              {matchAnalysis.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start text-blue-800 text-sm">
                  <span className="mr-2 mt-1">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Job Info */}
          {currentJobDescription && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Analyzing Position</h5>
              <p className="text-gray-700">
                <span className="font-medium">{currentJobDescription.title}</span>
                {currentJobDescription.company && ` at ${currentJobDescription.company}`}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Top keywords: {currentJobDescription.keywords.slice(0, 5).join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="text-sm font-semibold text-purple-900 mb-2">ATS Optimization Tips</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Copy and paste the complete job description for best results</li>
          <li>• Focus on matching 70-80% of the key requirements</li>
          <li>• Use exact keywords from the job posting in your resume</li>
          <li>• Don't keyword stuff - use terms naturally in context</li>
          <li>• Prioritize technical skills and job-specific terminology</li>
          <li>• Update your resume for each application based on the analysis</li>
        </ul>
      </div>
    </div>
  );
};

export default JobAnalyzer;
