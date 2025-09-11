// Core resume data types based on the intelligent resume builder requirements

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  website?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  description: string;
  achievements: string[];
  keywords: string[]; // For ATS optimization
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  relevantCoursework?: string[];
  honors?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'certification';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  isOngoing: boolean;
  url?: string;
  github?: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  expirationDate?: string;
  credentialId?: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  summary?: string;
  customSections?: CustomSection[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list';
  items?: string[];
}

export interface JobDescription {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  keywords: string[];
  extractedSkills: string[];
}

export interface MatchAnalysis {
  overallScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  keywordDensity: Record<string, number>;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'traditional' | 'creative' | 'technical' | 'ats-friendly';
  isATSFriendly: boolean;
}

// State interfaces for Redux
export interface ResumeState {
  resumeData: ResumeData;
  currentJobDescription?: JobDescription;
  matchAnalysis?: MatchAnalysis;
  selectedTemplate: string;
  isLoading: boolean;
  error?: string;
}

// Form interfaces
export interface FormSection {
  id: string;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

// AI Enhancement interfaces (for future phases)
export interface AIContentSuggestion {
  originalText: string;
  suggestedText: string;
  type: 'achievement' | 'description' | 'skill' | 'summary';
  confidence: number;
  keywords: string[];
}

export interface AIAnalysis {
  contentSuggestions: AIContentSuggestion[];
  atsScore: number;
  readabilityScore: number;
  impactScore: number;
  recommendations: string[];
}
