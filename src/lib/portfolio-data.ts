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
export const EMAIL = "kavyabairathlavth@gmail.com";
export const PHONE = "+919391601350";
export const PHONE_DISPLAY = "+91 93916 01350";

/** Set once the real PDF exists in public/resume/. Empty = not uploaded yet. */
export const RESUME_URL = "";

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "nxt-trendz",
    title: "Nxt Trendz E-Commerce Application",
    description:
      "A modern e-commerce platform with product search, filtering, sorting, authentication and secure JWT login.",
    technologies: ["React.js", "JavaScript", "Bootstrap", "CSS", "REST APIs", "JWT"],
    githubUrl: "",
    liveUrl: "",
    category: "Full Stack",
  },
  {
    id: "wikipedia-search",
    title: "Wikipedia Search Application",
    description:
      "Responsive search platform that fetches and displays Wikipedia results in real time via API integration.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "REST APIs"],
    githubUrl: "",
    liveUrl: "",
    category: "Frontend",
  },
  {
    id: "green-farm-coach",
    title: "Green Farm Coach",
    description:
      "Farmer-support application providing crop prediction, weather updates and fertilizer recommendations.",
    technologies: ["HTML", "CSS", "Python", "AI Concepts"],
    githubUrl: "",
    liveUrl: "",
    category: "AI / AgriTech",
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
  { id: "agritech-hackathon", title: "National AgriTech Hackathon", issuer: "Participation", fileUrl: "" },
  { id: "x-horizon", title: "X-Horizon Participation Certificate", issuer: "X-Horizon", fileUrl: "" },
  { id: "servicenow", title: "ServiceNow Micro-Certification", issuer: "ServiceNow", fileUrl: "" },
];

export function isImageUrl(url: string) {
  return /\.(png|jpe?g|webp|gif|avif)$/i.test(url);
}
