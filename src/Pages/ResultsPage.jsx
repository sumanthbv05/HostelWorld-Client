import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [hostels, setHostels] = useState([]);
  const city = searchParams.get('city');

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/hostels?city=${city}`);
        const data = await res.json();
        setHostels(data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, [city]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Results for "{city}"</h2>
      {hostels.length === 0 ? (
        <p>No hostels found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {hostels.map((hostel) => (
            <Link
              to={`/hostels/${hostel._id}`}
              key={hostel._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '10px',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <h3>{hostel.name}</h3>
                <p>{hostel.city}</p>
                <p>{hostel.description}</p>
                <p>Rating: {hostel.rating}</p>
                <p>Price: Rs{hostel.price} per night</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
