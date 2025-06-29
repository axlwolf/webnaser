"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    location: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For MVP, just log the form data and show a success message
    console.log("Form submitted:", formData);
    setFormStatus("¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      location: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Heading */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url(/assets/images/page-heading-bg.jpg)" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Contacto</h1>
            <span className="text-lg md:text-xl">Comuníquese con nosotros</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fa fa-phone text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">Corporativo Grupo Naser</h4>
              <p className="text-gray-600 mb-4">Comuníquese a nuestras líneas telefónicas para recibir la atención que necesita.</p>
              <a href="tel:5556887866" className="text-blue-600 hover:underline">55 5688 7866</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fa fa-envelope text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">Correo Electrónico</h4>
              <p className="text-gray-600 mb-4">Escríbanos y nos pondremos en contacto con usted a la brevedad posible.</p>
              <a href="mailto:gruponaser@naser.com" className="text-blue-600 hover:underline">info@naser.com.mx</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fa fa-map-marker text-4xl mb-4 text-blue-600"></i>
              <h4 className="text-xl font-semibold mb-2">Dirección</h4>
              <p className="text-gray-600 mb-4">
                Av. División del Norte #2566<br />Col. San Diego Churubusco<br />C.P. 04120, Coyoacán, CDMX
              </p>
              <a href="#" className="text-blue-600 hover:underline">Ver Mapa</a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Envíenos un <em>mensaje</em></h2>
            <span className="text-gray-600">Atenderemos su solicitud a la brevedad posible</span>
          </div>
          <div className="max-w-4xl mx-auto">
            {formStatus && (
              <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center">
                {formStatus}
              </div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="md:col-span-3">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Localidad"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="md:col-span-3">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mensaje"
                  className="w-full p-3 border rounded"
                  rows={6}
                  required
                ></textarea>
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3764.3138261735658!2d-99.1548251!3d19.3555595!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ffceb43f8f2b%3A0xb585425f2ce42392!2sGrupo%20Naser%20Corporativo!5e0!3m2!1ses-419!2smx!4v1681948207940!5m2!1ses-419!2smx"
          width="100%"
          height="500"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          title="Google Maps - Grupo Naser Corporativo"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
};

export default ContactoPage;
