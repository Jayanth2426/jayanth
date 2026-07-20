import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import InteractiveCanvas from "./components/InteractiveCanvas";
import FloatingNav from "./components/FloatingNav";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import TimelineSection from "./components/TimelineSection";
import CertificatesCarousel from "./components/CertificatesCarousel";
import AchievementsSection from "./components/AchievementsSection";
import ResumeSection from "./components/ResumeSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Define section navigation IDs in chronological order
  const sections = [
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "certificates",
    "achievements",
    "resume",
    "contact",
  ];

  const handleExploreProjects = () => {
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = projectsEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-[#050816] selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden antialiased">
      {/* Cinematic intro progressive loader */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          {/* Custom interactive liquid cursor */}
          <CustomCursor />

          {/* High-performance math-based background canvas */}
          <InteractiveCanvas />

          {/* Floating glass navigation bar */}
          <FloatingNav sections={sections} />

          {/* Main sections container */}
          <main className="relative z-10 w-full">
            {/* 1. Hero Section */}
            <HeroSection onExploreProjects={handleExploreProjects} />

            {/* 2. About Profile Section */}
            <AboutSection />

            {/* 3. Skill Matrices Section */}
            <SkillsSection />

            {/* 4. Showcase Projects Section */}
            <ProjectsSection />

            {/* 5. Experience & Education Timelines */}
            <TimelineSection />

            {/* 6. Certifications Carousel */}
            <CertificatesCarousel />

            {/* 7. Achievements Metrics Section */}
            <AchievementsSection />

            {/* 8. CV Preview & Download Section */}
            <ResumeSection />

            {/* 9. Contact Form & Holographic Globe Section */}
            <ContactSection />
          </main>

          {/* Footer Navigation & Credits */}
          <Footer sections={sections} />
        </>
      )}
    </div>
  );
}
