import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code, Layers, Milestone, Award, Github, CheckCircle2 } from "lucide-react";


interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            <span>01 // COGNITIVE AGENT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            About Me
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Glass Image Frame / Abstract Cyberpunk Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl p-3 glass group overflow-hidden"
            >
              {/* Internal neon line effects */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-cyan-400 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent group-hover:via-purple-500 transition-all duration-700" />

              {/* Decorative Tech Grid inside photo card */}
              <div
                className="absolute inset-4 opacity-[0.04] pointer-events-none rounded-2xl"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "15px 15px",
                }}
              />
{/* Profile Image Representation: Minimalist AI Avatar Cybernetic Art */}
<div className="w-full h-full rounded-[1.25rem] overflow-hidden bg-slate-900/60 relative flex flex-col items-center justify-center border border-white/5">
  {/* Tech vector/symbol art overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />

 <img
  src="/jayanth/assets/jayanth.jpeg"
  alt="N.Jayanth - AI Engineer"
  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
  loading="eager"
/>


   {/* Micro tech card overlays */}
  <div className="absolute bottom-6 left-6 right-6 z-20 bg-slate-950/80 border border-white/10 rounded-xl p-3.5 backdrop-blur-md">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
          N.JAYANTH
        </h4>
        <p className="text-[10px] font-mono text-cyan-400/80 mt-0.5">
          Geethanjali College Of Engineering & Technology
          <br />
          Graduating in 2027
        </p>
      </div>
      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
    </div>
  </div>
</div>
</motion.div>
</div>

  {/* Right Column: Bio Paragraph & Counters */}
<div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
  <motion.h3
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-xl md:text-2xl font-bold text-white tracking-tight"
  >
    Synthesizing data into intelligence.
  </motion.h3>

  {/* Paragraph with fade visual reveal */}
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="text-sm md:text-base text-slate-400 space-y-4 leading-relaxed"
  >
    <p>
      I am a highly driven computer science engineer specializing in
      Artificial Intelligence, Deep Learning, and Full-Stack Engineering. My
      core focus lies in the intersection of advanced language models,
      real-time computer vision networks, and robust web systems.
    </p>

    <p>
      Throughout my academic tenure at Geethanjali College Of Engineering And
      Technology, I've had the opportunity to translate deep mathematical
      theory into production-ready platforms. Whether it's training custom
      neural architectures, building high-frequency event streaming lines, or
      deploying lightweight inference systems to constraints-bound hardware, I
      love designing code that is elegant, optimized, and impactful.
    </p>
  </motion.div>

  {/* Bullet Highlights */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
    {[
      "Deep Neural Network Architecture",
      "Advanced Agentic Workflows & RAG",
      "High-Speed Streaming Systems",
      "Embedded Device Optimization",
    ].map((highlight, idx) => (
      <motion.div
        key={highlight}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.08 + 0.2 }}
        className="flex items-center space-x-2 text-xs font-mono text-white/80"
      >
        <CheckCircle2
          size={12}
          className="text-cyan-400 shrink-0"
        />
        <span>{highlight}</span>
      </motion.div>
    ))}
  </div>

  {/* Counters Section */}
  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6 border-t border-white/5">
    {[
      { label: "AI Repos", end: 2, suffix: "", icon: Code },
      { label: "Tech Stack", end: 10, suffix: "+", icon: Layers },
      { label: "Internships", end: 2, suffix: "", icon: Milestone },
      { label: "Certificates", end: 10, suffix: "", icon: Award },
      { label: "Commits", end: 1200, suffix: "+", icon: Github },
    ].map((stat, idx) => {
      const IconComponent = stat.icon;

      return (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.06 + 0.3 }}
          className="flex flex-col p-3 rounded-xl glass hover:border-cyan-500/30 hover:bg-white/5 transition-all duration-300"
        >
          <div className="flex items-center space-x-1.5 text-slate-500 mb-1">
            <IconComponent
              size={12}
              className="text-cyan-400/80"
            />
            <span className="text-[9px] font-mono uppercase tracking-wider">
              {stat.label}
            </span>
          </div>

          <span className="text-lg md:text-xl font-bold font-mono text-white">
            <CountUp
              end={stat.end}
              suffix={stat.suffix}
            />
          </span>
        </motion.div>
      );
    })}
  </div>
</div>
</div>
</div>
</section>
);
}
