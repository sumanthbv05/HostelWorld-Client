import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [review, setReview] = useState({ user: '', comment: '', rating: 0 });
  const [error, setError] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', date: '' });

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/hostels/${id}`);
        const data = await res.json();
        setHostel(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHostel();
  }, [id]);

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!review.user || !review.comment || !review.rating) {
      setError('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/hostels/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: review.user,
          comment: review.comment,
          rating: Number(review.rating),
        }),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      const updatedHostel = await res.json();
      setHostel(updatedHostel);
      setReview({ user: '', comment: '', rating: 0 });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${bookingData.name} on ${bookingData.date}`);
    setShowBooking(false);
    setBookingData({ name: '', email: '', date: '' });
  };

  if (!hostel) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{hostel.name}</h2>
      <img
        src={hostel.image}
        alt={hostel.name}
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
      />
      <p><strong>City:</strong> {hostel.city}</p>
      <p><strong>Description:</strong> {hostel.description}</p>
      <p><strong>Rating:</strong> {hostel.rating}</p>
      <p><strong>Price:</strong> Rs{hostel.price} per night</p>

      <button
        onClick={() => setShowBooking(true)}
        style={{
          padding: '10px 20px',
          marginTop: '1rem',
          backgroundColor: '#2b7a78',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Book Now
      </button>

      {/* Booking Popup */}
      {showBooking && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '10px', width: '300px' }}>
            <h3>Book Your Stay</h3>
            <form onSubmit={handleBookingSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={bookingData.name}
                onChange={handleBookingChange}
                required
                style={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={bookingData.email}
                onChange={handleBookingChange}
                required
                style={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleBookingChange}
                required
                style={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <button type="submit" style={{ width: '100%', backgroundColor: '#2b7a78', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px' }}>
                Confirm Booking
              </button>
              <button type="button" onClick={() => setShowBooking(false)} style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#ccc', border: 'none', borderRadius: '5px' }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}></div>
      <h3>Reviews</h3>
      {hostel.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {hostel.reviews.map((r, idx) => (
            <li key={idx}>
              <strong>{r.user}</strong>: {r.comment} (Rating: {r.rating})
            </li>
          ))}
        </ul>
      )}

      <h3>Add a Review</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleReviewSubmit} style={{ maxWidth: '400px' }}>
        <div>
          <label>Your Name:</label><br />
          <input
            type="text"
            name="user"
            value={review.user}
            onChange={handleReviewChange}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label>Comment:</label><br />
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleReviewChange}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label>Rating (1-5):</label><br />
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={review.rating}
            onChange={handleReviewChange}
            style={{ width: '100px', marginBottom: '0.5rem' }}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default HostelDetails;
