import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import HomePage from './pages/home';
import Login from './pages/(auth)/login';
import Register from './pages/(auth)/register';
import LandingPage from './pages/landing';
import Channel from './pages/channel';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/channels" element={<HomePage />} />
        <Route path="/channels/:id" element={<Channel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
