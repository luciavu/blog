import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, logout } from '../api/auth';
import { FaGithub } from 'react-icons/fa';

const Layout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
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
            <a href="./">Blog</a>
          </h1>
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
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
