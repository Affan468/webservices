import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import useMousePosition from '../../hooks/useMousePosition';
import Button from '../ui/Button';
import HeroShowcase from '../ui/HeroShowcase';

/* ── Floating Orb ── */
const FloatingOrb = ({ color, size, style, depth = 1 }) => {
  const { normalizedPosition } = useMousePosition();
  const x = useSpring(0, { stiffness: 80, damping: 20 });
  const y = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (window.innerWidth >= 768) {
      x.set(normalizedPosition.x * 40 * depth);
      y.set(normalizedPosition.y * 40 * depth);
    }
  }, [normalizedPosition, depth, x, y]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none hidden md:block"
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(35px)',
        opacity: 0.45,
        willChange: 'transform',
        x,
        y,
        ...style,
      }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

/* ── Cycling headline words ── */
const words = ['Websites', 'SEO', 'Digital Marketing', 'Growth', 'Results'];

const AnimatedWord = ({ word, isActive }) => (
  <motion.span
    key={word}
    initial={{ opacity: 0, y: 40, rotateX: -40 }}
    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -40, rotateX: isActive ? 0 : 40 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent"
    style={{ display: 'inline-block' }}
  >
    {word}
  </motion.span>
);

/* ── Hero Section ── */
const Hero = () => {
  const { normalizedPosition } = useMousePosition();
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const tiltX = useSpring(useMotionValue(0), { stiffness: 100, damping: 25 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 100, damping: 25 });

  useEffect(() => {
    if (window.innerWidth >= 768) {
      tiltX.set(normalizedPosition.y * -6);
      tiltY.set(normalizedPosition.x * 6);
    }
  }, [normalizedPosition, tiltX, tiltY]);

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.7,
        }}
      />

      {/* Purplish & Reddish Gradient wash from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/70 via-rose-50/40 to-white pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Purplish and Reddish background orbs */}
      <FloatingOrb
        color="radial-gradient(circle, #e9d5ff 0%, #c084fc 60%, transparent 80%)"
        size="520px"
        depth={0.8}
        style={{ top: '-5%', left: '-8%' }}
      />
      <FloatingOrb
        color="radial-gradient(circle, #fbcfe8 0%, #f43f5e 55%, transparent 80%)"
        size="480px"
        depth={1.2}
        style={{ bottom: '-5%', right: '-6%' }}
      />
      <FloatingOrb
        color="radial-gradient(circle, #f5d0fe 0%, #e879f9 60%, transparent 80%)"
        size="320px"
        depth={0.5}
        style={{ top: '25%', right: '18%' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ rotateX: tiltX, rotateY: tiltY }}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-rose-100 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-semibold shadow-sm">
            <Star size={13} className="text-amber-500 fill-amber-500" />
            Web Dev • SEO • Digital Marketing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-4"
        >
          We Build
          <br />
          <span className="relative inline-block" style={{ minWidth: '340px', height: '1.1em', verticalAlign: 'bottom' }}>
            {words.map((w, i) => (
              <AnimatedWord key={w} word={w} isActive={i === activeWord} />
            ))}
          </span>
          <br />
          That Scale Your Business
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6"
        >
          High-performance web development, data-driven SEO optimization, and ROI-focused digital marketing campaigns engineered for growth.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button href="#contact" variant="primary" size="md" className="group">
            Start Your Project
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button href="#services" variant="outline" size="md" className="group">
            <Play size={16} className="mr-2 fill-current" />
            Explore Services
          </Button>
        </motion.div>

        {/* Rating */}
        <motion.div variants={fadeUp} className="mb-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex text-yellow-400 mb-1 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} className="fill-current" />)}
            </div>
            <p className="text-sm text-gray-500">
              <strong className="text-gray-900">4.9/5</strong> rating from 120+ satisfied clients
            </p>
          </div>
        </motion.div>

        {/* Service Showcase Live Animation */}
        <motion.div variants={fadeUp}>
          <HeroShowcase />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
