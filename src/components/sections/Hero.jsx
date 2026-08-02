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
const words = ['Websites', 'SEO', 'Marketing', 'Growth', 'Results'];

const AnimatedWord = ({ word, isActive }) => (
  <motion.span
    key={word}
    initial={{ opacity: 0, y: 30, rotateX: -30 }}
    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -30, rotateX: isActive ? 0 : 30 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
    className="absolute inset-0 flex items-center justify-center text-center whitespace-nowrap bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent px-2"
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
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden bg-white"
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

      {/* Background Orbs */}
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

      {/* ── LEFT SIDE FLANK: WEB DEVELOPMENT IMAGE & REVOLVING SETTINGS ICON ── */}
      <div className="absolute left-4 lg:left-10 xl:left-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 pointer-events-none z-10">
        {/* Revolving Settings Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-purple-100/40 backdrop-blur-md border border-purple-200/40 flex items-center justify-center text-purple-600/80 shadow-sm"
        >
          <Settings size={28} />
        </motion.div>

        {/* Translucent Web Dev Picture Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
          transition={{ y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
          className="relative max-w-[270px] xl:max-w-[300px] rounded-2xl overflow-hidden bg-white/45 backdrop-blur-lg border border-purple-200/50 shadow-xl p-3 space-y-2.5 opacity-65 hover:opacity-95 transition-opacity duration-300 pointer-events-auto"
        >
          <div className="relative rounded-xl overflow-hidden h-40 sm:h-44 bg-purple-50/40">
            <img
              src={webDevImg}
              alt="Web Development Service"
              className="w-full h-full object-cover opacity-70 hover:opacity-95 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent" />
            <span className="absolute bottom-2.5 left-2.5 text-xs font-bold text-white bg-purple-600/70 px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
              Web Development
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 px-1 font-semibold">
            <Code2 size={14} className="text-purple-600" />
            <span>React • Next.js • High Speed</span>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT SIDE FLANK: SEO & DIGITAL MARKETING TRANSPARENT IMAGES ── */}
      <div className="absolute right-4 lg:right-10 xl:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-6 pointer-events-none z-10">
        {/* Revolving Target Radar Icon */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-rose-100/40 backdrop-blur-md border border-rose-200/40 flex items-center justify-center text-rose-600/80 shadow-sm"
        >
          <Target size={28} />
        </motion.div>

        {/* Translucent SEO Image Flank */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
          transition={{ y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
          className="relative max-w-[260px] xl:max-w-[285px] rounded-2xl bg-white/45 backdrop-blur-lg border border-emerald-200/50 shadow-xl p-3 space-y-2.5 opacity-65 hover:opacity-95 transition-opacity duration-300 pointer-events-auto"
        >
          <div className="relative h-32 sm:h-36 flex items-center justify-center bg-emerald-50/30 rounded-xl overflow-hidden p-2">
            <img
              src={seoImg}
              alt="SEO Optimization Service"
              className="max-h-full object-contain drop-shadow-md opacity-75 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex items-center justify-between text-xs px-1 font-bold">
            <span className="text-gray-900 flex items-center gap-1.5">
              <TrendingUp size={14} className="text-emerald-600" /> SEO Search
            </span>
            <span className="text-emerald-700 font-extrabold bg-emerald-100/70 px-2 py-0.5 rounded">Rank #1</span>
          </div>
        </motion.div>

        {/* Translucent Digital Marketing Image Flank */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{ y: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8, delay: 0.2 } }}
          className="relative max-w-[260px] xl:max-w-[285px] rounded-2xl bg-white/45 backdrop-blur-lg border border-rose-200/50 shadow-xl p-3 space-y-2.5 opacity-65 hover:opacity-95 transition-opacity duration-300 pointer-events-auto"
        >
          <div className="relative h-32 sm:h-36 flex items-center justify-center bg-rose-50/30 rounded-xl overflow-hidden p-2">
            <img
              src={digitalImg}
              alt="Digital Marketing Service"
              className="max-h-full object-contain drop-shadow-md opacity-75 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex items-center justify-between text-xs px-1 font-bold">
            <span className="text-gray-900 flex items-center gap-1.5">
              <Megaphone size={14} className="text-rose-600" /> Digital Marketing
            </span>
            <span className="text-rose-700 font-extrabold bg-rose-100/70 px-2 py-0.5 rounded">4.8x ROAS</span>
          </div>
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 via-fuchsia-100 to-rose-100 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-semibold shadow-sm">
            <Sparkles size={13} className="text-purple-600" />
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
          <span className="relative inline-block min-w-[260px] sm:min-w-[360px] md:min-w-[420px] lg:min-w-[460px] h-[1.1em] align-bottom">
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
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8"
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
            <p className="text-sm text-gray-500">
              <strong className="text-gray-900">4.9/5</strong> rating from 120+ satisfied clients
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
