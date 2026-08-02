import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Play, Star, Code2, TrendingUp, Megaphone, Settings, Target, Cpu, Terminal, Sparkles, BarChart2 } from 'lucide-react';
import useMousePosition from '../../hooks/useMousePosition';
import Button from '../ui/Button';

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

      {/* ── LEFT SIDE FLANK (Background Translucent Cards & Revolving Settings/Code Icon) ── */}
      <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 pointer-events-none z-10 opacity-90">
        {/* Revolving Settings/Gear Icon representing Web Dev Infrastructure */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-purple-100/60 backdrop-blur-md border border-purple-200/50 flex items-center justify-center text-purple-600 shadow-lg shadow-purple-100/50"
        >
          <Settings size={28} />
        </motion.div>

        {/* Translucent Web Development Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
          transition={{ y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
          className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200/70 shadow-xl shadow-purple-100/60 max-w-[210px]"
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
              <Code2 size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Web Development</p>
              <p className="text-[10px] text-purple-600 font-semibold">React • Next.js</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-purple-50/80 px-2 py-1 rounded-lg border border-purple-100">
            <Terminal size={10} className="text-purple-600" />
            <span>Clean & Scalable Code</span>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT SIDE FLANK (Background Translucent Cards & Revolving Target/Radar Icon) ── */}
      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-8 pointer-events-none z-10 opacity-90">
        {/* Revolving Target/Radar Icon representing SEO & Digital Marketing */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-rose-100/60 backdrop-blur-md border border-rose-200/50 flex items-center justify-center text-rose-600 shadow-lg shadow-rose-100/50"
        >
          <Target size={28} />
        </motion.div>

        {/* Translucent SEO Optimization Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
          transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
          className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-emerald-200/70 shadow-xl shadow-emerald-100/60 max-w-[210px]"
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">SEO Optimization</p>
              <p className="text-[10px] text-emerald-600 font-bold">Rank #1 • +340%</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-100 text-center font-medium">
            Organic Search Dominance
          </p>
        </motion.div>

        {/* Translucent Digital Marketing Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{ y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8, delay: 0.2 } }}
          className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-rose-200/70 shadow-xl shadow-rose-100/60 max-w-[210px]"
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Megaphone size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Digital Marketing</p>
              <p className="text-[10px] text-rose-600 font-bold">4.8x ROAS • High ROI</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-rose-700 bg-rose-50/80 px-2 py-1 rounded-lg border border-rose-100 font-medium">
            <BarChart2 size={10} className="text-rose-600" />
            <span>Targeted Google & Meta Ads</span>
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
          <span className="relative inline-block" style={{ minWidth: '320px', height: '1.1em', verticalAlign: 'bottom' }}>
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
