import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { scrollToSection } from "@/lib/utils";

const routeSectionMap: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/projects": "projects",
  "/contact": "contact",
};

export function PortfolioPage() {
  const location = useLocation();

  useEffect(() => {
    const section = routeSectionMap[location.pathname] || "home";
    const timer = setTimeout(() => scrollToSection(section), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
