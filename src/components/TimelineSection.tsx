import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { EXPERIENCE_DATA, EDUCATION_DATA } from "../data";

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Growth calculations on scroll for timeline central track
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start counting when top of container is in middle of viewport
      const startTrigger = windowHeight * 0.75;
      const progressStart = rect.top - startTrigger;

      if (progressStart < 0) {
        // Compute total scrollable height of this container
        const totalHeight = rect.height;
        const progress = Math.min(Math.abs(progressStart) / (totalHeight - 100), 1);
        setLineHeight(progress * 100);
      } else {
        setLineHeight(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial load calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Visual glowing blob */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div id="education" className="absolute top-[60%] left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="text-left mb-20 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-[1px] bg-cyan-400" />
            <span>04 // CAREER_CHRONOLOGY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Experience & Education
          </motion.h2>
        </div>

        {/* Central timeline tracker container */}
        <div className="relative">
          {/* Timeline Center line (inactive state) */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5" />

          {/* Timeline Center line (active scroll glowing tracker) */}
          <div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            style={{ height: `${lineHeight}%` }}
          />

          {/* ======================================== */}
          {/* EXPERIENCE CHRONOLOGY */}
          {/* ======================================== */}
          <div className="space-y-12 mb-16">
            <div className="relative pl-10 md:pl-0 md:text-center mb-10">
              <span className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-cyan-400">
                <Briefcase size={12} />
                <span>PROFESSIONAL TIMELINE</span>
              </span>
            </div>

            {EXPERIENCE_DATA.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-stretch md:justify-between ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Outer Orbit Dot Marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-7 h-7 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] z-10 flex items-center justify-center">
                    <Briefcase size={12} className="text-cyan-400" />
                  </div>

                  {/* Empty grid space for side balance on desktop */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Card Content block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full md:w-[45%] pl-10 pr-4 md:px-0"
                  >
                    <div className="p-6 rounded-2xl glass hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all duration-300 relative text-left group">
                      {/* Hover subtle glow border highlight */}
                      <div className="absolute inset-0 rounded-2xl border border-dashed border-cyan-400/0 group-hover:border-cyan-400/20 pointer-events-none transition-all duration-300" />

                      {/* Header (Role & Period) */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {exp.role}
                        </h4>
                        <span className="inline-flex items-center space-x-1 text-xs font-mono font-medium text-cyan-400/80">
                          <Calendar size={10} />
                          <span>{exp.period}</span>
                        </span>
                      </div>

                      {/* Company & Location info */}
                      <div className="flex items-center space-x-2 text-slate-400 text-xs mb-4">
                        <span className="font-semibold text-white/90">{exp.company}</span>
                        <span>•</span>
                        <span className="inline-flex items-center space-x-1 font-mono text-[10px]">
                          <MapPin size={10} />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Bullet Description list */}
                      <ul className="space-y-2 mb-5">
                        {exp.description.map((bullet, bidx) => (
                          <li key={bidx} className="flex items-start space-x-2 text-xs text-slate-400">
                            <CheckCircle2 size={12} className="text-cyan-500/70 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Timeline Tech competency badges */}
                      <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ======================================== */}
          {/* EDUCATION CHRONOLOGY */}
          {/* ======================================== */}
          <div className="space-y-12">
            <div className="relative pl-10 md:pl-0 md:text-center mb-10">
              <span className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-purple-400">
                <GraduationCap size={12} />
                <span>ACADEMIC MILESTONES</span>
              </span>
            </div>

            {EDUCATION_DATA.map((edu, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={edu.id}
                  className={`relative flex flex-col md:flex-row items-stretch md:justify-between ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center Dot marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-7 h-7 rounded-full bg-slate-950 border-2 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)] z-10 flex items-center justify-center">
                    <GraduationCap size={12} className="text-purple-400" />
                  </div>

                  {/* Spacer element for horizontal alignment on desktop */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Card Content block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full md:w-[45%] pl-10 pr-4 md:px-0"
                  >
                    <div className="p-6 rounded-2xl glass hover:border-purple-500/30 hover:bg-purple-500/[0.02] transition-all duration-300 relative text-left group">
                      {/* Hover dashed border highlight */}
                      <div className="absolute inset-0 rounded-2xl border border-dashed border-purple-400/0 group-hover:border-purple-400/20 pointer-events-none transition-all duration-300" />

                      {/* Header (Degree & Period) */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                        <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                          {edu.degree}
                        </h4>
                        <span className="inline-flex items-center space-x-1 text-xs font-mono font-medium text-purple-400/80">
                          <Calendar size={10} />
                          <span>{edu.period}</span>
                        </span>
                      </div>

                      {/* School & GPA info */}
                      <div className="flex flex-wrap items-center gap-2 text-slate-400 text-xs mb-4">
                        <span className="font-semibold text-white/90">{edu.institution}</span>
                        {edu.gpa && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center bg-purple-500/10 text-purple-300 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border border-purple-500/25">
                              GPA: {edu.gpa}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Detailed bullets lists */}
                      <ul className="space-y-2">
                        {edu.details.map((detail, bidx) => (
                          <li key={bidx} className="flex items-start space-x-2 text-xs text-slate-400">
                            <CheckCircle2 size={12} className="text-purple-500/70 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
