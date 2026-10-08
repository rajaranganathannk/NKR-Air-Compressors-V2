import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

const subcontractProjects = [
  {
    title: 'L&T – Tirunelveli UGSS Project',
    type: 'Subcontract Work',
    location: 'Tirunelveli',
    work: 'Air breaker and rock-breaking support for underground sewerage works in Tirunelveli.',
  },
  {
    title: 'L&T Power Transmission Project',
    type: 'Subcontract Work',
    location: 'Nanguneri – Kudankulam – Tirunelveli',
    work: 'Blasting and rock excavation for tower foundation and basement requirements.',
  },
  {
    title: 'SAV Construction',
    type: 'Subcontract / Controlled Blasting',
    work: 'Controlled blasting work for construction-related hard-rock removal.',
  },
  {
    title: 'Sri Guru Giruba Projects',
    type: 'Rock Breaking / Compressor Work',
    work: 'Rock-breaking and compressor-based works across multiple project sites.',
  },
  {
    title: 'Andal Temple Cleaning Work',
    type: 'Compressed Air Cleaning',
    work: 'Cleaning support using compressed air for dust and debris removal.',
  },
];

const contractProjects = [
  {
    title: 'L&T Tirunelveli UGSS – HSC Works',
    type: 'Contract Work',
    work: 'HSC-related works, internal plumbing pipe fitting and pipe laying for houses.',
  },
  {
    title: 'MEGHA Construction Projects',
    type: 'Civil Contract Work',
    work: 'Overhead tank construction, ground-level tank construction and related supporting civil works.',
  },
];

const localWorks = [
  'Open Well Digging & Blasting',
  'Rock Breaking',
  'Controlled Blasting',
  'Silent Rock Cracking',
  'Building Foundation Rock Clearing',
  'Basement Rock Removal',
  'Bore Cleaning',
  'Compressor Air Works',
  'Small Residential Construction Support',
  'Drilling Support',
];

function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);

  return null;
}

function Projects() {
  return (
    <>
      <PageMeta
        title="Projects & Experience | NKR Air Compressors"
        description="View subcontract and contract work completed by NKR Air Compressors including drilling, blasting, compressor support and local works."
      />

      <section className="page-hero compact">
        <div className="container narrow">
          <span className="section-badge">Projects &amp; experience</span>
          <h1>Project work built on practical site experience</h1>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Subcontract work</span>
            <h2>Support work for major infrastructure and construction sites</h2>
          </div>

          <div className="project-grid">
            {subcontractProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Contract work</span>
            <h2>Direct civil and support works delivered on-site</h2>
          </div>

          <div className="project-grid">
            {contractProjects.map((project) => (
              <ProjectCard key={project.title} {...project} accent="amber" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="stats-highlight">
            <span className="eyebrow">Local work</span>
            <h2>1000+ Local Works Completed</h2>
            <p>
              NKR has completed more than 1,000 local works for individual customers, property owners, builders and contractors.
            </p>
          </div>

          <div className="local-work-grid">
            {localWorks.map((item) => (
              <div key={item} className="local-work-item">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
