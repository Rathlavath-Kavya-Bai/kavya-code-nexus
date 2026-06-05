import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { EditToggle } from "@/components/portfolio/EditToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rathlavath Kavya Bai — Full Stack Developer & AI Enthusiast" },
      {
        name: "description",
        content:
          "Portfolio of Rathlavath Kavya Bai — CSE student, Full Stack Developer, AI enthusiast and founder of Farmer's Friendly. Projects, skills, achievements and contact.",
      },
      { property: "og:title", content: "Rathlavath Kavya Bai — Full Stack Developer & AI Enthusiast" },
      { property: "og:description", content: "Turning ideas into meaningful technology solutions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
      <EditToggle />
    </div>
  );
}
