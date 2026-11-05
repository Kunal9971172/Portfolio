// Featured projects. Only facts from the verified brief are included.

export type Project = {
  slug: string;
  index: string;
  name: string;
  title: string;
  category: string;
  status: string;
  oneLiner: string;
  summary: string;
  concept?: string;
  stack: string[];
  features: string[];
  problem: string;
  solution: string;
  architecture: { label: string; detail: string }[];
  contribution: string;
  limitations: string[];
  github: string | null;
  demo: string | null;
  screenshot: string | null;
};

export const projects: Project[] = [
  {
    slug: "gurukul-ai",
    index: "01",
    name: "Gurukul.ai",
    title: "Intelligent Coding Assessment & Student Analytics Platform",
    category: "EdTech · Full-Stack",
    status: "Working Project",
    oneLiner: "Assessment platform pairing Monaco Editor and Judge0 with real-time student keystroke telemetry.",
    summary:
      "A LeetCode-inspired coding assessment platform where students solve challenges in Monaco Editor and teachers inspect coding behavior, not just final test submissions.",
    concept: "Understanding how students code, not just what they submit.",
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Monaco Editor",
      "Judge0 API",
    ],
    features: [
      "Interactive code editor with syntax highlighting",
      "Code execution via Judge0 API",
      "Real-time keystroke & backspace telemetry",
      "Predefined test-case evaluation",
      "Teacher-facing student activity analytics",
    ],
    problem:
      "Traditional assessment tools only show the final submission, leaving educators blind to how a student arrived at a solution.",
    solution:
      "Pair an online code runner with lightweight keystroke activity tracking so instructors gain genuine visibility into problem-solving patterns.",
    architecture: [
      { label: "Client Layer", detail: "Next.js dashboard with integrated Monaco Editor and live runner interface." },
      { label: "Telemetry Engine", detail: "Captures timestamps, backspaces, and paste events during problem solving." },
      { label: "Execution Sandbox", detail: "Judge0 API evaluates code against isolated test suites." },
      { label: "Data Store", detail: "MongoDB persists challenges, submissions, and telemetry timelines." },
    ],
    contribution: "Developed full-stack architecture, Monaco editor integration, and custom keystroke telemetry tracking system.",
    limitations: [
      "Activity tracking describes coding behavior; it is not plagiarism or cheating detection.",
    ],
    github: null,
    demo: null,
    screenshot: null,
  },
  {
    slug: "edureach",
    index: "02",
    name: "EduReach",
    title: "AI-Powered College Information & Admission Assistance Platform",
    category: "Applied AI · Full-Stack",
    status: "Developed",
    oneLiner: "AI admission assistant with Sarvam AI Agentic RAG, multilingual support, and voice query.",
    summary:
      "A full-stack college information platform featuring an AI conversational assistant grounded in college documentation to answer prospective student queries.",
    concept: "Instant, verified academic guidance in multiple regional languages.",
    stack: [
      "React 19",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Sarvam AI",
      "Agentic RAG",
    ],
    features: [
      "Grounded conversational AI over official college documents",
      "Multilingual natural language support (English, Hindi, Marathi)",
      "Voice-to-text student inquiry",
      "Lead generation and inquiry summarization for staff",
      "Google OAuth with JWT session management",
    ],
    problem:
      "Prospective students struggle to find verified admission details scattered across complex university portals and regional dialects.",
    solution:
      "An Agentic RAG assistant grounded directly in institutional knowledge that answers questions accurately in regional languages.",
    architecture: [
      { label: "Frontend", detail: "Modern React 19 interface with voice input and conversational streaming." },
      { label: "Agentic RAG", detail: "Retrieves context chunks from indexed institutional data to prevent hallucinations." },
      { label: "Sarvam AI LLM", detail: "Handles multilingual translation and natural response generation." },
      { label: "Admin Store", detail: "MongoDB stores conversation transcripts, inquiries, and summaries." },
    ],
    contribution: "Built the RAG retrieval pipeline, Sarvam AI integration, backend API, and responsive conversational UI.",
    limitations: ["Evaluated on campus institutional data; scaled for prospective admissions."],
    github: null,
    demo: null,
    screenshot: null,
  },
  {
    slug: "workflow-ai",
    index: "03",
    name: "WorkflowAI",
    title: "Visual Multi-Agent AI Automation Platform",
    category: "AI Automation · Agents",
    status: "Developed",
    oneLiner: "Multi-agent automation platform coordinating planning, tool execution, and automated recovery.",
    summary:
      "A multi-agent automation platform that coordinates specialized AI agents through planning, execution, validation, and self-healing recovery loops.",
    concept: "Reliable agent orchestration with self-healing recovery.",
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Sarvam AI",
      "Google APIs",
    ],
    features: [
      "Goal decomposition via Planning Agent",
      "Tool-calling execution across Google Sheets and Gmail",
      "Validation agent output integrity checks",
      "Self-healing automated retry and recovery loop",
      "Real-time pipeline monitoring",
    ],
    problem:
      "Single-agent LLM automations break easily when tools fail and lack observability into where errors occurred.",
    solution:
      "Split workflows into specialized Planning, Execution, and Validation agents wrapped in automatic recovery loops.",
    architecture: [
      { label: "Planning Agent", detail: "Deconstructs natural language user goals into structured DAG execution steps." },
      { label: "Execution Agent", detail: "Dispatches tool calls across third-party services and APIs." },
      { label: "Validation Agent", detail: "Inspects output contracts before advancing pipeline state." },
      { label: "Recovery Engine", detail: "Catches step failures and issues automatic self-healing retries." },
    ],
    contribution: "Designed and implemented multi-agent workflow pipelines and tool integrations.",
    limitations: ["Not described as fully autonomous or production-scale."],
    github: null,
    demo: null,
    screenshot: null,
  },
  {
    slug: "heart-disease-predictor",
    index: "04",
    name: "Heart Disease Predictor",
    title: "Clinical Machine Learning Cardiovascular Risk Classification Suite",
    category: "Machine Learning · Healthcare",
    status: "Evaluated",
    oneLiner: "Comparative ML benchmark evaluating five classification models with PCA/LDA feature projection.",
    summary:
      "A clinical machine learning benchmark comparing Logistic Regression, Decision Trees, Random Forest, SVM, and KNN with PCA/LDA dimensionality reduction for cardiac risk assessment.",
    concept: "Algorithmic comparison prioritizing sensitivity to minimize false negatives.",
    stack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "PCA & LDA",
      "Seaborn",
    ],
    features: [
      "Comparative benchmark of 5 classifiers (Random Forest, SVM, KNN, DT, LR)",
      "Unsupervised PCA capturing 95% variance",
      "Supervised LDA feature projection for risk boundary separation",
      "Sensitivity / Recall optimization to minimize clinical false negatives",
      "Correlation heatmaps and confusion matrix analysis",
    ],
    problem:
      "Cardiovascular risk assessment demands high recall to ensure potential cardiac issues are not missed by false-negative predictions.",
    solution:
      "Normalized clinical feature vectors and benchmarked multiple algorithms alongside PCA/LDA to maximize predictive recall and explainability.",
    architecture: [
      { label: "Data Pipeline", detail: "Biometric standardization and categorical feature encoding." },
      { label: "Projection", detail: "PCA preserves 95% variance; LDA separates risk distributions." },
      { label: "Classifier Zoo", detail: "Trains and cross-validates 5 distinct machine learning models." },
      { label: "Diagnostics", detail: "Generates precision-recall trade-offs and confusion matrices." },
    ],
    contribution: "Built preprocessing pipeline, trained classifiers, applied dimensionality reduction, and generated benchmark reports.",
    limitations: [
      "Evaluated on benchmark clinical datasets; intended for research and decision support.",
    ],
    github: null,
    demo: null,
    screenshot: null,
  },
];

export const workflowExamples = [
  "Google Sheets row update to formatted report",
  "Automated email triage and summarized response drafting",
  "Image processing pipeline with automated metadata extraction",
  "Scheduled notification campaign automation",
];

export const otherWork = [
  {
    name: "Machine Learning Classification Suite",
    period: "2026",
    detail:
      "Compared 5 classification algorithms on healthcare datasets with PCA/LDA dimensionality reduction and comprehensive metric validation.",
  },
  {
    name: "AI-Assisted Operating Environment",
    period: "2026 – Present",
    detail:
      "Research prototype combining system-level telemetry with local natural-language command dispatching.",
  },
];
