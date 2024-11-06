import React from 'react';

const InputField = ({ icon: Icon, type, placeholder, value, onChange, name }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type={type}
      name={name}
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default InputField;
