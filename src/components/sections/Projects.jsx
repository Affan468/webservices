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
    <section id="projects" className="py-32 bg-slate-50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-blue-200 to-transparent" />

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
                  ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm'
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
                    className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  >
                    {/* Visual Cover Container */}
                    <div className="relative h-48 bg-slate-900 flex items-center justify-center p-4 overflow-hidden">
                      {/* Blurry Photo Background */}
                      {project.image ? (
                        <img
                          src={project.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-70 transform-gpu select-none pointer-events-none"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-blue-600 to-sky-400'}`} />
                      )}

                      {/* Dark overlay for optimal contrast */}
                      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

                      {/* Foreground crisp un-stretched image with clipped rounded corners */}
                      {project.image ? (
                        <div className="relative z-10 flex items-center justify-center rounded-2xl overflow-hidden shadow-xl border border-white/10 group-hover:scale-105 transition-transform duration-500 max-h-32 max-w-[85%]">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="max-h-32 max-w-full w-auto h-auto object-contain rounded-2xl"
                          />
                        </div>
                      ) : (
                        <span className="relative z-10 text-6xl">{project.icon || '🚀'}</span>
                      )}
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute z-20 inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <ExternalLink size={20} className="text-white" />
                          </div>
                        </motion.a>
                      )}
                      <div className="absolute z-30 top-3 left-3 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-lg pointer-events-none">
                        {project.tag || project.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-slate-900 font-bold text-lg mb-2">{project.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
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
            className="text-center py-16 px-6 rounded-2xl bg-white border border-slate-200 max-w-xl mx-auto backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Projects Ready to Add</h3>
            <p className="text-slate-600 text-sm">
              Provide your project details and we will showcase your custom work here!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
