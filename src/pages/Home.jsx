import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import ReviewCard from '../components/ReviewCard';
import { business, phoneLink, whatsappLink } from '../config/business';
import { getApprovedReviews, isFirebaseConfigured } from '../firebase/firebase';

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

const services = [
  { title: 'Air Compressor Services', description: 'Reliable compressor support for drilling, excavation and construction needs.', icon: '⚙️' },
  { title: 'Rock Breaking', description: 'Efficient and controlled rock-breaking solutions for hard ground and foundations.', icon: '🪨' },
  { title: 'Controlled Blasting', description: 'Safe, practical blasting support for difficult rock removal tasks.', icon: '💥' },
  { title: 'Silent Rock Cracking', description: 'Low-noise cracking methods for sensitive or compact worksites.', icon: '🔇' },
];

const projects = [
  {
    title: 'L&T – Tirunelveli UGSS Project',
    type: 'Subcontract Work',
    location: 'Tirunelveli',
    work: 'Air breaker and rock-breaking support for underground sewerage works.',
  },
  {
    title: 'L&T Power Transmission Project',
    type: 'Subcontract Work',
    location: 'Nanguneri – Kudankulam – Tirunelveli',
    work: 'Blasting and rock excavation for tower foundation and basement requirements.',
  },
  {
    title: 'MEGHA Construction Projects',
    type: 'Civil Contract Work',
    work: 'Overhead tank, ground-level tank and supporting civil works.',
  },
];

const galleryPreview = [
  { src: '/images/hero-worksite.svg', alt: 'Worksite compressor service activity', category: 'Compressor' },
  { src: '/images/blasting.svg', alt: 'Rock breaking and drilling support', category: 'Rock Breaking' },
  { src: '/images/civil-work.svg', alt: 'Civil construction support work', category: 'Civil Works' },
];

function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      if (!isFirebaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const approvedReviews = await getApprovedReviews();
        if (isMounted) {
          setReviews(approvedReviews.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch approved reviews:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <PageMeta
        title="NKR Air Compressors | Compressor & Rock Breaking Services"
        description="Professional compressor drilling, rock breaking, controlled blasting, silent rock cracking and construction support services."
      />

      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="section-badge">SERVING SINCE 2006</span>
            <h1>Reliable Compressor &amp; Rock Breaking Services</h1>
            <p>
              Professional compressor drilling, rock breaking, controlled blasting, silent rock cracking and construction support services.
            </p>
            <div className="button-row">
              <a href={`tel:${phoneLink}`} className="button primary">Call Now</a>
              <a href={`https://wa.me/${whatsappLink}`} target="_blank" rel="noreferrer" className="button secondary">
                WhatsApp
              </a>
              <Link to="/services" className="button secondary">
                View Services
              </Link>
              <Link to="/contact" className="button primary">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <img src="/images/hero-worksite.svg" alt="NKR worksite compressor and rock breaking activity" />
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-item">
            <strong>Serving Since 2006</strong>
            <span>Longstanding service experience</span>
          </div>
          <div className="stat-item">
            <strong>1000+ Local Works Completed</strong>
            <span>Residential and contractor support</span>
          </div>
          <div className="stat-item">
            <strong>Major Subcontract &amp; Contract Experience</strong>
            <span>Infrastructure and civil work support</span>
          </div>
          <div className="stat-item">
            <strong>Multiple Industrial &amp; Construction Services</strong>
            <span>One team for varied site requirements</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our services</span>
            <h2>Practical support for demanding worksite conditions</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Projects &amp; experience</span>
              <h2>Fieldwork across construction and infrastructure support</h2>
            </div>
            <Link to="/projects" className="text-link">View all projects</Link>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Gallery</span>
              <h2>Recent worksite snapshots</h2>
            </div>
            <Link to="/gallery" className="text-link">Open gallery</Link>
          </div>

          <div className="gallery-preview-grid">
            {galleryPreview.map((item) => (
              <div className="gallery-preview-card" key={item.src}>
                <img src={item.src} alt={item.alt} />
                <span>{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Customer reviews</span>
            <h2>Feedback from customers and project teams</h2>
          </div>

          {loading ? (
            <p className="inline-loading">Loading reviews...</p>
          ) : reviews.length ? (
            <div className="review-grid">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  location={review.location}
                  service={review.service}
                  rating={Number(review.rating) || 5}
                  message={review.message}
                  createdAt={review.createdAt}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No public reviews are available yet. Please check back later or submit a review.</p>
            </div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-box">
          <div>
            <span className="eyebrow">Need support on site?</span>
            <h2>Talk to NKR Air Compressors about your project requirements.</h2>
          </div>
          <div className="cta-actions">
            <a href={`mailto:${business.email}`} className="button primary">Email Us</a>
            <a href={`https://wa.me/${whatsappLink}`} target="_blank" rel="noreferrer" className="button secondary">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
