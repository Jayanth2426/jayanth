import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Rocket } from "lucide-react";

interface FloatingNavProps {
  sections: string[];
}

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor Scroll Progress & Header Shrink
  useEffect(() => {
    const handleScroll = () => {
      // Shrunk state trigger
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculation of scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor Active Section on Screen
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the center-ish area
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // offset for the floating nav bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Capitalize section label
  const formatLabel = (id: string) => {
    if (id === "home") return "Home";
    if (id === "about") return "About";
    if (id === "skills") return "Skills";
    if (id === "projects") return "Projects";
    if (id === "experience") return "Experience";
    if (id === "education") return "Education";
    if (id === "certificates") return "Certificates";
    if (id === "achievements") return "Achievements";
    if (id === "resume") return "Resume";
    if (id === "contact") return "Contact";
    return id.toUpperCase();
  };

  return (
    <>
      {/* Absolute top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[51] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <motion.header
        className={`fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-7xl px-4 transition-all duration-500 ${
          isScrolled ? "top-4" : "top-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div
          className={`flex items-center justify-between w-full mx-auto px-6 rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-500 ${
            isScrolled ? "py-2.5 max-w-5xl" : "py-4 max-w-6xl"
          }`}
        >
          {/* Logo / Brand Watermark */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 font-mono text-sm tracking-widest text-white hover:text-cyan-400 transition-colors duration-300"
          >
            <span className="text-cyan-400 font-bold font-mono">{"{"}</span>
            <span className="font-extrabold uppercase">Jayanth</span>
            <span className="text-purple-400 font-bold font-mono">{"}"}</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs font-medium text-white/70">
            {sections.map((sectionId) => {
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className={`relative px-3 py-1.5 transition-all duration-300 hover:text-cyan-400 cursor-pointer ${
                    isActive ? "text-cyan-400 font-semibold" : ""
                  }`}
                >
                  {formatLabel(sectionId)}

                  {/* Active Link Bubble Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeSectionIndicator"
                      className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_12px_rgba(34,211,238,0.15)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to Action Mini button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-mono font-medium text-white rounded-full group bg-gradient-to-br from-cyan-500 to-purple-500 group-hover:from-cyan-500 group-hover:to-purple-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-800 transition-all cursor-pointer"
            >
              <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-slate-950 rounded-full group-hover:bg-opacity-0">
                Let's Connect
              </span>
            </button>
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/80 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Glassmorphic Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-center bg-slate-950/95 backdrop-blur-2xl px-8"
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Background glowing effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px]" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/15 rounded-full blur-[80px]" />

            <div className="flex flex-col space-y-5 font-mono text-lg text-white/80 mt-12 relative">
              {sections.map((sectionId, idx) => {
                const isActive = activeSection === sectionId;
                return (
                  <motion.button
                    key={sectionId}
                    onClick={() => scrollToSection(sectionId)}
                    className={`text-left py-2 border-b border-white/5 flex items-center justify-between hover:text-cyan-400 transition-colors ${
                      isActive ? "text-cyan-400 font-bold" : ""
                    }`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  >
                    <span>{formatLabel(sectionId)}</span>
                    {isActive && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Quick social footer of mobile menu */}
            <div className="absolute bottom-12 left-8 right-8 flex items-center justify-between font-mono text-[10px] text-white/30 border-t border-white/5 pt-6">
              <span>JAYANTH // AI ENGINEER</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center space-x-1 text-cyan-400/80 hover:text-cyan-400"
              >
                <span>BACK TO TOP</span>
                <Rocket size={10} className="animate-bounce" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
