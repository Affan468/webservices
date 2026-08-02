import { motion } from 'framer-motion';
import { Zap, Globe, Rss, Code2, Camera, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'SEO Optimization', href: '#services' },
    { label: 'Digital Marketing', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
    { label: 'E-Commerce', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socials = [
  { icon: Globe, href: '#', label: 'Twitter / X' },
  { icon: Rss, href: '#', label: 'LinkedIn' },
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: Camera, href: '#', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-extrabold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-white">
                Dev<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Synx</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              We craft cutting-edge digital experiences — from blazing-fast websites to data-driven marketing strategies that scale your business.
            </p>
            {/* Contact info */}
            <div className="space-y-2 mb-6">
              {[
                { icon: Mail, text: 'hello@devsynx.com' },
                { icon: Phone, text: '+1 (555) 000-0000' },
                { icon: MapPin, text: 'San Francisco, CA' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={14} className="text-violet-400 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-gray-200 font-semibold mb-5 text-sm tracking-wide uppercase">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 text-sm hover:text-violet-400 transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} DevSynx. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Crafted with ❤️ for the modern web</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
