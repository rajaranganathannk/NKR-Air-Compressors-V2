function ProjectCard({ title, type, location, work, accent = 'orange' }) {
  return (
    <article className={`project-card project-${accent}`}>
      <span className="project-type">{type}</span>
      <h3>{title}</h3>
      {location ? <p className="project-location">{location}</p> : null}
      <p>{work}</p>
    </article>
  );
}

export default ProjectCard;
