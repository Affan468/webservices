import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../../assets/image.png';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'Mobile App Development', href: '#services' },
    { label: 'SEO Optimization', href: '#services' },
    { label: 'Digital Marketing', href: '#services' },
  ],
  Company: [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
    { label: 'About Us', href: '#about' },
  ],
  Support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#04141b] border-t border-[#064699]/30 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoImg} alt="DEVIAURA Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain" />
              <span className="font-extrabold text-xl tracking-tight">
                <span className="text-white">DEVI</span>
                <span className="text-sky-400">AURA</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              <strong className="text-sky-300 block mb-1">Fueling Digital Success</strong>
              We craft cutting-edge digital experiences — from web & mobile app development to data-driven marketing.
            </p>
            {/* Contact info */}
            <div className="space-y-2">
              {[
                { icon: Mail, text: 'thedeviaura@gmail.com' },
                { icon: Phone, text: '+92 330 6386366' },
                { icon: MapPin, text: 'Islamabad, Pakistan' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-slate-400 text-sm">
                  <Icon size={14} className="text-sky-400 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-slate-200 font-semibold mb-5 text-sm tracking-wide uppercase">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-400 text-sm hover:text-sky-300 transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[#064699]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} DeviAura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
