import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Header from './componets/Header';

const AdminLayout = ({ children }) => {
  return (
    <>
     <AdminRoute>
      <Header />
    <Header />
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {children}
      </div>
        </div>
    <Footer />
    </AdminRoute>
    </>
  );
};

export default AdminLayout;
