import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import InputField from './InputField';
import { loginapi } from '../api/auth';
import FloatingMessage from './Message';
import { useUser } from '../context/UserContext';

const Login = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await loginapi(formData);
    if (resp && resp.message) {
      console.log('Login response:', resp);
      login(resp.data.token, resp.data.user);
      setMessage({ type: 'success', text: resp.message });
      
      navigate('/');
    }
    
  };

  const handleSignUpRedirect = () => {
    navigate('/register');
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {message && (
          <FloatingMessage
            type={message.type}
            text={message.text}
            onClose={handleCloseMessage}
          />
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <InputField
                icon={Phone}
                type="tel"
                placeholder="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <PasswordInput
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={handleSignUpRedirect}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
