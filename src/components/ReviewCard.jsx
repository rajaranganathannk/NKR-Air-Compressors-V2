function ReviewCard({ name, location, service, rating, message, createdAt }) {
  return (
    <article className="review-card">
      <div className="review-header">
        <div>
          <h3>{name}</h3>
          <p>{location}</p>
        </div>
        <div className="stars" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < rating ? 'star filled' : 'star'}>
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="review-meta">
        <span>{service}</span>
        {createdAt ? <span>{new Date(createdAt.seconds * 1000).toLocaleDateString()}</span> : null}
      </div>

      <p className="review-message">“{message}”</p>
    </article>
  );
}

export default ReviewCard;
