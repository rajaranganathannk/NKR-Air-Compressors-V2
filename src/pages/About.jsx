import { useEffect } from 'react';
import { business } from '../config/business';

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

const reasons = [
  'Reliable Service',
  'Field Experience',
  'Practical Solutions',
  'Customer Support',
  'Wide Range of Services',
];

function About() {
  return (
    <>
      <PageMeta
        title="About NKR Air Compressors"
        description="NKR Air Compressors has been serving customers since 2006 with practical compressor and construction support services."
      />

      <section className="page-hero compact">
        <div className="container narrow">
          <span className="section-badge">Serving Since 2006</span>
          <h1>About NKR Air Compressors</h1>
        </div>
      </section>

      <section className="section-block">
        <div className="container grid-two">
          <div>
            <p>
              {business.name} has been serving customers since 2006. The company provides compressor services, drilling, rock breaking,
              concrete breaking, air breaker works, controlled blasting, silent rock cracking and construction support services.
            </p>
            <p>
              The work is backed by practical field experience, reliable equipment and a customer-focused approach. NKR supports a range of
              residential, commercial and infrastructure projects with timely, solution-based service.
            </p>
            <p>
              From construction and demolition support to foundation rock clearing and site preparation, the company works with builders,
              contractors and property owners across a variety of project requirements.
            </p>
          </div>

          <div className="experience-highlight">
            <span>Serving Since</span>
            <strong>2006</strong>
            <p>Experience built through local works, contract assignments and site support across multiple project types.</p>
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why choose us</span>
            <h2>Dependable support for practical site challenges</h2>
          </div>

          <div className="feature-grid">
            {reasons.map((reason) => (
              <div key={reason} className="feature-card">
                <span className="feature-bullet">✓</span>
                <h3>{reason}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
