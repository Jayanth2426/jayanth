import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, RefreshCw, Github, Linkedin, Mail, Instagram, Twitter, Award, Cpu, TrendingUp } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const globeMouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, dragging: false, rx: 0, ry: 0 });

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSendState("sending");
    setError(null);
    try {
      const response = await fetch("https://formsubmit.co/ajax/njai7883246@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: form.subject || `Signal from Portfolio: ${form.name}`,
          message: form.message
        })
      });
      if (response.ok) {
        setSendState("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setSendState("idle");
        }, 4000);
      } else {
        throw new Error("Transmission error");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to transmit signal. Please try again or email directly.");
      setSendState("idle");
    }
  };

  // Holographic 3D Spinning Globe math
  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = 400);
    let height = (canvas.height = 400);

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * (window.devicePixelRatio || 1);
      height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Mathematical points on a sphere (3D Grid representation)
    const points: Point3D[] = [];
    const radius = 120;
    const numPoints = 250;

    // Distribute points on a sphere using Fibonacci spiral method
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y

      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
      });
    }

    // Interactive drag rotation variables
    let angleX = 0;
    let angleY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      globeMouseRef.current.dragging = true;
      globeMouseRef.current.lastX = e.clientX;
      globeMouseRef.current.lastY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!globeMouseRef.current.dragging) return;
      const dx = e.clientX - globeMouseRef.current.lastX;
      const dy = e.clientY - globeMouseRef.current.lastY;

      angleY += dx * 0.007;
      angleX += dy * 0.007;

      globeMouseRef.current.lastX = e.clientX;
      globeMouseRef.current.lastY = e.clientY;
    };

    const handleMouseUpOrLeave = () => {
      globeMouseRef.current.dragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUpOrLeave);

    const fov = 400;
    const cx = width / 2;
    const cy = height / 2;

    const renderGlobe = () => {
      ctx.clearRect(0, 0, width, height);

      // Automatic slow spin if not dragging
      if (!globeMouseRef.current.dragging) {
        angleY += 0.003;
      }

      // Projection math helper
      const project = (p: Point3D) => {
        // Rotate Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = p.z * cosY - p.x * sinY;

        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2);
        const px = x1 * scale + cx;
        const py = y2 * scale + cy;

        return { x: px, y: py, z: z2 };
      };

      // Draw connection grid lines (latitudes/longitudes approximation)
      ctx.strokeStyle = "rgba(6, 182, 212, 0.04)";
      ctx.lineWidth = 0.5;

      // Draw projected points
      points.forEach((p) => {
        const proj = project(p);

        // Don't render points behind the FOV plane
        if (proj.z > -fov) {
          // Color points based on whether they face the camera
          const facing = proj.z < 0; // z < 0 are on the front side of the sphere
          const alpha = facing ? 0.6 : 0.15;
          const pointSize = facing ? 2.2 : 1.2;

          ctx.fillStyle = facing ? "rgba(34, 211, 238, 0.8)" : "rgba(139, 92, 246, 0.3)";

          // Subtle glow behind facing nodes
          if (facing) {
            ctx.shadowColor = "rgba(34, 211, 238, 0.4)";
            ctx.shadowBlur = 4;
          }

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pointSize, 0, Math.PI * 2);
          ctx.fill();

          // Reset shadows
          ctx.shadowBlur = 0;
        }
      });

      // Draw glowing orbit ring around the globe representing AI communication lines
      ctx.strokeStyle = "rgba(34, 211, 238, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const orbitRadius = radius + 25;
        const rx = orbitRadius * Math.cos(angle);
        const rz = orbitRadius * Math.sin(angle);
        // Tilt the orbit a bit
        const ry = rx * 0.1;

        // Rotate Y
        const cosY = Math.cos(angleY * 0.5);
        const sinY = Math.sin(angleY * 0.5);
        const x1 = rx * cosY + rz * sinY;
        const z1 = rz * cosY - rx * sinY;

        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = ry * cosX - z1 * sinX;
        const z2 = z1 * cosX + ry * sinX;

        const scale = fov / (fov + z2);
        const px = x1 * scale + cx;
        const py = y2 * scale + cy;

        if (angle === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      requestAnimationFrame(renderGlobe);
    };

    renderGlobe();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUpOrLeave);
    };
  }, []);

  // Structural social link accounts definitions
  const SOCIAL_LINKS = [
    { name: "Email", url: "mailto:njai7883246@gmail.com", icon: Mail, glow: "hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:border-red-500/30" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin, glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:border-blue-500/30" },
    { name: "GitHub", url: "https://github.com", icon: Github, glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white/30" },
    { name: "Instagram", url: "https://instagram.com", icon: Instagram, glow: "hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:border-pink-500/30" },
    { name: "Twitter", url: "https://twitter.com", icon: Twitter, glow: "hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:border-sky-500/30" },
    { name: "LeetCode", url: "https://leetcode.com", icon: Award, glow: "hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:border-yellow-500/30" },
    { name: "HackerRank", url: "https://hackerrank.com", icon: Cpu, glow: "hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:border-green-500/30" },
    { name: "CodeChef", url: "https://codechef.com", icon: TrendingUp, glow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:border-purple-500/30" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background glowing layout */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

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
            <span>08 // TRANSMITTER_PROTOCOL</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Let's Connect
          </motion.h2>
        </div>

        {/* Form & Interactive Globe Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-3xl glass shadow-2xl relative"
            >
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Name / Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                      YOUR_NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Richard Hendricks"
                      className="w-full bg-slate-950/80 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-600 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                      YOUR_EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. richard@piedpiper.com"
                      className="w-full bg-slate-950/80 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-600 font-mono"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                    SIGNAL_SUBJECT
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Dynamic R&D Collaboration Proposal"
                    className="w-full bg-slate-950/80 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-600 font-mono"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                    ENCRYPTED_MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Type your signal here..."
                    className="w-full bg-slate-950/80 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-600 font-mono resize-none"
                  />
                </div>

                {/* Animated Send Button */}
                <button
                  type="submit"
                  disabled={sendState !== "idle"}
                  className={`w-full py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 overflow-hidden border ${
                    sendState === "idle"
                      ? "bg-cyan-400 text-slate-950 border-cyan-400 hover:bg-cyan-300 hover:scale-[1.01] shadow-[0_0_15px_rgba(34,211,238,0.25)] cursor-pointer"
                      : sendState === "sent"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-white/5 border-white/5 text-slate-500"
                  }`}
                >
                  {sendState === "idle" && (
                    <>
                      <Send size={12} />
                      <span>Transmit Signal</span>
                    </>
                  )}
                  {sendState === "sending" && (
                    <>
                      <RefreshCw size={12} className="animate-spin text-cyan-400" />
                      <span>Transmitting Packet</span>
                    </>
                  )}
                  {sendState === "sent" && (
                    <>
                      <CheckCircle size={12} className="text-emerald-400" />
                      <span>Signal Transmitted Successfully</span>
                    </>
                  )}
                </button>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs font-mono text-center mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>

          {/* Right Column: Holographic Globe Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Compass labels */}
            <div className="absolute top-4 font-mono text-[9px] text-slate-600 tracking-[0.2em] uppercase select-none pointer-events-none">
              SECURE_ORBIT_VISUALIZER // CLICK & DRAG
            </div>

            <canvas
              ref={globeCanvasRef}
              className="w-full max-w-[320px] aspect-square transition-all duration-300 cursor-grab active:cursor-grabbing drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            />
          </div>
        </div>

        {/* Social Platforms Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="font-mono text-[9px] text-slate-500 tracking-[0.22em] uppercase mb-6">
            ESTABLISH COMMUNICATION VIA COGNITIVE NETWORKS
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {SOCIAL_LINKS.map((link, idx) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-slate-400 transition-all duration-300 ${link.glow} hover:text-white`}
                >
                  <IconComponent size={14} />
                  <span>{link.name}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
