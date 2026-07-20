import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, FileText, CheckCircle, RefreshCw, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ResumeSection() {
  const [downloadState, setDownloadState] = useState<"idle" | "compiling" | "signing" | "success">("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);

  const triggerDownload = () => {
    if (downloadState !== "idle") return;

    // Phase 1: Compile assets
    setDownloadState("compiling");
    setDownloadProgress(20);

    const t1 = setTimeout(() => {
      setDownloadProgress(60);
      setDownloadState("signing");
    }, 800);

    const t2 = setTimeout(() => {
      setDownloadProgress(100);
      setDownloadState("success");

      // Trigger actual mock file download (creates an automatic text file or simple download anchor)
      const mockResumeContent = `
N.JAYANTH
AI & Machine Learning Engineer | Web Developer
Email: njai7883246@gmail.com | Web: https://github.com/Jayanth2426

=== PROFILE ===
Highly driven Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning with a deep passion for building robust software systems and deep neural architectures.

=== EDUCATION ===
- Geethanjali College Of Engineering And Technology - B.Tech CSE (AI & ML)
  CGPA: 7.5 (2024 - 2027)
- Nano Junior College - Higher Secondary Education (Class XII) in MPC
  Grade: 66% (2021 - 2023)
- ST. Anthony's High School - High School Education (Class I - X)
  CGPA: 9.3 (Graduated 2021)

=== EXPERIENCES ===
1. Viswam Summer of AI (Sweecha Telangana & IIIT Hyderabad) - AI Developer Intern (April 2025 - June 2025)
2. Pawzz Foundation (NGO) - Youth Officer Intern (Nov 2025 - Jan 2026)

=== CORE COMPETENCIES ===
- Languages & Databases: Python, SQL, HTML/CSS
- Artificial Intelligence: PyTorch, TensorFlow, LLMs
- Web & Infrastructure: Node.js, Tailwind CSS, AWS, GitHub Actions
      `;
      const blob = new Blob([mockResumeContent.trim()], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Jayanth_AI_Engineer_Resume.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1800);

    const t3 = setTimeout(() => {
      setDownloadState("idle");
      setDownloadProgress(0);
    }, 5000); // Reset to idle after 5 seconds
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background glowing particles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-[1px] bg-cyan-400" />
            <span>07 // PROFILE_COMPENDIUM</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Curriculum Vitae
          </motion.h2>
        </div>

        {/* Content split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: CV Action controller */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              A comprehensive view of my professional profile.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Analyze my full educational background, technical skill matrix, and project history. Click the interactive download button to export a copy of my curriculum vitae.
            </p>

            {/* Interactive Download Controller */}
            <div className="p-6 rounded-2xl glass space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="text-cyan-400" size={20} />
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  SECURE COMPILER ENGINE
                </h4>
              </div>

              {/* Progress visual bar */}
              {downloadState !== "idle" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[9px]">
                    <span className="text-slate-500 uppercase">
                      {downloadState === "compiling" && "COMPILING TEXT ASSETS..."}
                      {downloadState === "signing" && "CRYPTOGRAPHICALLY SIGNING PDF..."}
                      {downloadState === "success" && "DOWNLOAD COMPLETED!"}
                    </span>
                    <span className="text-cyan-400">{downloadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                      animate={{ width: `${downloadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Large Download Trigger Button */}
              <button
                onClick={triggerDownload}
                disabled={downloadState !== "idle"}
                className={`relative w-full py-4 px-6 rounded-xl font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 overflow-hidden ${
                  downloadState === "idle"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-pointer"
                    : downloadState === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-white/5 border border-white/5 text-slate-500"
                }`}
              >
                {downloadState === "idle" && (
                  <>
                    <Download size={14} className="animate-bounce" />
                    <span>Compile & Download CV</span>
                  </>
                )}
                {(downloadState === "compiling" || downloadState === "signing") && (
                  <>
                    <RefreshCw size={14} className="animate-spin text-cyan-400" />
                    <span>Building PDF Object</span>
                  </>
                )}
                {downloadState === "success" && (
                  <>
                    <CheckCircle size={14} className="text-emerald-400" />
                    <span>Downloaded Successfully</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Scaled HTML preview replica of the resume */}
          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[440px] aspect-[1/1.4] glass rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto text-left text-slate-400 select-none group max-h-[580px] scrollbar-thin scrollbar-thumb-white/10 hover:border-cyan-500/30 transition-all duration-500"
            >
              {/* Fake top paper border visual */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

              {/* Profile Header */}
              <div className="space-y-2 border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    N.Jayanth
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                    AI_ENGINEER_CV
                  </span>
                </div>
                <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  CSE - Artificial Intelligence & Machine Learning
                </p>

                {/* Micro contact lines */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 font-mono text-[8px] text-slate-500">
                  <span className="inline-flex items-center space-x-1">
                    <Mail size={8} />
                    <span>njai7883246@gmail.com</span>
                  </span>
                  <span className="inline-flex items-center space-x-1">
                    <Globe size={8} />
                    <span>https://github.com/Jayanth2426</span>
                  </span>
                  <span className="inline-flex items-center space-x-1">
                    <MapPin size={8} />
                    <span>Hyderabad, India</span>
                  </span>
                </div>
              </div>

              {/* Education section */}
              <div className="space-y-2 mb-4 text-[9px]">
                <h4 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-1">
                  Education
                </h4>
                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-bold text-white text-[9px]">
                      <span>Geethanjali College Of Engineering And Technology</span>
                      <span>2024 - 2027</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>B.Tech in CSE- AI & ML (UG)</span>
                      <span className="text-purple-400 font-bold font-mono">7.5 CGPA</span>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-bold text-white text-[9px]">
                      <span>Nano Junior College</span>
                      <span>2021 - 2023</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Higher Secondary (Class XII) in MPC</span>
                      <span className="text-purple-400 font-bold font-mono">66% GPA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience section */}
              <div className="space-y-3 mb-4 text-[9px]">
                <h4 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-1">
                  Experience
                </h4>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-white text-[9px]">
                    <span>Viswam Summer of AI // AI Developer Intern</span>
                    <span>April 2025 - June 2025</span>
                  </div>
                  <p className="text-slate-400 leading-normal">
                    Collaborated with Sweecha Telangana & IIIT Hyderabad on machine learning, NLP and computer vision pipelines to index regional translation resources.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-white text-[9px]">
                    <span>Pawzz Foundation (NGO) // Youth Officer Intern</span>
                    <span>Nov 2025 - Jan 2026</span>
                  </div>
                  <p className="text-slate-400 leading-normal">
                    Coordinated regional animal welfare campaigns, digital youth engagement programs, and managed information tracking and volunteer communication pipelines.
                  </p>
                </div>
              </div>

              {/* Projects section */}
              <div className="space-y-3 mb-4 text-[9px]">
                <h4 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-1">
                  Key Projects
                </h4>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-white text-[9px]">
                    <span>AI- Personal Finance Analyzer</span>
                    <span className="text-slate-500 font-mono">Python / FastAPI / React</span>
                  </div>
                  <p className="text-slate-400 leading-normal">
                    AI-powered transaction parsing and automated spending profiling with custom semantic classification headers.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-white text-[9px]">
                    <span>AI- ChatBot Application</span>
                    <span className="text-slate-500 font-mono">Next.js / Gemini API / LangChain</span>
                  </div>
                  <p className="text-slate-400 leading-normal">
                    Interactive document-querying conversational assistant powered by RAG pipelines and custom chat memory buffers.
                  </p>
                </div>
              </div>

              {/* Skills section */}
              <div className="space-y-2 text-[9px]">
                <h4 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-1">
                  Technical Core
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-400 font-mono text-[8px]">
                  <div><span className="text-white font-bold">Languages:</span> Python, SQL, HTML/CSS</div>
                  <div><span className="text-white font-bold">AI Core:</span> PyTorch, TensorFlow, LLMs</div>
                  <div><span className="text-white font-bold">Web Stack:</span> Node.js, Tailwind</div>
                  <div><div><span className="text-white font-bold">Cloud/Ops:</span> AWS, GitHub Actions, CI/CD</div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
