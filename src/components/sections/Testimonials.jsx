import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const testimonials = [
  {
    name: 'Sarah Mitchell', role: 'CEO, FinTrack', avatar: 'SM', color: 'bg-blue-600', rating: 5,
    text: "DeviAura completely transformed our online presence. Within 3 months of launching our new site, we saw a 340% increase in qualified leads. Their team is exceptional — responsive, talented, and truly invested in your success.",
  },
  {
    name: 'James Rodriguez', role: 'Marketing Director, NaturaBrand', avatar: 'JR', color: 'bg-sky-500', rating: 5,
    text: "The SEO results were beyond what we imagined. From near-zero organic traffic to 50,000 monthly visitors in just 6 months. DeviAura's strategy was precise and their execution was flawless. Highly recommend!",
  },
  {
    name: 'Priya Sharma', role: 'Founder, LuxeStore', avatar: 'PS', color: 'bg-cyan-500', rating: 5,
    text: "Our store by DeviAura is absolutely stunning. The design, speed, and UX are world-class. We hit $2M in revenue in our first year — I credit a huge part of that to the exceptional digital experience they built.",
  },
  {
    name: 'David Chen', role: 'Growth Lead, TechFlow', avatar: 'DC', color: 'bg-blue-500', rating: 5,
    text: "The PPC campaigns DeviAura ran for us achieved a 400% ROAS — something we thought was impossible in our competitive space. They actually understand B2B marketing and deliver enterprise-level results.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Client Love"
          title="Words From Our"
          highlight="Happy Clients"
          subtitle="Don't just take our word for it — here's what our clients say about working with DeviAura."
        />

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-blue-500/5 relative"
              >
                <Quote size={48} className="absolute top-8 right-8 text-blue-100" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-lg leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">{t.name}</p>
                    <p className="text-slate-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  animate={{ width: i === current ? 24 : 8, opacity: i === current ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full bg-blue-600"
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-gray-100 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 flex items-center justify-center text-gray-500 hover:text-violet-600 transition-colors"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-200"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Client logos row */}
        <div className="mt-20 pt-16">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-10">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-10">
            {['Vercel', 'Shopify', 'Stripe', 'HubSpot', 'Atlassian', 'Notion'].map((logo) => (
              <span key={logo} className="text-gray-300 font-bold text-xl tracking-tight hover:text-gray-500 transition-colors">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
