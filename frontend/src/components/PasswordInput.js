import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

const PasswordInput = ({ value, onChange, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
