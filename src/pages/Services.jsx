import { useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';

const services = [
  { title: 'Air Compressor Services', description: 'Dependable compressor support for drilling, excavation and general site operations.', icon: '⚙️' },
  { title: 'Compressor Drilling', description: 'Drilling services for rock penetration, foundation work and utility support tasks.', icon: '🛠️' },
  { title: 'Rock Breaking', description: 'Practical rock breaking methods for hard ground, trenches, foundations and excavation work.', icon: '🪨' },
  { title: 'Concrete Breaking', description: 'Support for structural demolition, pavement removal and concrete cutting requirements.', icon: '🏗️' },
  { title: 'Air Breaker Works', description: 'Efficient air breaker support for demanding construction and civil site conditions.', icon: '🔧' },
  { title: 'Controlled Blasting', description: 'Measured blasting support for difficult rock removal and controlled excavation work.', icon: '💥' },
  { title: 'Silent Rock Cracking', description: 'Low-noise cracking solutions suitable for occupancies and sensitive areas.', icon: '🔇' },
  { title: 'Open Well Digging & Blasting Support', description: 'Support for open well excavation and rock removal during foundation and digging tasks.', icon: '⛏️' },
  { title: 'Bore Cleaning', description: 'Cleaning and clearing support for bore-related works and debris removal.', icon: '🚰' },
  { title: 'Building Foundation Rock Clearing', description: 'Removal of hard rock and obstruction for building and foundation preparation.', icon: '🏠' },
  { title: 'Basement Rock Removal', description: 'Rock removal support for basement and underground construction tasks.', icon: '🧱' },
  { title: 'Compressor Air Cleaning Works', description: 'Compressed air cleaning for dust, loose material and site preparation support.', icon: '💨' },
  { title: 'Construction & Civil Support Works', description: 'General construction support covering civil works, site preparation and project execution.', icon: '📐' },
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

function Services() {
  return (
    <>
      <PageMeta
        title="Services | NKR Air Compressors"
        description="Air compressor services, controlled blasting, rock breaking, bore cleaning and construction support work."
      />

      <section className="page-hero compact">
        <div className="container narrow">
          <span className="section-badge">Services</span>
          <h1>Industrial and construction support services</h1>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="service-grid large-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link="/contact"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
