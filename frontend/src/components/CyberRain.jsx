import { useEffect, useRef } from "react";

export default function CyberRain() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン";
    const fontSize = 14;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array(cols).fill(1).map(() => Math.random() * -100);

    function draw() {
      ctx.fillStyle = "rgba(3, 0, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.985) {
          ctx.fillStyle = "rgba(255, 46, 196, 0.85)";
          ctx.shadowColor = "#ff2ec4";
          ctx.shadowBlur = 12;
        } else if (Math.random() > 0.96) {
          ctx.fillStyle = "rgba(0, 240, 255, 0.7)";
          ctx.shadowColor = "#00f0ff";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "rgba(157, 78, 221, 0.45)";
          ctx.shadowBlur = 0;
        }
        ctx.fillText(ch, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="cyber-rain" aria-hidden="true" />;
}
