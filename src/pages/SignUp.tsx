import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { success, message } = await signup(username, password);
    if (success) {
      navigate('/login');
    } else {
      setErrorMessage(message);
    }
  };
  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Sign up</h2>
      {errorMessage}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
};

export default SignUp;
