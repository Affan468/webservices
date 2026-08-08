import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, ChevronDown } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { useProjects } from '../../context/ProjectContext';

const categories = ['All', 'Web Dev', 'Mobile Apps', 'SEO', 'Marketing'];

const Projects = () => {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter((p) => activeFilter === 'All' || p.category === activeFilter);
  const visibleProjects = showAll ? filtered : filtered.slice(0, 3);

  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    setShowAll(false);
  };

  return (
    <section id="projects" className="py-32 bg-[#081e26] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#064699]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Projects"
          title="Projects We're"
          highlight="Proud Of"
          subtitle="Real work, real results. Here's a selection of custom projects that delivered measurable business impact."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#064699] to-[#085ac9] text-white border border-sky-400/40 shadow-lg shadow-[#064699]/40'
                  : 'bg-[#061c24]/90 border border-[#064699]/30 text-slate-300 hover:text-white hover:border-[#064699] hover:shadow-sm'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid or Empty State */}
        {filtered.length > 0 ? (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl overflow-hidden bg-[#061c24]/90 border border-[#064699]/30 hover:border-[#064699] hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  >
                    {/* Visual */}
                    <div className={`relative h-48 bg-gradient-to-br ${project.gradient || 'from-[#064699] to-[#081e26]'} flex items-center justify-center p-4 overflow-hidden`}>
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <span className="text-6xl">{project.icon || '🚀'}</span>
                      )}
                      <div className="absolute inset-0 bg-black/20" />
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <ExternalLink size={20} className="text-white" />
                          </div>
                        </motion.a>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                        {project.tag || project.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Show More / Show Less Button */}
            {filtered.length > 3 && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  size="md"
                  className="group"
                >
                  {showAll ? 'Show Less' : `Show More (${filtered.length - 3} More)`}
                  <ChevronDown
                    size={16}
                    className={`ml-2 transition-transform duration-300 ${
                      showAll ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-6 rounded-2xl bg-[#061c24]/60 border border-[#064699]/30 max-w-xl mx-auto backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#064699]/20 border border-[#064699]/40 flex items-center justify-center mx-auto mb-4 text-sky-400">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Custom Projects Ready to Add</h3>
            <p className="text-slate-400 text-sm">
              Provide your project details and we will showcase your custom work here!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
