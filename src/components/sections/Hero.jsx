import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Play, Star, Code2, TrendingUp, Megaphone, Settings, Target, Sparkles, BarChart2 } from 'lucide-react';
import useMousePosition from '../../hooks/useMousePosition';
import Button from '../ui/Button';

// User Uploaded Service Images
import webDevImg from '../../assets/webdev.jpg';
import seoImg from '../../assets/seo-bgremove.png';
import digitalImg from '../../assets/digital-removebg-preview.png';

/* ── Floating Orb Background ── */
const FloatingOrb = ({ color, size, style, depth = 1 }) => {
  const { normalizedPosition } = useMousePosition();
  const x = useSpring(0, { stiffness: 60, damping: 25 });
  const y = useSpring(0, { stiffness: 60, damping: 25 });

  useEffect(() => {
    if (window.innerWidth >= 768) {
      x.set(normalizedPosition.x * 20 * depth);
      y.set(normalizedPosition.y * 20 * depth);
    }
  }, [normalizedPosition, depth, x, y]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none hidden md:block transform-gpu will-change-transform opacity-40"
      style={{
        width: size,
        height: size,
        background: color,
        x,
        y,
        ...style,
      }}
    />
  );
};

/* ── Cycling headline words ── */
const words = ['Web Development', 'Mobile App Development', 'SEO', 'Digital Marketing'];

const AnimatedWord = ({ word, isActive }) => (
  <motion.span
    key={word}
    initial={{ opacity: 0, y: 30, rotateX: -30 }}
    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -30, rotateX: isActive ? 0 : 30 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
    className="absolute inset-0 flex items-center justify-center text-center whitespace-nowrap bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent px-6 overflow-visible text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-normal"
    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
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

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden bg-[#081e26]"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #064699 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.25,
        }}
      />

      {/* Deep Light-Blue to Midnight Gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/60 via-[#064699]/20 to-[#081e26] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#081e26] to-transparent pointer-events-none" />

      {/* Background Orbs */}
      <FloatingOrb
        color="radial-gradient(circle, #38bdf8 0%, #064699 60%, transparent 80%)"
        size="540px"
        depth={0.8}
        style={{ top: '-10%', left: '-5%' }}
      />
      <FloatingOrb
        color="radial-gradient(circle, #0ea5e9 0%, #081e26 70%, transparent 80%)"
        size="500px"
        depth={1.2}
        style={{ bottom: '-10%', right: '-4%' }}
      />

      {/* ── LEFT SIDE FLANK: WEB DEVELOPMENT VISUAL & REVOLVING SETTINGS ICON ── */}
      <div className="absolute left-4 lg:left-10 xl:left-14 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 pointer-events-none z-10">
        {/* Revolving Settings Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 rounded-2xl bg-[#064699]/20 backdrop-blur-sm border border-[#064699]/40 flex items-center justify-center text-sky-400 shadow-sm"
        >
          <Settings size={26} />
        </motion.div>

        {/* Frameless Web Dev Image floating in background */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 0.85, x: 0, y: [0, -12, 0] }}
          transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
          className="relative max-w-[250px] xl:max-w-[280px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(6,70,153,0.3)] border border-[#064699]/30 hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
        >
          <img
            src={webDevImg}
            alt="Web Development"
            className="w-full h-auto object-cover rounded-3xl opacity-85 hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>

      {/* ── RIGHT SIDE FLANK: SEO & DIGITAL MARKETING FRAMELESS GRAPHICS ── */}
      <div className="absolute right-4 lg:right-10 xl:right-14 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-10 pointer-events-none z-10">
        {/* Revolving Target Radar Icon */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 rounded-2xl bg-[#064699]/20 backdrop-blur-sm border border-[#064699]/40 flex items-center justify-center text-sky-400 shadow-sm"
        >
          <Target size={26} />
        </motion.div>

        {/* Frameless Floating SEO Graphic */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.9, x: 0, y: [0, 12, 0] }}
          transition={{ y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
          className="relative max-w-[220px] xl:max-w-[250px] pointer-events-auto filter drop-shadow-[0_20px_35px_rgba(16,185,129,0.35)] hover:opacity-100 transition-all duration-300 hover:scale-105"
        >
          <img
            src={seoImg}
            alt="SEO Optimization"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Frameless Floating Digital Marketing Graphic */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.9, x: 0, y: [0, -10, 0] }}
          transition={{ y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8, delay: 0.2 } }}
          className="relative max-w-[220px] xl:max-w-[250px] pointer-events-auto filter drop-shadow-[0_20px_35px_rgba(244,63,94,0.35)] hover:opacity-100 transition-all duration-300 hover:scale-105"
        >
          <img
            src={digitalImg}
            alt="Digital Marketing"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* ── CENTERED HERO CONTENT ── */}
      <motion.div
        className="relative z-20 max-w-4xl mx-auto px-6 text-center"
        style={{ rotateX: tiltX, rotateY: tiltY }}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064699]/20 border border-[#064699]/40 text-sky-300 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md">
            <Sparkles size={13} className="text-sky-400" />
            Fueling Digital Success
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
        >
          We Do
          <br />
          <span className="relative inline-block w-full max-w-full sm:w-auto min-w-[280px] sm:min-w-[480px] md:min-w-[640px] lg:min-w-[750px] h-[1.2em] align-bottom my-1 overflow-visible">
            {words.map((w, i) => (
              <AnimatedWord key={w} word={w} isActive={i === activeWord} />
            ))}
          </span>
          <br />
          To Scale Your Business
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          High-performance web development, data-driven SEO optimization, and ROI-focused digital marketing campaigns engineered for growth.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
        <motion.div variants={fadeUp} className="flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="flex text-yellow-400 mb-1 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} className="fill-current" />)}
            </div>
            <p className="text-sm text-slate-400">
              <strong className="text-white">4.9/5</strong> rating from 120+ satisfied clients
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
