import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, logout } from '../api/auth';

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
      <header>
        <Link to="/">Home</Link>
      </header>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
