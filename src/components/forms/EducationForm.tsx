'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { addEducation, updateEducation, removeEducation } from '@/store/resumeSlice';
import { Education } from '@/types/resume';
import { GraduationCap, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

const EducationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { education } = useAppSelector((state) => state.resume.resumeData);

  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: any) => {
    dispatch(updateEducation({ id, data: { [field]: value } }));
  };

  const handleRemoveEducation = (id: string) => {
    dispatch(removeEducation(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
        </div>
        <button
          onClick={handleAddEducation}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </button>
      </div>

      {/* Education Items */}
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-semibold text-gray-900">
                Education #{index + 1}
              </h4>
              <button
                onClick={() => handleRemoveEducation(edu.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution *
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="Stanford University"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleUpdateEducation(edu.id, 'location', e.target.value)}
                  placeholder="Stanford, CA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Graduation Date
                </label>
                <input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => handleUpdateEducation(edu.id, 'graduationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {education.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No education added</h3>
          <p className="text-gray-600 mb-4">Add your educational background to strengthen your resume.</p>
          <button
            onClick={handleAddEducation}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Education Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include GPA only if it's 3.5 or higher</li>
          <li>• List most recent education first</li>
          <li>• Include relevant coursework for entry-level positions</li>
          <li>• Mention honors, awards, or academic achievements</li>
          <li>• Use full degree name (Bachelor of Science, not BS)</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationForm;
