import { motion } from 'framer-motion';
import { Code2, TrendingUp, Megaphone, Palette, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Lightning-fast, fully responsive websites and web applications built with modern frameworks like React and Next.js. Engineered for speed, accessibility, and conversion.',
    features: ['React / Next.js Frameworks', 'Performance & Speed Optimized', 'Mobile-First Responsive Design', 'Custom CMS & API Integrations'],
    gradient: 'from-purple-500 to-indigo-500',
    iconBg: 'from-purple-500/20 to-indigo-500/20',
    iconText: 'text-purple-400',
    dotColor: 'bg-purple-400',
    border: 'hover:border-purple-500/50',
    shadow: 'hover:shadow-purple-950/50',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description:
      'Dominate search engine rankings with our data-driven SEO strategies. We conduct deep technical audits, targeted keyword research, and high-quality link building.',
    features: ['Technical SEO Audits & Fixes', 'Targeted Keyword Strategy', 'Authority Link Building', 'GA4 Analytics & Rank Tracking'],
    gradient: 'from-emerald-400 to-teal-400',
    iconBg: 'from-emerald-500/20 to-teal-500/20',
    iconText: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
    border: 'hover:border-emerald-500/50',
    shadow: 'hover:shadow-emerald-950/50',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'High-ROI campaigns across Google Search, Meta (Instagram & Facebook), and beyond. We combine audience targeting with high-converting creative.',
    features: ['Google Search & Display Ads', 'Meta Paid Social Campaigns', 'Conversion Rate Optimization', 'Retargeting & ROI Analytics'],
    gradient: 'from-rose-400 to-pink-500',
    iconBg: 'from-rose-500/20 to-pink-500/20',
    iconText: 'text-rose-400',
    dotColor: 'bg-rose-400',
    border: 'hover:border-rose-500/50',
    shadow: 'hover:shadow-rose-950/50',
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
    <section id="services" className="py-32 bg-slate-900/60 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="What We Do"
          title="Services That"
          highlight="Drive Results"
          subtitle="We combine cutting-edge technology with proven strategies to help your business grow faster and smarter online."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative p-8 rounded-2xl bg-slate-950/80 border border-slate-800
                ${service.border} ${service.shadow}
                hover:shadow-2xl backdrop-blur-sm
                transition-all duration-300 cursor-pointer`}
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />

              {/* Icon */}
              <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${service.iconBg} border border-slate-700/50 items-center justify-center mb-6`}>
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

              <div className={`flex items-center gap-1 text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
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
