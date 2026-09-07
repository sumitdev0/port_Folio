export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image: string;
  githubUrl: string;
  featured?: boolean;
  highlights?: string[];
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string;
    icon?: string;
  }[];
}

export interface JourneyMilestone {
  year: string;
  badge: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
}
