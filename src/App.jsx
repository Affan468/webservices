import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import About from './components/sections/About';
import AdminPanel from './components/admin/AdminPanel';
import { ProjectProvider } from './context/ProjectContext';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const AnimatedSection = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={sectionVariants}
    className="relative overflow-hidden transform-gpu"
  >
    {children}
  </motion.div>
);

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
        {showAdmin ? (
          <AdminPanel onBack={() => setShowAdmin(false)} />
        ) : (
          <>
            <Navbar onOpenAdmin={() => setShowAdmin(true)} />
            <main>
              <Hero />
              <AnimatedSection>
                <Services />
              </AnimatedSection>
              <AnimatedSection>
                <Projects />
              </AnimatedSection>
              <AnimatedSection>
                <Pricing />
              </AnimatedSection>
              <AnimatedSection>
                <Contact />
              </AnimatedSection>
              <AnimatedSection>
                <About />
              </AnimatedSection>
            </main>
            <Footer onOpenAdmin={() => setShowAdmin(true)} />
          </>
        )}
      </div>
    </ProjectProvider>
  );
}

export default App;