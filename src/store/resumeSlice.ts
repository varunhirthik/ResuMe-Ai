import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeData, PersonalInfo, WorkExperience, Education, Skill, Project, Certification } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';

// Initial state with default values
const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
    github: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  summary: '',
  customSections: [],
};

interface ResumeState {
  resumeData: ResumeData;
  isLoading: boolean;
  error: string | null;
  activeSection: string;
}

const initialState: ResumeState = {
  resumeData: initialResumeData,
  isLoading: false,
  error: null,
  activeSection: 'personal',
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Personal Information actions
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.resumeData.personalInfo = { ...state.resumeData.personalInfo, ...action.payload };
    },

    // Work Experience actions
    addWorkExperience: (state) => {
      const newExperience: WorkExperience = {
        id: uuidv4(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentRole: false,
        description: '',
        achievements: [],
        keywords: [],
      };
      state.resumeData.workExperience.push(newExperience);
    },

    updateWorkExperience: (state, action: PayloadAction<{ id: string; data: Partial<WorkExperience> }>) => {
      const { id, data } = action.payload;
      const index = state.resumeData.workExperience.findIndex(exp => exp.id === id);
      if (index !== -1) {
        state.resumeData.workExperience[index] = { ...state.resumeData.workExperience[index], ...data };
      }
    },

    removeWorkExperience: (state, action: PayloadAction<string>) => {
      state.resumeData.workExperience = state.resumeData.workExperience.filter(exp => exp.id !== action.payload);
    },

    reorderWorkExperience: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.resumeData.workExperience.splice(fromIndex, 1);
      state.resumeData.workExperience.splice(toIndex, 0, removed);
    },

    // Education actions
    addEducation: (state) => {
      const newEducation: Education = {
        id: uuidv4(),
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: '',
        relevantCoursework: [],
        honors: [],
      };
      state.resumeData.education.push(newEducation);
    },

    updateEducation: (state, action: PayloadAction<{ id: string; data: Partial<Education> }>) => {
      const { id, data } = action.payload;
      const index = state.resumeData.education.findIndex(edu => edu.id === id);
      if (index !== -1) {
        state.resumeData.education[index] = { ...state.resumeData.education[index], ...data };
      }
    },

    removeEducation: (state, action: PayloadAction<string>) => {
      state.resumeData.education = state.resumeData.education.filter(edu => edu.id !== action.payload);
    },

    // Skills actions
    addSkill: (state, action: PayloadAction<Omit<Skill, 'id'>>) => {
      const newSkill: Skill = {
        id: uuidv4(),
        ...action.payload,
      };
      state.resumeData.skills.push(newSkill);
    },

    updateSkill: (state, action: PayloadAction<{ id: string; data: Partial<Skill> }>) => {
      const { id, data } = action.payload;
      const index = state.resumeData.skills.findIndex(skill => skill.id === id);
      if (index !== -1) {
        state.resumeData.skills[index] = { ...state.resumeData.skills[index], ...data };
      }
    },

    removeSkill: (state, action: PayloadAction<string>) => {
      state.resumeData.skills = state.resumeData.skills.filter(skill => skill.id !== action.payload);
    },

    // Projects actions
    addProject: (state) => {
      const newProject: Project = {
        id: uuidv4(),
        name: '',
        description: '',
        technologies: [],
        startDate: '',
        endDate: '',
        isOngoing: false,
        url: '',
        github: '',
        achievements: [],
      };
      state.resumeData.projects.push(newProject);
    },

    updateProject: (state, action: PayloadAction<{ id: string; data: Partial<Project> }>) => {
      const { id, data } = action.payload;
      const index = state.resumeData.projects.findIndex(project => project.id === id);
      if (index !== -1) {
        state.resumeData.projects[index] = { ...state.resumeData.projects[index], ...data };
      }
    },

    removeProject: (state, action: PayloadAction<string>) => {
      state.resumeData.projects = state.resumeData.projects.filter(project => project.id !== action.payload);
    },

    // Certifications actions
    addCertification: (state) => {
      const newCertification: Certification = {
        id: uuidv4(),
        name: '',
        issuer: '',
        dateIssued: '',
        expirationDate: '',
        credentialId: '',
        url: '',
      };
      state.resumeData.certifications.push(newCertification);
    },

    updateCertification: (state, action: PayloadAction<{ id: string; data: Partial<Certification> }>) => {
      const { id, data } = action.payload;
      const index = state.resumeData.certifications.findIndex(cert => cert.id === id);
      if (index !== -1) {
        state.resumeData.certifications[index] = { ...state.resumeData.certifications[index], ...data };
      }
    },

    removeCertification: (state, action: PayloadAction<string>) => {
      state.resumeData.certifications = state.resumeData.certifications.filter(cert => cert.id !== action.payload);
    },

    // Summary actions
    updateSummary: (state, action: PayloadAction<string>) => {
      state.resumeData.summary = action.payload;
    },

    // General actions
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Import/Export actions
    importResumeData: (state, action: PayloadAction<ResumeData>) => {
      state.resumeData = action.payload;
    },

    resetResume: (state) => {
      state.resumeData = initialResumeData;
      state.activeSection = 'personal';
      state.error = null;
    },

    // Bulk operations for achievements/items
    addAchievement: (state, action: PayloadAction<{ sectionType: 'workExperience' | 'projects'; id: string; achievement: string }>) => {
      const { sectionType, id, achievement } = action.payload;
      if (sectionType === 'workExperience') {
        const experience = state.resumeData.workExperience.find(exp => exp.id === id);
        if (experience) {
          experience.achievements.push(achievement);
        }
      } else if (sectionType === 'projects') {
        const project = state.resumeData.projects.find(proj => proj.id === id);
        if (project) {
          project.achievements.push(achievement);
        }
      }
    },

    removeAchievement: (state, action: PayloadAction<{ sectionType: 'workExperience' | 'projects'; id: string; index: number }>) => {
      const { sectionType, id, index } = action.payload;
      if (sectionType === 'workExperience') {
        const experience = state.resumeData.workExperience.find(exp => exp.id === id);
        if (experience) {
          experience.achievements.splice(index, 1);
        }
      } else if (sectionType === 'projects') {
        const project = state.resumeData.projects.find(proj => proj.id === id);
        if (project) {
          project.achievements.splice(index, 1);
        }
      }
    },
  },
});

export const {
  updatePersonalInfo,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  reorderWorkExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  updateSummary,
  setActiveSection,
  setLoading,
  setError,
  importResumeData,
  resetResume,
  addAchievement,
  removeAchievement,
} = resumeSlice.actions;

export default resumeSlice.reducer;
