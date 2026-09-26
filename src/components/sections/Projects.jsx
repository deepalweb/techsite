import { useTranslation } from 'react-i18next';
import { Github, ArrowUpRight, Compass, Tags, Boxes, Globe, Code2, ChevronDown, BrainCircuit, MessageCircle } from 'lucide-react';
import { projects, additionalProjects, githubProfile } from '../../data/projects.js';
import { waLink } from '../../data/content.js';
const icons = { travel: Compass, deals: Tags, inventory: Boxes, web: Globe, code: Code2, ai: BrainCircuit };

export default function Projects() {
  const { t } = useTranslation();
  return (
    <section id="projects" className="section-space projects-section">
      <div className="site-container">
        <div className="section-title">
          <div><p className="eyebrow-label">{t('projects.eyebrow')}</p><h2>{t('projects.title')}</h2><p>{t('projects.intro')}</p></div>
          <a className="text-link" href={githubProfile} target="_blank" rel="noopener noreferrer"><Github size={19}/>{t('projects.profile')}<ArrowUpRight size={17}/></a>
        </div>
        <div className="projects-grid">
          {projects.map(project => {
            const Icon = icons[project.icon];
            return <article className={`project-card ${project.featured ? 'project-featured' : ''}`} key={project.id}>
              <div className={`project-visual project-visual-${project.icon}`} aria-hidden="true"><div className="project-orbit"/><span className="project-symbol"><Icon size={42} strokeWidth={1.25}/></span><Code2 className="project-code-mark" size={18}/></div>
              <div className="project-content">
                <p className="project-category">{t(`projects.${project.id}.category`)}</p>
                <h3>{project.name}</h3><p className="project-description">{t(`projects.${project.id}.body`)}</p>
                <p className="project-capability">{t(`projects.${project.id}.capability`)}</p>
                <ul className="project-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                <a className="project-source" href={project.repo ? `${githubProfile}/${project.repo}` : waLink(`Hi Deepal, I would like to learn more about ${project.name} and its current progress.`)} target="_blank" rel="noopener noreferrer">{project.repo ? <Github size={17}/> : <MessageCircle size={17}/>} {t(project.repo ? 'projects.source' : 'projects.enquiry')}<span className="sr-only"> — {project.name}</span><ArrowUpRight size={17}/></a>
                {project.relatedRepo && <a className="text-link project-related" href={`${githubProfile}/${project.relatedRepo}`} target="_blank" rel="noopener noreferrer"><Globe size={16}/>{t('projects.webSource')}<ArrowUpRight size={16}/></a>}
              </div>
            </article>;
          })}
        </div>
        <details className="additional-projects">
          <summary><Code2 size={20}/><span>{t('projects.more')}</span><span className="project-count">{additionalProjects.length}</span><ChevronDown size={19}/></summary>
          <p>{t('projects.moreIntro')}</p>
          <div className="additional-projects-grid">{additionalProjects.map(name => <div key={name}><h3>{name}</h3><a className="text-link" href={waLink(`Hi Deepal, I would like to learn more about ${name} and its current progress.`)} target="_blank" rel="noopener noreferrer">{t('projects.enquiry')}<ArrowUpRight size={16}/></a></div>)}</div>
        </details>
        <div className="projects-contact"><p>{t('projects.footer')}</p><a className="text-link" href={waLink('Hi Deepal, I would like to discuss an app or business tool idea.')} target="_blank" rel="noopener noreferrer">{t('projects.cta')}<ArrowUpRight size={17}/></a></div>
      </div>
    </section>
  );
}
