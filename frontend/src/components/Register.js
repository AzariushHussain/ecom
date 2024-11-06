import React, { useState } from 'react';
import { Eye, EyeOff, Phone, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import InputField from './InputField';
import { register } from '../api/auth'; 
import FloatingMessage from './Message';

const Register = ({ toggleAuthMode }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    username: '',
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
    const { message: responseMessage, data } = await register(formData);
    setMessage({ type: 'success', text: responseMessage });

    setTimeout(() => {
      navigate('/login');
      setMessage(null);
    }, 3000);
  };

  const handleSignInRedirect = () => {
    navigate('/login');
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
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
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <InputField
                icon={User}
                type="text"
                placeholder="Full Name"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
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
            <div className="mb-4">
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
            Sign up
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={handleSignInRedirect}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
