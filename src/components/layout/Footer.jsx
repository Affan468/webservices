import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../../assets/image.png';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.39A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.71 0-3.313-.48-4.686-1.315l-.336-.204-2.957.826.837-2.883-.223-.357A7.95 7.95 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
  </svg>
);

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'Mobile App Development', href: '#services' },
    { label: 'SEO', href: '#services' },
    { label: 'Digital Marketing', href: '#services' },
  ],
  Company: [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
    { label: 'About Us', href: '#about' },
  ],
};

const Footer = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#04141b] border-t border-[#064699]/30 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white p-1 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                <img src={logoImg} alt="DEVIAURA Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                <span className="text-white">DEVI</span>
                <span
                  className="bg-gradient-to-t from-[#1d4ed8] via-[#38bdf8] to-[#87CEEB] bg-clip-text text-transparent"
                  style={{ WebkitTextStroke: '0.4px rgba(255, 255, 255, 0.45)' }}
                >
                  ΛURΛ
                </span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              <strong className="text-sky-300 block mb-1">Fueling Digital Success</strong>
              We craft cutting-edge digital experiences — from web & mobile app development to data-driven marketing.
            </p>

            {/* Clickable Contact info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:thedeviaura@gmail.com"
                className="flex items-center gap-2.5 text-slate-400 text-sm hover:text-sky-300 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#064699]/20 border border-[#064699]/40 flex items-center justify-center shrink-0 group-hover:border-sky-400 transition-colors">
                  <Mail size={13} className="text-sky-400" />
                </div>
                <span>thedeviaura@gmail.com</span>
              </a>

              <a
                href="tel:+923306386366"
                className="flex items-center gap-2.5 text-slate-400 text-sm hover:text-sky-300 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#064699]/20 border border-[#064699]/40 flex items-center justify-center shrink-0 group-hover:border-sky-400 transition-colors">
                  <Phone size={13} className="text-sky-400" />
                </div>
                <span>+92 330 6386366</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=33.650194,73.152833"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-400 text-sm hover:text-sky-300 transition-colors group"
                title="View on Google Maps"
              >
                <div className="w-7 h-7 rounded-lg bg-[#064699]/20 border border-[#064699]/40 flex items-center justify-center shrink-0 group-hover:border-sky-400 transition-colors">
                  <MapPin size={13} className="text-sky-400" />
                </div>
                <span>Islamabad, Pakistan</span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: WhatsAppIcon, href: 'https://wa.me/923306386366', label: 'WhatsApp', color: 'hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10' },
                { icon: InstagramIcon, href: 'https://www.instagram.com/the.deviaura', label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10' },
                { icon: FacebookIcon, href: 'https://www.facebook.com/share/1CrMk5xHpj/', label: 'Facebook', color: 'hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/deviaura', label: 'LinkedIn', color: 'hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10' },
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-[#061c24] border border-[#064699]/40 flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 shadow-sm ${color}`}
                >
                  <Icon size={16} />
                </a>
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
          <button
            onClick={onOpenAdmin}
            className="text-slate-500 hover:text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Admin Panel Login
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
