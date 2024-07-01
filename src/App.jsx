import './styles/index.css'
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
function App() {
  return (
    <> 
      
    <Header />

    <div class="hero min-h-screen bg-gradient-to-r from-black to-gray-600 bg-cover flex flex-col items-center justify-center py-12">
  <h1 class="text-5xl font-bold text-white mb-8">Bienvenido a nuestra Tienda </h1>
  <p class="text-xl text-gray-100 text-center px-12 leading-relaxed">podrasa encontrar las mejores cosas a los mejores precios</p>
  <Link to="/productos"   class="bg-white text-indigo-500 font-bold py-2 px-4 rounded-full shadow-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Get Started</Link>
</div>

  
    <Footer />
    </>
  );
}

export default App;
