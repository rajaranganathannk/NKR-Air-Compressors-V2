import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="section-block">
      <div className="container narrow error-page">
        <span className="section-badge">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="button primary">Back to Home</Link>
      </div>
    </section>
  );
}

export default NotFound;
