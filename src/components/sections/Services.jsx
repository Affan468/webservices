import { motion } from 'framer-motion';
import { Code2, TrendingUp, Megaphone, Smartphone, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Lightning-fast, fully responsive websites and web applications built with modern frameworks like React and Next.js. Engineered for speed, accessibility, and conversion.',
    features: ['React / Next.js Frameworks', 'Performance & Speed Optimized', 'Mobile-First Responsive Design', 'Custom CMS & API Integrations'],
    gradient: 'from-[#064699] via-sky-400 to-[#081e26]',
    iconBg: 'from-[#064699]/30 to-[#081e26]/30',
    iconText: 'text-sky-300',
    dotColor: 'bg-sky-400',
    border: 'hover:border-[#064699]',
    shadow: 'hover:shadow-[#064699]/30',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native & cross-platform iOS and Android mobile applications built with React Native and Flutter. Designed for high performance, intuitive UX, and seamless app store deployment.',
    features: ['iOS & Android (React Native / Flutter)', 'Smooth 60fps UI & Animations', 'Offline-First & Cloud API Sync', 'App Store & Google Play Deployment'],
    gradient: 'from-sky-300 via-[#064699] to-cyan-500',
    iconBg: 'from-[#064699]/30 to-[#081e26]/30',
    iconText: 'text-sky-300',
    dotColor: 'bg-sky-400',
    border: 'hover:border-sky-400',
    shadow: 'hover:shadow-sky-950/50',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description:
      'Dominate search engine rankings with our data-driven SEO strategies. We conduct deep technical audits, targeted keyword research, and high-quality link building.',
    features: ['Technical SEO Audits & Fixes', 'Targeted Keyword Strategy', 'Authority Link Building', 'GA4 Analytics & Rank Tracking'],
    gradient: 'from-cyan-400 via-[#064699] to-[#081e26]',
    iconBg: 'from-[#064699]/30 to-[#081e26]/30',
    iconText: 'text-cyan-300',
    dotColor: 'bg-cyan-400',
    border: 'hover:border-cyan-500/60',
    shadow: 'hover:shadow-cyan-950/50',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'High-ROI campaigns across Google Search, Meta (Instagram & Facebook), and beyond. We combine audience targeting with high-converting creative.',
    features: ['Google Search & Display Ads', 'Meta Paid Social Campaigns', 'Conversion Rate Optimization', 'Retargeting & ROI Analytics'],
    gradient: 'from-blue-400 via-[#064699] to-[#081e26]',
    iconBg: 'from-[#064699]/30 to-[#081e26]/30',
    iconText: 'text-blue-300',
    dotColor: 'bg-blue-400',
    border: 'hover:border-blue-500/60',
    shadow: 'hover:shadow-blue-950/50',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-[#081e26] relative">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#064699]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="What We Do"
          title="Services That"
          highlight="Drive Results"
          subtitle="We combine cutting-edge technology with proven strategies to help your business grow faster and smarter online."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative p-8 rounded-2xl bg-[#061c24]/90 border border-[#064699]/30
                ${service.border} ${service.shadow}
                hover:shadow-2xl backdrop-blur-sm transform-gpu
                transition-all duration-300 cursor-pointer`}
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />

              {/* Icon */}
              <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${service.iconBg} border border-[#064699]/40 items-center justify-center mb-6`}>
                <service.icon size={26} className={service.iconText} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <div className={`flex items-center gap-1 text-sm font-semibold text-sky-300 group-hover:gap-2 transition-all`}>
                Learn More <ArrowRight size={14} className={service.iconText + ' group-hover:translate-x-1 transition-transform'} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
