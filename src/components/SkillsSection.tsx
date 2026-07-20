import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { SKILL_CATEGORIES } from "../data";
import { Skill } from "../types";

// Dynamic Icon Loader helper
const SkillIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  // Safe mapping of strings to Lucide icons
  const IconComponent = (Icons as any)[iconName] || Icons.Cpu;
  return <IconComponent className={className} size={18} />;
};

// 3D Tilt Card Component
interface TiltCardProps {
  skill: Skill;
}

function TiltCard({ skill }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within element
    const y = e.clientY - rect.top;  // y coordinate within element

    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    // Apply tilt angles (max 15 degrees)
    setRotateY(normalizedX * 16);
    setRotateX(-normalizedY * 16);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-5 rounded-2xl glass overflow-hidden cursor-pointer group select-none transition-shadow duration-300 hover:border-cyan-500/30"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, border-color 0.3s ease",
        boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`,
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 20px 40px -15px ${skill.glowColor}`,
      }}
    >
      {/* Glow Backing Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.glowColor}, transparent 70%)`,
        }}
      />

      {/* Card Content with 3D translation for layers */}
      <div style={{ transform: "translateZ(30px)" }} className="space-y-4">
        {/* Header (Icon + Name) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="p-2 rounded-xl transition-all duration-300 bg-white/5 border border-white/5 group-hover:bg-white/10"
              style={{ color: skill.glowColor.replace("0.5", "1") }}
            >
              <SkillIcon iconName={skill.icon} />
            </div>
            <h4 className="text-sm font-mono font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
              {skill.name}
            </h4>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-cyan-400/80 transition-colors">
            {skill.level}%
          </span>
        </div>

        {/* Level Indicator Bar */}
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
            {/* Animating fill */}
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
              style={{
                boxShadow: `0 0 8px ${skill.glowColor.replace("0.5", "0.8")}`,
              }}
            />
          </div>
          {/* Backing track numbers */}
          <div className="flex justify-between font-mono text-[9px] text-slate-600">
            <span>FOUNDATION</span>
            <span>EXPERT</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("all");

  // Flat skills list for "All" tab
  const allCategories = SKILL_CATEGORIES;
  const filteredSkills =
    activeTab === "all"
      ? allCategories.flatMap((cat) => cat.skills)
      : allCategories.find((cat) => cat.id === activeTab)?.skills || [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background visual spotlight elements */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            <span>02 // SKILLSET_COEFFICIENT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Technical Competence
          </motion.h2>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-white/5 pb-4">
          {/* ALL Tab */}
          <button
            onClick={() => setActiveTab("all")}
            className={`relative px-4 py-2 text-xs font-mono rounded-full border transition-all duration-300 cursor-pointer ${
              activeTab === "all"
                ? "text-cyan-400 border-cyan-500/30"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            <span>All Technologies</span>
            {activeTab === "all" && (
              <motion.span
                layoutId="activeSkillTab"
                className="absolute inset-0 rounded-full bg-cyan-500/10 -z-10 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Individual categories */}
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`relative px-4 py-2 text-xs font-mono rounded-full border transition-all duration-300 cursor-pointer ${
                activeTab === category.id
                  ? "text-cyan-400 border-cyan-500/30"
                  : "text-slate-400 border-transparent hover:text-white"
              }`}
            >
              <span>{category.title}</span>
              {activeTab === category.id && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-cyan-500/10 -z-10 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, delay: index * 0.02 }}
              >
                <TiltCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
