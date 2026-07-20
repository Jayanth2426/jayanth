import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Award, Calendar, Link2, HelpCircle, RefreshCw } from "lucide-react";
import { CERTIFICATES_DATA } from "../data";

export default function CertificatesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CERTIFICATES_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length);
  };

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering carousel clicks
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="certificates" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="text-left mb-16 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-[1px] bg-cyan-400" />
            <span>05 // CREDENTIAL_INTEGRITY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Certifications
          </motion.h2>
        </div>

        {/* 3D Carousel Stage */}
        <div className="relative flex flex-col items-center justify-center min-h-[440px] select-none py-6">
          {/* Slider Container */}
          <div className="relative w-full max-w-[340px] h-[360px] flex items-center justify-center">
            {CERTIFICATES_DATA.map((cert, index) => {
              // Calculate relative offset of card in carousel loop
              let offset = index - activeIndex;

              // Handle cyclic wrap-around calculations
              if (offset < -1) offset += CERTIFICATES_DATA.length;
              if (offset > 1) offset -= CERTIFICATES_DATA.length;

              const isActive = index === activeIndex;
              const isVisible = Math.abs(offset) <= 1;

              if (!isVisible) return null;

              // 3D positioning transform variables
              const rotateY = offset * 28; // Tilted rotation of side cards
              const scale = isActive ? 1.0 : 0.82;
              const zIndex = 10 - Math.abs(offset);
              const translateX = offset * 125; // Lateral shift
              const isFlipped = flippedCards[cert.id] || false;

              return (
                <div
                  key={cert.id}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  className={`absolute w-full h-full transition-all duration-500 cursor-pointer ${
                    isActive ? "pointer-events-auto" : "pointer-events-none opacity-40 hover:opacity-60"
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    zIndex,
                    transformStyle: "preserve-3d",
                    perspective: "1200px",
                  }}
                >
                  {/* Two-sided 3D flipping card wrapper */}
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* ======================================== */}
                    {/* CARD FRONT SIDE */}
                    {/* ======================================== */}
                    <div
                      className="absolute inset-0 rounded-3xl p-6 glass flex flex-col justify-between overflow-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Ambient dynamic card glow */}
                      <div
                        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[40px] opacity-15 pointer-events-none bg-gradient-to-br"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, var(--color-cyan-400), transparent)`,
                        }}
                      />

                      {/* Top Bar (Issuer & Icon) */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                          {cert.issuer}
                        </span>
                        <Award className="text-cyan-400" size={24} />
                      </div>

                      {/* Center block (Title) */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {cert.title}
                        </h3>
                        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                          <Calendar size={12} />
                          <span className="font-mono text-[10px]">{cert.date}</span>
                        </div>
                      </div>

                      {/* Bottom action controls */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                        <button
                          onClick={(e) => toggleFlip(cert.id, e)}
                          className="flex items-center space-x-1 text-[10px] font-mono text-purple-400 hover:text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full cursor-pointer"
                        >
                          <RefreshCw size={10} className="animate-spin-slow" />
                          <span>View Skills</span>
                        </button>

                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center space-x-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          <Link2 size={10} />
                          <span>Credential</span>
                        </a>
                      </div>
                    </div>

                    {/* ======================================== */}
                    {/* CARD BACK SIDE (Skills List) */}
                    {/* ======================================== */}
                    <div
                      className="absolute inset-0 rounded-3xl p-6 glass flex flex-col justify-between"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {/* Top back bar */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-purple-400 uppercase font-bold">
                          VERIFIED_SKILLS_LEARNED
                        </span>
                        <Award className="text-purple-400" size={20} />
                      </div>

                      {/* Skills listed */}
                      <div className="flex-1 flex flex-col justify-center space-y-2 py-4">
                        {cert.skillsLearned.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center space-x-2 text-xs text-slate-300 font-mono text-left"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>

                      {/* Flip back button */}
                      <div className="border-t border-white/5 pt-4 mt-auto">
                        <button
                          onClick={(e) => toggleFlip(cert.id, e)}
                          className="flex items-center space-x-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full cursor-pointer w-full justify-center"
                        >
                          <RefreshCw size={10} />
                          <span>Back to Certificate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lateral navigation buttons */}
          <div className="flex items-center space-x-6 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all cursor-pointer hover:scale-105"
              aria-label="Previous Certificate"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-xs text-slate-400">
              {activeIndex + 1} / {CERTIFICATES_DATA.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all cursor-pointer hover:scale-105"
              aria-label="Next Certificate"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
