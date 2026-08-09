import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Trash2, 
  Edit3,
  ArrowLeft, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw,
  Image as ImageIcon,
  Layers,
  Link as LinkIcon,
  Tag,
  AlignLeft,
  Mail,
  MessageSquare,
  User,
  DollarSign
} from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-[#061c24] border border-[#064699]/40 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all text-sm';

const AdminPanel = ({ onBack }) => {
  const { projects, addProject, updateProject, deleteProject, resetProjects } = useProjects();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'inquiries'

  const [inquiries, setInquiries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('deviaura_inquiries') || '[]');
    } catch {
      return [];
    }
  });

  const deleteInquiry = (id) => {
    const updated = inquiries.filter((iq) => iq.id !== id);
    setInquiries(updated);
    localStorage.setItem('deviaura_inquiries', JSON.stringify(updated));
  };

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Dev',
    tag: '',
    description: '',
    link: '',
    image: '',
    icon: '🚀',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'deviaura123' || passcode === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode! Try: deviaura123');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (p) => {
    setEditingProject(p);
    setFormData({
      title: p.title || '',
      category: p.category || 'Web Dev',
      tag: p.tag || '',
      description: p.description || '',
      link: p.link || '',
      image: p.image || '',
      icon: p.icon || '🚀',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Web Dev',
      tag: '',
      description: '',
      link: '',
      image: '',
      icon: '🚀',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill out Title and Description!');
      return;
    }

    if (editingProject) {
      updateProject({ ...formData, id: editingProject.id });
      setSuccessMsg(`Project "${formData.title}" updated successfully!`);
      setEditingProject(null);
    } else {
      addProject(formData);
      setSuccessMsg(`Project "${formData.title}" added successfully!`);
    }

    setTimeout(() => setSuccessMsg(''), 4000);

    // Reset Form
    setFormData({
      title: '',
      category: 'Web Dev',
      tag: '',
      description: '',
      link: '',
      image: '',
      icon: '🚀',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#081e26] flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#064699]/10 via-transparent to-[#081e26] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-[#061c24]/95 border border-[#064699]/40 shadow-2xl backdrop-blur-xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#064699]/20 border border-[#064699]/40 flex items-center justify-center text-sky-400 mx-auto mb-6">
            <Lock size={28} />
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">DEVI<span className="bg-gradient-to-t from-[#1d4ed8] via-[#38bdf8] to-[#87CEEB] bg-clip-text text-transparent" style={{ WebkitTextStroke: '0.4px rgba(255, 255, 255, 0.45)' }}>ΛURΛ</span> Admin Panel</h2>
          <p className="text-slate-400 text-sm text-center mb-8">
            Enter passcode to manage your projects & portfolio.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
                Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (deviaura123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={inputClass}
                autoFocus
              />
              {error && <p className="text-rose-400 text-xs mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-400 via-[#064699] to-blue-600 text-white font-semibold text-sm shadow-lg shadow-[#064699]/40 hover:opacity-95 transition-opacity"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors"
            >
              <ArrowLeft size={14} /> Back to Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081e26] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#064699]/30">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#064699]/20 border border-[#064699]/40 text-sky-300 text-xs font-semibold">
                Admin Control
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">DeviAura Dashboard</h1>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Manage custom projects & view incoming client inquiry messages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetProjects}
              className="px-4 py-2 rounded-xl bg-[#061c24] border border-[#064699]/40 text-slate-300 hover:text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={14} /> Reset Defaults
            </button>

            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#064699] to-blue-600 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-opacity hover:opacity-90"
            >
              <ArrowLeft size={14} /> View Live Website
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 my-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-sky-400 via-[#064699] to-blue-600 text-white shadow-lg shadow-[#064699]/30'
                : 'bg-[#061c24] border border-[#064699]/30 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={16} /> Projects Manager ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'inquiries'
                ? 'bg-gradient-to-r from-sky-400 via-[#064699] to-blue-600 text-white shadow-lg shadow-[#064699]/30'
                : 'bg-[#061c24] border border-[#064699]/30 text-slate-400 hover:text-white'
            }`}
          >
            <Mail size={16} /> Client Messages Inbox ({inquiries.length})
          </button>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3"
            >
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'projects' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Add / Edit Project Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-[#061c24]/90 border border-[#064699]/30 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {editingProject ? (
                      <Edit3 className="text-sky-400" size={22} />
                    ) : (
                      <PlusCircle className="text-sky-400" size={22} />
                    )}
                    <h2 className="text-xl font-bold text-white">
                      {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
                    </h2>
                  </div>

                  {editingProject && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-3 py-1 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-sky-400" /> Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PulseFit Mobile App"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                        <Layers size={13} className="text-sky-400" /> Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`${inputClass} appearance-none bg-[#061c24]`}
                      >
                        <option value="Web Dev">Web Dev</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="SEO">SEO</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                  </div>

                  {/* Tag */}
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <Tag size={13} className="text-sky-400" /> Tag / Sub-title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Full-Stack SaaS, iOS & Android"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <AlignLeft size={13} className="text-sky-400" /> Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe what you built, key technologies used, and business outcome..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Project Link */}
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <LinkIcon size={13} className="text-sky-400" /> Live Demo URL
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://azfhuimpex.com"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <ImageIcon size={13} className="text-sky-400" /> Cover Photo / Logo Upload
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#064699]/30 file:text-sky-300 hover:file:bg-[#064699]/50 cursor-pointer"
                      />

                      {formData.image && (
                        <div className="relative w-16 h-12 rounded-lg bg-[#04141b] border border-[#064699]/40 overflow-hidden shrink-0">
                          <img src={formData.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-125 blur-md opacity-70 transform-gpu select-none pointer-events-none" />
                          <div className="relative z-10 w-full h-full p-0.5 rounded-md overflow-hidden flex items-center justify-center">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-contain rounded-md" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-400 via-[#064699] to-blue-600 text-white font-bold text-sm shadow-xl shadow-[#064699]/30 hover:opacity-95 transition-opacity"
                  >
                    {editingProject ? 'Update Project' : 'Save & Publish Project'}
                  </button>
                </form>
              </div>
            </div>

            {/* Manage Active Projects List (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Active Projects ({projects.length})
              </h2>

              <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className={`p-5 rounded-2xl bg-[#061c24]/90 border transition-all backdrop-blur-sm ${
                      editingProject?.id === p.id
                        ? 'border-sky-400 shadow-lg shadow-sky-400/20'
                        : 'border-[#064699]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-[#04141b] flex items-center justify-center shrink-0 border border-[#064699]/40 overflow-hidden">
                          {p.image ? (
                            <>
                              <img src={p.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-125 blur-md opacity-70 transform-gpu select-none pointer-events-none" />
                              <div className="relative z-10 w-full h-full p-0.5 rounded-md overflow-hidden flex items-center justify-center">
                                <img src={p.image} alt={p.title} className="w-full h-full object-contain rounded-md" />
                              </div>
                            </>
                          ) : (
                            <span className="relative z-10 text-xl">{p.icon || '🚀'}</span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-white font-bold text-base">{p.title}</h4>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#064699]/20 text-sky-300 text-[10px] font-semibold">
                            {p.category} • {p.tag || 'Project'}
                          </span>
                        </div>
                      </div>

                      {/* Edit & Delete Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete project "${p.title}"?`)) {
                              deleteProject(p.id);
                              if (editingProject?.id === p.id) {
                                handleCancelEdit();
                              }
                            }
                          }}
                          className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{p.description}</p>

                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300 text-xs font-semibold inline-flex items-center gap-1.5 mt-2"
                      >
                        Visit Link <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Client Messages Inbox View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail size={22} className="text-sky-400" /> Received Inquiries ({inquiries.length})
              </h2>

              {inquiries.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all client messages from inbox?')) {
                      setInquiries([]);
                      localStorage.removeItem('deviaura_inquiries');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={14} /> Clear All Messages
                </button>
              )}
            </div>

            {inquiries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inquiries.map((iq) => (
                  <div
                    key={iq.id}
                    className="p-6 rounded-3xl bg-[#061c24]/90 border border-[#064699]/40 backdrop-blur-md flex flex-col justify-between gap-4 shadow-xl"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#064699]/20 border border-[#064699]/40 flex items-center justify-center text-sky-400">
                            <User size={18} />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-base">{iq.name}</h4>
                            <a href={`mailto:${iq.email}`} className="text-sky-400 hover:text-sky-300 text-xs font-medium">
                              {iq.email}
                            </a>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteInquiry(iq.id)}
                          className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#064699]/20 border border-[#064699]/40 text-sky-300 text-xs font-semibold">
                          Service: {iq.service || 'General'}
                        </span>
                        {iq.budget && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                            <DollarSign size={12} /> Budget: {iq.budget}
                          </span>
                        )}
                        <span className="text-slate-500 text-[11px] ml-auto">{iq.date}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#04141b] border border-[#064699]/30 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {iq.message}
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={`mailto:${iq.email}?subject=Re:%20DeviAura%20Inquiry%20-${encodeURIComponent(iq.service || '')}&body=Hi%20${encodeURIComponent(iq.name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20DeviAura!`}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 via-[#064699] to-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity"
                      >
                        <Mail size={14} /> Reply to {iq.name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-[#061c24]/50 border border-[#064699]/30 text-center space-y-3">
                <Mail size={40} className="mx-auto text-slate-600 mb-2" />
                <h3 className="text-lg font-bold text-white">No Client Messages Yet</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  When a client fills out the contact form on your website, their message will appear here automatically and be sent directly to <strong className="text-sky-300">thedeviaura@gmail.com</strong>!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
