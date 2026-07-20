import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, inside: false });
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse coordinates (with smooth interpolation)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
      mouseRef.current.inside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.inside = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track scroll
    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Generate Background Stars (3D depth)
    const stars: Star[] = [];
    const numStars = 150;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000 + 10,
        size: Math.random() * 1.5 + 0.5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
      });
    }

    // Generate Floating Neural Network Particles
    const particles: Particle[] = [];
    const numParticles = 70;
    const colors = ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899"];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Moving Aurora Blobs Config
    const blobs = [
      { x: 0.2, y: 0.3, tx: 0.2, ty: 0.3, r: 350, speed: 0.005, color: "rgba(59, 130, 246, 0.07)", angle: 0 },
      { x: 0.8, y: 0.4, tx: 0.8, ty: 0.4, r: 400, speed: 0.003, color: "rgba(139, 92, 246, 0.06)", angle: Math.PI / 2 },
      { x: 0.5, y: 0.8, tx: 0.5, ty: 0.8, r: 380, speed: 0.004, color: "rgba(6, 182, 212, 0.07)", angle: Math.PI },
    ];

    let time = 0;

    // Core Animation Loop
    const render = () => {
      time += 0.003;

      // Smooth scroll tracking
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.1;
      const scrollY = scrollRef.current.current;

      // Smooth mouse tracking (lerp)
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.1;

      // Clear with very dark slate color that fits our palette #050816 / #090b12
      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Subtle Animated Perspective Grid Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSpacing = 80;
      const gridOffset = (scrollY * 0.5) % gridSpacing;

      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -gridSpacing; y < height + gridSpacing; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y + gridOffset);
        ctx.lineTo(width, y + gridOffset);
        ctx.stroke();
      }

      // 2. Draw 3D Star Field (Parallax & Depth movement on scroll)
      stars.forEach((star) => {
        // Move stars forward on z axis slightly, and react to scroll
        let xProj = (star.x / (star.z / 500)) + width / 2;
        let yProj = (star.y - scrollY * 0.1) / (star.z / 500) + height / 2;

        // Wrap around when star goes out of bounds
        while (yProj < 0) {
          star.y += height;
          yProj = (star.y - scrollY * 0.1) / (star.z / 500) + height / 2;
        }
        while (yProj > height) {
          star.y -= height;
          yProj = (star.y - scrollY * 0.1) / (star.z / 500) + height / 2;
        }

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(xProj, yProj, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Moving Aurora Blobs (Generates the immersive soft atmosphere)
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((blob) => {
        blob.angle += blob.speed;
        // Wander slightly around the target coordinate
        const cx = (blob.x + Math.sin(blob.angle) * 0.15) * width;
        const cy = (blob.y + Math.cos(blob.angle) * 0.15) * height;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.5, blob.color.replace("0.07", "0.03").replace("0.06", "0.02"));
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";

      // 4. Draw Floating Neural Network Particles with Proximity Connections
      particles.forEach((p, index) => {
        // Move based on velocities
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // React to mouse spotlight: attract slightly to cursor
        if (mouseRef.current.inside) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const force = (250 - dist) / 2500;
            p.vx += (dx / dist) * force * 0.15;
            p.vy += (dy / dist) * force * 0.15;

            // Cap velocity
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const maxSpeed = 1.2;
            if (speed > maxSpeed) {
              p.vx = (p.vx / speed) * maxSpeed;
              p.vy = (p.vy / speed) * maxSpeed;
            }
          }
        }

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Check distance with other particles to draw lines
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            // Stronger opacity when closer
            const lineAlpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1.0;

      // 5. Draw Interactive Spotlight following the mouse cursor
      if (mouseRef.current.inside) {
        ctx.globalCompositeOperation = "screen";
        const spotlightGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          350
        );
        // Soft glowing cyan/blue light spotlight
        spotlightGlow.addColorStop(0, "rgba(56, 189, 248, 0.08)");
        spotlightGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
        spotlightGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = spotlightGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 350, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#050816]"
    />
  );
}
