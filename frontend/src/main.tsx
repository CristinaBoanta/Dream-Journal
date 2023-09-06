import React from 'react';
import ReactDOM from 'react-dom/client';
import { DreamContextProvider } from './context/DreamsContext.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
    <DreamContextProvider>
      <App />
    </DreamContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
