'use client';

import { Clock, Calendar } from 'lucide-react';
import { medicoData } from '@/data/medico';

const diasSemana = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

export default function Horarios() {
  const horariosPorDia = medicoData.horarios.reduce((acc, horario) => {
    const dia = diasSemana[horario.diaSemana];
    if (!acc[dia]) {
      acc[dia] = [];
    }
    acc[dia].push(horario);
    return acc;
  }, {} as Record<string, typeof medicoData.horarios>);

  return (
    <section id="horarios" className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Horários de Atendimento
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Confira os horários disponíveis para agendamento de consultas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(horariosPorDia).map(([dia, horarios]) => (
            <div key={dia} className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">{dia}</h3>
              </div>
              
              <div className="space-y-3">
                {horarios.map((horario) => (
                  <div key={horario.id} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="text-primary-600" size={16} />
                      <span className="text-secondary-700 font-medium">
                        {horario.horaInicio} - {horario.horaFim}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">Disponível</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">30 min</div>
            <p className="text-secondary-700">Duração da Consulta</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">5 dias</div>
            <p className="text-secondary-700">Antecedência Mínima</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">24h</div>
            <p className="text-secondary-700">Cancelamento Gratuito</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const element = document.getElementById('agendamento');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 mx-auto"
          >
            <Calendar size={20} />
            <span>Agendar Consulta</span>
          </button>
        </div>
      </div>
    </section>
  );
}
