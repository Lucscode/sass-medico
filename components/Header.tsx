'use client';

import { useState } from 'react';
import { Menu, X, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { medicoData } from '@/data/medico';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                Dra. {medicoData.nome.split(' ')[1]}
              </h1>
              <p className="text-sm text-secondary-600">{medicoData.especialidade}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('horarios')}
              className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Horários
            </button>
            <button
              onClick={() => scrollToSection('localizacao')}
              className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Localização
            </button>
            <button
              onClick={() => scrollToSection('agendamento')}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Agendar Consulta
            </button>
            <a
              href="/admin"
              className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Admin
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('horarios')}
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
              >
                Horários
              </button>
              <button
                onClick={() => scrollToSection('localizacao')}
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
              >
                Localização
              </button>
              <button
                onClick={() => scrollToSection('agendamento')}
                className="bg-primary-600 text-white block w-full text-left px-3 py-2 rounded-lg text-base font-medium hover:bg-primary-700"
              >
                Agendar Consulta
              </button>
              <a
                href="/admin"
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
              >
                Admin
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
