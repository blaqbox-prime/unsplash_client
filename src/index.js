import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PhotosProvider from './Hooks/usePhotos';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

  const queryClient = new QueryClient();


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider >
        <App />
        <ToastContainer />
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
