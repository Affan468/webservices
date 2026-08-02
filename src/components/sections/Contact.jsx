import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:bg-slate-900 focus:ring-4 focus:ring-violet-500/20 transition-all duration-200 text-sm';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 600);
  };

  return (
    <section id="contact" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-900/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-900/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Get In Touch"
          title="Let's Build Something"
          highlight="Amazing Together"
          subtitle="Ready to transform your digital presence? Tell us about your project and we'll get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, title: 'Email Us', detail: 'hello@devsynx.com', sub: 'We reply within 24 hours', bg: 'bg-violet-500/10', iconColor: 'text-violet-400' },
              { icon: Phone, title: 'Call Us', detail: '+1 (555) 000-0000', sub: 'Mon–Fri, 9am–6pm PST', bg: 'bg-cyan-500/10', iconColor: 'text-cyan-400' },
              { icon: MapPin, title: 'Find Us', detail: 'San Francisco, CA', sub: 'Available globally, remote-first', bg: 'bg-rose-500/10', iconColor: 'text-rose-400' },
            ].map(({ icon: Icon, title, detail, sub, bg, iconColor }) => (
              <motion.div
                key={title}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              >
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0 border border-slate-800`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-slate-300 text-sm mt-0.5">{detail}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Free call card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/40 via-slate-900 to-slate-900 border border-violet-500/30">
              <h4 className="text-white font-semibold mb-2">Free Strategy Call</h4>
              <p className="text-slate-400 text-sm mb-4">
                Book a complimentary 30-minute consultation to discuss your project goals.
              </p>
              <Button href="#" variant="outline" size="sm">
                Book a Call
              </Button>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="p-8 md:p-10 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-black/50 backdrop-blur-md">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 size={64} className="text-emerald-400 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent! 🎉</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thank you for reaching out. We'll review your message and get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Your Name</label>
                      <input id="contact-name" name="name" type="text" required placeholder="John Smith" value={formData.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Email Address</label>
                      <input id="contact-email" name="email" type="email" required placeholder="john@company.com" value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Service Needed</label>
                      <select id="contact-service" name="service" value={formData.service} onChange={handleChange} className={`${inputClass} appearance-none bg-slate-900`}>
                        <option value="" disabled className="bg-slate-900 text-slate-400">Select a service</option>
                        <option className="bg-slate-900 text-white">Web Development</option>
                        <option className="bg-slate-900 text-white">SEO Optimization</option>
                        <option className="bg-slate-900 text-white">Digital Marketing</option>
                        <option className="bg-slate-900 text-white">UI/UX Design</option>
                        <option className="bg-slate-900 text-white">E-Commerce</option>
                        <option className="bg-slate-900 text-white">Full Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Budget Range</label>
                      <select id="contact-budget" name="budget" value={formData.budget} onChange={handleChange} className={`${inputClass} appearance-none bg-slate-900`}>
                        <option value="" disabled className="bg-slate-900 text-slate-400">Select budget</option>
                        <option className="bg-slate-900 text-white">Under $1,000</option>
                        <option className="bg-slate-900 text-white">$1,000 – $5,000</option>
                        <option className="bg-slate-900 text-white">$5,000 – $15,000</option>
                        <option className="bg-slate-900 text-white">$15,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Project Details</label>
                    <textarea id="contact-message" name="message" rows={5} required placeholder="Tell us about your project, goals, and timeline..." value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full justify-center group">
                    Send Message
                    <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
