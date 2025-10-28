import React from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom'

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>
        <center>
        <p>if you have account <Link  className="tex-blue-500 underline front-bold" to={"/Login"}>Login</Link></p>
        </center>
        
      </form>
      
    </div>
    
  );
}


