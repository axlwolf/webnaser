"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NosotrosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Heading */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url(/assets/images/page-heading-bg.jpg)" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">GRUPO NASER</h1>
            <span className="text-lg md:text-xl">CONTAMOS CON MÁS DE 33 AÑOS DE EXPERIENCIA</span>
          </div>
        </div>
      </div>

      {/* About Info */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-blue-600 font-semibold">NACIONAL DE SERVICIOS FUNERARIOS A FUTURO</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">HISTORIA <em><br />GRUPO NASER</em></h2>
              <p className="text-gray-600 mb-6">
                Sabemos que hablar de la muerte no es un tema fácil de tratar pero estamos para ayudarle en los momentos más difíciles de la vida. Desde nuestra fundación en 1989 nos hemos comprometido a brindar un servicio de excelencia y calidad a nuestros clientes.
                <br /><br />Sabemos que hablar de la muerte no es un tema fácil de tratar.
              </p>
              <a href="#" className="inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">CONOZCA MÁS</a>
            </div>
            <div>
              <img src="/assets/images/naser_33.png" alt="Grupo Naser" className="w-full h-auto object-cover rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-blue-600 font-semibold">Nuestros logros</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Comprometidos con las <em>familias mexicanas</em></h2>
              <p className="text-gray-600 mb-6">
                En Grupo Naser estamos en constante crecimiento para ofrecer siempre el mejor servicio.
                <br /><br />Tenemos la satisfacción de En Grupo Naser estamos en constante crecimiento para ofrecer siempre el mejor servicio. En Grupo Naser estamos en constante crecimiento para ofrecer siempre el mejor servicio.
              </p>
              <Link href="/contacto" className="inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">CONTACTO</Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">120</div>
                <div className="text-gray-600">Red Funeraria</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">26789</div>
                <div className="text-gray-600">Clientes satisfechos</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-gray-600">Funerarias y cementerios</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">53</div>
                <div className="text-gray-600">Proyectos realizados</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Servicios Dignos <em>a precios justos</em></h2>
            <span className="text-gray-600">Testimonio de nuestros clientes</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Luz Espino</h4>
              <span className="text-blue-600 block mb-4">Naser Morelos</span>
              <p className="text-gray-600">"La asesoría fue adecuada, en esos momentos no sabemos que pasos se deben seguir, gracias por orientarme."</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Laura Porras</h4>
              <span className="text-blue-600 block mb-4">Veracruz</span>
              <p className="text-gray-600">"Todo muy bien. En otro momento regresaremos para información de paquetería familiar."</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">José Ramírez</h4>
              <span className="text-blue-600 block mb-4">Naser Oaxaca</span>
              <p className="text-gray-600">"La atención que nos dieron y la forma en que nos trataron todo el tiempo fue excelente."</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Alejandro Galindo</h4>
              <span className="text-blue-600 block mb-4">Agencia Oaxaca</span>
              <p className="text-gray-600">"Me orientaron en los trámites que tenía que realizar y en la agencia estuvieron atentos a cualquier situación, todo salió muy bien."</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NosotrosPage;
