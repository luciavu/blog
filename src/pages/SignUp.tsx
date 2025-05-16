import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import Form from '../components/Form/Form';

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
    <Form
      title="Sign up"
      errorMessage={errorMessage}
      submit={handleSignup}
      fields={[
        {
          type: 'text',
          placeholder: 'username',
          value: username,
          onChange: (e) => setUsername(e.target.value),
        },
        {
          type: 'password',
          placeholder: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      ]}
    ></Form>
  );
};

export default SignUp;
