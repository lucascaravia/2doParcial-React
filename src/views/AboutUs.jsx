import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';


const AboutUs = () => {
  return (
<>
<Header/>

    <div className="container mx-auto px-4 py-16">
      {/* Título y subtítulo */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900">Sobre nosotros</h1>
        <p className="text-lg mt-4 text-gray-600">Una tienda online con pasión por los productos de calidad.</p>
      </div>

      {/* Misión y visión */}
     {/* Misión y visión */}
     <section className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900">Misión</h2>
          <p className="text-lg mt-4 text-gray-600">Brindar a nuestros clientes una experiencia de compra excepcional, ofreciendo productos de alta calidad a precios competitivos y un servicio al cliente impecable.</p>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900">Visión</h2>
          <p className="text-lg mt-4 text-gray-600">Ser la tienda online líder en nuestro mercado, reconocida por la calidad de nuestros productos, la excelencia de nuestro servicio y nuestro compromiso con la satisfacción del cliente.</p>
        </div>
      </section>

      {/* Equipo */}
      <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mt-8">Nuestro equipo</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col items-center">
          <img src="../public/yo_parado.jpg" alt="Miembro del equipo" className="w-32 h-32 rounded-full object-cover" />
          <h3 className="text-lg font-medium mt-2 text-gray-800">Lucas Caravia</h3>
          <p className="text-gray-600">FrontEnd Developer</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="../public/foto tambu.jpg" alt="Miembro del equipo" className="w-32 h-32 rounded-full object-cover" />
          <h3 className="text-lg font-medium mt-2 text-gray-800">Felipe Tamburella </h3>
          <p className="text-gray-600">BackEnd Developer
          </p>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default AboutUs;
