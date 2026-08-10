import { motion } from 'framer-motion';
import Button from '../ui/Button';

const skills = [
  { label: 'Web Development', pct: 95, color: 'from-blue-600 to-sky-400' },
  { label: 'SEO & Content', pct: 90, color: 'from-sky-500 to-cyan-500' },
  { label: 'Digital Marketing', pct: 88, color: 'from-blue-600 to-cyan-400' },
  { label: 'UI/UX Design', pct: 85, color: 'from-sky-400 to-blue-600' },
];

const About = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-sky-100/90 border border-sky-200 text-blue-700 backdrop-blur-md">
            About DeviAura
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            We're a Team of{' '}
            <span className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Digital Craftsmen
            </span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            DeviAura was founded with one mission: to help businesses unlock their full digital potential. We blend world-class design, engineering excellence, and data-driven marketing to deliver results that move the needle.
          </p>
          <p className="text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether you're a startup looking for your first website or an established brand ready to scale, we bring the same level of passion and precision to every engagement.
          </p>

          {/* Skill bars */}
          <div className="space-y-5 mb-12 text-left max-w-2xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 backdrop-blur-md">
            {skills.map((skill, i) => (
              <div key={skill.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-800 text-sm font-semibold">{skill.label}</span>
                  <span className="text-blue-600 text-sm font-bold">{skill.pct}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button href="#contact" variant="primary" size="lg">
            Work With Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
