'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { addSkill, updateSkill, removeSkill } from '@/store/resumeSlice';
import { Skill } from '@/types/resume';
import { Award, Plus, Trash2 } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { skills } = useAppSelector((state) => state.resume.resumeData);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('technical');

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      dispatch(addSkill({
        name: newSkillName.trim(),
        category: newSkillCategory,
        proficiency: 'intermediate',
      }));
      setNewSkillName('');
    }
  };

  const handleUpdateSkill = (id: string, field: keyof Skill, value: any) => {
    dispatch(updateSkill({ id, data: { [field]: value } }));
  };

  const handleRemoveSkill = (id: string) => {
    dispatch(removeSkill(id));
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryLabels = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    language: 'Languages',
    certification: 'Certifications'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Award className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
      </div>

      {/* Add New Skill */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Add New Skill</h4>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Enter skill name..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value as Skill['category'])}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            <option value="technical">Technical</option>
            <option value="soft">Soft Skills</option>
            <option value="language">Language</option>
            <option value="certification">Certification</option>
          </select>
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h4>
            <div className="space-y-2">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleUpdateSkill(skill.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <select
                    value={skill.proficiency || 'intermediate'}
                    onChange={(e) => handleUpdateSkill(skill.id, 'proficiency', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {skills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added</h3>
          <p className="text-gray-600 mb-4">Add your skills to showcase your expertise.</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="text-sm font-semibold text-purple-900 mb-2">Skills Tips</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Include both technical and soft skills</li>
          <li>• List skills relevant to your target job</li>
          <li>• Be honest about your proficiency level</li>
          <li>• Include programming languages, tools, and frameworks</li>
          <li>• Add industry-specific certifications</li>
          <li>• Use exact skill names that appear in job descriptions</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
