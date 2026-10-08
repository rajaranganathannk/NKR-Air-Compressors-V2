import { Link } from 'react-router-dom';
import { business, navItems, phoneLink, whatsappLink } from '../config/business';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{business.name}</h3>
          <p>{business.tagline}</p>
          <p className="mute">{business.description}</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </li>
            <li>
              <a href={`https://www.instagram.com/${business.instagram.replace('@', '')}/`} target="_blank" rel="noreferrer">
                {business.instagram}
              </a>
            </li>
            <li>
              <a href={`tel:${phoneLink}`}>{business.phone}</a>
            </li>
            <li>
              <a href={`https://wa.me/${whatsappLink}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
