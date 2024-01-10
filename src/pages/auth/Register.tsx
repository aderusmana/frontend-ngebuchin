import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../../api/apiClient';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const { register,watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register ,{
    onSuccess: () => {
      console.log('Registration successful');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    mutation.mutate(registerData);
    console.log(data)
  };

  return (
    <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto">
      <h2 className="text-4xl mb-4 text-left">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: "First Name is required" })}
            placeholder="First Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: "Last Name is required" })}
            placeholder="Last Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: "Email is required" })}
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: "Password is required", minLength: { value: 5, message: "Password must be at least 5 characters" } })}
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', { 
                validate: (value) => {
                    if(!value) {
                        return "Confirm Password is required"
                    }else if(watch('password') != value) {
                        return "Password and Confirm Password must match"
                    } }})}
            placeholder="Confirm Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <h3 className='pb-7 text-gray-500 text-sm'>Already have an account? <Link to="/login" className='hover:text-pink-800'>Login</Link></h3>
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
