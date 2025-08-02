/**
 * HeroSlider Component - Cinematic Pixel Perfect
 * Slider principal con efectos cinematográficos
 * Basado exactamente en el diseño original de Grupo Naser
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface SlideContent {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  overlay?: string;
}

const heroSlides: SlideContent[] = [
  {
    id: 1,
    subtitle: "¿EMERGENCIA FUNERARIA?",
    title: "COMUNÍQUESE\nA NUESTRA LÍNEA DE ATENCIÓN",
    description: "Ofrecemos servicios Funerarios con la calidez y calidad que esos momentos difíciles necesitan.",
    buttonText: "LLAMAR",
    buttonLink: "tel:5556887866",
    backgroundImage: "url('/assets/images/slide_01.jpg')",
    overlay: "rgba(82, 64, 48, 0.8)"
  },
  {
    id: 2,
    subtitle: "SERVICIOS DE PREVISIÓN FUNERARIA",
    title: "JUBILADO Y\nPENSIONADO DEL ISSSTE",
    description: "Si es usted Jubilado o Pensionado del Gobierno federal, conozca todos los beneficios que le ofrecemos y proteja a sus seres queridos ante lo inevitable.",
    buttonText: "MAYOR INFORMACIÓN",
    buttonLink: "/prevision",
    backgroundImage: "url('/assets/images/slide_02.jpg')",
    overlay: "rgba(42, 65, 118, 0.8)"
  },
  {
    id: 3,
    subtitle: "SERVICIOS DE PREVISIÓN FUNERARIA",
    title: "TRABAJADORES ACTIVOS\nDEL ISSSTE",
    description: "Proteger a su familia es un acto de responsabilidad y amor, conozca los servicios que le ofrecemos.",
    buttonText: "MAYOR INFORMACIÓN",
    buttonLink: "/prevision",
    backgroundImage: "url('/assets/images/slide_03.jpg')",
    overlay: "rgba(30, 43, 77, 0.8)"
  },
  {
    id: 4,
    subtitle: "Nuestra cobertura",
    title: "SERVICIO EN TODA\nLA REPÚBLICA MEXICANA",
    description: "Gracias a nuestra red funeraria planificada estratégicamente podemos ofrecer nuestro servicio a nivel Nacional.",
    buttonText: "SABER MÁS",
    buttonLink: "/cobertura",
    backgroundImage: "url('/assets/images/slide_04.jpg')",
    overlay: "rgba(139, 105, 20, 0.8)"
  },
  {
    id: 5,
    subtitle: "CONDOLENCIA DIGITAL",
    title: "RECUERDOS QUE\nHONRARÁN SU MEMORIA",
    description: "Exprese con palabras o fotografías todo tu sentir en una emotiva despedida.",
    buttonText: "SABER MÁS",
    buttonLink: "/servicios",
    backgroundImage: "url('/assets/images/slide_05.jpg')",
    overlay: "rgba(200, 169, 126, 0.8)"
  },
  {
    id: 6,
    subtitle: "CONTRATO DIGITAL",
    title: "COMPROMETIDOS CON\nEL MEDIO AMBIENTE",
    description: "Si no cuenta con su contrato digital solicítelo.",
    buttonText: "CONTRATO DIGITAL",
    buttonLink: "/contacto",
    backgroundImage: "url('/assets/images/slide_06.jpg')",
    overlay: "rgba(46, 125, 50, 0.8)"
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentSlide, isTransitioning]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, isPlaying]);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="banner"
      aria-label="Hero slider"
      style={{
        position: 'relative',
        height: '95vh',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: currentSlideData.backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transition: 'all 1s ease-in-out'
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentSlideData.overlay || 'rgba(82, 64, 48, 0.8)'
          }}
        />
      </div>

      {/* Content Container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'left',
          width: '75%',
          maxWidth: '1200px',
          zIndex: 2
        }}
      >
        <div 
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(30px)' : 'translateY(0)',
            transition: 'all 0.6s ease-in-out'
          }}
        >
          <h6 
            style={{
              marginBottom: '15px',
              fontSize: '25px',
              textTransform: 'uppercase',
              fontWeight: '700',
              letterSpacing: '1px',
              color: '#cfbfaa',
              fontFamily: 'Poppins, sans-serif',
              animation: isTransitioning ? 'none' : 'fadeInDown 1s both 1s'
            }}
          >
            {currentSlideData.subtitle}
          </h6>
          
          <h1 
            style={{
              marginBottom: '30px',
              textTransform: 'uppercase',
              fontSize: '40px',
              fontWeight: '700',
              letterSpacing: '2.5px',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '1.2',
              animation: isTransitioning ? 'none' : 'fadeInLeft 1s both 1.5s'
            }}
          >
            {currentSlideData.title.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < currentSlideData.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          
          <p 
            style={{
              maxWidth: '570px',
              color: '#fff',
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '30px',
              marginBottom: '40px',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {currentSlideData.description}
          </p>
          
          {currentSlideData.buttonLink.startsWith('tel:') ? (
            <a 
              href={currentSlideData.buttonLink}
              aria-label={`${currentSlideData.buttonText} - Teléfono`}
              style={{
                backgroundColor: '#524030',
                color: '#fff',
                fontSize: '15px',
                textTransform: 'uppercase',
                fontWeight: '700',
                padding: '12px 30px',
                borderRadius: '30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'Poppins, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#cfbfaa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#524030';
                e.currentTarget.style.color = '#fff';
              }}
            >
              <i className="fas fa-phone" aria-hidden="true"></i>
              {currentSlideData.buttonText}
            </a>
          ) : (
            <Link 
              to={currentSlideData.buttonLink}
              aria-label={currentSlideData.buttonText}
              style={{
                backgroundColor: '#524030',
                color: '#fff',
                fontSize: '15px',
                textTransform: 'uppercase',
                fontWeight: '700',
                padding: '12px 30px',
                borderRadius: '30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'Poppins, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#cfbfaa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#524030';
                e.currentTarget.style.color = '#fff';
              }}
            >
              {currentSlideData.buttonText}
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Slide anterior"
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          top: '50%',
          left: '30px',
          transform: 'translateY(-50%)',
          border: 'none',
          background: 'transparent',
          fontSize: '50px',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 3,
          opacity: isTransitioning ? 0.5 : 1,
          transition: 'opacity 0.3s ease',
          fontFamily: 'FontAwesome'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        <i className="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
      
      <button
        onClick={nextSlide}
        aria-label="Siguiente slide"
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          top: '50%',
          right: '30px',
          transform: 'translateY(-50%)',
          border: 'none',
          background: 'transparent',
          fontSize: '50px',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 3,
          opacity: isTransitioning ? 0.5 : 1,
          transition: 'opacity 0.3s ease',
          fontFamily: 'FontAwesome'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        <i className="fas fa-chevron-right" aria-hidden="true"></i>
      </button>

      {/* Dots Navigation */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 3
        }}
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
            disabled={isTransitioning}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: '2px solid #fff',
              background: index === currentSlide ? '#cfbfaa' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: isTransitioning ? 0.5 : 1
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'rgba(255, 255, 255, 0.3)',
          zIndex: 3
        }}
      >
        <div 
          style={{
            height: '100%',
            background: '#cfbfaa',
            width: '0%',
            animation: isPlaying ? 'progressAnimation 5s linear infinite' : 'none',
            animationPlayState: isPlaying ? 'running' : 'paused'
          }}
        />
      </div>

      {/* Add keyframes via style tag for animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes progressAnimation {
          from { width: 0%; }
          to { width: 100%; }
        }

        @media (max-width: 768px) {
          .hero-subtitle {
            font-size: 18px !important;
            margin-bottom: 15px !important;
          }
          .hero-title {
            font-size: 28px !important;
            line-height: 36px !important;
            letter-spacing: 1px !important;
            margin-bottom: 25px !important;
          }
          .hero-description {
            line-height: 25px !important;
            margin-bottom: 30px !important;
          }
          .hero-nav-arrow {
            left: 5px !important;
            right: 5px !important;
          }
        }
      `}</style>
    </section>
  );
};