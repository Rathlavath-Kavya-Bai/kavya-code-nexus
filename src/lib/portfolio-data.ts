/**
 * Central configuration for every external link and file used by the portfolio.
 *
 * HOW TO ADD REAL FILES / LINKS
 * ------------------------------
 * 1. Resume:
 *    - Drop your PDF at:  public/resume/Kavya_Bai_Rathlavath_Resume.pdf
 *    - Then set RESUME_URL below to "/resume/Kavya_Bai_Rathlavath_Resume.pdf"
 *    - Until then the UI shows an upload option (owner edit mode) instead of a broken link.
 *
 * 2. Certificates:
 *    - Drop each file at:  public/certificates/<file>.pdf|.png|.jpg|.webp
 *    - Then set `fileUrl` on the matching entry in CERTIFICATES.
 *
 * 3. Projects:
 *    - Fill in `githubUrl` / `liveUrl` with REAL URLs only.
 *    - Leave them empty ("") when they don't exist — the UI then shows a clear
 *      "Repository unavailable" / hides the demo button instead of a 404.
 */

export const GITHUB_PROFILE = "https://github.com/Rathlavath-Kavya-Bai";
export const LINKEDIN_PROFILE =
  "https://www.linkedin.com/in/rathlavath-kavya-bai-2a534a376";
export const EMAIL = "kavyabairathlavath@gmail.com";
export const PHONE = "+919391601350";
export const PHONE_DISPLAY = "+91 93916 01350";

/** Set once the real PDF exists in public/resume/. Empty = not uploaded yet. */
export const RESUME_URL = "/resume/Rathlavath_Kavya_Bai_Fresher_Resume.pdf";

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  role?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "ai-customer-support",
    title: "AI-Powered Customer Support & Service Automation",
    role: "Team Lead — 5-member team",
    description:
      "Built a Salesforce-based service automation system using Service Cloud, Flow Builder, Prompt Builder and Agentforce to automate case management, queue routing and warranty approvals for a customer support workflow.",
    technologies: ["Salesforce", "Service Cloud", "Flow Builder", "Prompt Builder", "Agentforce"],
    githubUrl: "",
    liveUrl: "",
    category: "Salesforce / AI",
  },
  {
    id: "nxt-trendz",
    title: "Nxt Trendz E-Commerce Application",
    description:
      "A modern e-commerce platform with product search, filtering, sorting, authentication and secure JWT login.",
    technologies: ["React.js", "JavaScript", "Bootstrap", "CSS", "REST APIs", "JWT"],
    githubUrl: "",
    liveUrl: "",
    category: "Web App",
  },
  {
    id: "zero-food-wastage",
    title: "Zero Food Wastage",
    description:
      "A solution idea aimed at reducing food wastage, developed and presented as part of the X-Horizon Hackathon.",
    technologies: ["X-Horizon Hackathon"],
    githubUrl: "",
    liveUrl: "",
    category: "Hackathon",
  },
  {
    id: "farmers-friendly",
    title: "Farmer's Friendly (Startup)",
    description:
      "AI-powered agriculture platform offering crop recommendations, weather alerts, livestock guidance, government schemes, market prices, expert support and a chatbot.",
    technologies: ["AI", "Machine Learning", "Python", "React", "APIs"],
    githubUrl: "",
    liveUrl: "",
    category: "Startup",
    featured: true,
  },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** Public path to the real file, e.g. "/certificates/python-infosys.pdf". Empty = pending upload. */
  fileUrl: string;
};

export const CERTIFICATES: Certificate[] = [
  { id: "python-infosys", title: "Introduction to Python", issuer: "Infosys Springboard", fileUrl: "" },
  { id: "dbms-nptel", title: "Database Management Systems", issuer: "NPTEL", fileUrl: "" },
  { id: "js-simplilearn", title: "JavaScript Fundamentals", issuer: "Simplilearn", fileUrl: "" },
  { id: "html-udemy", title: "HTML for Beginners", issuer: "Udemy", fileUrl: "" },
  { id: "servicenow-welcome", title: "Welcome to ServiceNow", issuer: "ServiceNow · January 2026", fileUrl: "" },
];

export function isImageUrl(url: string) {
  return /\.(png|jpe?g|webp|gif|avif)$/i.test(url);
}
