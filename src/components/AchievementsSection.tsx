import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { ACHIEVEMENTS_DATA } from "../data";
import { Achievement } from "../types";

// Dynamic Icon loader helper
const AchievementIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = (Icons as any)[iconName] || Icons.Award;
  return <IconComponent className={className} size={18} />;
};

export default function AchievementsSection() {
  // Mock algorithm categories for custom SVG visualizer representing LeetCode mastery
  const ALGO_MASTERIES = [
    { category: "Dynamic Programming", val: 88, color: "stroke-cyan-400" },
    { category: "Data Structures", val: 95, color: "stroke-blue-500" },
    { category: "Graphs & Trees", val: 84, color: "stroke-purple-500" },
    { category: "Math & Algorithms", val: 90, color: "stroke-pink-500" },
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background spotlights */}
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            <span>06 // QUANTITATIVE_VALIDATION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Achievements & Metrics
          </motion.h2>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Algorithmic Skill Distribution (Interactive SVG Dashboard) */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 p-6 rounded-3xl glass flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold font-mono text-white mb-2">
                  DSA MASTERY INDEX
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Relative algorithmic expertise tracked through 750+ problem solutions on coding platforms.
                </p>
              </div>

              {/* Dynamic responsive circular SVGs */}
              <div className="space-y-4">
                {ALGO_MASTERIES.map((algo) => (
                  <div key={algo.category} className="space-y-1.5 text-left">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">{algo.category}</span>
                      <span className="text-cyan-400 font-bold">{algo.val}%</span>
                    </div>

                    {/* SVG progress indicator */}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${
                          algo.color.includes("cyan")
                            ? "from-cyan-400 to-blue-500"
                            : algo.color.includes("blue")
                            ? "from-blue-500 to-indigo-600"
                            : algo.color.includes("purple")
                            ? "from-purple-500 to-pink-500"
                            : "from-pink-500 to-rose-500"
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${algo.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/5 pt-4 text-center">
                <span className="inline-flex items-center space-x-1 font-mono text-[9px] text-slate-500 tracking-wider">
                  <span>METADATA_STREAM_INTEGRATED</span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Achievements Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ACHIEVEMENTS_DATA.map((ach, idx) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group relative p-6 rounded-2xl glass hover:border-cyan-500/30 hover:bg-cyan-500/[0.01] transition-all duration-300 flex flex-col justify-between text-left"
              >
                {/* Visual badge top right */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 text-cyan-400 transition-all duration-300">
                    <AchievementIcon iconName={ach.iconName} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 block tracking-wider">
                      {ach.metric}
                    </span>
                    {ach.rank && (
                      <span className="text-[9px] font-mono text-purple-400 mt-0.5 block tracking-wider font-bold">
                        {ach.rank}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {ach.detail}
                  </p>
                </div>

                {/* Platform Badge / Link */}
                <div className="border-t border-white/5 mt-4 pt-3 flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
                    {ach.platform}
                  </span>

                  {ach.url && (
                    <a
                      href={ach.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono text-cyan-400/80 hover:text-cyan-400 hover:underline flex items-center space-x-0.5"
                    >
                      <span>Platform Link</span>
                      <Icons.ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
