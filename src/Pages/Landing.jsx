import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LandingPage = () => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('token') ? 'LoggedInUser' : null);

  const handleSearch = () => {
    if (!city) return alert('Please enter a city');
    navigate(`/results?city=${city}`);
  };

  const containerStyle = {
    height: '100vh',
    backgroundImage:
      'url("https://tse3.mm.bing.net/th?id=OIP.IFtj_HrOf8mSx6Gjwl4EdgHaDh&pid=Api&P=0&h=180")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const boxStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    width: '90%',
    maxWidth: '500px',
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    margin: '0.5rem 0',
    padding: '0.75rem',
    fontSize: '16px',
  };

  const buttonStyle = {
    ...inputStyle,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const linkContainerStyle = {
    marginTop: '1rem',
  };

  const linkStyle = {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <div style={boxStyle}>
          <h1>Find Your Perfect Hostel</h1>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            style={inputStyle}
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            style={inputStyle}
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
          <input
            style={inputStyle}
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
          />
          <button style={buttonStyle} onClick={handleSearch}>
            Search
          </button>

          <div style={linkContainerStyle}>
            {!user ? (
              <>
                <Link to="/login" style={linkStyle}>
                  Login
                </Link>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link>
              </>
            ) : (
              <Link to="/profile" style={linkStyle}>
                My Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
