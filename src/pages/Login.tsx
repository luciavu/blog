import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Form from '../components/Form/Form';

const Login = () => {
  const { loginUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      loginUser();
      navigate('/');
    } else {
      setErrorMessage('Username or password not found');
    }
  };
  return (
    <div>
      <Form
        title="Login"
        errorMessage={errorMessage}
        submit={handleLogin}
        fields={[
          {
            type: 'text',
            placeholder: 'username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
          },
          {
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
          },
        ]}
      ></Form>
    </div>
  );
};

export default Login;
