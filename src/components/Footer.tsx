import { motion } from "motion/react";
import { Rocket, Heart, ArrowUp, Github, Linkedin, Mail } from "lucide-react";

interface FooterProps {
  sections: string[];
}

export default function Footer({ sections }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    <footer className="relative bg-slate-950 pt-24 pb-12 border-t border-white/5 overflow-hidden text-left">
      {/* Wave SVG Animation Backing */}
      <div className="absolute inset-x-0 bottom-0 h-24 opacity-[0.03] pointer-events-none overflow-hidden">
        <svg
          className="absolute w-[200%] h-full left-0 bottom-0 animate-[wave_15s_linear_infinite]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,16.22,83.1,22.81,151.74,38.86,223.38,64.57,321.39,56.44Z"
            fill="#22d3ee"
          />
        </svg>
        <svg
          className="absolute w-[200%] h-full left-[-100%] bottom-0 animate-[wave_20s_linear_infinite_reverse] opacity-70"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,16.22,83.1,22.81,151.74,38.86,223.38,64.57,321.39,56.44Z"
            fill="#a855f7"
          />
        </svg>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5 items-start">
          {/* Brand/Logo Column */}
          <div className="md:col-span-5 space-y-4">
            <span className="flex items-center space-x-2 font-mono text-sm tracking-widest text-white">
              <span className="text-cyan-400 font-bold">{"{"}</span>
              <span className="font-extrabold uppercase">JAYANTH</span>
              <span className="text-purple-400 font-bold">{"}"}</span>
            </span>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-mono">
              ENGINEERING_INTELLIGENT_SYSTEMS // SECURE_COMPUTING_INFRASTRUCTURE
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Synthesizing deep neural networks with high-fidelity web engineering to deliver state-of-the-art interactive digital experiences.
            </p>
          </div>

          {/* Quick Navigation Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              QUICK_LINKS
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {sections.map((sectionId) => (
                <button
                  key={sectionId}
                  onClick={() => {
                    const el = document.getElementById(sectionId);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left text-slate-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  // {formatLabel(sectionId)}
                </button>
              ))}
            </div>
          </div>

          {/* Back to top Controller Column */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white md:text-right">
              SYSTEM_RETURN
            </h4>

            {/* Glowing Rocket return to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none"
            >
              <span className="font-mono text-[10px] text-slate-400 group-hover:text-cyan-400 transition-colors font-bold">
                ESCAPE_TO_TOP
              </span>
              <Rocket
                size={14}
                className="text-cyan-400 group-hover:text-cyan-300 group-hover:-translate-y-1 transition-transform duration-300 animate-pulse"
              />
            </button>
          </div>
        </div>

        {/* Copywrite bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
          <span>
            © {new Date().getFullYear()} JAYANTH. ALL RIGHTS RESERVED.
          </span>
          <span className="flex items-center space-x-1">
            <span>BUILT WITH PRECISION &</span>
            <Heart size={8} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>ON CLOUD INGRESS</span>
          </span>
        </div>
      </div>

      {/* Tailwind Animation Custom styling inline rules injected to support custom wave shapes */}
      <style>{`
        @keyframes wave {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }
      `}</style>
    </footer>
  );
}
