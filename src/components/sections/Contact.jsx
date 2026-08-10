import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.39A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.71 0-3.313-.48-4.686-1.315l-.336-.204-2.957.826.837-2.883-.223-.357A7.95 7.95 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
  </svg>
);

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
    <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

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
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, title: 'Email Us', detail: 'thedeviaura@gmail.com', href: 'mailto:thedeviaura@gmail.com', target: '_self', sub: 'We reply within 24 hours', bg: 'bg-blue-50', iconColor: 'text-blue-600' },
              { icon: Phone, title: 'Call Us', detail: '+92 330 6386366', href: 'tel:+923306386366', target: '_self', sub: null, bg: 'bg-sky-50', iconColor: 'text-sky-600' },
              { icon: WhatsAppIcon, title: 'WhatsApp Us', detail: '+92 330 6386366', href: 'https://wa.me/923306386366', target: '_blank', sub: 'Instant Chat Support', bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
            ].map(({ icon: Icon, title, detail, href, target, sub, bg, iconColor }) => (
              <motion.a
                key={title}
                href={href}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 backdrop-blur-sm group"
              >
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0 border border-slate-200/60 group-hover:border-blue-400 transition-colors`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm group-hover:text-blue-600 transition-colors">{title}</p>
                  <p className="text-slate-700 text-sm mt-0.5">{detail}</p>
                  {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
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
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-blue-500/5 backdrop-blur-md">
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
                    <CheckCircle2 size={64} className="text-blue-600 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Message Sent! 🎉</h3>
                  <p className="text-slate-600 text-sm max-w-xs">
                    Thank you for reaching out. We'll review your message and get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-2 uppercase tracking-wide">Your Name</label>
                      <input id="contact-name" name="name" type="text" required placeholder="John Smith" value={formData.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-2 uppercase tracking-wide">Email Address</label>
                      <input id="contact-email" name="email" type="email" required placeholder="john@company.com" value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-2 uppercase tracking-wide">Service Needed</label>
                      <select id="contact-service" name="service" value={formData.service} onChange={handleChange} className={`${inputClass} appearance-none bg-white`}>
                        <option value="" disabled className="bg-white text-slate-400">Select a service</option>
                        <option className="bg-white text-slate-900">Web Development</option>
                        <option className="bg-white text-slate-900">Mobile App Development</option>
                        <option className="bg-white text-slate-900">SEO</option>
                        <option className="bg-white text-slate-900">Digital Marketing</option>
                        <option className="bg-white text-slate-900">Full Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-2 uppercase tracking-wide">Your Budget</label>
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
                    <label className="block text-slate-700 text-xs font-semibold mb-2 uppercase tracking-wide">Project Details</label>
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
