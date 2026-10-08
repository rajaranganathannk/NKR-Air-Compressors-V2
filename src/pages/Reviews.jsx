import { useEffect, useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import { getApprovedReviews, isFirebaseConfigured, submitReview } from '../firebase/firebase';

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
  location: '',
  service: '',
  rating: '5',
  message: '',
};

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
          setReviews(approvedReviews);
        }
      } catch (loadError) {
        console.error('Unable to fetch reviews:', loadError);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!isFirebaseConfigured) {
      setError('Firebase Firestore is not configured yet. Add your Firebase environment variables to enable review submissions.');
      return;
    }

    try {
      await submitReview({
        name: formData.name,
        location: formData.location,
        service: formData.service,
        rating: Number(formData.rating),
        message: formData.message,
      });
      setMessage('Thank you. Your review has been submitted for approval.');
      setFormData(initialForm);
    } catch (submitError) {
      console.error('Review submit error:', submitError);
      setError('Something went wrong while submitting your review. Please try again.');
    }
  };

  return (
    <>
      <PageMeta
        title="Customer Reviews | NKR Air Compressors"
        description="Read approved customer reviews and submit a review for NKR Air Compressors."
      />

      <section className="page-hero compact">
        <div className="container narrow">
          <span className="section-badge">Reviews</span>
          <h1>Customer feedback and project appreciation</h1>
        </div>
      </section>

      <section className="section-block">
        <div className="container review-layout">
          <div className="review-form-wrap">
            <h2>Submit a Review</h2>
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <label>
                  Customer Name
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                  Location
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </label>
              </div>

              <div className="field-row">
                <label>
                  Service Used
                  <input type="text" name="service" value={formData.service} onChange={handleChange} required />
                </label>
                <label>
                  Rating
                  <select name="rating" value={formData.rating} onChange={handleChange}>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                </label>
              </div>

              <label>
                Review Message
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required />
              </label>

              <button type="submit" className="button primary submit-btn">Submit Review</button>
            </form>

            {message ? <p className="success-message">{message}</p> : null}
            {error ? <p className="error-message">{error}</p> : null}
          </div>

          <div className="review-feed">
            <h2>Approved Reviews</h2>

            {loading ? (
              <p>Loading approved reviews...</p>
            ) : reviews.length ? (
              <div className="review-grid single-column">
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
                <p>No approved reviews are available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Reviews;
