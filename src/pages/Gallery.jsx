import { useEffect, useMemo, useState } from 'react';

const galleryItems = [
  { id: 1, title: 'Compressor support work', category: 'Compressor', src: '/images/hero-worksite.svg' },
  { id: 2, title: 'Rock breaking activity', category: 'Rock Breaking', src: '/images/blasting.svg' },
  { id: 3, title: 'Civil support work', category: 'Civil Works', src: '/images/civil-work.svg' },
  { id: 4, title: 'Construction support area', category: 'Local Works', src: '/images/local-work.svg' },
  { id: 5, title: 'Open-site drilling support', category: 'Compressor', src: '/images/drilling.svg' },
  { id: 6, title: 'Controlled blasting preparation', category: 'Blasting', src: '/images/project-1.svg' },
  { id: 7, title: 'Site preparation and concrete support', category: 'Civil Works', src: '/images/project-2.svg' },
];

const categoryFilters = ['All', 'Compressor', 'Rock Breaking', 'Blasting', 'Civil Works', 'Local Works'];

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

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <PageMeta
        title="Gallery | NKR Air Compressors"
        description="View worksite gallery photos covering compressor works, drilling, rock breaking and civil support activities."
      />

      <section className="page-hero compact">
        <div className="container narrow">
          <span className="section-badge">Gallery</span>
          <h1>Recent site and support work</h1>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="filter-row" aria-label="Gallery filters">
            {categoryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'filter-button active' : 'filter-button'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredImages.length ? (
            <div className="gallery-grid">
              {filteredImages.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="gallery-item"
                  onClick={() => setSelectedImage(item)}
                  aria-label={`Open ${item.title}`}
                >
                  <img src={item.src} alt={item.title} />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No images available for this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {selectedImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Close gallery image">
              ×
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <p>{selectedImage.title}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Gallery;
