import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import logoImg from '../../assets/image.png';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
  { label: 'About', href: '#about' },
];

const Navbar = ({ onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 150) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.scrollY >= 150) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    setActiveSection(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-md shadow-blue-900/5 py-2.5 md:py-3'
            : 'bg-[#061d36]/75 backdrop-blur-md border-b border-sky-400/20 py-3 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo - Direct transparent logo without any background box or boundary */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-white p-1 overflow-hidden flex items-center justify-center shrink-0 shadow-md border ${scrolled ? 'border-slate-100' : 'border-white/30'}`}>
              <img src={logoImg} alt="DEVIAURA Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-lg md:text-xl tracking-tight">
              <span className={scrolled ? 'text-slate-900' : 'text-white'}>DEVI</span>
              <span
                className={
                  scrolled
                    ? 'bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-sky-300 via-blue-200 to-white bg-clip-text text-transparent'
                }
              >
                ΛURΛ
              </span>
            </span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative py-1.5 px-1 group ${
                      scrolled
                        ? isActive ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'
                        : isActive ? 'text-sky-300 font-bold' : 'text-sky-100 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full shadow-sm ${
                          scrolled
                            ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500'
                            : 'bg-gradient-to-r from-sky-300 via-blue-200 to-white'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300 ${
                        scrolled
                          ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500'
                          : 'bg-gradient-to-r from-sky-300 via-blue-200 to-white'
                      }`} />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button onClick={() => handleNav('#contact')} variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className={`md:hidden p-2 ${scrolled ? 'text-slate-800' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-slate-900"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(link.href)}
                className="text-2xl font-semibold text-slate-800 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </motion.button>
            ))}

            <Button onClick={() => handleNav('#contact')} variant="primary" size="md">
              Get Started
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
