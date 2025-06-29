"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrevisionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Heading */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url(/assets/images/page-heading-bg.jpg)" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Servicios de Previsión funeraria</h1>
            <span className="text-lg md:text-xl">Prevenir es un acto de responsabilidad y amor</span>
          </div>
        </div>
      </div>

      {/* Prevision Services */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">TRABAJADORES <br />ACTIVOS DEL ISSSTE</h4>
              <p className="text-gray-600 mb-4">Previsión a nivel Nacional.</p>
              <a href="#" className="text-blue-600 hover:underline">Más información</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">JUBILADOS DEL <br />GOBIERNO FEDERAL</h4>
              <p className="text-gray-600 mb-4">Previsión a nivel Nacional.</p>
              <a href="#" className="text-blue-600 hover:underline">Más información</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">ASISTENCIA <br />EMPRESARIAL</h4>
              <p className="text-gray-600 mb-4">Previsión a nivel Nacional</p>
              <a href="#" className="text-blue-600 hover:underline">Más información</a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Prevision Services */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">HOSPITAL DEL <br />NIÑO MORELENSE</h4>
              <p className="text-gray-600 mb-4">Previsión en el estado de Morelos.</p>
              <a href="#" className="text-blue-600 hover:underline">Más información</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">ISEA</h4>
              <p className="text-gray-600 mb-4">Previsión en el estado de Aguascalientes</p>
              <a href="#" className="text-blue-600 hover:underline">Más información</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">INEPJA</h4>
              <p className="text-gray-600 mb-4">Previsión en el estado de Aguascalientes</p>
              <a href="#" className="text-blue-600 hover:underline">Más información</a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Por qué elegir <em>Grupo Naser</em></h2>
            <span className="text-gray-600">Beneficios al contratar nuestros Servicios de Previsión</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/beneficio_1.png" alt="Beneficio 1" className="w-full h-auto object-cover rounded" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/beneficio_2.png" alt="Beneficio 2" className="w-full h-auto object-cover rounded" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/beneficio_3.png" alt="Beneficio 3" className="w-full h-auto object-cover rounded" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/beneficio_4.png" alt="Beneficio 4" className="w-full h-auto object-cover rounded" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/beneficio_5.png" alt="Beneficio 5" className="w-full h-auto object-cover rounded" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/beneficio_6.png" alt="Beneficio 6" className="w-full h-auto object-cover rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Prompt */}
      <div className="py-12 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Envíenos un <em>mensaje</em></h2>
          <span className="text-gray-600 mb-6 block">Atenderemos su solicitud a la brevedad posible</span>
          <Link href="/contacto" className="inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
            CONTACTO
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrevisionPage;
