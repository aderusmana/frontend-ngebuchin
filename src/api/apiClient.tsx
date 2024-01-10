import { RegisterFormData } from "../pages/auth/Register";
import axiosInstance from './../config/axios';


export const register =async (formData:RegisterFormData) => {
    try {
        const response  = await axiosInstance.post('/auth/register',formData);
        return response.data;
    
    } catch (error) {
        console.error('Error during registration:', error);
        throw new Error('Registration failed'); 
    }
}