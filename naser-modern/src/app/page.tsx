"use client";

import React, { useState, useEffect } from "react";
import { ContentItem } from "@/types/content";
import {
  getContentFromLocalStorage,
  getAllContentFromIndexedDB,
} from "@/utils/localStorageUtils";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HomePage: React.FC = () => {
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider items (static for now, can be dynamic later)
  const sliderItems = [
    {
      title: "¿EMERGENCIA FUNERARIA?",
      subtitle: "COMUNÍQUESE\nA NUESTRA LÍNEA DE ATENCIÓN",
      description:
        "Ofrecemos servicios Funerarios con la calidez y calidad que esos momentos difíciles necesitan.",
      buttonText: "LLAMAR",
      buttonLink: "tel:5556887866",
    },
    {
      title: "SERVICIOS DE PREVISIÓN FUNERARIA",
      subtitle: "JUBILADO Y\nPENSIONADO DEL ISSSTE",
      description:
        "Si es usted Jubilado o Pensionado del Gobierno federal, conozca todos los beneficios que le ofrecemos y proteja a sus seres queridos ante lo inevitable.",
      buttonText: "MAYOR INFORMACIÓN",
      buttonLink: "/prevision",
    },
    {
      title: "SERVICIOS DE PREVISIÓN FUNERARIA",
      subtitle: "TRABAJADORES ACTIVOS\nDEL ISSSTE",
      description:
        "Proteger a su familia es un acto de responsabilidad y amor, conozca los servicios que le ofrecemos.",
      buttonText: "MAYOR INFORMACIÓN",
      buttonLink: "/prevision",
    },
    {
      title: "Nuestra cobertura",
      subtitle: "SERVICIO EN TODA\nLA REPÚBLICA MEXICANA",
      description:
        "Gracias a nuestra red funeraria planificada estratégicamente podemos ofrecer nuestro servicio a nivel Nacional.",
      buttonText: "SABER MÁS",
      buttonLink: "/cobertura",
    },
    {
      title: "CONDOLENCIA DIGITAL",
      subtitle: "RECUERDOS QUE\nHONRARÁN SU MEMORIA",
      description:
        "Exprese con palabras o fotografías todo tu sentir en una emotiva despedida.",
      buttonText: "SABER MÁS",
      buttonLink: "/servicios",
    },
    {
      title: "CONTRATO DIGITAL",
      subtitle: "COMPROMETIDOS CON\nEL MEDIO AMBIENTE",
      description: "Si no cuenta con su contrato digital solicítelo.",
      buttonText: "CONTRATO DIGITAL",
      buttonLink: "#",
    },
  ];

  useEffect(() => {
    // Load content from localStorage and IndexedDB
    const loadContent = async () => {
      try {
        const localContent = getContentFromLocalStorage();
        setContentList(localContent);

        const indexedContent = await getAllContentFromIndexedDB();
        if (indexedContent.length > 0) {
          setContentList((prev) => [...prev, ...indexedContent]);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    };

    loadContent();

    // Auto-advance slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderItems.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Main Banner Slider */}
      <div className="relative h-[80vh] overflow-hidden">
        {sliderItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(/assets/images/slide_0${index + 1}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
              <div className="max-w-3xl">
                <h6 className="text-sm md:text-base uppercase font-semibold mb-2">
                  {item.title}
                </h6>
                <h4 className="text-2xl md:text-4xl font-bold mb-4 whitespace-pre-line">
                  {item.subtitle}
                </h4>
                <p className="text-base md:text-lg mb-6">{item.description}</p>
                <Link
                  href={item.buttonLink}
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Request Form Section */}
      <div className="bg-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-bold text-gray-800">
                Nosotros nos comunicamos
              </h4>
              <span className="text-gray-600">
                Escríbanos un mensaje y lo contactaremos de inmediato
              </span>
            </div>
            <Link
              href="/contacto"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_phone.png"
                alt="Asistencia inmediata"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">
                Asistencia inmediata
              </h4>
              <p className="text-gray-600 mb-4">
                Si tiene una emergencia funeraria contáctenos para apoyarle.
              </p>
              <Link
                href="tel:5556887866"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                LLAMAR
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_atention.png"
                alt="Necesidad inmediata"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">
                Necesidad inmediata
              </h4>
              <p className="text-gray-600 mb-4">
                Conozca los beneficios que le ofrecemos para usted y su familia.
              </p>
              <Link
                href="/necesidad-inmediata"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_group.png"
                alt="Planes de Previsión"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">
                Planes de Previsión
              </h4>
              <p className="text-gray-600 mb-4">
                Prevenir es un acto de responsabilidad y amor.
              </p>
              <Link
                href="/prevision"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_map.png"
                alt="Cobertura Nacional"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">Cobertura Nacional</h4>
              <p className="text-gray-600 mb-4">
                Servicio en toda la República mexicana.
              </p>
              <Link
                href="/cobertura"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_phone.png"
                alt="Asistencia Empresarial"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">
                Asistencia Empresarial
              </h4>
              <p className="text-gray-600 mb-4">Proteja a su fuerza laboral.</p>
              <Link
                href="#"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_time.png"
                alt="Obituario"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">Obituario</h4>
              <p className="text-gray-600 mb-4">Honrando Memorias.</p>
              <Link
                href="/obituario"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_map.png"
                alt="Apoyo Emocional"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">Apoyo Emocional</h4>
              <p className="text-gray-600 mb-4">
                Apoyo en los momentos difíciles.
              </p>
              <Link
                href="/cobertura"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_phone.png"
                alt="Contrato Digital"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">Contrato Digital</h4>
              <p className="text-gray-600 mb-4">Solicite su contrato digital</p>
              <Link
                href="#"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/assets/images/icon_services.png"
                alt="Servicios adicionales"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h4 className="text-xl font-semibold mb-2">
                Servicios adicionales
              </h4>
              <p className="text-gray-600 mb-4">Nuestros servicios.</p>
              <Link
                href="/servicios"
                className="inline-block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                SABER MÁS
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
