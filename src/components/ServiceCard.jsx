import { Link } from 'react-router-dom';

function ServiceCard({ title, description, icon, link = '/services' }) {
  return (
    <article className="service-card">
      <div className="service-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>View Details</Link>
    </article>
  );
}

export default ServiceCard;
