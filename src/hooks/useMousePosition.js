import { useState, useEffect, useRef } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    let latestX = 0;
    let latestY = 0;
    let scheduled = false;

    const handleMouseMove = (e) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (!scheduled) {
        scheduled = true;
        rafId.current = requestAnimationFrame(() => {
          setMousePosition({ x: latestX, y: latestY });

          const normalizedX = (latestX / window.innerWidth - 0.5) * 2;
          const normalizedY = (latestY / window.innerHeight - 0.5) * 2;
          setNormalizedPosition({ x: normalizedX, y: normalizedY });

          scheduled = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { mousePosition, normalizedPosition };
};

export default useMousePosition;
