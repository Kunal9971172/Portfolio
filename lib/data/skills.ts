// Skills and Technical Stack: Organized cleanly into 5 visual categories
// Free of percentages and bloated descriptions; focused on actual competencies.

export interface SkillGroup {
  group: string;
  category: "Programming" | "AI & Machine Learning" | "Data Science" | "Full-Stack Development" | "Tools & Technologies";
  items: string[];
}

export const skillCategories = [
  {
    group: "Programming",
    items: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    group: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Supervised Learning",
      "Classification & Regression",
      "SVM & Random Forest",
      "NLP",
      "Scikit-learn",
    ],
  },
  {
    group: "Data Science",
    items: [
      "PCA & LDA",
      "Pandas & NumPy",
      "Matplotlib & Seaborn",
      "Feature Engineering",
      "Clinical Diagnostics",
    ],
  },
  {
    group: "Full-Stack Development",
    items: [
      "React 19",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
    ],
  },
  {
    group: "Tools & Technologies",
    items: [
      "Git & GitHub",
      "VS Code",
      "Jupyter",
      "Judge0 API",
      "Vercel",
      "Netlify",
    ],
  },
];

// Preserving currentlyUsed export for backward compatibility
export const currentlyUsed = skillCategories;

export const strengthening = [
  "Agentic RAG",
  "LLM Orchestration",
  "Deep Learning",
  "System Architecture",
];

export const interests = [
  "Agentic AI",
  "Distributed Systems",
  "Healthcare ML",
  "Product Engineering",
];
