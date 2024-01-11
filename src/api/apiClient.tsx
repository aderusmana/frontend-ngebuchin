import { LoginFormData } from "../pages/auth/Login";
import { RegisterFormData } from "../pages/auth/Register";
import axiosInstance from './../config/axios';


export const register = async (formData: RegisterFormData) => {
    try {
      const response = await axiosInstance.post('/auth/register', formData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        // Jika respons dari server mengandung informasi tentang kesalahan
        throw new Error('Registration failed: ' + error.response.data.message);
      } else if (error.request) {
        // Jika permintaan tidak mendapatkan respons dari server
        throw new Error('No response from server during registration');
      } else {
        // Jika terjadi kesalahan lain
        throw new Error('Registration failed: ' + error.message);
      }
    }
  }


export const login = async (formData: LoginFormData) => {
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        // Jika respons dari server mengandung informasi tentang kesalahan
        throw new Error('Login failed: ' + error.response.data.message);
      } else if (error.request) {
        // Jika permintaan tidak mendapatkan respons dari server
        throw new Error('No response from server during login');
      } else {
        // Jika terjadi kesalahan lain
        throw new Error('Login failed: ' + error.message);
      }
    }
  }

  export const logout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Error during logout:', error);
      if (error.response) {
        // Jika respons dari server mengandung informasi tentang kesalahan
        throw new Error('Logout failed: ' + error.response.data.message);
      } else if (error.request) {
        // Jika permintaan tidak mendapatkan respons dari server
        throw new Error('No response from server during logout');
      } else {
        // Jika terjadi kesalahan lain
        throw new Error('Logout failed: ' + error.message);
      }
    }
  }

  export const validateToken = async () => {
      const response = await axiosInstance.get('/auth/validate-token',{
        withCredentials: true
      });
      if(response.status === 200){
        return response.data
      }
      throw new Error('Failed to validate token');

  }
  