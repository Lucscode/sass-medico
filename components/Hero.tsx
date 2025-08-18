'use client';

import { Calendar, MapPin, Phone, Mail, Clock, Award } from 'lucide-react';
import { medicoData } from '@/data/medico';

export default function Hero() {
  return (
    <section className="pt-20 pb-12 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Informações do Médico */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900">
                {medicoData.nome}
              </h1>
              <p className="text-xl text-primary-600 font-semibold">
                {medicoData.especialidade}
              </p>
              <p className="text-secondary-600 text-lg">
                {medicoData.crm} • {medicoData.rqe}
              </p>
            </div>

            <p className="text-secondary-700 text-lg leading-relaxed">
              {medicoData.biografia}
            </p>

            {/* Informações de Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="text-primary-600" size={20} />
                <span className="text-secondary-700">{medicoData.telefone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-600" size={20} />
                <span className="text-secondary-700">{medicoData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary-600" size={20} />
                <span className="text-secondary-700">
                  {medicoData.endereco.cidade} - {medicoData.endereco.estado}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-primary-600" size={20} />
                <span className="text-secondary-700">Segunda a Sexta</span>
              </div>
            </div>

            {/* Botão de Agendamento */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const element = document.getElementById('agendamento');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-lg px-8 py-3 flex items-center space-x-2"
              >
                <Calendar size={20} />
                <span>Agendar Consulta</span>
              </button>
            </div>
          </div>

          {/* Foto do Médico */}
          <div className="relative">
            <div className="relative">
                             <img
                 src={medicoData.foto}
                 alt={medicoData.nome}
                 className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                 onError={(e) => {
                   // Fallback para uma imagem padrão se a foto não carregar
                   e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face';
                 }}
               />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Badge de Especialização */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <Award className="text-primary-600" size={24} />
                <div>
                  <p className="font-semibold text-secondary-900">Reumatologista</p>
                  <p className="text-sm text-secondary-600">Especialista em doenças reumáticas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
