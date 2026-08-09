import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl bg-[#061c24]/90 border border-[#064699]/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#064699] focus:bg-[#061c24] focus:ring-4 focus:ring-[#064699]/20 transition-all duration-200 text-sm';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inquiry = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };

    // Save copy in Admin Inbox local storage so no inquiry is ever lost
    try {
      const savedInquiries = JSON.parse(localStorage.getItem('deviaura_inquiries') || '[]');
      localStorage.setItem('deviaura_inquiries', JSON.stringify([inquiry, ...savedInquiries]));
    } catch (err) {
      console.error('Error saving inquiry locally:', err);
    }

    try {
      // Send direct email to thedeviaura@gmail.com via Web3Forms API
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '5f9a6568-d0df-479c-9f89-c4fb94f1b5e2',
          name: formData.name,
          email: formData.email,
          service: formData.service || 'General Inquiry',
          budget: formData.budget || 'Not specified',
          message: formData.message,
          subject: `⚡ New Project Inquiry from ${formData.name} - DeviAura`,
          from_name: 'DeviAura Website',
        }),
      });

      const data = await res.json();
      console.log('Web3Forms submission result:', data);
    } catch (err) {
      console.error('Email API submission error:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#081e26] relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#064699]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#064699]/20 blur-3xl pointer-events-none" />

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
              { icon: Mail, title: 'Email Us', detail: 'thedeviaura@gmail.com', href: 'mailto:thedeviaura@gmail.com', target: '_self', sub: 'We reply within 24 hours', bg: 'bg-[#064699]/20', iconColor: 'text-sky-300' },
              { icon: Phone, title: 'Call Us', detail: '+92 330 6386366', href: 'tel:+923306386366', target: '_self', sub: 'Mon–Sat, 9am–9pm PKT', bg: 'bg-[#064699]/20', iconColor: 'text-cyan-300' },
              { icon: MapPin, title: 'Find Us', detail: 'Islamabad, Pakistan', href: 'https://www.google.com/maps/search/?api=1&query=33.650194,73.152833', target: '_blank', sub: '33°39\'00.7"N 73°09\'10.2"E', bg: 'bg-[#064699]/20', iconColor: 'text-blue-300' },
            ].map(({ icon: Icon, title, detail, href, target, sub, bg, iconColor }) => (
              <motion.a
                key={title}
                href={href}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#061c24]/90 border border-[#064699]/30 hover:border-sky-400 hover:shadow-xl transition-all duration-300 backdrop-blur-sm group"
              >
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0 border border-[#064699]/40 group-hover:border-sky-400 transition-colors`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-sky-300 transition-colors">{title}</p>
                  <p className="text-slate-300 text-sm mt-0.5">{detail}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="p-8 md:p-10 rounded-2xl bg-[#061c24]/90 border border-[#064699]/30 shadow-2xl shadow-[#04141b]/50 backdrop-blur-md">
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
                    <CheckCircle2 size={64} className="text-sky-400 mb-6" />
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
                      <select id="contact-service" name="service" value={formData.service} onChange={handleChange} className={`${inputClass} appearance-none bg-[#061c24]`}>
                        <option value="" disabled className="bg-[#061c24] text-slate-400">Select a service</option>
                        <option className="bg-[#061c24] text-white">Web Development</option>
                        <option className="bg-[#061c24] text-white">Mobile App Development</option>
                        <option className="bg-[#061c24] text-white">SEO</option>
                        <option className="bg-[#061c24] text-white">Digital Marketing</option>
                        <option className="bg-[#061c24] text-white">Full Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Your Budget</label>
                      <input
                        id="contact-budget"
                        name="budget"
                        type="text"
                        placeholder="e.g. $1,500 or $5k - $10k"
                        value={formData.budget}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Project Details</label>
                    <textarea id="contact-message" name="message" rows={5} required placeholder="Tell us about your project, goals, and timeline..." value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                  </div>

                  <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center group">
                    {loading ? 'Sending Message...' : 'Send Message'}
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
