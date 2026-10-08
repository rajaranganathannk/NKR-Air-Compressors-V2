import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { approveReview, auth, deleteReview, getPendingReviews, isFirebaseConfigured } from '../firebase/firebase';

const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || import.meta.env.VITE_FIREBASE_ADMIN_EMAIL || '').trim();

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

function AdminReviews() {
  const [user, setUser] = useState(null);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const refreshPendingReviews = async () => {
    const reviews = await getPendingReviews();
    setPendingReviews(reviews);
  };

  useEffect(() => {
    if (!auth || !isFirebaseConfigured || !adminEmail) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser && currentUser.email && currentUser.email.toLowerCase() === adminEmail.toLowerCase()) {
        await refreshPendingReviews();
      } else {
        setPendingReviews([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');

    if (!auth || !adminEmail) {
      setLoginError('Admin access is not configured yet. Set Firebase authentication and VITE_ADMIN_EMAIL before enabling moderation.');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);

      if (result.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
        await signOut(auth);
        throw new Error('This account is not authorised for review moderation.');
      }
    } catch (error) {
      setLoginError(error.message || 'Unable to sign in.');
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      await approveReview(reviewId);
      await refreshPendingReviews();
    } catch (error) {
      console.error('Approve review failed:', error);
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await refreshPendingReviews();
    } catch (error) {
      console.error('Reject review failed:', error);
    }
  };

  if (!isFirebaseConfigured || !adminEmail) {
    return (
      <>
        <PageMeta
          title="Admin Reviews | NKR Air Compressors"
          description="Review moderation for NKR Air Compressors. Configure Firebase Authentication and admin access before approval is enabled."
        />
        <section className="section-block">
          <div className="container narrow admin-status">
            <span className="section-badge">Admin review moderation</span>
            <h1>Configuration required</h1>
            <p>
              Firebase Firestore and Firebase Authentication must be configured before the admin moderation panel can be used.
              Set the required environment variables and an authorised admin email in <strong>VITE_ADMIN_EMAIL</strong>.
            </p>
            <Link to="/reviews" className="button primary">Return to Reviews</Link>
          </div>
        </section>
      </>
    );
  }

  if (loading) {
    return <p className="inline-loading">Checking admin access...</p>;
  }

  if (!user || user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    return (
      <>
        <PageMeta
          title="Admin Reviews | NKR Air Compressors"
          description="Admin access for NKR Air Compressors review moderation."
        />
        <section className="section-block">
          <div className="container narrow admin-login">
            <span className="section-badge">Admin access</span>
            <h1>Review moderation sign in</h1>
            <form onSubmit={handleLogin} className="review-form">
              <label>
                Admin email
                <input type="email" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} required />
              </label>
              <label>
                Password
                <input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} required />
              </label>
              <button type="submit" className="button primary submit-btn">Sign In</button>
            </form>
            {loginError ? <p className="error-message">{loginError}</p> : null}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Admin Reviews | NKR Air Compressors"
        description="Review moderation panel for NKR Air Compressors."
      />
      <section className="section-block">
        <div className="container">
          <div className="admin-header">
            <div>
              <span className="section-badge">Admin</span>
              <h1>Review moderation</h1>
            </div>
            <button type="button" className="button secondary" onClick={() => signOut(auth)}>
              Sign Out
            </button>
          </div>

          {pendingReviews.length === 0 ? (
            <div className="empty-state">
              <p>No pending reviews to approve.</p>
            </div>
          ) : (
            <div className="admin-table">
              {pendingReviews.map((review) => (
                <article key={review.id} className="admin-review-card">
                  <div className="admin-review-head">
                    <div>
                      <h3>{review.name}</h3>
                      <p>{review.location}</p>
                    </div>
                    <span className="review-pill">{review.service}</span>
                  </div>
                  <p className="stars-inline">{Array.from({ length: Number(review.rating) || 5 }, () => '★').join('')}</p>
                  <p>{review.message}</p>
                  <div className="admin-actions">
                    <button type="button" className="button primary" onClick={() => handleApprove(review.id)}>
                      Approve
                    </button>
                    <button type="button" className="button secondary" onClick={() => handleReject(review.id)}>
                      Reject
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AdminReviews;
