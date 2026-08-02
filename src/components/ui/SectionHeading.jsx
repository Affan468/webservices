import { motion } from 'framer-motion';

const SectionHeading = ({ badge, title, highlight, subtitle, centered = true }) => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className={`mb-16 ${centered ? 'text-center' : ''}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      {badge && (
        <motion.span
          variants={item}
          className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 backdrop-blur-md"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={item}
        className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
      >
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={item}
          className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
