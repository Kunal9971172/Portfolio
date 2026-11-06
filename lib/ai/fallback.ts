import type { Chunk } from "@/lib/knowledge-base/chunks";
import { profile, projects, experience, education, achievements, clientWork } from "@/lib/data";

export type FallbackResult = {
  answer: string;
  suggestions: string[];
};

export function synthesizeFallbackAnswer(query: string, chunks: Chunk[], previousQuery = ""): FallbackResult {
  const combined = `${previousQuery} ${query}`.toLowerCase();
  const q = query.toLowerCase();

  // 1. Identify if a specific project is the subject
  const project = projects.find((p) =>
    combined.includes(p.slug) ||
    combined.includes(p.name.toLowerCase()) ||
    (p.slug === "workflow-ai" && combined.includes("workflow")) ||
    (p.slug === "heart-disease-predictor" && (combined.includes("heart") || combined.includes("cardio"))) ||
    (p.slug === "edureach" && combined.includes("edu")) ||
    (p.slug === "gurukul-ai" && combined.includes("gurukul"))
  );

  if (project) {
    // Follow-up: Architecture
    if (q.includes("architecture") || q.includes("component") || q.includes("flow") || q.includes("how it works")) {
      return {
        answer: `### Architecture: ${project.name}

${project.name} is engineered with a modular system pipeline:

${project.architecture.map((a, i) => `**0${i + 1}. ${a.label}**\n${a.detail}`).join("\n\n")}

**Technology Stack**:
\`${project.stack.join(" · ")}\`

**Scope & Limits**:
${project.limitations.join(" ")}`,
        suggestions: [
          `What was Kunal's contribution to ${project.name}?`,
          `What are the key features of ${project.name}?`,
          "Explore other engineering projects",
        ],
      };
    }

    // Follow-up: Kunal's contribution
    if (q.includes("contribution") || q.includes("role") || q.includes("what did he do") || q.includes("build")) {
      return {
        answer: `### Kunal's Contribution to ${project.name}

${project.contribution}

**Project Status**:
${project.status}

**Integrity & Engineering Bounds**:
${project.limitations.join(" ")}`,
        suggestions: [
          `Explain ${project.name}'s architecture`,
          `What tech stack does ${project.name} use?`,
          "Tell me about EduReach",
        ],
      };
    }

    // Follow-up: Tech Stack
    if (q.includes("stack") || q.includes("technolog") || q.includes("tool") || q.includes("framework")) {
      return {
        answer: `### Technology Stack: ${project.name}

${project.name} is built using the following technologies:

${project.stack.map((t) => `• \`${t}\``).join("\n")}

**Key Architectural Purpose**:
${project.solution}`,
        suggestions: [
          `Explain the architecture of ${project.name}`,
          `What was Kunal's contribution?`,
          "How does Judge0 work in Gurukul.ai?",
        ],
      };
    }

    // Project General Overview
    return {
      answer: `### ${project.name}
*${project.title}*

${project.summary}

**The Problem**:
${project.problem}

**The Solution**:
${project.solution}

**Core Features**:
${project.features.map((f) => `• ${f}`).join("\n")}

**Tech Stack**:
\`${project.stack.join(" · ")}\``,
      suggestions: [
        `Explain the architecture of ${project.name}`,
        `What was Kunal's contribution?`,
        "Tell me about EduReach",
      ],
    };
  }

  // 2. Contact & Hiring Questions
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("interview") || q.includes("message")) {
    return {
      answer: `### Contact Kunal Chaudhari

Kunal is open to software engineering internships, AI research roles, and technical collaborations.

• **Direct Email**: [${profile.email}](mailto:${profile.email})
• **LinkedIn**: [Kunal Chaudhari](${profile.linkedin})
• **GitHub**: [Kunal9971172](${profile.github})
• **Location**: ${profile.location}

You can also download his verified one-page engineering resume PDF directly using the Resume button in the navigation bar.`,
      suggestions: [
        "What are his core technical skills?",
        "Explain his technical projects",
        "What is his educational background?",
      ],
    };
  }

  // 3. Skills & Technologies Questions
  if (q.includes("skill") || q.includes("technolog") || q.includes("languages") || q.includes("stack") || q.includes("know")) {
    return {
      answer: `### Technical Competencies & Stack

Kunal's skills are organized across 5 core engineering domains:

• **Programming**: Python, C++, Java, JavaScript, TypeScript, SQL
• **AI & Machine Learning**: Machine Learning, Supervised Learning, Classification & Regression, SVM, Random Forest, NLP, Scikit-learn
• **Data Science**: PCA & LDA, Pandas & NumPy, Matplotlib & Seaborn, Feature Engineering, Clinical Diagnostics
• **Full-Stack Development**: React 19, Next.js, Node.js, Express.js, MongoDB, REST APIs, Tailwind CSS
• **Tools & Technologies**: Git & GitHub, VS Code, Jupyter, Judge0 API, Vercel, Netlify

He is also actively strengthening his expertise in **Agentic RAG**, **LLM Orchestration**, and **Distributed System Architecture**.`,
      suggestions: [
        "Explain his technical projects",
        "Tell me about Gurukul.ai",
        "What is his experience with AI and ML?",
      ],
    };
  }

  // 4. AI & Machine Learning Experience Questions
  if (q.includes("ai") || q.includes("machine learning") || q.includes("ml") || q.includes("rag") || q.includes("agent")) {
    return {
      answer: `### AI & Machine Learning Experience

Kunal specializes in **applied AI systems** and **classical machine learning**:

1. **Agentic RAG & LLMs**: In **EduReach**, he built a multilingual conversational assistant grounded in college documentation using Sarvam AI and vector retrieval.
2. **Multi-Agent Orchestration**: In **WorkflowAI**, he architected self-healing multi-agent pipelines with Planning, Execution, Validation, and automated recovery loops.
3. **Clinical Machine Learning**: In **Heart Disease Predictor**, he benchmarked 5 classification algorithms (Random Forest, SVM, KNN, Decision Tree, Logistic Regression) with PCA/LDA dimensionality reduction, optimizing recall to minimize false-negative clinical risks.
4. **Academic Foundation**: Rigorous coursework in Artificial Intelligence, ML, NLP, and Data Science at Dr. D. Y. Patil (SPPU) with an **8.99 / 10 CGPA**.`,
      suggestions: [
        "Tell me about WorkflowAI",
        "Explain Heart Disease Predictor's ML benchmarks",
        "Explain EduReach's Agentic RAG architecture",
      ],
    };
  }

  // 5. Education & Academics Questions
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("cgpa") || q.includes("academic") || q.includes("gpa")) {
    const e = education[0];
    return {
      answer: `### Educational Background

• **Degree**: ${e.degree}
• **Institution**: ${e.institution}
• **Affiliation**: ${e.university}
• **Academic Period**: ${e.period}
• **Cumulative CGPA**: **${e.cgpa}**

**Core Coursework**:
${e.coursework.map((c) => `• ${c}`).join("\n")}`,
      suggestions: [
        "What honors and achievements has he earned?",
        "What are his core technical skills?",
        "Tell me about Gurukul.ai",
      ],
    };
  }

  // 6. Experience, Internships, & Teaching Questions
  if (q.includes("experience") || q.includes("intern") || q.includes("job") || q.includes("work") || q.includes("teaching") || q.includes("teach")) {
    return {
      answer: `### Professional Experience & Mentorship

${experience.map((e) => `• **${e.role}** — *${e.org}* (${e.period})\n  ${e.summary}`).join("\n\n")}

**Client Deliveries**:
${clientWork.map((c) => `• **${c.name}**: ${c.detail}`).join("\n")}`,
      suggestions: [
        "What are his achievements?",
        "Explain his technical projects",
        "How can I contact him?",
      ],
    };
  }

  // 7. Achievements, Awards, & Certifications Questions
  if (
    q.includes("achievement") ||
    q.includes("award") ||
    q.includes("honor") ||
    q.includes("certif") ||
    q.includes("prize") ||
    q.includes("infosys") ||
    q.includes("guardrail")
  ) {
    return {
      answer: `### Honors & Leadership

${achievements.map((a) => `• **${a.title}** (${a.year}): ${a.detail}`).join("\n")}

**Verified Certifications & Workshops**:
Python, JavaScript, SQL, HTML & CSS, Generative AI Workshop, MCP Architecture.`,
      suggestions: [
        "Who is Kunal?",
        "Explain his technical projects",
        "How can I contact him?",
      ],
    };
  }

  // 8. General Profile Overview ("Who is Kunal?")
  return {
    answer: `### Kunal Chaudhari
**AI & Data Science | Full-Stack Development | AI Systems**

Kunal is an Artificial Intelligence and Data Science engineering student at **Dr. D. Y. Patil Institute of Technology, Pune (SPPU)** with a consistent **8.99 / 10 CGPA**.

**Engineering Highlights**:
• **4 Core Systems Built**: Gurukul.ai (coding telemetry), EduReach (multilingual Agentic RAG), WorkflowAI (multi-agent orchestration), and Heart Disease Predictor (clinical ML benchmark).
• **Industry Experience**: UI/UX & Frontend Intern at Senovial Technologies; 3 years of ICSE technical teaching and mentorship.
• **Leadership**: Selected Google Student Ambassador for 2026; 2nd Prize in University Startup Competition.`,
    suggestions: [
      "Explain his technical projects",
      "What technologies does he work with?",
      "What is his experience with AI and ML?",
      "How can I contact him?",
    ],
  };
}
