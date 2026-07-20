import { Project, SkillCategory, Experience, Education, Certificate, Achievement } from "./types";

export const PROJECT_DATA: Project[] = [
  {
    id: "finance-analyzer",
    title: "AI- Personal Finance Analyzer",
    category: "AI & Fintech",
    description: "AI-powered spending tracking and budgeting system with dynamic transaction analysis and smart saving predictions.",
    longDescription: "A sophisticated financial tracking platform that leverages large language models and NLP to automatically categorize banking transactions, parse receipt images, and generate predictive budgeting templates based on historical spending behavior.",
    mockupType: "laptop",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-500 via-teal-400 to-cyan-500",
    techStack: ["Python", "FastAPI", "React", "Tailwind CSS", "Gemini API", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/Jayanth2426",
    liveUrl: "https://finance-analyzer.jayanth.ai",
    timeline: "May 2024 - Aug 2024",
    challenges: "Standard automated transaction classification systems rely on basic regex rules which fail on irregular vendor codes.",
    solutions: "Integrated LLM semantic classifications with custom fine-tuned classification heads to successfully resolve irregular billing descriptors into high-accuracy categories.",
    metrics: ["96.4% categorization accuracy", "Processed 20k+ user transactions", "Generated average 15% reduction in user monthly wasteful spend"]
  },
  {
    id: "chatbot-application",
    title: "AI- ChatBot Application",
    category: "Artificial Intelligence",
    description: "Dynamic conversational assistant featuring advanced memory storage and dynamic file querying capabilities.",
    longDescription: "A robust conversational assistant developed using the Google Gemini SDK and LangChain framework. It features dynamic memory retention (Redis buffer) and an optimized Retrieval-Augmented Generation (RAG) system allowing users to upload documents (PDF, DOCX) and receive immediate contextual answers.",
    mockupType: "browser",
    image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-600 via-indigo-500 to-purple-500",
    techStack: ["TypeScript", "Next.js", "Gemini API", "LangChain", "Zustand", "Tailwind CSS", "Pinecone"],
    githubUrl: "https://github.com/Jayanth2426",
    liveUrl: "https://chatbot.jayanth.ai",
    timeline: "Nov 2024 - Feb 2025",
    challenges: "Ensuring low-latency streaming responses while performing vector database searches across massive text documents.",
    solutions: "Implemented server-side chunk streaming through edge runtimes and leveraged Redis-based message queuing to buffer concurrent interactions.",
    metrics: ["Sub-1.2s average response latency", "Support for 500+ concurrent active sessions", "98.5% user query resolution score"]
  },
  {
    id: "catering-management",
    title: "Catering Management System Application",
    category: "Full-Stack Web Application",
    description: "Enterprise-grade event catering management system with interactive booking engines and dynamic scheduler pipelines.",
    longDescription: "A comprehensive, commercial web application designed to manage catering bookings, customize multi-course culinary menus, generate invoice statements dynamically, and track delivery routes for executive dining operations.",
    mockupType: "laptop",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-500 via-orange-400 to-rose-500",
    techStack: ["React", "Node.js", "Express", "Redux", "MongoDB", "Tailwind CSS", "Stripe API"],
    githubUrl: "https://github.com/Jayanth2426",
    liveUrl: "https://catering.jayanth.ai",
    timeline: "Jun 2024 - Oct 2024",
    challenges: "Coordinating menu inventory with real-time dynamic booking intervals was prone to double-booking and delivery delays.",
    solutions: "Developed a custom calendar scheduler with dynamic resource allocation locks and automated alerts using Twilio APIs.",
    metrics: ["Managed 150+ large scale catering events", "Reduced booking coordination time by 60%", "Zero double-booking conflicts across 1,200 orders"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages-db",
    title: "Languages & Databases",
    skills: [
      { name: "Python", level: 90, icon: "Code", glowColor: "rgba(234, 179, 8, 0.5)" },
      { name: "SQL", level: 88, icon: "Database", glowColor: "rgba(59, 130, 246, 0.5)" },
      { name: "HTML/CSS", level: 85, icon: "Layers", glowColor: "rgba(239, 68, 68, 0.5)" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    skills: [
      { name: "PyTorch", level: 88, icon: "Cpu", glowColor: "rgba(239, 68, 68, 0.5)" },
      { name: "TensorFlow", level: 85, icon: "Network", glowColor: "rgba(249, 115, 22, 0.5)" },
      { name: "LLMs", level: 89, icon: "Sparkles", glowColor: "rgba(6, 182, 212, 0.5)" }
    ]
  },
  {
    id: "web-backend",
    title: "Web & Backend",
    skills: [
      { name: "Node.js", level: 86, icon: "Server", glowColor: "rgba(34, 197, 94, 0.5)" },
      { name: "Tailwind CSS", level: 90, icon: "Paintbrush", glowColor: "rgba(6, 182, 212, 0.5)" }
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 82, icon: "Cloud", glowColor: "rgba(249, 115, 22, 0.5)" },
      { name: "GitHub Actions", level: 84, icon: "GitBranch", glowColor: "rgba(255, 255, 255, 0.3)" }
    ]
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    role: "AI Developer Intern",
    company: "Viswam Summer of AI",
    location: "Sweecha Telangana & IIIT Hyderabad (Hybrid)",
    period: "April 2025 - June 2025",
    description: [
      "Collaborated on regional language and translation data structures under Sweecha Telangana & IIIT Hyderabad guidelines.",
      "Developed custom Machine Learning and Computer Vision pipelines to index localized image resources.",
      "Contributed to model optimization routines for regional text generation datasets, improving inference rates."
    ],
    skills: ["Python", "TensorFlow", "Computer Vision", "NLP", "Linux"]
  },
  {
    id: "exp-2",
    role: "Youth Officer Intern",
    company: "Pawzz Foundation (NGO)",
    location: "Hyderabad, India (Hybrid)",
    period: "Nov 2025 - Jan 2026",
    description: [
      "Advocated for national animal welfare, youth mobilization initiatives, and strategic digital campaigns.",
      "Coordinated community collaboration channels and processed data management tasks for local campaigns.",
      "Managed hybrid volunteer coordination systems to scale grassroots rescue and outreach tasks."
    ],
    skills: ["Data Management", "Public Communication", "Event Coordination", "Digital Advocacy"]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology in CSE- AI & ML",
    institution: "Geethanjali College Of Engineering And Technology",
    location: "Hyderabad, India",
    period: "2024 - 2027",
    gpa: "7.5 CGPA",
    details: [
      "Currently Pursuing a Bachelor of Technology in CSE- AI & ML (Undergraduate Program).",
      "Focusing on core artificial intelligence architectures, machine learning algorithms, and deep neural networks.",
      "Active participant in technical symposiums, research clubs, and algorithm development workshops."
    ]
  },
  {
    id: "edu-2",
    degree: "Higher Secondary Education (Class XII)",
    institution: "Nano Junior College",
    location: "Hyderabad, India",
    period: "2021 - 2023",
    gpa: "66%",
    details: [
      "Concentration in MPC (Mathematics, Physics, Chemistry).",
      "Developed basic logical problem-solving foundations and core mathematics principles."
    ]
  },
  {
    id: "edu-3",
    degree: "High School Education (Class I - X)",
    institution: "ST. Anthony's High School",
    location: "Hyderabad, India",
    period: "Graduated 2021",
    gpa: "9.3 CGPA",
    details: [
      "Completed secondary education (2021 Batch) with exceptional academic honors.",
      "Participated in active school level quiz contests and science model exhibits."
    ]
  }
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cert-1",
    title: "Google Cloud Certified Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "Dec 2025",
    credentialUrl: "https://google.com",
    skillsLearned: ["Google Kubernetes Engine", "Compute Engine", "IAM Security", "Cloud SQL", "VPCs"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "cert-cisco-1",
    title: "CLA: Programming Essentials in C",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialUrl: "https://www.netacad.com",
    skillsLearned: ["C Programming", "Control Flow", "Memory Management", "Arrays & Pointers", "Structures & Functions"],
    color: "from-cyan-600 to-teal-600"
  },
  {
    id: "cert-cisco-2",
    title: "Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialUrl: "https://www.netacad.com",
    skillsLearned: ["Network Architectures", "IP Addressing (IPv4/IPv6)", "Subnetting", "Ethernet Concepts", "Cisco Router/Switch Configs"],
    color: "from-indigo-600 to-blue-500"
  },
  {
    id: "cert-cisco-3",
    title: "Network Technician",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialUrl: "https://www.netacad.com",
    skillsLearned: ["Network Troubleshooting", "L2/L3 Routing", "WLAN Security Protocols", "Device Configuration"],
    color: "from-sky-500 to-emerald-600"
  },
  {
    id: "cert-cisco-4",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialUrl: "https://www.netacad.com",
    skillsLearned: ["Python Syntax", "Data Types", "Flow Control", "Functions & Scopes", "Data Structures"],
    color: "from-yellow-600 to-amber-500"
  },
  {
    id: "cert-cisco-5",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialUrl: "https://www.netacad.com",
    skillsLearned: ["Threat Landscape", "Data Protection", "Vulnerability Auditing", "Cryptography Essentials", "Risk Management"],
    color: "from-rose-600 to-purple-600"
  },
  {
    id: "cert-oracle-1",
    title: "Java Fundamentals",
    issuer: "Oracle Academy",
    date: "2024",
    credentialUrl: "https://academy.oracle.com",
    skillsLearned: ["Java Syntax", "Object-Oriented Programming", "Classes & Inheritances", "Data Structures"],
    color: "from-orange-600 to-red-500"
  },
  {
    id: "cert-oracle-2",
    title: "Java Foundations",
    issuer: "Oracle Academy",
    date: "2024",
    credentialUrl: "https://academy.oracle.com",
    skillsLearned: ["Software Logic Flow", "Variable Lifecycles", "Debugging Basics", "Functional Design"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "cert-oracle-3",
    title: "Database Design",
    issuer: "Oracle Academy",
    date: "2024",
    credentialUrl: "https://academy.oracle.com",
    skillsLearned: ["Entity-Relationship Diagrams", "Database Normalization", "Relational Mapping", "Keys & Constraints"],
    color: "from-emerald-600 to-cyan-600"
  },
  {
    id: "cert-oracle-4",
    title: "Database Programming with SQL",
    issuer: "Oracle Academy",
    date: "2024",
    credentialUrl: "https://academy.oracle.com",
    skillsLearned: ["Structured Query Language (SQL)", "DML / DQL Statements", "Aggregates & Joins", "Subqueries"],
    color: "from-blue-600 to-indigo-600"
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "ach-1",
    title: "GitHub Contributions",
    metric: "1,200+ Commits",
    platform: "GitHub",
    rank: "Highly Active",
    detail: "Developed and maintained active open-source repositories with CI/CD integrations and documentation.",
    iconName: "GitCommit",
    url: "https://github.com/Jayanth2426"
  },
  {
    id: "ach-2",
    title: "ISRC Research Presenter",
    metric: "International Level",
    platform: "ISRC 2023",
    rank: "Conference Presenter",
    detail: "Participated in the International Student Research Conference (ISRC) 2023 held by Westford University College & UCAM University, presenting a research paper on Emerging Technologies and their impact on the future.",
    iconName: "BookOpen"
  },
  {
    id: "ach-3",
    title: "Best Presenter Award",
    metric: "Rachakonda Security Council",
    platform: "Anti-Drug Summit 2023",
    rank: "1st Place Presenter",
    detail: "Participated in the Anti-Drug Abuse Summit held by Rachakonda Security Council in collaboration with Rachakonda Commissionerate at BITS Pilani Hyderabad campus, and won the Best Presenter Award.",
    iconName: "Award"
  }
];
