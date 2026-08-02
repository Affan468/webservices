import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Play, Star, Code2, TrendingUp, Megaphone } from 'lucide-react';
import useMousePosition from '../../hooks/useMousePosition';
import Button from '../ui/Button';
import heroImg from '../../assets/hero_services.png';

/* ── Floating Orb ── */
const FloatingOrb = ({ color, size, style, depth = 1 }) => {
  const { normalizedPosition } = useMousePosition();
  const x = useSpring(0, { stiffness: 80, damping: 20 });
  const y = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (window.innerWidth >= 768) {
      x.set(normalizedPosition.x * 30 * depth);
      y.set(normalizedPosition.y * 30 * depth);
    }
  }, [normalizedPosition, depth, x, y]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none hidden md:block"
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(40px)',
        opacity: 0.4,
        willChange: 'transform',
        x,
        y,
        ...style,
      }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

/* ── Cycling headline words ── */
const words = ['Websites', 'SEO', 'Marketing', 'Growth'];

const AnimatedWord = ({ word, isActive }) => (
  <motion.span
    key={word}
    initial={{ opacity: 0, y: 30, rotateX: -30 }}
    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -30, rotateX: isActive ? 0 : 30 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
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
      tiltX.set(normalizedPosition.y * -4);
      tiltY.set(normalizedPosition.x * 4);
    }
  }, [normalizedPosition, tiltX, tiltY]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden bg-white"
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

      {/* Purplish & Reddish Gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/60 via-rose-50/30 to-white pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Purplish and Reddish background orbs */}
      <FloatingOrb
        color="radial-gradient(circle, #e9d5ff 0%, #c084fc 60%, transparent 80%)"
        size="480px"
        depth={0.8}
        style={{ top: '-10%', left: '-5%' }}
      />
      <FloatingOrb
        color="radial-gradient(circle, #fbcfe8 0%, #f43f5e 55%, transparent 80%)"
        size="440px"
        depth={1.2}
        style={{ bottom: '-10%', right: '-4%' }}
      />

      {/* 2-Column Split Hero Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column — Text & CTAs */}
        <motion.div
          className="lg:col-span-7 text-center lg:text-left space-y-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-rose-100 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-semibold shadow-sm">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              Web Dev • SEO • Digital Marketing
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.08] tracking-tight"
          >
            We Build
            <br />
            <span className="relative inline-block" style={{ minWidth: '280px', height: '1.1em', verticalAlign: 'bottom' }}>
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
            className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            High-performance web development, data-driven SEO optimization, and ROI-focused digital marketing campaigns engineered for growth.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
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
          <motion.div variants={fadeUp} className="pt-2">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <strong className="text-gray-900">4.9/5</strong> rating from 120+ satisfied clients
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column — 3D Hero Illustration with Floating Animated Service Badges */}
        <motion.div
          className="lg:col-span-5 relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ rotateX: tiltX, rotateY: tiltY }}
        >
          {/* Central 3D Illustration Graphic */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-purple-200/50 border border-purple-100 bg-white"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={heroImg}
              alt="DevSynx Web Development, SEO & Digital Marketing Services"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Floating Animated Badge 1: Web Development */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: 0.5 } }}
            className="absolute -top-4 -left-4 sm:left-0 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-lg shadow-purple-100"
          >
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600">
              <Code2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Web Development</p>
              <p className="text-[10px] text-gray-500 font-medium">React • Next.js • Fast</p>
            </div>
          </motion.div>

          {/* Floating Animated Badge 2: SEO Optimization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: 0.7 } }}
            className="absolute top-1/2 -right-4 sm:-right-6 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-emerald-200 shadow-lg shadow-emerald-100"
          >
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">SEO Optimization</p>
              <p className="text-[10px] text-emerald-600 font-bold">Rank #1 Google • +340%</p>
            </div>
          </motion.div>

          {/* Floating Animated Badge 3: Digital Marketing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, y: [0, -6, 0] }}
            transition={{ y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: 0.9 } }}
            className="absolute -bottom-4 left-6 sm:left-12 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-rose-200 shadow-lg shadow-rose-100"
          >
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
              <Megaphone size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Digital Marketing</p>
              <p className="text-[10px] text-rose-600 font-bold">4.8x ROAS • High ROI</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
