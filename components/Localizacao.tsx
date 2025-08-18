'use client';

import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { medicoData } from '@/data/medico';

export default function Localizacao() {
  const enderecoCompleto = `${medicoData.endereco.rua}, ${medicoData.endereco.numero}, ${medicoData.endereco.bairro}, ${medicoData.endereco.cidade} - ${medicoData.endereco.estado}, CEP: ${medicoData.endereco.cep}`;

  return (
    <section id="localizacao" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Localização
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Encontre nossa clínica com facilidade. Estamos localizados em uma região de fácil acesso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div className="space-y-8">
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Endereço</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                {enderecoCompleto}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Horário de Funcionamento</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Segunda a Sexta</span>
                  <span className="font-medium text-secondary-900">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Sábado</span>
                  <span className="font-medium text-secondary-900">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Domingo</span>
                  <span className="font-medium text-red-600">Fechado</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Contato</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary-600" size={20} />
                  <div>
                    <p className="font-medium text-secondary-900">Telefone</p>
                    <p className="text-secondary-700">{medicoData.telefone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary-600" size={20} />
                  <div>
                    <p className="font-medium text-secondary-900">E-mail</p>
                    <p className="text-secondary-700">{medicoData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Navigation className="text-primary-600" size={20} />
                  <div>
                    <p className="font-medium text-secondary-900">WhatsApp</p>
                    <p className="text-secondary-700">{medicoData.whatsapp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão de Navegação */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Como Chegar
              </h3>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Navigation size={20} />
                  <span>Navegar no Google Maps</span>
                </button>
                <p className="text-sm text-secondary-600 text-center">
                  Clique para abrir a navegação no seu dispositivo
                </p>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="card p-0 overflow-hidden">
            <div className="h-96 bg-secondary-200 relative">
              {/* Placeholder do Mapa - Em produção, integrar com Google Maps ou Leaflet */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-primary-600 mx-auto mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    Localização da Clínica
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {medicoData.endereco.cidade} - {medicoData.endereco.estado}
                  </p>
                  <div className="bg-primary-600 text-white px-4 py-2 rounded-lg inline-block">
                    Coordenadas: {medicoData.endereco.latitude}, {medicoData.endereco.longitude}
                  </div>
                </div>
              </div>
              
              {/* Overlay com informações */}
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-secondary-900">Clínica Aberta</p>
                    <p className="text-sm text-secondary-600">Horário de funcionamento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">Sensi Saúde</div>
            <p className="text-secondary-700">Clínica especializada em Campinas</p>
          </div>
          
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">1º Andar</div>
            <p className="text-secondary-700">Consultório de fácil acesso</p>
          </div>
          
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">Vila Bella</div>
            <p className="text-secondary-700">Bairro residencial tranquilo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
