import { Project, SkillGroup, JourneyMilestone } from "../types";

export const PERSONAL_INFO = {
  name: "Sumit Bal",
  firstName: "Sumit",
  lastName: "Bal",
  titles: [
    "AI & ML Engineer",
    "Creative Developer",
    "Agentic Systems Builder",
    "Software Problem Solver"
  ],
  bio: "I am a Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning at Narula Institute of Technology, Kolkata. Driven by analytical rigor and problem-solving, I engineer modern web systems, high-performance data workflows, and explore the frontier of intelligent agentic architectures.",
  location: "Kolkata, India",
  email: "thisissumitbal2007@gmail.com",
  phone: "+91 8479927488",
  github: "https://github.com/sumitdev0",
  linkedin: "https://www.linkedin.com/in/sumit-bal-037597377/",
  stats: [
    { label: "Academic CGPA", value: "8.165" },
    { label: "Core Projects", value: "5+" },
    { label: "Specialization", value: "AI & ML" },
    { label: "Graduation Target", value: "2029" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    category: "Finance & Web Application",
    description: "An intuitive real-time personal finance manager built to log, categorize, and visualize cash flows with database synchronization and responsive analytics.",
    tools: ["JavaScript", "HTML5", "CSS3", "Supabase", "Analytics"],
    image: "/images/project-expense-tracker.jpg",
    githubUrl: "https://github.com/sumitdev0",
    featured: true,
    highlights: ["Real-time persistence", "Category-wise expense breakdown", "Interactive dashboard"]
  },
  {
    id: "password-manager",
    title: "Password Manager",
    category: "Cybersecurity & Utilities",
    description: "A secure cryptographic vault implementing hardened hashing algorithms and zero-knowledge storage principles for sensitive credential management.",
    tools: ["Python", "Cryptography", "Hashing", "Secure Vault", "CLI"],
    image: "/images/project-password-manager.jpg",
    githubUrl: "https://github.com/sumitdev0",
    featured: true,
    highlights: ["Symmetric encryption", "Master password authentication", "Secure key derivation"]
  },
  {
    id: "python-web-automation",
    title: "Python Web Automation",
    category: "Automation & Scripting",
    description: "Robust automated scraping and data ingestion framework built to orchestrate headless web interactions and parse unstructured web datasets at scale.",
    tools: ["Python", "Web Scraping", "Headless Automation", "Pipelines"],
    image: "/images/project-web-automation.jpg",
    githubUrl: "https://github.com/sumitdev0",
    featured: true,
    highlights: ["Headless browser drivers", "Fault-tolerant rate-limiting", "Data normalization"]
  },
  {
    id: "smart-calculator",
    title: "Smart Calculator",
    category: "Algorithms & Math Engine",
    description: "Interactive numerical evaluation tool featuring arithmetic expression tokenization, operator precedence parsing, and real-time computation states.",
    tools: ["JavaScript", "Python", "Expression Parsing", "Interactive UI"],
    image: "/images/project-smart-calculator.jpg",
    githubUrl: "https://github.com/sumitdev0",
    featured: false,
    highlights: ["Shunting-yard algorithm", "Parenthetical parsing", "Instant feedback loop"]
  },
  {
    id: "task-tracker",
    title: "Task Tracker",
    category: "Productivity & State Management",
    description: "High-productivity agenda planner supporting reactive task status cycles, priority-based sorting, and local browser cache synchronization.",
    tools: ["JavaScript", "HTML5", "CSS3", "Task Scheduling", "State Filters"],
    image: "/images/project-task-tracker.jpg",
    githubUrl: "https://github.com/sumitdev0",
    featured: false,
    highlights: ["Dynamic filtering", "Priority tags", "Persistent state tracking"]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Core Languages",
    description: "Foundational programming languages used for systems, scripting, and web logic.",
    skills: [
      { name: "Python", level: "Advanced", icon: "/images/python.svg" },
      { name: "C", level: "Proficient", icon: "/images/c.svg" },
      { name: "JavaScript", level: "Advanced", icon: "/images/javascript.webp" },
      { name: "TypeScript", level: "Intermediate", icon: "/images/typescript.webp" },
      { name: "HTML5", level: "Expert", icon: "/images/html.svg" },
      { name: "CSS3", level: "Advanced", icon: "/images/css.svg" }
    ]
  },
  {
    category: "AI, ML & Mathematics",
    description: "Frameworks, libraries, and paradigms for intelligent agentic and numerical computing.",
    skills: [
      { name: "NumPy", level: "Proficient", icon: "/images/numpy.svg" },
      { name: "JupyterLab", level: "Proficient", icon: "/images/jupyter.svg" },
      { name: "Agentic Systems", level: "Explorer" },
      { name: "Decoding RAG", level: "Intermediate" },
      { name: "Data Structures & Algos", level: "Advanced" },
      { name: "Google Cloud AI", level: "Certified" }
    ]
  },
  {
    category: "Platforms & Developer Tools",
    description: "Ecosystems and tools for cloud hosting, database management, and version control.",
    skills: [
      { name: "Supabase", level: "Proficient", icon: "/images/supabase.svg" },
      { name: "Vercel", level: "Proficient", icon: "/images/vercel.svg" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Linux / CLI", level: "Proficient" },
      { name: "Web Automation", level: "Advanced" },
      { name: "React Ecosystem", level: "Intermediate", icon: "/images/react.webp" }
    ]
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: "2025 – 2029",
    badge: "DEGREE",
    title: "B.Tech in Computer Science & Engineering (AI & ML)",
    organization: "Narula Institute of Technology, Kolkata",
    description: "Undergraduate program with an in-depth emphasis on Artificial Intelligence, Machine Learning algorithms, Advanced Mathematics, and Computer Science foundations. Currently maintaining a strong CGPA of 8.165.",
    tags: ["CGPA 8.165", "AI & ML", "Algorithms", "Linear Algebra"]
  },
  {
    year: "2026",
    badge: "CERTIFIED",
    title: "Innovation with Google AI",
    organization: "Google Cloud",
    description: "Official certification covering Google Cloud AI ecosystems, generative models, enterprise cloud infrastructure, and intelligent cloud engineering workflows.",
    tags: ["Google Cloud", "Generative AI", "Cloud Infrastructure"]
  },
  {
    year: "CURRENT",
    badge: "COMMUNITY",
    title: "ML to Agentic Systems & RAG Pipelines",
    organization: "Google Developer Group (GDG NiT)",
    description: "Active contributor and participant in cutting-edge technical workshops analyzing Retrieval-Augmented Generation (RAG), LLM orchestrations, multi-agent workflows, and practical machine learning deployment.",
    tags: ["Agentic AI", "RAG", "LLM Workflows", "GDG"]
  }
];
