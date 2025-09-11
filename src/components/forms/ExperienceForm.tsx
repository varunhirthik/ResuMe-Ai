'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { 
  addWorkExperience, 
  updateWorkExperience, 
  removeWorkExperience,
  addAchievement,
  removeAchievement
} from '@/store/resumeSlice';
import { WorkExperience } from '@/types/resume';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { workExperience } = useAppSelector((state) => state.resume.resumeData);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleAddExperience = () => {
    dispatch(addWorkExperience());
  };

  const handleUpdateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    dispatch(updateWorkExperience({ id, data: { [field]: value } }));
  };

  const handleRemoveExperience = (id: string) => {
    dispatch(removeWorkExperience(id));
  };

  const handleAddAchievement = (experienceId: string) => {
    dispatch(addAchievement({ 
      sectionType: 'workExperience', 
      id: experienceId, 
      achievement: '' 
    }));
  };

  const handleRemoveAchievement = (experienceId: string, index: number) => {
    dispatch(removeAchievement({ 
      sectionType: 'workExperience', 
      id: experienceId, 
      index 
    }));
  };

  const handleUpdateAchievement = (experienceId: string, index: number, value: string) => {
    const experience = workExperience.find(exp => exp.id === experienceId);
    if (experience) {
      const updatedAchievements = [...experience.achievements];
      updatedAchievements[index] = value;
      handleUpdateExperience(experienceId, 'achievements', updatedAchievements);
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        </div>
        <button
          onClick={handleAddExperience}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </button>
      </div>

      {/* Experience Items */}
      <div className="space-y-6">
        {workExperience.map((experience, index) => (
          <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
            {/* Experience Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-semibold text-gray-900">
                Experience #{index + 1}
              </h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleExpanded(experience.id)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {expandedItems.has(experience.id) ? 'Collapse' : 'Expand'}
                </button>
                <button
                  onClick={() => handleRemoveExperience(experience.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={experience.jobTitle}
                  onChange={(e) => handleUpdateExperience(experience.id, 'jobTitle', e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Building className="w-4 h-4 mr-1" />
                  Company *
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => handleUpdateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Google Inc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => handleUpdateExperience(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Start Date *
                </label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleUpdateExperience(experience.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  End Date
                </label>
                <div className="space-y-2">
                  <input
                    type="month"
                    value={experience.endDate || ''}
                    onChange={(e) => handleUpdateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.isCurrentRole}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={experience.isCurrentRole}
                      onChange={(e) => {
                        handleUpdateExperience(experience.id, 'isCurrentRole', e.target.checked);
                        if (e.target.checked) {
                          handleUpdateExperience(experience.id, 'endDate', '');
                        }
                      }}
                      className="mr-2"
                    />
                    Current role
                  </label>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedItems.has(experience.id) && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    value={experience.description}
                    onChange={(e) => handleUpdateExperience(experience.id, 'description', e.target.value)}
                    placeholder="Brief description of your role and responsibilities..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Key Achievements & Responsibilities
                    </label>
                    <button
                      onClick={() => handleAddAchievement(experience.id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      + Add Achievement
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start space-x-2">
                        <span className="text-gray-400 mt-2">•</span>
                        <div className="flex-1">
                          <textarea
                            value={achievement}
                            onChange={(e) => handleUpdateAchievement(experience.id, achievementIndex, e.target.value)}
                            placeholder="Increased team productivity by 25% through implementation of automated testing processes..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveAchievement(experience.id, achievementIndex)}
                          className="text-red-600 hover:text-red-700 mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {workExperience.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added</h3>
          <p className="text-gray-600 mb-4">Start building your professional story by adding your work experience.</p>
          <button
            onClick={handleAddExperience}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Experience
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="text-sm font-semibold text-green-900 mb-2">Experience Writing Tips</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Start each achievement with an action verb (Managed, Developed, Increased)</li>
          <li>• Include specific numbers and percentages whenever possible</li>
          <li>• Focus on results and impact, not just responsibilities</li>
          <li>• Use past tense for previous roles, present tense for current role</li>
          <li>• Tailor achievements to match the job description keywords</li>
          <li>• Aim for 3-5 bullet points per role</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperienceForm;
