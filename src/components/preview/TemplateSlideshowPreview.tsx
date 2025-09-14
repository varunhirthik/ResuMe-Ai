'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText, Star, Briefcase } from 'lucide-react';

interface SampleTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  popularity: 'High' | 'Medium' | 'Popular';
  atsScore: number;
  preview: React.ReactNode;
}

const TemplateSlideshowPreview: React.FC = () => {
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sampleTemplates: SampleTemplate[] = [
    {
      id: 'modern-professional',
      name: 'Modern Professional',
      description: 'Clean, ATS-friendly design perfect for corporate roles',
      category: 'Professional',
      popularity: 'High',
      atsScore: 95,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-sm border min-h-full max-h-full overflow-hidden">
          {/* Header */}
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
            <p className="text-lg text-blue-600 mt-1">Senior Software Engineer</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <span>📧 sarah.johnson@email.com</span>
              <span>📱 (555) 123-4567</span>
              <span>📍 San Francisco, CA</span>
            </div>
          </div>
          
          {/* Summary */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Experienced software engineer with 8+ years developing scalable web applications. 
              Proven track record in React, Node.js, and cloud architecture...
            </p>
          </div>
          
          {/* Experience */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Experience</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">Senior Software Engineer</h3>
                <p className="text-blue-600 text-sm">Tech Corp • 2020 - Present</p>
                <ul className="text-sm text-gray-700 mt-1 space-y-1">
                  <li>• Led development of microservices architecture</li>
                  <li>• Improved application performance by 40%</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'creative-design',
      name: 'Creative Designer',
      description: 'Stylish layout ideal for creative professionals',
      category: 'Creative',
      popularity: 'Popular',
      atsScore: 88,
      preview: (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-sm border min-h-full max-h-full overflow-hidden">
          {/* Header with accent */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                AJ
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Alex Johnson</h1>
                <p className="text-purple-600 font-medium">UX/UI Designer</p>
                <p className="text-sm text-gray-600">alex.johnson@email.com • (555) 987-6543</p>
              </div>
            </div>
          </div>
          
          {/* About */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-6 bg-purple-500 rounded mr-2"></span>
              About Me
            </h2>
            <p className="text-sm text-gray-700">
              Passionate designer with 5+ years creating user-centered digital experiences. 
              Specialized in mobile apps and web interfaces...
            </p>
          </div>
          
          {/* Experience */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-6 bg-pink-500 rounded mr-2"></span>
              Experience
            </h2>
            <div>
              <h3 className="font-semibold text-gray-900">Senior UX Designer</h3>
              <p className="text-purple-600 text-sm">Creative Studio • 2021 - Present</p>
              <p className="text-sm text-gray-700 mt-1">
                • Designed mobile apps with 4.8+ App Store ratings
              </p>
            </div>
          </div>
          
          {/* Skills */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-6 bg-blue-500 rounded mr-2"></span>
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {['Figma', 'Adobe XD', 'Sketch', 'Prototyping'].map((skill) => (
                <div key={skill} className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-2 py-1 rounded">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'executive-minimal',
      name: 'Executive Minimal',
      description: 'Sophisticated design for senior leadership roles',
      category: 'Executive',
      popularity: 'High',
      atsScore: 92,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-sm border min-h-full max-h-full overflow-hidden">
          {/* Minimal Header */}
          <div className="text-center border-b pb-6 mb-6">
            <h1 className="text-3xl font-light text-gray-900">Michael Chen</h1>
            <p className="text-xl text-gray-600 mt-2">Chief Technology Officer</p>
            <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500">
              <span>michael.chen@executive.com</span>
              <span>(555) 111-2222</span>
              <span>New York, NY</span>
            </div>
          </div>
          
          {/* Executive Summary */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">
              Executive Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Transformational technology leader with 15+ years driving digital innovation 
              for Fortune 500 companies. Proven expertise in scaling engineering teams...
            </p>
          </div>
          
          {/* Leadership Experience */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">
              Leadership Experience
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">Chief Technology Officer</h3>
                    <p className="text-gray-600">Global Tech Solutions</p>
                  </div>
                  <p className="text-sm text-gray-500">2019 - Present</p>
                </div>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• Led digital transformation saving $50M annually</li>
                  <li>• Built and managed 200+ person engineering organization</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Core Competencies */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Strategic Planning', 'Team Leadership', 'Digital Transformation', 'P&L Management'].map((skill) => (
                <div key={skill} className="text-gray-700">• {skill}</div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'fresh-graduate',
      name: 'Fresh Graduate',
      description: 'Perfect for new graduates and entry-level positions',
      category: 'Entry Level',
      popularity: 'Medium',
      atsScore: 90,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-sm border min-h-full max-h-full overflow-hidden">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Emma Rodriguez</h1>
            <p className="text-lg text-green-600 mt-1">Computer Science Graduate</p>
            <div className="flex justify-center space-x-4 mt-3 text-sm text-gray-600">
              <span>📧 emma.rodriguez@university.edu</span>
              <span>📱 (555) 456-7890</span>
            </div>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-blue-600">
              <span>🔗 linkedin.com/in/emmarodriguez</span>
              <span>💻 github.com/emmarodriguez</span>
            </div>
          </div>
          
          {/* Objective */}
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-green-200">
              Career Objective
            </h2>
            <p className="text-sm text-gray-700">
              Recent Computer Science graduate seeking a software development role to apply 
              programming skills and contribute to innovative projects...
            </p>
          </div>
          
          {/* Education */}
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-green-200">
              Education
            </h2>
            <div>
              <h3 className="font-semibold text-gray-900">Bachelor of Science, Computer Science</h3>
              <p className="text-green-600 text-sm">University of Technology • 2024</p>
              <p className="text-sm text-gray-700 mt-1">
                GPA: 3.8/4.0 • Dean's List • Relevant Coursework: Data Structures, Algorithms, Web Development
              </p>
            </div>
          </div>
          
          {/* Projects */}
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-green-200">
              Academic Projects
            </h2>
            <div>
              <h3 className="font-semibold text-gray-900">E-Commerce Web Application</h3>
              <p className="text-sm text-gray-700 mt-1">
                • Built full-stack application using React and Node.js
              </p>
            </div>
          </div>
          
          {/* Technical Skills */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-green-200">
              Technical Skills
            </h2>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">Programming: </span>
                <span className="text-sm text-gray-600">Java, Python, JavaScript, C++</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Web Technologies: </span>
                <span className="text-sm text-gray-600">React, HTML/CSS, Node.js</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Auto-advance slideshow every 6 seconds with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentTemplate((prev) => (prev + 1) % sampleTemplates.length);
          setIsTransitioning(false);
        }, 150);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [sampleTemplates.length, isTransitioning]);

  const nextTemplate = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTemplate((prev) => (prev + 1) % sampleTemplates.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevTemplate = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTemplate((prev) => (prev - 1 + sampleTemplates.length) % sampleTemplates.length);
      setIsTransitioning(false);
    }, 150);
  };

  const currentTemplateData = sampleTemplates[currentTemplate];

  return (
    <div className="h-full max-h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Template Controls Header */}
      <div className="bg-white border-b p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">{currentTemplateData.name}</h3>
              <p className="text-sm text-gray-600">{currentTemplateData.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={prevTemplate}
              disabled={isTransitioning}
              className={`p-2 rounded-lg transition-colors ${
                isTransitioning 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTemplate}
              disabled={isTransitioning}
              className={`p-2 rounded-lg transition-colors ${
                isTransitioning 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Template Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{currentTemplateData.category}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">{currentTemplateData.popularity}</span>
            </span>
            <span className="text-green-600 font-medium">
              {currentTemplateData.atsScore}% ATS Score
            </span>
          </div>
          
          {/* Template Indicators */}
          <div className="flex space-x-1">
            {sampleTemplates.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning || index === currentTemplate) return;
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentTemplate(index);
                    setIsTransitioning(false);
                  }, 150);
                }}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTemplate ? 'bg-blue-600' : 'bg-gray-300'
                } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-blue-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Template Preview */}
      <div className="flex-1 p-4 relative overflow-hidden">
        <div className={`h-full w-full rounded-lg overflow-y-auto transition-opacity duration-300 ${
          isTransitioning ? 'opacity-50' : 'opacity-100'
        }`}>
          {currentTemplateData.preview}
        </div>
        {isTransitioning && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className="bg-white border-t p-4 flex-shrink-0">
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-3">
            Start building your own professional resume using these proven templates
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>✓ ATS-Optimized</span>
            <span>✓ Professional Design</span>
            <span>✓ Easy Customization</span>
            <span>✓ Multiple Formats</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSlideshowPreview;
