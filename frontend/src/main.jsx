import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="859875827695-0evls898fkgsonbbados5tnfe3fiuvbp.apps.googleusercontent.com">
          <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
