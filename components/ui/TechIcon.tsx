import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "h-3.5 w-3.5 shrink-0" }: TechIconProps) {
  switch (name) {
    // PROGRAMMING
    case "Python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M11.927 2C7.388 2 7.67 3.968 7.67 3.968l.005 2.052h4.316v.616H5.918S3 6.302 3 10.871s2.553 4.453 2.553 4.453h1.523v-2.148s-.083-2.553 2.51-2.553h4.317s2.427.039 2.427-2.385V6.353S16.89 2 11.927 2z"
            fill="#3776AB"
          />
          <circle cx="9.22" cy="4.25" r=".7" fill="#fff" />
          <path
            d="M12.073 22c4.539 0 4.257-1.968 4.257-1.968l-.005-2.052h-4.316v-.616h6.073S21 17.698 21 13.129s-2.553-4.453-2.553-4.453h-1.523v2.148s.083 2.553-2.51 2.553H10.1s-2.427-.039-2.427 2.385v4.887S7.11 22 12.073 22z"
            fill="#FFD438"
          />
          <circle cx="14.78" cy="19.75" r=".7" fill="#fff" />
        </svg>
      );

    case "C++":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#00599C" />
          <path
            d="M11.5 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4 1.5h1v1.5h1.5v1H16.5v1.5h-1V12.5H14v-1h1.5V10zm4 0h1v1.5h1.5v1H20.5v1.5h-1V12.5H18v-1h1.5V10z"
            fill="#fff"
          />
        </svg>
      );

    case "Java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M8.8 17.8c0 0-1.8.3 1.2.5 3.6.2 5.6-.2 5.6-.2s-1 .5-3.3.7c-3.1.3-6.1-.2-6.1-.2s.9.4 3.7.5c4 .2 7.7-.3 7.7-.3s-2.2.8-5.7.9c-4.4.1-8.5-.6-8.5-.6s1.8.6 5.8.6c4.6 0 9.2-.8 9.2-.8s-3.5 1-9.2 1c-3.9 0-7.8-.5-7.8-.5s2.4.9 6.8 1c5.2.1 11-.7 11-.7s-4.3 1.2-11.4 1.1c-3.8 0-6.6-.5-6.6-.5s3.2 1.1 8 1.1c5.8 0 10.9-.9 10.9-.9"
            stroke="#E76F00"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M14.5 9c0 0 1.2-1.2-1.2-2.8-2.6-1.7-1.5-3.2-1.5-3.2s-.5 1 .9 2.2c1.7 1.4 1.8 2.6 1.8 3.8zM17 11.5c0 0 1.5-1.5-1.5-3.5-3.2-2.1-1.8-4-1.8-4s-.6 1.2 1.1 2.7c2.1 1.7 2.2 3.3 2.2 4.8z"
            fill="#5382A1"
          />
        </svg>
      );

    case "JavaScript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M7 17.5c.8.5 1.7.8 2.6.8 1.4 0 2.3-.7 2.3-2.1v-5.2h-1.8v5.1c0 .6-.3.9-.9.9-.5 0-.9-.2-1.2-.4l-1 1zm8.3.1c1.2.6 2.5 1 3.7 1 2.2 0 3.5-1.1 3.5-2.8 0-1.6-1-2.4-2.7-3.1-1.1-.5-1.7-.8-1.7-1.4 0-.5.4-.9 1.3-.9.9 0 1.8.3 2.5.7l.7-1.5c-.8-.5-1.9-.8-3.1-.8-2.1 0-3.3 1.1-3.3 2.7 0 1.5.9 2.4 2.6 3 1.2.5 1.8.9 1.8 1.5 0 .6-.5 1-1.4 1-1.1 0-2.2-.4-3-.9l-.9 1.6z"
            fill="#000"
          />
        </svg>
      );

    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            d="M4 11h7v2H8.6v7H6.4v-7H4v-2zm9.8 4.7c.9.5 2 .8 3 .8 1.4 0 2.2-.6 2.2-1.6 0-1-.8-1.5-2.2-2-1.7-.6-2.8-1.4-2.8-2.8 0-1.8 1.4-3.1 3.6-3.1 1.2 0 2.3.3 3.1.8l-.7 1.7c-.7-.4-1.6-.7-2.4-.7-1.1 0-1.7.5-1.7 1.2 0 .8.7 1.2 2 1.7 1.8.7 3 1.5 3 3.1 0 1.9-1.4 3.2-3.9 3.2-1.3 0-2.6-.4-3.5-1l.6-1.9z"
            fill="#fff"
          />
        </svg>
      );

    case "SQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#00758F" strokeWidth="2" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#00758F" strokeWidth="2" />
        </svg>
      );

    // FULL-STACK DEVELOPMENT
    case "React 19":
    case "React":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="10"
            stroke="#61DAFB"
            strokeWidth="1.5"
            transform="rotate(30 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="10"
            stroke="#61DAFB"
            strokeWidth="1.5"
            transform="rotate(90 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="10"
            stroke="#61DAFB"
            strokeWidth="1.5"
            transform="rotate(150 12 12)"
          />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.2" />
          <path d="M8.5 7v10h2V11.2l5.8 7.3h1.7V7h-2v5.8L10.2 7H8.5z" fill="#fff" />
        </svg>
      );

    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" fill="#5FA04E" />
          <path d="M12 4.5l6.5 3.8v7.4L12 19.5l-6.5-3.8V8.3L12 4.5z" fill="#1e293b" />
          <path d="M12 7l4 2.3v4.6L12 16.2l-4-2.3V9.3L12 7z" fill="#5FA04E" />
        </svg>
      );

    case "Express.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#1e293b" />
          <path
            d="M6 8l3 4-3 4h2.2l1.9-2.7 1.9 2.7H14l-3-4 3-4h-2.2L9.9 10.7 8 8H6zm8.5 0v8h1.8v-3.2h2.5c1.4 0 2.2-.8 2.2-2.4 0-1.6-.8-2.4-2.2-2.4h-4.3zm1.8 1.5h2.2c.6 0 .9.3.9.9s-.3.9-.9.9h-2.2V9.5z"
            fill="#38BDF8"
          />
        </svg>
      );

    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2c0 0-6 4-6 11 0 4.5 3.5 7.5 5.5 8.8.3.2.5.2.5.2v-20z" fill="#47A248" />
          <path d="M12 2c0 0 6 4 6 11 0 4.5-3.5 7.5-5.5 8.8-.3.2-.5.2-.5.2v-20z" fill="#499D4A" />
          <path
            d="M12 22s-.2-.3-.5-.7c-.8-1.1-1.2-2.5-1.2-3.8 0-3 1.7-5.5 1.7-5.5s1.7 2.5 1.7 5.5c0 1.3-.4 2.7-1.2 3.8-.3.4-.5.7-.5.7z"
            fill="#fff"
          />
        </svg>
      );

    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 6c-2.7 0-4.4 1.3-5.1 4 .9-1.3 2-1.8 3.3-1.4.7.2 1.3.8 1.9 1.4C13.1 11 14.3 12 17 12c2.7 0 4.4-1.3 5.1-4-.9 1.3-2 1.8-3.3 1.4-.7-.2-1.3-.8-1.9-1.4C15.9 7 14.7 6 12 6zM7 12c-2.7 0-4.4 1.3-5.1 4 .9-1.3 2-1.8 3.3-1.4.7.2 1.3.8 1.9 1.4C8.1 17 9.3 18 12 18c2.7 0 4.4-1.3 5.1-4-.9 1.3-2 1.8-3.3 1.4-.7-.2-1.3-.8-1.9-1.4C10.9 13 9.7 12 7 12z"
            fill="#06B6D4"
          />
        </svg>
      );

    case "REST APIs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="2">
          <path d="M8 9l3 3-3 3M16 15l-3-3 3-3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        </svg>
      );

    // TOOLS & TECHNOLOGIES
    case "Git & GitHub":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fill="#F05032"
          />
        </svg>
      );

    case "VS Code":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M17.5 2.5l4 2v15l-4 2-9-8.5 9-10.5z" fill="#007ACC" />
          <path d="M17.5 19.5L8.5 11l-4.5 3.5 3.5 3.5 10 1.5z" fill="#1F9CF0" />
          <path d="M17.5 4.5L8.5 13l-4.5-3.5L7.5 6l10-1.5z" fill="#0066B8" />
          <path d="M4 9.5L7.5 6 4 3.5v6zM4 14.5l3.5 3.5L4 20.5v-6z" fill="#007ACC" />
        </svg>
      );

    case "Jupyter":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="6" rx="8" ry="2.5" fill="#F37626" />
          <ellipse cx="12" cy="18" rx="8" ry="2.5" fill="#767677" />
          <circle cx="12" cy="12" r="1.5" fill="#F37626" />
          <circle cx="5" cy="12" r="1.5" fill="#767677" />
          <circle cx="19" cy="12" r="1.5" fill="#767677" />
        </svg>
      );

    case "Judge0 API":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#0284C7" />
          <path d="M7 12l3-3m0 6l-3-3m6 4h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 3l10 17H2L12 3z" fill="#fff" />
        </svg>
      );

    case "Netlify":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2l4.5 4.5-3 3 5 5-2.5 2.5L12 13l-4 4-2.5-2.5 5-5-3-3L12 2z" fill="#00C7B7" />
          <circle cx="12" cy="12" r="2" fill="#fff" />
        </svg>
      );

    // AI & MACHINE LEARNING
    case "Scikit-learn":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 3a9 9 0 00-9 9 9 9 0 009 9c4.97 0 9-4.03 9-9a9 9 0 00-9-9z" fill="#F89939" />
          <path d="M12 3a9 9 0 019 9c0 4.97-4.03 9-9 9V3z" fill="#3499CD" />
          <circle cx="12" cy="8" r="2" fill="#fff" />
          <circle cx="8" cy="14" r="2" fill="#fff" />
          <circle cx="16" cy="14" r="2" fill="#fff" />
          <path d="M12 8L8 14m4-6l4 6" stroke="#fff" strokeWidth="1.5" />
        </svg>
      );

    case "Machine Learning":
    case "Deep Learning":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
        </svg>
      );

    case "Supervised Learning":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" stroke="#A855F7" />
          <circle cx="12" cy="12" r="1.5" fill="#38BDF8" />
        </svg>
      );

    case "Classification & Regression":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="2">
          <circle cx="6" cy="6" r="2.5" fill="#38BDF8" />
          <circle cx="18" cy="18" r="2.5" fill="#A855F7" />
          <path d="M4 20L20 4" stroke="#64748B" strokeDasharray="2 2" />
        </svg>
      );

    case "SVM & Random Forest":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l4 6h-3l4 6h-3l3 5H7l3-5H7l4-6H8l4-6z" fill="#10B981" fillOpacity="0.25" />
        </svg>
      );

    case "NLP":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8m-8 4h5" stroke="#A855F7" />
        </svg>
      );

    // DATA SCIENCE
    case "Pandas & NumPy":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="3" y="5" width="4" height="14" rx="1" fill="#150458" />
          <rect x="8" y="9" width="4" height="10" rx="1" fill="#FFD43B" />
          <rect x="13" y="11" width="4" height="8" rx="1" fill="#E70488" />
          <rect x="17" y="14" width="4" height="5" rx="1" fill="#00A8E8" />
        </svg>
      );

    case "Matplotlib & Seaborn":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 20h18" stroke="#64748B" strokeWidth="1.5" />
          <path d="M4 16c3-8 6 2 9-6s4 8 7 3" stroke="#38BDF8" strokeWidth="2" />
          <path d="M4 18c3-4 5 1 8-3s5 5 8 1" stroke="#A855F7" strokeWidth="2" />
        </svg>
      );

    case "PCA & LDA":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#60A5FA"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18M3 3v18" />
          <path d="M5 19l14-14m-14 7l7-7" stroke="#A855F7" />
          <circle cx="10" cy="10" r="1.5" fill="#38BDF8" />
          <circle cx="16" cy="7" r="1.5" fill="#38BDF8" />
        </svg>
      );

    case "Feature Engineering":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <circle cx="4" cy="12" r="2" fill="#38BDF8" />
          <circle cx="12" cy="10" r="2" fill="#A855F7" />
          <circle cx="20" cy="14" r="2" fill="#38BDF8" />
        </svg>
      );

    case "Clinical Diagnostics":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#EF4444"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );

    // ACTIVE RESEARCH & FRONTIER
    case "Agentic RAG":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="16" height="12" rx="2" />
          <path d="M12 2v2M9 16v4M15 16v4M9 20h6" />
          <circle cx="9" cy="10" r="1.5" fill="#38BDF8" />
          <circle cx="15" cy="10" r="1.5" fill="#38BDF8" />
        </svg>
      );

    case "LLM Orchestration":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <path d="M8.5 7.5l5 7m2-7l-5 7" />
        </svg>
      );

    case "System Architecture":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" fill="#38BDF8" />
        </svg>
      );
  }
}

