import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Calendar, CheckSquare, AlertTriangle, Lightbulb, TrendingUp, X, Laptop, Monitor, Tablet, Phone } from "lucide-react";
import { PROJECT_DATA } from "../data";
import { Project } from "../types";

// Laptop Device Mockup Component
const LaptopMockup = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none">
      {/* Laptop Screen Frame */}
      <div className="relative bg-slate-900 border-[10px] border-slate-950 rounded-t-2xl shadow-2xl aspect-[16/10] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-950 rounded-b-md z-20 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-cyan-500/80" />
        </div>
        {/* Actual Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>
      {/* Laptop Keyboard Base */}
      <div className="relative bg-slate-800 border-t border-slate-700 h-4 rounded-b-xl shadow-xl">
        {/* Center opening groove */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[5px] bg-slate-900 rounded-b-md" />
      </div>
    </div>
  );
};

// Phone Device Mockup Component
const PhoneMockup = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="relative w-[180px] mx-auto select-none aspect-[9/19] bg-slate-950 border-[6px] border-slate-900 rounded-[28px] shadow-2xl overflow-hidden">
      {/* Speaker and Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
      </div>
      {/* Image Content */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      {/* Screen reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
    </div>
  );
};

// Browser Window Mockup Component
const BrowserMockup = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none bg-slate-950 rounded-xl border border-white/10 shadow-2xl overflow-hidden aspect-[16/10]">
      {/* Browser Bar */}
      <div className="flex items-center space-x-1.5 px-3 py-2 border-b border-white/5 bg-slate-900/60 backdrop-blur-sm">
        {/* Color Dots */}
        <div className="w-2 h-2 rounded-full bg-rose-500" />
        <div className="w-2 h-2 rounded-full bg-amber-500" />
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        {/* Address field representation */}
        <div className="flex-1 ml-4 h-4 bg-slate-950/80 rounded-md border border-white/5 flex items-center justify-start px-2 font-mono text-[7px] text-white/30 truncate">
          https://jayanth.ai/workspace_stream
        </div>
      </div>
      {/* Image Content */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background aurora spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-[1px] bg-cyan-400" />
            <span>03 // PRODUCT_COMPILATION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Showcase Projects
          </motion.h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECT_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer flex flex-col p-6 rounded-3xl glass hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden"
            >
              {/* Corner Glow Overlay */}
              <div
                className="absolute -top-40 -right-40 w-80 h-80 opacity-0 group-hover:opacity-15 transition-opacity duration-700 rounded-full blur-[100px] pointer-events-none"
                style={{
                  background: `radial-gradient(circle, var(--color-cyan-400) 0%, transparent 70%)`,
                }}
              />

              {/* Subtitle */}
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">
                {project.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>

              {/* Device Frame Display (Laptop, Phone, Browser) */}
              <div className="flex-1 flex items-center justify-center min-h-[220px] mb-6">
                {project.mockupType === "laptop" && (
                  <LaptopMockup image={project.image} title={project.title} />
                )}
                {project.mockupType === "phone" && (
                  <PhoneMockup image={project.image} title={project.title} />
                )}
                {project.mockupType === "browser" && (
                  <BrowserMockup image={project.image} title={project.title} />
                )}
              </div>

              {/* Summary Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Quick Tech Labels */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-500">
                    +{project.techStack.length - 4} MORE
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Glassmorphism Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark backing overlay tap close */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl glass-premium bg-slate-950/70 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header Visual Bar */}
              <div className="relative h-48 sm:h-60 shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-[#090b12]/30 to-black/50" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-md border border-white/5 cursor-pointer transition-all focus:outline-none"
                >
                  <X size={18} />
                </button>

                {/* Left Floating Category & Title */}
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-left">
                {/* Meta details header bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-white/5">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Calendar size={14} className="text-cyan-400" />
                    <div>
                      <h5 className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                        TIMELINE
                      </h5>
                      <p className="text-xs font-semibold text-white">{selectedProject.timeline}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400">
                    <TrendingUp size={14} className="text-purple-400" />
                    <div>
                      <h5 className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                        METRICS
                      </h5>
                      <p className="text-xs font-semibold text-white">High Efficiency</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400">
                    <Github size={14} className="text-pink-400" />
                    <div>
                      <h5 className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                        REPOSITORY
                      </h5>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-cyan-400 hover:underline"
                      >
                        GitHub Link
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400">
                    <ExternalLink size={14} className="text-teal-400" />
                    <div>
                      <h5 className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                        DEPLOYMENT
                      </h5>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-cyan-400 hover:underline"
                      >
                        Launch App
                      </a>
                    </div>
                  </div>
                </div>

                {/* Sub-grid split view */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left content block (Description) */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        SYSTEM ARCHITECTURE OVERVIEW
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Challenges block */}
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                      <div className="flex items-center space-x-2 text-amber-400">
                        <AlertTriangle size={16} />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                          CORE TECHNICAL CHALLENGE
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>

                    {/* Solutions block */}
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <Lightbulb size={16} />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                          SYSTEMIC SOLUTION
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {selectedProject.solutions}
                      </p>
                    </div>
                  </div>

                  {/* Right side controls (Stack + Metrics) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Technology list */}
                    <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                        PROVEN TECH STACK
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Performance metrics list */}
                    <div className="space-y-3 p-4 rounded-2xl bg-cyan-500/[0.01] border border-cyan-500/5">
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        MEASURED IMPACT STATS
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.metrics.map((metric, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                            <CheckSquare size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons bar */}
              <div className="p-6 shrink-0 border-t border-white/5 bg-slate-900/40 backdrop-blur-md flex justify-end space-x-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center space-x-1.5"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center space-x-1.5"
                >
                  <ExternalLink size={14} />
                  <span>Launch Live Demo</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
