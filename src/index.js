import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PhotosProvider from './Hooks/usePhotos';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider >
        <App />
        <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
