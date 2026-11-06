// Central profile content. Edit here; UI components only read from lib/data.
// Phone number is intentionally NOT included (private until approved).

export const profile = {
  name: "Kunal Chaudhari",
  brand: "KUNAL.CHAUDHARI",
  title: "AI & Data Science | Product Engineer | Full-Stack Developer",
  location: "Pune, India",
  headline: "Engineering Intelligent Systems.",
  positioningStatement: "AI & Data Science | Product Engineer & Full-Stack Developer",
  positioning:
    "Engineering intelligent applications, multi-agent systems, and scalable full-stack products.",
  intro:
    "Engineering student at Dr. D. Y. Patil (SPPU) specializing in AI, full-stack architectures, and applied machine learning.",
  cgpa: "8.99",
  openToOpportunities: { show: true, label: "Available for AI & Software Roles" },
  email: "hikunal2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/kunal-chaudhari-81bb22310",
  github: "https://github.com/Kunal9971172",
  resumePath: "/resume/Kunal_Chaudhari_Resume.pdf",
  portraitPath: "/images/kunal.png",
  languages: ["English", "Hindi", "Marathi"],
};

export const education = [
  {
    degree: "B.E. — Artificial Intelligence & Data Science",
    institution: "Dr. D. Y. Patil Institute of Technology, Pune",
    university: "Savitribai Phule Pune University",
    period: "2024–2028",
    cgpa: "8.99 / 10",
    coursework: [
      "Machine Learning",
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "NLP",
    ],
  },
];

export const achievements = [
  {
    title: "Google Student Ambassador",
    year: "2026",
    org: "Google",
    detail: "Selected as Google Student Ambassador for campus leadership, tech evangelism, and driving AI developer initiatives.",
    category: "Ecosystem Leadership",
    badge: "Official Ambassador",
  },
  {
    title: "2nd Prize — Startup Competition",
    year: "DYPIET",
    org: "DYPIET Pune",
    detail: "Awarded second prize for MyHealth360, building an integrated digital healthcare platform with predictive health telemetry.",
    category: "Healthcare Innovation",
    badge: "2nd Prize Winner",
  },
  {
    title: "Infosys Hackathon — AI Guardrail Project",
    year: "2025",
    org: "Infosys Springboard",
    detail: "Architected an intelligent AI Guardrail engine to intercept LLM hallucinations, neutralize adversarial prompt injections, and enforce deterministic output constraints.",
    category: "AI Security & GenAI Safety",
    badge: "Hackathon Project",
  },
];

export const certifications = [
  "Python",
  "JavaScript",
  "SQL",
  "HTML & CSS",
  "Generative AI Workshop",
  "MCP Architecture",
];

// Verified metrics
export const proofMetrics = [
  { label: "Systems Deployed", value: 4, suffix: "+", source: "Core Engineering Systems" },
  { label: "Academic CGPA", value: 8.99, suffix: "", decimals: 2, source: "SPPU (DY Patil)" },
  { label: "Google Ambassador", value: 2026, suffix: "", plain: true, source: "Official Selection" },
  { label: "Startup Competition", text: "2nd Prize", source: "MyHealth360 Project" },
] as const;
