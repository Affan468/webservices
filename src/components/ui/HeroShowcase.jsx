import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, TrendingUp, Megaphone, Terminal, Search, BarChart2, CheckCircle, Sparkles, ArrowUpRight } from 'lucide-react';

const tabs = [
  { id: 'web', label: 'Web Development', icon: Code2, color: 'from-purple-600 to-indigo-600', badge: 'Tech Stack' },
  { id: 'seo', label: 'SEO Optimization', icon: TrendingUp, color: 'from-emerald-500 to-teal-600', badge: 'Rank #1' },
  { id: 'marketing', label: 'Digital Marketing', icon: Megaphone, color: 'from-rose-500 to-pink-600', badge: 'High ROAS' },
];

const HeroShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-switch tabs every 4 seconds unless user manually interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      {/* ── Interactive Tab Switchers ── */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(idx)}
              className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isActive
                  ? 'bg-white text-gray-900 shadow-lg shadow-purple-100 border border-purple-200/80 scale-105'
                  : 'bg-white/60 hover:bg-white text-gray-600 border border-gray-200/60 hover:border-purple-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isActive ? `bg-gradient-to-r ${tab.color} text-white` : 'bg-gray-100 text-gray-500'}`}>
                <Icon size={16} />
              </div>
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm"
                >
                  Live Demo
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Animated Service Showcase Card ── */}
      <div className="relative rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-purple-100/60 overflow-hidden p-6 sm:p-8 min-h-[340px]">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Mock Browser Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="ml-2 flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-xs text-gray-500 font-mono">
                    <Terminal size={12} className="text-purple-600" />
                    <span>App.jsx — React 19 + Tailwind</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                  <Sparkles size={12} /> 99/100 Lighthouse Speed
                </div>
              </div>

              {/* Code + Live Component Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Code Window */}
                <div className="p-4 rounded-xl bg-gray-950 text-gray-200 font-mono text-xs space-y-2 shadow-inner">
                  <div className="text-purple-400"><span className="text-rose-400">const</span> WebApp = () =&gt; &#123;</div>
                  <div className="pl-4 text-emerald-400">&lt;<span className="text-purple-300">Header</span> title=<span className="text-amber-300">"Next-Gen Business"</span> /&gt;</div>
                  <div className="pl-4 text-emerald-400">&lt;<span className="text-purple-300">SpeedOpt</span> score=&#123;<span className="text-amber-300">100</span>&#125; /&gt;</div>
                  <div className="pl-4 text-emerald-400">&lt;<span className="text-purple-300">ResponsiveGrid</span> cols=&#123;<span className="text-amber-300">3</span>&#125; /&gt;</div>
                  <div className="text-purple-400">&#125;;</div>
                </div>

                {/* Animated Output Card */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-rose-50 border border-purple-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">Custom Web Application</span>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="h-full bg-gradient-to-r from-purple-600 to-rose-500"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                      <span>Mobile Responsive</span>
                      <span>Zero Layout Shift</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">⚛️ React 19</span>
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">⚡ Vite</span>
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">🎨 Tailwind</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              {/* Search Bar Simulation */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium">
                <Search size={16} className="text-emerald-600" />
                <span className="font-mono text-gray-800">"top web development & digital marketing services"</span>
                <span className="ml-auto text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">Google Search</span>
              </div>

              {/* Rank #1 Result Box */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                    <CheckCircle size={14} className="text-emerald-600" />
                    <span>#1 Search Result (Organic)</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700">100% Technical SEO Score</span>
                </div>
                <h4 className="text-base font-extrabold text-gray-900 flex items-center gap-1">
                  DevSynx — Premier Web & Digital Growth Agency
                  <ArrowUpRight size={16} className="text-emerald-600" />
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  High-converting web applications, technical SEO audits, and revenue-driven marketing campaigns.
                </p>
              </div>

              {/* Metrics bar */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <p className="text-lg font-extrabold text-emerald-600">+340%</p>
                  <p className="text-[11px] text-gray-500 font-medium">Organic Traffic</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <p className="text-lg font-extrabold text-gray-900">#1 Rank</p>
                  <p className="text-[11px] text-gray-500 font-medium">Target Keywords</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <p className="text-lg font-extrabold text-purple-600">85/100</p>
                  <p className="text-[11px] text-gray-500 font-medium">Domain Authority</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="marketing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              {/* Campaign Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <BarChart2 size={18} className="text-rose-600" />
                  <span className="font-bold text-sm text-gray-900">Live Campaign Performance</span>
                </div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                  4.8x ROAS Average
                </span>
              </div>

              {/* Graphic Growth Bars */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-end justify-between gap-2 h-28 pt-4 px-2">
                  {[
                    { label: 'Week 1', height: '35%', val: '$2.4k' },
                    { label: 'Week 2', height: '55%', val: '$4.8k' },
                    { label: 'Week 3', height: '75%', val: '$8.2k' },
                    { label: 'Week 4', height: '100%', val: '$14.6k' },
                  ].map((bar, i) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[10px] font-bold text-rose-600">{bar.val}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.height }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 via-rose-500 to-pink-500"
                      />
                      <span className="text-[10px] text-gray-400 font-medium">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketing Channels */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-100">🎯 Google Search & Display</span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-100">📱 Meta (Instagram & Facebook)</span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100">📈 Conversion Rate Optimization</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroShowcase;
