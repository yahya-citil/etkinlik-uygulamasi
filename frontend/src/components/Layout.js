import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto mt-8 px-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
