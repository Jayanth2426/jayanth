import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const TERMINAL_LOGS = [
  "INITIALIZING NEURAL PORTFOLIO INTERFACE...",
  "SETTING UP QUANTUM 3D MATRICES...",
  "CONNECTING TO GEMINI API NETWORKS...",
  "LOADING JAYANTH'S COGNITIVE PROFILE...",
  "SYNCHRONIZING RE-RENDER COEFFICIENTS...",
  "DEPLOYING PARTICLES AND SHADER LIGHTING...",
  "SYSTEM STATUS: COMPLETED",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Loading Counter Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const duration = 2200; // 2.2 seconds total load
    const steps = 100;
    const stepTime = duration / steps;

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // Cycle Terminal Status Messages
  useEffect(() => {
    if (progress < 100) {
      const step = Math.floor((progress / 100) * TERMINAL_LOGS.length);
      if (step < TERMINAL_LOGS.length && step !== logIndex) {
        setLogIndex(step);
      }
    } else {
      setLogIndex(TERMINAL_LOGS.length - 1);
    }
  }, [progress, logIndex]);

  // Complete Callback after fade-out completes
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
        // Complete delay so user sees the "OK" state
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 550);
        return () => clearTimeout(completeTimeout);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          {/* Cyberpunk Grid Background Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050816_90%)] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

          {/* Central Hologram Core Loader */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Spinning tech rings */}
            <motion.div
              className="w-32 h-32 border-t-2 border-r-2 border-cyan-400 rounded-full absolute"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.div
              className="w-36 h-36 border-b-2 border-l-2 border-purple-500 rounded-full absolute"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <motion.div
              className="w-28 h-28 border border-dashed border-cyan-500/30 rounded-full absolute"
              animate={{ rotate: 180 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />

            {/* Glowing Core */}
            <motion.div
              className="w-20 h-20 rounded-full bg-cyan-500/5 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center justify-center font-mono">
                <span className="text-xl font-bold text-white tracking-tighter">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Loading Progress Bar Container */}
          <div className="mt-16 w-80 max-w-full px-4 flex flex-col items-center">
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Status Log Terminal */}
            <div className="mt-6 h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={logIndex}
                  className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {TERMINAL_LOGS[logIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Minimalist Branded Watermark */}
          <div className="absolute bottom-10 font-mono text-[10px] tracking-[0.3em] text-white/30 text-center select-none">
            JAYANTH // ARTIFICIAL INTELLIGENCE & ENGINEERING
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
