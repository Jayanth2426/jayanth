export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  mockupType: "laptop" | "phone" | "browser";
  image: string; // fallback if image is not loaded
  color: string; // theme color
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  timeline: string;
  challenges: string;
  solutions: string;
  metrics: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string; // name of lucide icon
  glowColor: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  details: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skillsLearned: string[];
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  platform: string;
  rank?: string;
  detail: string;
  iconName: string;
  url?: string;
}
