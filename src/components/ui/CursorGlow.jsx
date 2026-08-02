import { motion } from 'framer-motion';
import useMousePosition from '../../hooks/useMousePosition';

const CursorGlow = () => {
  const { mousePosition } = useMousePosition();

  return (
    <>
      {/* Outer glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.12) 50%, transparent 70%)',
          width: '48px',
          height: '48px',
          marginLeft: '-24px',
          marginTop: '-24px',
        }}
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '8px',
          height: '8px',
          background: '#7c3aed',
          borderRadius: '50%',
          marginLeft: '-4px',
          marginTop: '-4px',
        }}
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.2 }}
      />
    </>
  );
};

export default CursorGlow;
