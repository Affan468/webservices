import { motion } from 'framer-motion';
import { Code2, TrendingUp, Megaphone, Palette, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Lightning-fast, fully responsive websites and web apps built with modern frameworks. From landing pages to complex enterprise platforms.',
    features: ['React / Next.js', 'Performance Optimized', 'Mobile First', 'CMS Integration'],
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'from-violet-100 to-purple-100',
    iconText: 'text-violet-600',
    dotColor: 'bg-violet-500',
    border: 'hover:border-violet-300',
    shadow: 'hover:shadow-violet-100',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description:
      'Dominate search rankings with our proven SEO strategies. Technical audits, content strategy, and link building that drives organic traffic.',
    features: ['Technical SEO', 'Keyword Research', 'Link Building', 'Analytics & Reporting'],
    gradient: 'from-cyan-500 to-sky-600',
    iconBg: 'from-cyan-100 to-sky-100',
    iconText: 'text-cyan-600',
    dotColor: 'bg-cyan-500',
    border: 'hover:border-cyan-300',
    shadow: 'hover:shadow-cyan-100',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Data-driven campaigns across Google, Meta, and beyond. We maximize your ROI with precision targeting and compelling creative.',
    features: ['Google Ads', 'Social Media Ads', 'Email Marketing', 'Conversion Rate Opt.'],
    gradient: 'from-pink-500 to-rose-600',
    iconBg: 'from-pink-100 to-rose-100',
    iconText: 'text-pink-600',
    dotColor: 'bg-pink-500',
    border: 'hover:border-pink-300',
    shadow: 'hover:shadow-pink-100',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Breathtaking interfaces that convert visitors into customers. Every pixel is crafted for both beauty and function.',
    features: ['Figma Prototyping', 'User Research', 'Brand Identity', 'Design Systems'],
    gradient: 'from-amber-500 to-orange-600',
    iconBg: 'from-amber-100 to-orange-100',
    iconText: 'text-amber-600',
    dotColor: 'bg-amber-500',
    border: 'hover:border-amber-300',
    shadow: 'hover:shadow-amber-100',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description:
      'Full-stack e-commerce solutions that sell. Shopify, WooCommerce, or custom builds — we create experiences that convert.',
    features: ['Shopify / WooCommerce', 'Payment Gateways', 'Inventory Systems', 'Mobile Commerce'],
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'from-emerald-100 to-teal-100',
    iconText: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    border: 'hover:border-emerald-300',
    shadow: 'hover:shadow-emerald-100',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Growth',
    description:
      'Turn raw data into revenue. We set up tracking, build dashboards, and uncover growth opportunities hidden in your data.',
    features: ['GA4 Setup', 'Custom Dashboards', 'A/B Testing', 'Growth Strategy'],
    gradient: 'from-indigo-500 to-blue-600',
    iconBg: 'from-indigo-100 to-blue-100',
    iconText: 'text-indigo-600',
    dotColor: 'bg-indigo-500',
    border: 'hover:border-indigo-300',
    shadow: 'hover:shadow-indigo-100',
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
    <section id="services" className="py-32 bg-gray-50 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-300/60 to-transparent" />

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
              className={`group relative p-8 rounded-2xl bg-white border border-gray-200
                ${service.border} ${service.shadow}
                hover:shadow-xl
                transition-all duration-300 cursor-pointer`}
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />

              {/* Icon */}
              <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${service.iconBg} items-center justify-center mb-6`}>
                <service.icon size={26} className={service.iconText} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-gray-600 text-sm">
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
