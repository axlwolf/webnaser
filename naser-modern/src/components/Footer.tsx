"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="text-xl font-bold mb-4">UBICACIÓN</h4>
              <p>Av. División del Norte #2566, Col. San Diego Churubusco C.P. 04120, Coyoacán, CDMX.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">GRUPO NASER</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-blue-400">Inicio</Link></li>
                <li><Link href="/necesidad-inmediata" className="hover:text-blue-400">Necesidad Inmediata</Link></li>
                <li><Link href="/prevision" className="hover:text-blue-400">Planes de Previsión</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Red Funeraria</Link></li>
                <li><Link href="/obituario" className="hover:text-blue-400">Obituario</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Apoyo emocional</Link></li>
                <li><Link href="/contacto" className="hover:text-blue-400">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">CONTACTO</h4>
              <ul className="space-y-2">
                <li><a href="mailto:gruponaser@naser.com" className="flex items-center space-x-2 hover:text-blue-400"><i className="fa fa-envelope"></i><span>info@naser.com.mx</span></a></li>
                <li><a href="tel:5556887866" className="flex items-center space-x-2 hover:text-blue-400"><i className="fa fa-phone"></i><span>55 5688 7866</span></a></li>
                <li><a href="https://api.whatsapp.com/send?phone=525517919823" className="flex items-center space-x-2 hover:text-blue-400"><i className="fa fa-whatsapp"></i><span>55 5688 7866</span></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">CONOZCANOS</h4>
              <p className="mb-4">Comuníquese con nosotros para conocer mayor información de nuestros servicios.</p>
              <div className="flex space-x-4">
                <a href="https://fb.com/templatemo" target="_blank" rel="nofollow" className="hover:text-blue-400"><i className="fa fa-facebook"></i></a>
                <a href="#" className="hover:text-blue-400"><i className="fa fa-instagram"></i></a>
                <a href="#" className="hover:text-blue-400"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sub-footer */}
      <div className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>Copyright &copy; Grupo Naser Corporativo - 2023</p>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        className="fixed bottom-6 right-6"
        target="_blank"
        href="https://api.whatsapp.com/send?phone=525517919823&text=Hola,%20necesito%20información"
      >
        <img src="/assets/images/whatsapp.png" alt="Whatsapp" className="w-12 h-12" />
      </a>
    </>
  );
};

export default Footer;
