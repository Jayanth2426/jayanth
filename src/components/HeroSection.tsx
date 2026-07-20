import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, Code2, Cpu, Download, Sparkles } from "lucide-react";
import ThreeDModel from "./ThreeDModel";

interface HeroSectionProps {
  onExploreProjects: () => void;
}

const ROLES = [
  "AI & Machine Learning Engineer",
  "Web Developer",
  "Research Innovator",
  "Problem Solver"
];

export default function HeroSection({ onExploreProjects }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayedText === currentFullText) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentFullText.substring(0, prev.length - 1)
            : currentFullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden px-4 md:px-8"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column - Big Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full w-fit backdrop-blur-md"
          >
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NEXT-GEN AI ENGINEERING
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-2">
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="text-lg font-mono tracking-widest text-white/50"
            >
              HELLO, I'M
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white"
            >
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                N.JAYANTH
              </span>
            </motion.h1>

            {/* Dynamic typed role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.5 }}
              className="h-8 sm:h-10 flex items-center"
            >
              <h2 className="text-lg sm:text-2xl font-mono font-medium text-cyan-400 flex items-center">
                <span className="mr-2">⚡</span>
                <span>{displayedText}</span>
                <span className="w-1.5 h-6 ml-1 bg-cyan-400 animate-[pulse_0.8s_infinite]" />
              </h2>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed"
          >
            Building intelligent full-stack systems using state-of-the-art AI Models,
            Deep Neural Networks, and High-Performance Software Architecture. Specializing in computer vision, agentic systems, and cloud optimization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            {/* CTA 1: Explore Projects */}
            <button
              onClick={onExploreProjects}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-mono font-bold text-white rounded-xl group bg-gradient-to-br from-cyan-500 to-purple-600 group-hover:from-cyan-500 group-hover:to-purple-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-800 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
            >
              <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-slate-950 rounded-xl group-hover:bg-opacity-0 flex items-center space-x-2">
                <Code2 size={16} className="text-cyan-400 group-hover:text-white" />
                <span>Explore Projects</span>
              </span>
            </button>

            {/* CTA 2: Resume Download */}
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                const resumeSec = document.getElementById("resume");
                if (resumeSec) resumeSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center space-x-2 border border-white/10 hover:border-cyan-500/50 bg-white/5 hover:bg-cyan-500/10 text-sm font-mono font-medium text-white px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              <Download size={16} className="text-purple-400" />
              <span>Get Resume</span>
            </a>
          </motion.div>

          {/* Micro-metrics summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-md text-left"
          >
            <div>
              <h5 className="text-xl font-bold font-mono text-cyan-400">15+</h5>
              /
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                AI Repos
              </p>
            </div>
            <div>
              <h5 className="text-xl font-bold font-mono text-purple-400">7.5</h5>
              /
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                CGPA CSE-AI & ML
              </p>
            </div>
            <div>
              <h5 className="text-xl font-bold font-mono text-pink-400">98%</h5>
              /
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Accuracy mAP
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right column - Interactive 3D Neural Globe Hologram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.8, duration: 1.0, type: "spring" }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Ambient light ring behind 3D Canvas */}
          <div className="absolute w-[350px] h-[350px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />
          <ThreeDModel />
        </motion.div>
      </div>

      {/* Floating Rocket scroll guide */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-40 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[9px] tracking-[0.2em] text-white">SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}
