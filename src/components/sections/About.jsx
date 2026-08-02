import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, Coffee } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const stats = [
  { icon: Users, value: '150+', label: 'Happy Clients', bg: 'bg-violet-50', iconColor: 'text-violet-600' },
  { icon: Award, value: '200+', label: 'Projects Done', bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
  { icon: CheckCircle2, value: '98%', label: 'Satisfaction Rate', bg: 'bg-pink-50', iconColor: 'text-pink-600' },
  { icon: Coffee, value: '5+', label: 'Years Experience', bg: 'bg-amber-50', iconColor: 'text-amber-600' },
];

const skills = [
  { label: 'Web Development', pct: 95, color: 'from-violet-500 to-purple-500' },
  { label: 'SEO & Content', pct: 90, color: 'from-cyan-500 to-sky-500' },
  { label: 'Digital Marketing', pct: 88, color: 'from-pink-500 to-rose-500' },
  { label: 'UI/UX Design', pct: 85, color: 'from-amber-500 to-orange-500' },
];

const About = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-violet-100 border border-violet-200 text-violet-600">
              About DevSynx
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              We're a Team of{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                Digital Craftsmen
              </span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              DevSynx was founded with one mission: to help businesses unlock their full digital potential. We blend world-class design, engineering excellence, and data-driven marketing to deliver results that move the needle.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              Whether you're a startup looking for your first website or an established brand ready to scale, we bring the same level of passion and precision to every engagement.
            </p>

            {/* Skill bars */}
            <div className="space-y-5 mb-10">
              {skills.map((skill, i) => (
                <div key={skill.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 text-sm font-medium">{skill.label}</span>
                    <span className="text-violet-600 text-sm font-semibold">{skill.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-300 text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={22} className={stat.iconColor} />
                </div>
                <div className="text-4xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
