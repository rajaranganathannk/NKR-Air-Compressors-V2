import { useEffect, useState } from 'react';
import { business, phoneLink, whatsappLink } from '../config/business';

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

const initialForm = {
  name: '',
  phone: '',
  location: '',
  service: '',
  message: '',
};

function Contact() {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = `Hello NKR Air Compressors,%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ALocation: ${formData.location}%0AService Required: ${formData.service}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${whatsappLink}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <PageMeta
        title="Contact | NKR Air Compressors"
        description="Contact NKR Air Compressors by email, Instagram or WhatsApp for compressor and construction support services."
      />

      <section className="page-hero compact">
        <div className="container narrow">
          <span className="section-badge">Contact</span>
          <h1>Let’s talk about your site requirements</h1>
        </div>
      </section>

      <section className="section-block">
        <div className="container contact-layout">
          <div className="contact-cards">
            <div className="info-card">
              <h3>Call Us</h3>
              <a href={`tel:${phoneLink}`}>{business.phone}</a>
            </div>
            <div className="info-card">
              <h3>WhatsApp</h3>
              <a href={`https://wa.me/${whatsappLink}`} target="_blank" rel="noreferrer">
                {business.whatsapp}
              </a>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
            <div className="info-card">
              <h3>Instagram</h3>
              <a href={`https://www.instagram.com/${business.instagram.replace('@', '')}/`} target="_blank" rel="noreferrer">
                {business.instagram}
              </a>
            </div>
            <div className="info-card">
              <h3>Location</h3>
              <p>{business.location}</p>
            </div>
          </div>

          <div className="contact-form-wrap">
            <h2>Send an enquiry</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>

              <div className="field-row">
                <label>
                  Phone
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                  Location
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </label>
              </div>

              <label>
                Service Required
                <input type="text" name="service" value={formData.service} onChange={handleChange} required />
              </label>

              <label>
                Message
                <textarea name="message" value={formData.message} rows="5" onChange={handleChange} required />
              </label>

              <button type="submit" className="button primary submit-btn">Send via WhatsApp</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
