
import React, { useState, useEffect } from 'react';
import InteractiveManual from './components/InteractiveManual';
import Chatbot from './components/Chatbot';
import { createChatSession } from './services/geminiService';
import { Chat } from '@google/genai';

const Header: React.FC = () => (
  <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-40">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-brand-primary">
        Inclusión Laboral Activa
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#home" className="text-gray-600 hover:text-brand-primary">Inicio</a>
        <a href="#manual" className="text-gray-600 hover:text-brand-primary">Manual</a>
        <a href="#testimonios" className="text-gray-600 hover:text-brand-primary">Testimonios</a>
        <a href="#contacto" className="text-gray-600 hover:text-brand-primary">Contacto</a>
      </nav>
    </div>
  </header>
);

const Hero: React.FC = () => (
  <section id="home" className="bg-brand-light pt-32 pb-20">
    <div className="container mx-auto px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-brand-dark mb-4">
          Inclusión Laboral Activa: Creando un Futuro sin Barreras
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Promovemos la inclusión laboral de personas con discapacidad a través de la educación, la sensibilización y el empoderamiento.
        </p>
        <a href="#manual" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-primary/90 transition-transform transform hover:scale-105 inline-block">
          Explorar el Manual
        </a>
      </div>
      <div className="mt-12">
        <img src="https://picsum.photos/1200/500" alt="Equipo de trabajo diverso y colaborativo" className="rounded-xl shadow-2xl mx-auto" />
      </div>
    </div>
  </section>
);

const Testimonials: React.FC = () => (
  <section id="testimonios" className="py-20 bg-brand-light">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-brand-dark mb-12">Historias de Éxito</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic">"Esta plataforma cambió nuestra perspectiva sobre el reclutamiento. Ahora tenemos un equipo más fuerte y diverso."</p>
          <p className="text-right font-bold text-brand-secondary mt-4">- CEO, Empresa Tecnológica</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic">"Los ajustes razonables que implementamos gracias al manual han mejorado la productividad y el bienestar de todo el equipo."</p>
          <p className="text-right font-bold text-brand-secondary mt-4">- Gerente de RRHH</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic">"Encontrar una empresa que valora mi talento por encima de mi discapacidad ha sido una experiencia transformadora."</p>
          <p className="text-right font-bold text-brand-secondary mt-4">- Empleado</p>
        </div>
      </div>
    </div>
  </section>
);


const Footer: React.FC = () => (
  <footer id="contacto" className="bg-brand-dark text-white py-12">
    <div className="container mx-auto px-6 text-center">
      <p className="font-bold text-lg">Inclusión Laboral Activa</p>
      <p className="mt-2">Promoviendo puentes de talento para un futuro sin barreras.</p>
      <div className="mt-4 flex justify-center space-x-6">
        <a href="#" className="hover:text-brand-accent">Twitter</a>
        <a href="#" className="hover:text-brand-accent">LinkedIn</a>
        <a href="#" className="hover:text-brand-accent">Facebook</a>
      </div>
      <p className="mt-6 text-sm text-gray-400">&copy; {new Date().getFullYear()} Inclusión Laboral Activa. Todos los derechos reservados.</p>
    </div>
  </footer>
);


const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    // Initialize the chat session once
    const session = createChatSession();
    if (session) {
      setChat(session);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

  }, []);

  return (
    <div className="bg-brand-light text-brand-dark font-sans">
      <Header />
      <main>
        <Hero />
        <InteractiveManual />
        <Testimonials />
      </main>
      <Footer />
      <Chatbot chatInstance={chat} />
    </div>
  );
};

export default App;
