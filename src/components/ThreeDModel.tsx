import { useEffect, useRef, useState } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  r: number;
  color: string;
}

export default function ThreeDModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = 450);
    let height = (canvas.height = 450);

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * (window.devicePixelRatio || 1);
      height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - cx) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - cy) / (rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Build the 3D Neural Network / Globe Model
    const nodes: Node3D[] = [];
    const sphereRadius = 130;
    const numNodes = 60;

    // Golden spiral distribution on a sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numNodes; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numNodes);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      const colors = ["#60a5fa", "#38bdf8", "#c084fc", "#f472b6"];
      nodes.push({
        x,
        y,
        z,
        r: Math.random() * 2 + 1.5,
        color: colors[i % colors.length],
      });
    }

    // Build Ring Orbits around the sphere
    const ringNodes: Node3D[] = [];
    const numRingNodes = 30;
    const ringRadius = 180;
    for (let i = 0; i < numRingNodes; i++) {
      const angle = (i / numRingNodes) * Math.PI * 2;
      ringNodes.push({
        x: ringRadius * Math.cos(angle),
        y: 0,
        z: ringRadius * Math.sin(angle),
        r: 1.5,
        color: "rgba(34, 211, 238, 0.6)",
      });
    }

    // 3D rotation angles
    let angleX = 0.005;
    let angleY = 0.008;

    // Current mouse influence
    let mouseX = 0;
    let mouseY = 0;

    // Core Animation loop using 3D matrix projection
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse values
      mouseX += (mouseRef.current.targetX - mouseX) * 0.08;
      mouseY += (mouseRef.current.targetY - mouseY) * 0.08;

      // Base rotation + mouse influence tilt
      const rx = angleX + mouseY * 0.02;
      const ry = angleY + mouseX * 0.02;

      // Slowly increment base angles
      angleX += 0.002;
      angleY += 0.004;

      const fov = 350;
      const cx = width / 2;
      const cy = height / 2;

      // 3D Rotation Math Helpers
      const rotate = (node: Node3D, rx: number, ry: number) => {
        // Rotate X
        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        const y1 = node.y * cosX - node.z * sinX;
        const z1 = node.z * cosX + node.y * sinX;

        // Rotate Y
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        const x2 = node.x * cosY + z1 * sinY;
        const z2 = z1 * cosY - node.x * sinY;

        return { x: x2, y: y1, z: z2 };
      };

      // Project & Draw Links first
      const projectedSphere: { x: number; y: number; z: number; color: string; r: number }[] = [];

      nodes.forEach((node) => {
        const rotated = rotate(node, rx, ry);
        // Perspective projection
        const scale = fov / (fov + rotated.z);
        const px = rotated.x * scale + cx;
        const py = rotated.y * scale + cy;

        projectedSphere.push({ x: px, y: py, z: rotated.z, color: node.color, r: node.r * scale });
      });

      // Draw connection lines on the sphere (if vertices are close in 3D space)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          // Compute 3D distance
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 75) {
            const p1 = projectedSphere[i];
            const p2 = projectedSphere[j];

            // Only draw if not behind the FOV plane
            if (p1.z > -fov && p2.z > -fov) {
              const avgZ = (p1.z + p2.z) / 2;
              // Fade line based on depth (z-index) and 3D distance
              const alpha = (1 - dist / 75) * (0.15 + (fov - avgZ) / (fov * 2)) * 0.4;
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw Orbiting Ring Nodes & Connect Ring to Sphere Nodes with faint blue strings
      const projectedRing: { x: number; y: number; z: number; color: string; r: number }[] = [];
      ringNodes.forEach((node) => {
        // Apply slight tilt on Z axis to make the ring look cool
        const tiltedNode = {
          x: node.x,
          y: node.x * 0.25 + node.y, // Tilt effect
          z: node.z,
          r: node.r,
          color: node.color,
        };

        const rotated = rotate(tiltedNode, rx, ry);
        const scale = fov / (fov + rotated.z);
        const px = rotated.x * scale + cx;
        const py = rotated.y * scale + cy;

        projectedRing.push({ x: px, y: py, z: rotated.z, color: node.color, r: node.r * scale });
      });

      // Draw Ring Nodes and connecting lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      projectedRing.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.stroke();

      projectedRing.forEach((p) => {
        const depthAlpha = (fov - p.z) / (fov * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${depthAlpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Sphere Nodes (drawn last so they sit on top of the links)
      projectedSphere.sort((a, b) => b.z - a.z); // Draw back nodes first (painter's algorithm)
      projectedSphere.forEach((p) => {
        if (p.z > -fov) {
          const depthAlpha = (fov - p.z) / (fov * 2);
          // Highlight nodes facing the camera
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          glow.addColorStop(0, p.color);
          glow.addColorStop(0.3, p.color);
          glow.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw subtle glowing AI halo in center
      const haloGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereRadius);
      haloGradient.addColorStop(0, "rgba(139, 92, 246, 0.05)");
      haloGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.02)");
      haloGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Render overlay technical labels in space
      ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
      ctx.font = "9px monospace";
      ctx.fillText("AI_CORE_READY // OK", cx - 50, cy - sphereRadius - 20);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
      ctx.beginPath();
      ctx.moveTo(cx - 60, cy - sphereRadius - 15);
      ctx.lineTo(cx + 60, cy - sphereRadius - 15);
      ctx.stroke();

      // Side tech numbers spinning
      ctx.fillStyle = "rgba(139, 92, 246, 0.3)";
      ctx.font = "8px monospace";
      const radValue = (angleY % (Math.PI * 2)).toFixed(4);
      ctx.fillText(`ROT_Y: ${radValue} RAD`, cx - 180, cy + 180);
      ctx.fillText(`NODES: ${numNodes} ACTIVE`, cx + 80, cy + 180);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center w-full max-w-[450px] aspect-square select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Immersive futuristic visual borders */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg" />

      {/* Dynamic tech circle backing */}
      <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/5 animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-12 rounded-full border border-dashed border-purple-500/5 animate-[spin_40s_linear_infinite_reverse]" />

      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto transition-all duration-500 scale-95 group-hover:scale-100 drop-shadow-[0_0_25px_rgba(56,189,248,0.15)]"
      />
    </div>
  );
}
