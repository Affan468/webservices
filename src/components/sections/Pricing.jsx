import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const plans = [
  {
    name: 'Starter', monthly: 499, yearly: 399,
    description: 'Perfect for small businesses just getting started online.',
    features: ['5-page responsive website', 'Basic SEO setup', 'Google Analytics integration', '1 month support', 'Contact form', 'Mobile optimized'],
    notIncluded: ['Custom animations', 'PPC management', 'Monthly reporting'],
    popular: false,
    cardBg: 'bg-white',
    border: 'border-gray-200',
  },
  {
    name: 'Growth', monthly: 1299, yearly: 999,
    description: 'For growing businesses ready to dominate their niche.',
    features: ['Up to 15 pages + CMS', 'Full SEO optimization', 'Google & Meta Ads management', '3 months priority support', 'Monthly performance reports', 'Custom animations', 'A/B testing setup', 'Email marketing (1k contacts)'],
    notIncluded: ['Dedicated account manager'],
    popular: true,
    cardBg: 'bg-gradient-to-b from-violet-50 to-white',
    border: 'border-violet-300',
  },
  {
    name: 'Enterprise', monthly: 2999, yearly: 2499,
    description: 'Full-service digital partnership for ambitious brands.',
    features: ['Unlimited pages + custom features', 'Advanced SEO + link building', 'Full PPC management (all platforms)', '12 months dedicated support', 'Weekly strategy calls', 'Custom integrations & APIs', 'E-commerce setup', 'Dedicated account manager', 'Priority SLA'],
    notIncluded: [],
    popular: false,
    cardBg: 'bg-white',
    border: 'border-gray-200',
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 bg-gray-50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-300/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Pricing"
          title="Transparent"
          highlight="Pricing Plans"
          subtitle="No hidden fees. No surprise invoices. Choose a plan that fits your goals and budget."
        />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-400'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
          >
            <motion.div
              animate={{ x: isYearly ? 28 : 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-400'}`}>
            Yearly{' '}
            <span className="ml-1 px-2 py-0.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs">
              Save ~25%
            </span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: plan.popular ? 0 : -6 }}
              className={`relative p-8 rounded-2xl flex flex-col border-2 ${plan.cardBg} ${plan.border}
                ${plan.popular ? 'shadow-2xl shadow-violet-100 scale-105' : 'hover:shadow-xl hover:border-gray-300'}
                transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-violet-200">
                    <Zap size={11} className="fill-current" /> Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-gray-900 font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <motion.span
                    key={isYearly}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-extrabold text-gray-900"
                  >
                    ${isYearly ? plan.yearly : plan.monthly}
                  </motion.span>
                  <span className="text-gray-400 mb-2">/mo</span>
                </div>
                {isYearly && (
                  <p className="text-green-600 text-xs mt-1">
                    Billed annually — saving ${(plan.monthly - plan.yearly) * 12}/yr
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
                {plan.notIncluded.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-gray-300 line-through">
                    <Check size={16} className="text-gray-200 shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                href="#contact"
                variant={plan.popular ? 'primary' : 'outline'}
                size="md"
                className="w-full justify-center"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
          Need something custom?{' '}
          <a href="#contact" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">
            Let's talk
          </a>
          . All plans include a free 30-minute strategy consultation.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
