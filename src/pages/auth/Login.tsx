import React  from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit , formState : { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data)
  }

  return (
    <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto">
      <h2 className="text-4xl mb-4 text-left">Login </h2>
      <p className=" mb-4 text-left">For security reasons, please login to booking.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {required: "Email is required"})}
            name="email"
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
            required
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
            {...register('password', {required: "Password is required", minLength: {value: 5, message: "Password must be at least 5 characters"}})}
            name="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
            required
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <p className='pb-7 text-gray-500 text-sm'>Not yet have an account? <Link to="/register" className='hover:text-pink-800'>Register now !</Link></p>
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

export default Login;
