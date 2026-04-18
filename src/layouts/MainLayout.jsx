import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollHints from '../components/ScrollHints';

function MainLayout() {
  return (
    <div className="antialiased flex flex-col min-h-screen">
      <ScrollHints />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
