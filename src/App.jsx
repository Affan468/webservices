import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import About from './components/sections/About';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Pricing />
        <Contact />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;