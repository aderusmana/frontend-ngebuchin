import React, { useState }  from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from "../../api/apiClient";
import { useAppContext } from '../../contexts/AppContext';



export interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit , formState : { errors } } = useForm<LoginFormData>();

    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const mutation = useMutation(apiClient.login, {
      onSuccess: async() => {
        await queryClient.invalidateQueries("validateToken");
          showToast({message: "Login successful", type: 'success'});
        navigate('/');
      },
      onError: (error) => {
        console.error("Login failed:", error);
        showToast({message: "Login failed, check your input", type: 'error'});
      },
    })
  const onSubmit = (data: LoginFormData) => {
    console.log(data)
    mutation.mutate(data);
  }
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <p className='pb-7 text-gray-500 text-sm'>Not yet have an account? <Link to="/register" className='hover:text-pink-800'>Register now !</Link></p>
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
