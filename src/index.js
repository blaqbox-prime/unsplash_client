import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PhotosProvider from './Hooks/usePhotos';
import { AuthProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider >
      <PhotosProvider >
        <App />
      </PhotosProvider>
    </AuthProvider>
  </React.StrictMode>
);
