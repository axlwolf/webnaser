"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NecesidadInmediataPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Heading */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url(/assets/images/page-heading-bg.jpg)" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Necesidad Inmediata</h1>
            <span className="text-lg md:text-xl">Atentos a brindarle el mejor servicio</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/ni_aragon.png" alt="Agencia Funeraria Naser Aragón" className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-xl font-semibold mb-2">Agencia Funeraria <br />Naser Aragón</h4>
              <p className="text-gray-600 mb-4">Comuníquese a nuestras líneas telefónicas para recibir la atención que necesita.</p>
              <div className="space-y-2">
                <a href="tel:5557601317" className="block text-blue-600 hover:underline">55 5760 1317</a>
                <a href="mailto:funerariaaragon@naser.com.mx" className="block text-blue-600 hover:underline">funerariaaragon@naser.com.mx</a>
                <a href="#" className="block text-blue-600 hover:underline">Ver Mapa</a>
              </div>
              <Link href="/naser_aragon" className="inline-block w-full text-center mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                CONOZCA MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/ni_tlalpan.png" alt="Agencia Funeraria Naser Tlalpan" className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-xl font-semibold mb-2">Agencia Funeraria <br />Naser Tlalpan (CDMX)</h4>
              <p className="text-gray-600 mb-4">
                Calzada de Tlalpan # 1145 <br />
                Col. San Simón Ticumac <br />Alc. Benito Juárez C.P. 3660, CDMX
              </p>
              <div className="space-y-2">
                <a href="tel:9515187335" className="block text-blue-600 hover:underline">951 518 7335</a>
                <a href="mailto:funerarianasergris@naser.com.mx" className="block text-blue-600 hover:underline">funerarianasergris@naser.com.mx</a>
                <a href="#" className="block text-blue-600 hover:underline">Ver Mapa</a>
              </div>
              <Link href="/naser_tlalpan" className="inline-block w-full text-center mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                CONOZCA MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/ni_morelos.png" alt="Agencia Funeraria Naser Morelos" className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-xl font-semibold mb-2">Agencia Funeraria <br />Naser Morelos</h4>
              <p className="text-gray-600 mb-4">Escríbanos y nos pondremos en contacto con usted a la brevedad posible.</p>
              <div className="space-y-2">
                <a href="tel:7773119223" className="block text-blue-600 hover:underline">777 311 9223</a>
                <a href="mailto:funerariamorelos@naser.com.mx" className="block text-blue-600 hover:underline">funerariamorelos@naser.com.mx</a>
                <a href="#" className="block text-blue-600 hover:underline">Ver Mapa</a>
              </div>
              <Link href="/naser_morelos" className="inline-block w-full text-center mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                CONOZCA MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/assets/images/ni_oaxaca.png" alt="Agencia Funeraria Naser Oaxaca" className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-xl font-semibold mb-2">Agencia Funeraria <br />Naser Oaxaca</h4>
              <p className="text-gray-600 mb-4">
                Av. División del Norte #2566<br />Col. San Diego Churubusco<br />C.P. 04120, Coyoacán, CDMX
              </p>
              <div className="space-y-2">
                <a href="tel:9515187335" className="block text-blue-600 hover:underline">951 518 7335</a>
                <a href="mailto:funerariaoaxaca@naser.com.mx" className="block text-blue-600 hover:underline">funerariaoaxaca@naser.com.mx</a>
                <a href="#" className="block text-blue-600 hover:underline">Ver Mapa</a>
              </div>
              <Link href="/naser_oaxaca" className="inline-block w-full text-center mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                CONOZCA MÁS
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NecesidadInmediataPage;
