import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Disable on touch screens/mobile devices
    if (window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Track mouse coordinates (with smooth spring interpolation for the outer ring)
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsHidden(false);

      // Instantly position the center dot
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    // Smooth scroll interpolation loop
    const animateRing = () => {
      // Lerp (Linear Interpolation) outer ring coordinates towards the mouse
      // This produces the beautiful, premium liquid trail effect
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };

    const requestID = requestAnimationFrame(animateRing);

    // Global Hover states listener
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering over any clickable or interactive node
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.getAttribute("role") === "button";

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", onMouseOver);

    // Hide native cursor
    document.body.style.cursor = "none";

    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.style.cursor = "auto";
    };
  }, []);

  // Return null on mobile viewport
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches) {
    return null;
  }

  return (
    <>
      {/* Central focus dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-cyan-400 rounded-full pointer-events-none z-[100] transition-opacity duration-300 mix-blend-screen shadow-[0_0_8px_rgba(34,211,238,1)] ${
          isHidden ? "opacity-0" : "opacity-100"
        } ${isHovered ? "scale-50 bg-white shadow-none" : "scale-100"}`}
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Lagging trailing outer aura ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-cyan-400/50 pointer-events-none z-[99] transition-all duration-300 mix-blend-screen bg-transparent ${
          isHidden ? "opacity-0" : "opacity-100"
        } ${
          isHovered
            ? "w-14 h-14 -ml-7 -mt-7 bg-cyan-400/10 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      />
    </>
  );
}
