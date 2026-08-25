export type ActiveTab = 'overview' | 'about' | 'skills' | 'lab' | 'curriculum' | 'terminal' | 'contact';

export interface Competency {
  id: string;
  name: string;
  iconType: 'python' | 'tree' | 'memory' | 'terminal' | 'database' | 'cpu';
  description: string;
  tag: string;
  level: string;
  details: {
    longDescription: string;
    keyConcepts: string[];
    sampleCode: string;
    sampleLanguage: string;
    pucvCourse: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  metrics: string;
  githubUrl?: string;
  demoAvailable: boolean;
  codeSnippet?: string;
}

export interface AcademicCourse {
  code: string;
  name: string;
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  status: 'completed' | 'in-progress' | 'upcoming';
  category: 'programming' | 'math' | 'hardware' | 'engineering' | 'humanities';
  credits: number;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  purpose: 'collaboration' | 'academic' | 'internship' | 'inquiry';
  message: string;
}
