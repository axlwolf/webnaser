"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServiciosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tabs-1");

  const services = [
    {
      id: "tabs-1",
      title: "Traslados",
      image: "/assets/images/servicio_01.png",
      description:
        "Vivamus sed feugiat elit. Pellentesque pretium, massa at placerat vehicula, neque turpis pulvinar tortor, eget convallis lorem odio non tortor. Donec massa est, fermentum sit amet felis ac, maximus luctus elit. Vivamus aliquet, dolor id imperdiet imperdiet, dui diam aliquet dui, a euismod metus enim ac velit. Vivamus eu tristique odio, vel tristique quam.\n\nProin eu molestie risus. Etiam suscipit pretium odio, at consectetur nisi. Sed ut dolor in augue cursus ultrices. Vivamus mauris turpis, auctor vel facilisis in, tincidunt vel diam. Sed vitae scelerisque orci. Nunc non magna orci. Aliquam commodo mauris ante.",
    },
    {
      id: "tabs-2",
      title: "Capilla a domicilio",
      image: "/assets/images/servicio_02.png",
      description:
        "Sed ut dolor in augue cursus ultrices. Vivamus mauris turpis, auctor vel facilisis in, tincidunt vel diam. Sed vitae scelerisque orci. Nunc non magna orci. Aliquam commodo mauris ante, quis posuere nibh vestibulum sit amet\n\nPellentesque pretium, massa at placerat vehicula, neque turpis pulvinar tortor, eget convallis lorem odio non tortor. Donec massa est, fermentum sit amet felis ac, maximus luctus elit. Vivamus aliquet, dolor id imperdiet imperdiet, dui diam aliquet dui, a euismod metus enim ac velit. Vivamus eu tristique odio, vel tristique quam.",
    },
    {
      id: "tabs-3",
      title: "Ceremonia religiosa",
      image: "/assets/images/servicio_03.png",
      description:
        "Mauris lobortis quam id dictum dignissim. Donec pellentesque erat dolor, cursus dapibus turpis hendrerit quis. Suspendisse at suscipit arcu. Nulla sed erat lectus. Nulla facilisi. In sit amet neque sapien. Donec scelerisque mi at gravida efficitur. Nunc lacinia a est eu malesuada. Curabitur eleifend elit sapien, sed pulvinar orci luctus eget.\n\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vel ultrices nulla, ac tincidunt eros. Aenean quis tellus velit. Praesent pretium justo non auctor condimentum.",
    },
    {
      id: "tabs-4",
      title: "Homenaje en video",
      image: "/assets/images/servicio_04.png",
      description:
        "Integer vehicula sapien quis dolor efficitur, eget molestie eros tempus. Curabitur sollicitudin, tortor at suscipit volutpat, nisi arcu aliquet dui, vitae semper sem turpis quis libero. Quisque vulputate lacinia nisl ac lobortis. Ut ultricies maximus turpis, in sollicitudin ligula posuere vel.\n\nDonec finibus maximus neque, vitae egestas quam imperdiet nec. Proin nec mauris eu tortor consectetur tristique. Etiam suscipit ante a odio consequat, in ornare lacus suscipit. Cras ac libero massa. Quisque rhoncus velit feugiat vulputate mollis. Donec nisl eros, malesuada sed nisi id, condimentum condimentum quam.",
    },
    {
      id: "tabs-5",
      title: "Condolencia digital*",
      image: "/assets/images/servicio_05.png",
      description:
        "Vivamus sed feugiat elit. Pellentesque pretium, massa at placerat vehicula, neque turpis pulvinar tortor, eget convallis lorem odio non tortor. Donec massa est, fermentum sit amet felis ac, maximus luctus elit. Vivamus aliquet, dolor id imperdiet imperdiet, dui diam aliquet dui, a euismod metus enim ac velit. Vivamus eu tristique odio, vel tristique quam.\n\nProin eu molestie risus. Etiam suscipit pretium odio, at consectetur nisi. Sed ut dolor in augue cursus ultrices. Vivamus mauris turpis, auctor vel facilisis in, tincidunt vel diam. Sed vitae scelerisque orci. Nunc non magna orci. Aliquam commodo mauris ante.\n\n*Exclusivo en Agencia Funeraria Naser Morelos",
    },
    {
      id: "tabs-6",
      title: "Funerales virtuales",
      image: "/assets/images/servicio_06.png",
      description:
        "Sed ut dolor in augue cursus ultrices. Vivamus mauris turpis, auctor vel facilisis in, tincidunt vel diam. Sed vitae scelerisque orci. Nunc non magna orci. Aliquam commodo mauris ante, quis posuere nibh vestibulum sit amet\n\nPellentesque pretium, massa at placerat vehicula, neque turpis pulvinar tortor, eget convallis lorem odio non tortor. Donec massa est, fermentum sit amet felis ac, maximus luctus elit. Vivamus aliquet, dolor id imperdiet imperdiet, dui diam aliquet dui, a euismod metus enim ac velit. Vivamus eu tristique odio, vel tristique quam.",
    },
    {
      id: "tabs-7",
      title: "Autobús de acompañamiento**",
      image: "/assets/images/servicio_07.png",
      description:
        "Mauris lobortis quam id dictum dignissim. Donec pellentesque erat dolor, cursus dapibus turpis hendrerit quis. Suspendisse at suscipit arcu. Nulla sed erat lectus. Nulla facilisi. In sit amet neque sapien. Donec scelerisque mi at gravida efficitur. Nunc lacinia a est eu malesuada. Curabitur eleifend elit sapien, sed pulvinar orci luctus eget.\n\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vel ultrices nulla, ac tincidunt eros. Aenean quis tellus velit. Praesent pretium justo non auctor condimentum.\n\n*Exclusivo en Agencia Funeraria Naser Aragón",
    },
    {
      id: "tabs-8",
      title: "Embalsamamiento",
      image: "/assets/images/servicio_08.png",
      description:
        "Integer vehicula sapien quis dolor efficitur, eget molestie eros tempus. Curabitur sollicitudin, tortor at suscipit volutpat, nisi arcu aliquet dui, vitae semper sem turpis quis libero. Quisque vulputate lacinia nisl ac lobortis. Ut ultricies maximus turpis, in sollicitudin ligula posuere vel.\n\nDonec finibus maximus neque, vitae egestas quam imperdiet nec. Proin nec mauris eu tortor consectetur tristique. Etiam suscipit ante a odio consequat, in ornare lacus suscipit. Cras ac libero massa. Quisque rhoncus velit feugiat vulputate mollis. Donec nisl eros, malesuada sed nisi id, condimentum condimentum quam.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Heading */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/images/page-heading-bg.jpg)" }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Servicios</h1>
            <span className="text-lg md:text-xl">
              Más de 33 años de experiencia en el ramo funerario
            </span>
          </div>
        </div>
      </div>

      {/* Services Tabs */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => setActiveTab(service.id)}
                      className={`w-full text-left p-3 rounded ${
                        activeTab === service.id
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {service.title}
                      <i className="fa fa-angle-right float-right mt-1"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`${activeTab === service.id ? "block" : "hidden"}`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiciosPage;
