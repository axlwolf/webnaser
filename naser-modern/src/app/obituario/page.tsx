"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ObituarioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Heading */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url(/assets/images/page-heading-bg.jpg)" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Obituario</h1>
            <span className="text-lg md:text-xl">Honrando memorias</span>
          </div>
        </div>
      </div>

      {/* Naser Aragón Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Naser <em>Aragón</em></h2>
            <span className="text-gray-600">CDMX</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Naser Morelos Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Naser <em>Morelos</em></h2>
            <span className="text-gray-600">CDMX</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600 mb-4">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
              <a href="#" className="text-blue-600 hover:underline">Ver Mapa</a>
            </div>
          </div>
        </div>
      </div>

      {/* Naser Oaxaca Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Naser <em>Oaxaca</em></h2>
            <span className="text-gray-600">CDMX</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <i className="fa fa-plus text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">ROSA MARÍA <br />ENCARNACIÓN ANIZAR</h4>
              <p className="text-gray-600">
                Falleció el día 25 de Marzo de 2023 a los 84 años de edad. Fue incinerada el 26 de Marzo en el Crematorio Jardín Guadalupano (Británico)
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ObituarioPage;
