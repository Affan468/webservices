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
  'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm';

const AdminPanel = ({ onBack }) => {
  const { 
    projects, addProject, updateProject, deleteProject, resetProjects,
    plans, addPlan, updatePlan, deletePlan, resetPlans 
  } = useProjects();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'pricing' | 'inquiries'

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

  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Dev',
    tag: '',
    description: '',
    link: '',
    image: '',
    icon: '🚀',
  });

  // Pricing Plan Form State
  const [planFormData, setPlanFormData] = useState({
    name: '',
    monthly: '',
    yearly: '',
    description: '',
    popular: false,
    features: '',
    notIncluded: '',
  });

  const handlePlanEdit = (p) => {
    setEditingPlan(p);
    setPlanFormData({
      name: p.name || '',
      monthly: p.monthly || '',
      yearly: p.yearly || '',
      description: p.description || '',
      popular: !!p.popular,
      features: (p.features || []).join('\n'),
      notIncluded: (p.notIncluded || []).join('\n'),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanCancelEdit = () => {
    setEditingPlan(null);
    setPlanFormData({
      name: '',
      monthly: '',
      yearly: '',
      description: '',
      popular: false,
      features: '',
      notIncluded: '',
    });
  };

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (!planFormData.name || !planFormData.monthly || !planFormData.yearly) {
      alert('Please fill out Plan Name and Prices!');
      return;
    }

    const formattedFeatures = planFormData.features
      ? planFormData.features.split('\n').map((f) => f.trim()).filter(Boolean)
      : [];

    const formattedNotIncluded = planFormData.notIncluded
      ? planFormData.notIncluded.split('\n').map((f) => f.trim()).filter(Boolean)
      : [];

    const payload = {
      name: planFormData.name,
      monthly: Number(planFormData.monthly),
      yearly: Number(planFormData.yearly),
      description: planFormData.description,
      popular: planFormData.popular,
      features: formattedFeatures,
      notIncluded: formattedNotIncluded,
    };

    if (editingPlan) {
      updatePlan({ ...payload, id: editingPlan.id });
      setSuccessMsg(`Pricing plan "${planFormData.name}" updated successfully!`);
      setEditingPlan(null);
    } else {
      addPlan(payload);
      setSuccessMsg(`Pricing plan "${planFormData.name}" added successfully!`);
    }

    setTimeout(() => setSuccessMsg(''), 4000);

    setPlanFormData({
      name: '',
      monthly: '',
      yearly: '',
      description: '',
      popular: false,
      features: '',
      notIncluded: '',
    });
  };

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-6 shadow-sm">
            <Lock size={28} />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-2">
            DEVI<span className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent">ΛURΛ</span> Admin Panel
          </h2>
          <p className="text-slate-600 text-sm text-center mb-8">
            Enter passcode to manage your projects & portfolio.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
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
              {error && <p className="text-rose-500 text-xs font-medium mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-xs font-semibold transition-colors"
            >
              <ArrowLeft size={14} /> Back to Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                Admin Control
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">DeviAura Dashboard</h1>
            </div>
            <p className="text-slate-600 text-sm mt-1">
              Manage custom projects & view incoming client inquiry messages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetProjects}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
            >
              <RefreshCw size={14} /> Reset Defaults
            </button>

            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-blue-500/20 hover:opacity-95 transition-opacity"
            >
              <ArrowLeft size={14} /> View Live Website
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-3 my-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300'
            }`}
          >
            <Sparkles size={16} /> Projects Manager ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'pricing'
                ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300'
            }`}
          >
            <DollarSign size={16} /> Pricing Manager ({plans.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'inquiries'
                ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300'
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
              className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-3 font-semibold shadow-sm"
            >
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'projects' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Add / Edit Project Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-blue-500/5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {editingProject ? (
                      <Edit3 className="text-blue-600" size={22} />
                    ) : (
                      <PlusCircle className="text-blue-600" size={22} />
                    )}
                    <h2 className="text-xl font-bold text-slate-900">
                      {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
                    </h2>
                  </div>

                  {editingProject && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-blue-600" /> Project Title *
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
                      <label className="block text-slate-700 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                        <Layers size={13} className="text-blue-600" /> Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`${inputClass} appearance-none bg-white`}
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
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <Tag size={13} className="text-blue-600" /> Tag / Sub-title
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
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <AlignLeft size={13} className="text-blue-600" /> Description *
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
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <LinkIcon size={13} className="text-blue-600" /> Live Demo URL
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
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2 flex items-center gap-1.5">
                      <ImageIcon size={13} className="text-blue-600" /> Cover Photo / Logo Upload
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />

                      {formData.image && (
                        <div className="relative w-16 h-12 rounded-lg bg-slate-900 border border-slate-200 overflow-hidden shrink-0">
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
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:opacity-95 transition-opacity"
                  >
                    {editingProject ? 'Update Project' : 'Save & Publish Project'}
                  </button>
                </form>
              </div>
            </div>

            {/* Manage Active Projects List (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Active Projects ({projects.length})
              </h2>

              <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className={`p-5 rounded-2xl bg-white border transition-all backdrop-blur-sm shadow-md shadow-blue-500/5 ${
                      editingProject?.id === p.id
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg'
                        : 'border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
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
                          <h4 className="text-slate-900 font-bold text-base">{p.title}</h4>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold">
                            {p.category} • {p.tag || 'Project'}
                          </span>
                        </div>
                      </div>

                      {/* Edit & Delete Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
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
                          className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{p.description}</p>

                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold inline-flex items-center gap-1.5 mt-2"
                      >
                        Visit Link <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'pricing' ? (
          /* Pricing Manager View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Add / Edit Pricing Plan Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-blue-500/5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {editingPlan ? (
                      <Edit3 className="text-blue-600" size={22} />
                    ) : (
                      <PlusCircle className="text-blue-600" size={22} />
                    )}
                    <h2 className="text-xl font-bold text-slate-900">
                      {editingPlan ? `Edit Pricing Plan: ${editingPlan.name}` : 'Add New Pricing Plan'}
                    </h2>
                  </div>

                  {editingPlan && (
                    <button
                      type="button"
                      onClick={handlePlanCancelEdit}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handlePlanSubmit} className="space-y-5">
                  {/* Plan Name */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2">Plan Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Starter, Growth, Enterprise, Custom"
                      value={planFormData.name}
                      onChange={(e) => setPlanFormData({ ...planFormData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Monthly & Yearly Prices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold uppercase mb-2">Monthly Price ($ / mo) *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 499"
                        value={planFormData.monthly}
                        onChange={(e) => setPlanFormData({ ...planFormData, monthly: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold uppercase mb-2">Yearly Price ($ / mo) *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 399"
                        value={planFormData.yearly}
                        onChange={(e) => setPlanFormData({ ...planFormData, yearly: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Plan Description */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2">Plan Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Perfect for small businesses getting started online."
                      value={planFormData.description}
                      onChange={(e) => setPlanFormData({ ...planFormData, description: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Popular Badge Toggle */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <input
                      type="checkbox"
                      id="plan-popular"
                      checked={planFormData.popular}
                      onChange={(e) => setPlanFormData({ ...planFormData, popular: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <label htmlFor="plan-popular" className="text-slate-900 text-xs font-semibold cursor-pointer">
                      Highlight as "Most Popular" Plan (Glow Accent & Badge)
                    </label>
                  </div>

                  {/* Included Features */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2">
                      Included Features (One feature per line)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="5-page responsive website&#10;Basic SEO setup&#10;Google Analytics integration&#10;Mobile optimized"
                      value={planFormData.features}
                      onChange={(e) => setPlanFormData({ ...planFormData, features: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Excluded Features */}
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold uppercase mb-2">
                      Not Included / Excluded Features (One per line)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Custom animations&#10;Dedicated account manager"
                      value={planFormData.notIncluded}
                      onChange={(e) => setPlanFormData({ ...planFormData, notIncluded: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:opacity-95 transition-opacity"
                  >
                    {editingPlan ? 'Update Pricing Plan' : 'Save & Publish Pricing Plan'}
                  </button>
                </form>
              </div>
            </div>

            {/* Active Pricing Plans List (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Active Pricing Plans ({plans.length})
                </h2>
                <button
                  onClick={resetPlans}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 text-xs font-semibold transition-colors"
                >
                  Reset Defaults
                </button>
              </div>

              <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
                {plans.map((pl) => (
                  <div
                    key={pl.id}
                    className={`p-5 rounded-2xl bg-white border transition-all backdrop-blur-sm shadow-md shadow-blue-500/5 ${
                      editingPlan?.id === pl.id
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg'
                        : pl.popular
                        ? 'border-2 border-blue-500 bg-gradient-to-b from-blue-50/50 via-white to-sky-50/50'
                        : 'border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-slate-900 font-bold text-lg">{pl.name}</h4>
                          {pl.popular && (
                            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[10px] font-bold">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-xs mt-1">{pl.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handlePlanEdit(pl)}
                          className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                          title="Edit Plan"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete plan "${pl.name}"?`)) {
                              deletePlan(pl.id);
                              if (editingPlan?.id === pl.id) {
                                handlePlanCancelEdit();
                              }
                            }
                          }}
                          className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete Plan"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="my-3 flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900">${pl.monthly}/mo</span>
                      <span className="text-slate-500 text-xs">(Yearly: ${pl.yearly}/mo)</span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p className="font-semibold text-blue-600">Included ({pl.features?.length || 0}):</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 max-h-24 overflow-y-auto pr-1">
                        {pl.features?.map((f, idx) => (
                          <li key={idx} className="truncate">{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Client Messages Inbox View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Mail size={22} className="text-blue-600" /> Received Inquiries ({inquiries.length})
              </h2>

              {inquiries.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all client messages from inbox?')) {
                      setInquiries([]);
                      localStorage.removeItem('deviaura_inquiries');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
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
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-blue-500/5 backdrop-blur-md flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                            <User size={18} />
                          </div>
                          <div>
                            <h4 className="text-slate-900 font-bold text-base">{iq.name}</h4>
                            <a href={`mailto:${iq.email}`} className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                              {iq.email}
                            </a>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteInquiry(iq.id)}
                          className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                          Service: {iq.service || 'General'}
                        </span>
                        {iq.budget && (
                          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                            <DollarSign size={12} /> Budget: {iq.budget}
                          </span>
                        )}
                        <span className="text-slate-400 text-[11px] ml-auto">{iq.date}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {iq.message}
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={`mailto:${iq.email}?subject=Re:%20DeviAura%20Inquiry%20-${encodeURIComponent(iq.service || '')}&body=Hi%20${encodeURIComponent(iq.name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20DeviAura!`}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity"
                      >
                        <Mail size={14} /> Reply to {iq.name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-md shadow-blue-500/5">
                <Mail size={40} className="mx-auto text-slate-400 mb-2" />
                <h3 className="text-lg font-bold text-slate-900">No Client Messages Yet</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  When a client fills out the contact form on your website, their message will appear here automatically and be sent directly to <strong className="text-blue-600">thedeviaura@gmail.com</strong>!
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
