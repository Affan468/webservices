import { useEffect, useRef } from 'react';

const WaterRippleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const ripples = [];
    const droplets = [];
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;
    let moveTimeout;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const addRipple = (x, y, intensity = 1) => {
      // Main expanding water ring
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: 60 + Math.random() * 40 * intensity,
        alpha: 0.5 * intensity,
        speed: 1.8 + Math.random() * 0.8,
        lineWidth: 2.5 + Math.random() * 1.5,
      });

      // Secondary inner echo ring for liquid feel
      ripples.push({
        x,
        y,
        radius: 1,
        maxRadius: 40 + Math.random() * 25 * intensity,
        alpha: 0.35 * intensity,
        speed: 1.2 + Math.random() * 0.6,
        lineWidth: 1.5,
      });

      // Water droplets splash particles
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        droplets.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          alpha: 0.6 * intensity,
          decay: 0.02 + Math.random() * 0.02,
        });
      }
    };

    const handlePointerMove = (e) => {
      // Skip touch events on mobile to preserve 60fps native scrolling performance
      if (e.pointerType === 'touch' || window.innerWidth < 768) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dist = Math.hypot(x - lastX, y - lastY);
      
      // Emit ripple if mouse moved enough
      if (dist > 8) {
        const speedIntensity = Math.min(dist / 30, 2);
        addRipple(x, y, speedIntensity);
        lastX = x;
        lastY = y;
      }

      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const heroElement = canvas.parentElement;
    heroElement.addEventListener('pointermove', handlePointerMove);

    // Animation Loop (runs on GPU canvas, zero React state overhead)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update water ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.955; // Smooth exponential water decay

        if (r.alpha < 0.008 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);

        // Water gradient stroke: Purple -> Rose/Reddish translucent liquid ring
        const gradient = ctx.createRadialGradient(
          r.x, r.y, Math.max(0, r.radius - r.lineWidth * 2),
          r.x, r.y, r.radius + r.lineWidth * 2
        );
        gradient.addColorStop(0, `rgba(168, 85, 247, 0)`);
        gradient.addColorStop(0.4, `rgba(168, 85, 247, ${r.alpha * 0.75})`);
        gradient.addColorStop(0.8, `rgba(244, 63, 94, ${r.alpha * 0.65})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = r.lineWidth;
        ctx.stroke();
        ctx.restore();
      }

      // Draw and update water droplet particles
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.96;
        d.vy *= 0.96;
        d.alpha -= d.decay;

        if (d.alpha <= 0) {
          droplets.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 29, 72, ${d.alpha})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      heroElement.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};

export default WaterRippleCanvas;
