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
            ? 'bg-gradient-to-r from-sky-950/95 via-[#064699]/90 to-slate-950/95 backdrop-blur-xl border-b border-sky-400/50 shadow-lg shadow-sky-950/60'
            : 'bg-gradient-to-r from-sky-950/80 via-[#064699]/70 to-slate-950/80 backdrop-blur-md border-b border-sky-400/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2.5 md:py-3 flex items-center justify-between">
          {/* Logo - Direct transparent logo without any background box or boundary */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={logoImg} alt="DEVIAURA Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain" />
            <span className="font-black text-lg md:text-xl tracking-tight">
              <span className="text-white">DEVI</span>
              <span className="text-sky-300">AURA</span>
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
                      isActive ? 'text-sky-300 font-bold' : 'text-sky-100 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 rounded-full shadow-[0_0_10px_#38bdf8]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 group-hover:w-full transition-all duration-300 rounded-full" />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* CTA & Admin Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="px-3.5 py-2 rounded-xl bg-[#061c24]/90 border border-[#064699]/40 text-slate-200 hover:text-white hover:border-sky-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Open Admin Panel"
            >
              <ShieldCheck size={15} className="text-sky-400" /> Admin
            </button>

            <Button onClick={() => handleNav('#contact')} variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden text-slate-200 p-2"
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
            className="fixed inset-0 z-40 bg-[#081e26]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-white"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(link.href)}
                className="text-2xl font-semibold text-slate-200 hover:text-white transition-colors"
              >
                {link.label}
              </motion.button>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#064699]/30 border border-[#064699]/50 text-sky-300 font-semibold text-base flex items-center gap-2"
            >
              <ShieldCheck size={18} /> Admin Panel
            </button>

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
