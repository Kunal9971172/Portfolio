export * from "./profile";
export * from "./projects";
export * from "./experience";
export * from "./skills";
export * from "./mission-control";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/mission-control", label: "Mission Control" },
  { href: "/contact", label: "Contact" },
] as const;
