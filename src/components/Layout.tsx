import { useAuth } from '../context/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Layout = () => {
  const { username, isLoggedIn, isAdmin, id, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div>
      <header className="flex-container">
        <div className="logo">
          <a href="https://github.com/luciavu/blog" target="_blank">
            <FaGithub size={35} />
          </a>
          <h1>
            <Link to="/">Blog {isAdmin ? 'Admin' : ''}</Link>
          </h1>
          {isAdmin && (
            <h1>
              <Link to="/admin" className="dashboard">
                Dashboard
              </Link>
            </h1>
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <div className="flex-container">
              {' '}
              <p>
                Welcome {username}
                {id}
              </p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="login-options">
              <Link to="/login">Login</Link>
              <Link to="/signup" className="register">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
