import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const categories = ['All', 'Web Dev', 'SEO', 'Marketing'];

const projects = [
  {
    id: 1, title: 'FinTrack Dashboard', category: 'Web Dev', tag: 'SaaS Platform',
    description: 'A real-time financial analytics dashboard with complex data visualizations.',
    gradient: 'from-violet-500 to-purple-700', icon: '📊', metrics: '+340% faster reporting',
  },
  {
    id: 2, title: 'NaturaBrand SEO', category: 'SEO', tag: 'Organic Growth',
    description: 'Took an organic skincare brand from 0 to 50k monthly visitors in 6 months.',
    gradient: 'from-emerald-500 to-teal-600', icon: '🌿', metrics: '+1200% organic traffic',
  },
  {
    id: 3, title: 'LuxePlatform Launch', category: 'Web Dev', tag: 'Full-Stack Web',
    description: 'Premium custom web platform with high-speed animations and interactive UI.',
    gradient: 'from-pink-500 to-rose-600', icon: '💻', metrics: '100/100 Speed Score',
  },
  {
    id: 4, title: 'TechFlow PPC', category: 'Marketing', tag: 'Google Ads',
    description: 'Performance marketing campaign that achieved 400% ROAS for a B2B SaaS.',
    gradient: 'from-amber-500 to-orange-600', icon: '🎯', metrics: '400% ROAS achieved',
  },
  {
    id: 5, title: 'MedConnect Portal', category: 'Web Dev', tag: 'Healthcare',
    description: 'HIPAA-compliant patient portal connecting 50,000+ patients with providers.',
    gradient: 'from-cyan-500 to-sky-600', icon: '🏥', metrics: '50k+ active users',
  },
  {
    id: 6, title: 'GrowthLab Campaign', category: 'Marketing', tag: 'Social Media',
    description: 'Full-funnel social media campaign that tripled brand awareness in 90 days.',
    gradient: 'from-indigo-500 to-blue-600', icon: '🚀', metrics: '3x brand awareness',
  },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = projects.filter((p) => activeFilter === 'All' || p.category === activeFilter);

  return (
    <section id="portfolio" className="py-32 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Work"
          title="Projects We're"
          highlight="Proud Of"
          subtitle="Real work, real results. Here's a selection of projects that delivered measurable business impact."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Visual */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <span className="text-6xl">{project.icon}</span>
                  <div className="absolute inset-0 bg-black/10" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <ExternalLink size={20} className="text-white" />
                    </div>
                  </motion.div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/25 backdrop-blur-sm text-white text-xs font-medium">
                    {project.tag}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {project.metrics}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
