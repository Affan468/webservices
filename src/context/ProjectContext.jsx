import { createContext, useContext, useState, useEffect } from 'react';
import azhfuImg from '../assets/azhfuimpex.png';
import logonewImg from '../assets/logonew.png';

const ProjectContext = createContext();

const initialProjects = [
  {
    id: 1,
    title: 'Azfhu Impex',
    category: 'Web Dev',
    tag: 'Full-Stack Online Store',
    description:
      'Built a custom online store for customizable equipment wholesale dealing — buyers can configure product specs before ordering, with tiered wholesale pricing and a streamlined quote-to-order flow. Includes dealer accounts and a scalable catalog structure, all wrapped in a clean, simple UI despite the underlying complexity.',
    gradient: 'from-[#064699] via-blue-600 to-[#081e26]',
    image: azhfuImg,
    link: 'https://azfhuimpex.com',
  },
  {
    id: 2,
    title: 'Comscad',
    category: 'Web Dev',
    tag: 'Full-Stack Student Portal',
    description:
      'A React.js web app for sharing academic resources — students upload, preview, and download past papers, assignments, and notes by course, with an admin approval workflow ensuring quality. Files are compressed on upload and stored on Cloudflare, with Supabase handling the database.',
    gradient: 'from-sky-500 via-[#064699] to-cyan-500',
    image: logonewImg,
    link: 'https://student-resources-tau.vercel.app/',
  },
];

const initialPlans = [
  {
    id: 1,
    name: 'Starter',
    monthly: 499,
    yearly: 399,
    description: 'Perfect for small businesses just getting started online.',
    features: ['5-page responsive website', 'Basic SEO setup', 'Google Analytics integration', '1 month support', 'Contact form', 'Mobile optimized'],
    notIncluded: ['Custom animations', 'PPC management', 'Monthly reporting'],
    popular: false,
    cardBg: 'bg-[#061c24]/90',
    border: 'border-[#064699]/30',
  },
  {
    id: 2,
    name: 'Growth',
    monthly: 1299,
    yearly: 999,
    description: 'For growing businesses ready to dominate their niche.',
    features: ['Up to 15 pages + CMS', 'Full SEO optimization', 'Google & Meta Ads management', '3 months priority support', 'Monthly performance reports', 'Custom animations', 'A/B testing setup', 'Email marketing (1k contacts)'],
    notIncluded: ['Dedicated account manager'],
    popular: true,
    cardBg: 'bg-gradient-to-b from-[#082938] via-[#061c24] to-[#04141b]',
    border: 'border-[#064699]',
  },
  {
    id: 3,
    name: 'Enterprise',
    monthly: 2999,
    yearly: 2499,
    description: 'Full-service digital partnership for ambitious brands.',
    features: ['Unlimited pages + custom features', 'Advanced SEO + link building', 'Full PPC management (all platforms)', '12 months dedicated support', 'Weekly strategy calls', 'Custom integrations & APIs', 'E-commerce setup', 'Dedicated account manager', 'Priority SLA'],
    notIncluded: [],
    popular: false,
    cardBg: 'bg-[#061c24]/90',
    border: 'border-[#064699]/30',
  },
];

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('deviaura_custom_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading projects from localStorage:', e);
    }
    return initialProjects;
  });

  const [plans, setPlans] = useState(() => {
    try {
      const saved = localStorage.getItem('deviaura_custom_plans');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading plans from localStorage:', e);
    }
    return initialPlans;
  });

  useEffect(() => {
    try {
      localStorage.setItem('deviaura_custom_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('deviaura_custom_plans', JSON.stringify(plans));
    } catch (e) {
      console.error('Error saving plans to localStorage:', e);
    }
  }, [plans]);

  // Project Actions
  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: Date.now(),
    };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const updateProject = (updatedProject) => {
    setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProjects = () => {
    setProjects(initialProjects);
  };

  // Pricing Plan Actions
  const addPlan = (newPlan) => {
    const planWithId = {
      ...newPlan,
      id: Date.now(),
      cardBg: newPlan.popular ? 'bg-gradient-to-b from-[#082938] via-[#061c24] to-[#04141b]' : 'bg-[#061c24]/90',
      border: newPlan.popular ? 'border-[#064699]' : 'border-[#064699]/30',
    };
    setPlans((prev) => [...prev, planWithId]);
  };

  const updatePlan = (updatedPlan) => {
    const formattedPlan = {
      ...updatedPlan,
      cardBg: updatedPlan.popular ? 'bg-gradient-to-b from-[#082938] via-[#061c24] to-[#04141b]' : 'bg-[#061c24]/90',
      border: updatedPlan.popular ? 'border-[#064699]' : 'border-[#064699]/30',
    };
    setPlans((prev) => prev.map((p) => (p.id === updatedPlan.id ? formattedPlan : p)));
  };

  const deletePlan = (id) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const resetPlans = () => {
    setPlans(initialPlans);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
        plans,
        addPlan,
        updatePlan,
        deletePlan,
        resetPlans,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
