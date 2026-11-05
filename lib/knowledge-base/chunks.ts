// Builds the chatbot's knowledge chunks from the same content files that power
// the website, so the assistant and the site cannot drift apart.
// Additional approved documents can be dropped into lib/knowledge-base/docs/*.md
// (see loadDocChunks in docs.ts).
//
// The phone number is deliberately never included.

import {
  achievements, certifications, clientWork, currentlyUsed, education, experience,
  interests, missionControl, otherWork, profile, projects, strengthening, workflowExamples,
} from "@/lib/data";

export type Chunk = {
  id: string;
  title: string;
  text: string;
  href?: string;
};

export function buildDataChunks(): Chunk[] {
  const c: Chunk[] = [];

  c.push({
    id: "profile",
    title: "Who is Kunal Chaudhari",
    href: "/about",
    text: `${profile.name} is an ${profile.title}, based in ${profile.location}. ${profile.positioning} ${profile.intro} Languages: ${profile.languages.join(", ")}.`,
  });

  const e = education[0];
  c.push({
    id: "education",
    title: "Education",
    href: "/about",
    text: `${e.degree} at ${e.institution}, affiliated with ${e.university}. ${e.period}. CGPA: ${e.cgpa}. Relevant coursework: ${e.coursework.join(", ")}.`,
  });

  c.push({
    id: "achievements",
    title: "Achievements",
    href: "/experience",
    text:
      "Achievements: " +
      achievements.map((a) => `${a.title} (${a.year}) — ${a.detail}`).join(" ") +
      ` Certifications and workshops: ${certifications.join(", ")}.`,
  });

  for (const g of currentlyUsed) {
    c.push({
      id: `skills-${g.group}`,
      title: `Skills: ${g.group}`,
      href: "/about",
      text: `Currently used in ${g.group}: ${g.items.join(", ")}.`,
    });
  }
  c.push({
    id: "skills-growing",
    title: "Skills being strengthened and interests",
    href: "/mission-control",
    text: `Currently strengthening (not yet strong skills): ${strengthening.join(", ")}. Areas of interest: ${interests.join(", ")}.`,
  });

  for (const x of experience) {
    c.push({
      id: `exp-${x.role}`,
      title: `Experience: ${x.role}`,
      href: "/experience",
      text: `${x.role} — ${x.org} (${x.period}). ${x.summary}`,
    });
  }
  c.push({
    id: "client-work",
    title: "Client web projects",
    href: "/experience",
    text: clientWork.map((w) => `${w.name}: ${w.detail}`).join(" "),
  });

  for (const p of projects) {
    const href = `/projects/${p.slug}`;
    c.push({
      id: `${p.slug}-overview`,
      title: `${p.name}: overview`,
      href,
      text: `${p.name} — ${p.title}. Category: ${p.category}. Status: ${p.status}. ${p.summary} ${p.concept ? `Core idea: "${p.concept}"` : ""} Tech stack: ${p.stack.join(", ")}.`,
    });
    c.push({
      id: `${p.slug}-features`,
      title: `${p.name}: features`,
      href,
      text: `${p.name} documented features: ${p.features.join("; ")}.`,
    });
    c.push({
      id: `${p.slug}-architecture`,
      title: `${p.name}: architecture`,
      href,
      text: `${p.name} architecture. Problem: ${p.problem} Solution: ${p.solution} Components: ${p.architecture.map((a) => `${a.label} (${a.detail})`).join(" ")}`,
    });
    c.push({
      id: `${p.slug}-limits`,
      title: `${p.name}: limitations and what is not claimed`,
      href,
      text: `${p.name} limitations: ${p.limitations.join(" ")} Specific personal contribution details, GitHub and live demo links are not yet published on this portfolio.`,
    });
  }
  c.push({
    id: "workflow-examples",
    title: "Workflow.ai demonstrated workflows",
    href: "/projects/workflow-ai",
    text: `Workflow.ai demonstrated workflow examples: ${workflowExamples.join("; ")}.`,
  });
  c.push({
    id: "other-work",
    title: "Other projects",
    href: "/projects",
    text: otherWork.map((o) => `${o.name} (${o.period}): ${o.detail}`).join(" "),
  });

  c.push({
    id: "mission",
    title: "Current focus, learning and goals",
    href: "/mission-control",
    text: `Current focus: ${missionControl.currentFocus}. Currently learning: ${missionControl.currentLearning.join(", ")}. Upcoming goals: ${missionControl.upcomingGoals.join("; ")}. Long-term vision: ${missionControl.longTermVision}`,
  });

  c.push({
    id: "availability",
    title: "Availability and internships",
    href: "/contact",
    text: `Kunal's availability for internships or roles has not been confirmed on this site; he has completed a UI/UX internship (Senovial Technologies, 2025). Recruiters should contact him directly by email to ask about opportunities.`,
  });

  c.push({
    id: "contact",
    title: "How to contact Kunal",
    href: "/contact",
    text: `Email: ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. A resume PDF can be downloaded from the website. Phone number is not shared publicly.`,
  });

  c.push({
    id: "philosophy",
    title: "Builder story and approach",
    href: "/about",
    text: "Kunal is an AI & Data Science engineering student who enjoys building practical applications with modern technologies, combining AI, software engineering, automation and product development to solve real-world problems. Projects include a coding assessment system, an AI-powered college assistant and multi-agent automation workflows; experience includes client website development, UI/UX work, technical teaching and campus technology engagement.",
  });

  return c;
}
