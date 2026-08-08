import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, Coffee } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const stats = [
  { icon: Users, value: '150+', label: 'Happy Clients', bg: 'bg-[#064699]/20', iconColor: 'text-sky-300' },
  { icon: Award, value: '200+', label: 'Projects Done', bg: 'bg-[#064699]/20', iconColor: 'text-cyan-300' },
  { icon: CheckCircle2, value: '98%', label: 'Satisfaction Rate', bg: 'bg-[#064699]/20', iconColor: 'text-blue-300' },
  { icon: Coffee, value: '5+', label: 'Years Experience', bg: 'bg-[#064699]/20', iconColor: 'text-sky-400' },
];

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

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
            <p className="text-slate-400 leading-relaxed mb-6">
              DeviAura was founded with one mission: to help businesses unlock their full digital potential. We blend world-class design, engineering excellence, and data-driven marketing to deliver results that move the needle.
            </p>
            <p className="text-slate-400 leading-relaxed mb-10">
              Whether you're a startup looking for your first website or an established brand ready to scale, we bring the same level of passion and precision to every engagement.
            </p>

            {/* Skill bars */}
            <div className="space-y-5 mb-10">
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

          {/* Right — stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-[#061c24]/90 border border-[#064699]/30 hover:border-[#064699] hover:shadow-2xl transition-all duration-300 text-center backdrop-blur-sm"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${stat.bg} border border-[#064699]/40 flex items-center justify-center`}>
                  <stat.icon size={22} className={stat.iconColor} />
                </div>
                <div className="text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
