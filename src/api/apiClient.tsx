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
  