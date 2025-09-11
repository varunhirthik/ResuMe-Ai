'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { updatePersonalInfo } from '@/store/resumeSlice';
import { PersonalInfo } from '@/types/resume';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { personalInfo } = useAppSelector((state) => state.resume.resumeData);

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Full Name */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          />
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john.doe@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            Location *
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          />
        </div>

        {/* Professional Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Professional Links</h3>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn Profile
            </label>
            <input
              type="url"
              value={personalInfo.linkedIn || ''}
              onChange={(e) => handleInputChange('linkedIn', e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 mr-2" />
              Personal Website
            </label>
            <input
              type="url"
              value={personalInfo.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://johndoe.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Github className="w-4 h-4 mr-2" />
              GitHub Profile
            </label>
            <input
              type="url"
              value={personalInfo.github || ''}
              onChange={(e) => handleInputChange('github', e.target.value)}
              placeholder="https://github.com/johndoe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">ATS Optimization Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a professional email address</li>
          <li>• Include your full legal name as it appears on official documents</li>
          <li>• Provide a phone number where you can be reliably reached</li>
          <li>• Keep location general (city, state) for privacy</li>
          <li>• Include LinkedIn URL - 87% of recruiters use LinkedIn for screening</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
