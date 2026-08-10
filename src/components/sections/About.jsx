import { motion } from 'framer-motion';
import Button from '../ui/Button';

const skills = [
  { label: 'Web Development', pct: 95, color: 'from-[#064699] to-sky-400' },
  { label: 'SEO & Content', pct: 90, color: 'from-cyan-400 to-[#064699]' },
  { label: 'Digital Marketing', pct: 88, color: 'from-blue-500 to-sky-300' },
  { label: 'UI/UX Design', pct: 85, color: 'from-sky-400 to-[#064699]' },
];

const About = () => {
  return (
    <section id="about" className="py-32 bg-[#081e26] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#064699]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#064699]/15 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#064699]/20 border border-[#064699]/40 text-sky-300 backdrop-blur-md">
            About DeviAura
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            We're a Team of{' '}
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Digital Craftsmen
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl mx-auto">
            DeviAura was founded with one mission: to help businesses unlock their full digital potential. We blend world-class design, engineering excellence, and data-driven marketing to deliver results that move the needle.
          </p>
          <p className="text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether you're a startup looking for your first website or an established brand ready to scale, we bring the same level of passion and precision to every engagement.
          </p>

          {/* Skill bars */}
          <div className="space-y-5 mb-12 text-left max-w-2xl mx-auto bg-[#061c24]/80 p-8 rounded-3xl border border-[#064699]/30 backdrop-blur-md">
            {skills.map((skill, i) => (
              <div key={skill.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 text-sm font-medium">{skill.label}</span>
                  <span className="text-sky-300 text-sm font-semibold">{skill.pct}%</span>
                </div>
                <div className="h-2 bg-[#04141b] rounded-full overflow-hidden">
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
