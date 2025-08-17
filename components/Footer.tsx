'use client';

import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';
import { medicoData } from '@/data/medico';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Informações do Médico */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              Dr. {medicoData.nome}
            </h3>
            <p className="text-secondary-300 mb-4">
              {medicoData.especialidade} - CRM: {medicoData.crm}
            </p>
            <p className="text-secondary-300 leading-relaxed">
              {medicoData.biografia}
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="text-primary-400" size={20} />
                <span className="text-secondary-300">{medicoData.telefone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-400" size={20} />
                <span className="text-secondary-300">{medicoData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary-400" size={20} />
                <span className="text-secondary-300">
                  {medicoData.endereco.cidade} - {medicoData.endereco.estado}
                </span>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horários</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-300">Segunda a Sexta</span>
                <span className="text-white">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-300">Sábado</span>
                <span className="text-white">08:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-300">Domingo</span>
                <span className="text-red-400">Fechado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="mt-8 pt-8 border-t border-secondary-700">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-3">Links Rápidos</h5>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      const element = document.getElementById('sobre');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    Sobre
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const element = document.getElementById('horarios');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    Horários
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const element = document.getElementById('localizacao');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    Localização
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const element = document.getElementById('agendamento');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    Agendar Consulta
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Especialidades</h5>
              <ul className="space-y-2">
                <li className="text-secondary-300">Ecocardiografia</li>
                <li className="text-secondary-300">Eletrocardiografia</li>
                <li className="text-secondary-300">Hipertensão Arterial</li>
                <li className="text-secondary-300">Doenças Cardiovasculares</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Convênios</h5>
              <ul className="space-y-2">
                <li className="text-secondary-300">Unimed</li>
                <li className="text-secondary-300">Amil</li>
                <li className="text-secondary-300">SulAmérica</li>
                <li className="text-secondary-300">Particular</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Informações</h5>
              <ul className="space-y-2">
                <li className="text-secondary-300">Política de Privacidade</li>
                <li className="text-secondary-300">Termos de Uso</li>
                <li className="text-secondary-300">Cancelamento</li>
                <li className="text-secondary-300">FAQ</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="text-red-500" size={16} />
            <span className="text-secondary-300">
              Feito com carinho para cuidar da sua saúde
            </span>
          </div>
          <p className="text-secondary-400 text-sm">
            © 2024 Dr. {medicoData.nome.split(' ')[1]}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
