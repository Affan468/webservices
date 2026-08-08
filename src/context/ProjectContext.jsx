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

  useEffect(() => {
    try {
      localStorage.setItem('deviaura_custom_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [projects]);

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

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, resetProjects }}>
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
