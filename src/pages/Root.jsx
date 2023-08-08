import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton.jsx';
import '../css/index.css';
import '../css/reset.css';

function Root() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await axios.post('/api/logout');
    if (res.data.success) {
      navigate('/');
    }
  };

  return (
    <>
      <header className="header">
        <nav className='navbar'>
          <div className='logo'>
            <Link to="/">Cinematic Beacons</Link>
          </div>
          <div className='navigate'>
            <ul className='nav-links'>
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link to="/me">Ratings</Link>
              </li>
            </ul>
          </div>
          <div className="nav-buttons">
              <Link to="/login">
                <span>Login</span>
              </Link>
              <LogoutButton onLogOut={handleLogout} />
          </div>
        </nav>
      </header>

      <main className='hero'>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
