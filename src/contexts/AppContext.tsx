import React, { createContext, useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import * as apiClient from '../api/apiClient';

interface ToastMessageProps {
  message: string;
  type: 'success' | 'error';
}

interface AppContextProps {
  showToast: (toastMessage: ToastMessageProps) => void;
  isLogin: boolean;
  isLoading: boolean;

}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {isLoading, isError,data } = useQuery("validateToken", apiClient.validateToken, {
    retry: false
  });

  const showToast = (toastMessage: ToastMessageProps) => {
    if (toastMessage.type === 'success') {
      toast.success(toastMessage.message);
    } else {
      toast.error(toastMessage.message);
    }
  };
  const isLogin = !isError && data;

  return (
    <AppContext.Provider value={{ showToast, isLogin, isLoading}}>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
