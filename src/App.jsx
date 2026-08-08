import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import About from './components/sections/About';

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
    {/* Glowing transition beam between sections */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
    {children}
  </motion.div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#081e26] text-slate-100 font-sans selection:bg-[#064699]/40 selection:text-sky-200">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;