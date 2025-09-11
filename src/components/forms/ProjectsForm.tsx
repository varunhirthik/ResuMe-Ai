'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { addProject, updateProject, removeProject } from '@/store/resumeSlice';
import { Project } from '@/types/resume';
import { Code, Plus, Trash2, ExternalLink, Github } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.resume.resumeData);

  const handleAddProject = () => {
    dispatch(addProject());
  };

  const handleUpdateProject = (id: string, field: keyof Project, value: any) => {
    dispatch(updateProject({ id, data: { [field]: value } }));
  };

  const handleRemoveProject = (id: string) => {
    dispatch(removeProject(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Code className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Projects</h3>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Project Items */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-semibold text-gray-900">
                Project #{index + 1}
              </h4>
              <button
                onClick={() => handleRemoveProject(project.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleUpdateProject(project.id, 'name', e.target.value)}
                  placeholder="E-commerce Platform"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                  placeholder="Brief description of the project..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={project.url || ''}
                    onChange={(e) => handleUpdateProject(project.id, 'url', e.target.value)}
                    placeholder="https://project-demo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Github className="w-4 h-4 mr-1" />
                    GitHub Repository
                  </label>
                  <input
                    type="url"
                    value={project.github || ''}
                    onChange={(e) => handleUpdateProject(project.id, 'github', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleUpdateProject(project.id, 'technologies', e.target.value.split(',').map(tech => tech.trim()))}
                  placeholder="React, Node.js, MongoDB, AWS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects added</h3>
          <p className="text-gray-600 mb-4">Showcase your work by adding your key projects.</p>
          <button
            onClick={handleAddProject}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <h4 className="text-sm font-semibold text-indigo-900 mb-2">Project Tips</h4>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• Include 3-5 most relevant projects</li>
          <li>• Focus on projects that demonstrate skills for your target role</li>
          <li>• Include live demos and GitHub links when available</li>
          <li>• Mention the impact or results of your projects</li>
          <li>• List specific technologies and tools used</li>
          <li>• Highlight your role if it was a team project</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;
