'use client';

import { Activity, Heart, Bone, Zap } from 'lucide-react';

export default function DoencasTratadas() {
  const doencas = [
    {
      nome: 'Artrite Reumatoide',
      descricao: 'Doença inflamatória crônica que afeta as articulações',
      icone: Activity,
    },
    {
      nome: 'Lúpus Eritematoso Sistêmico',
      descricao: 'Doença autoimune que pode afetar múltiplos órgãos',
      icone: Heart,
    },
    {
      nome: 'Fibromialgia',
      descricao: 'Síndrome caracterizada por dor crônica generalizada',
      icone: Zap,
    },
    {
      nome: 'Osteoporose',
      descricao: 'Doença que enfraquece os ossos, aumentando o risco de fraturas',
      icone: Bone,
    },
    {
      nome: 'Artrite Psoriásica',
      descricao: 'Artrite associada à psoríase',
      icone: Activity,
    },
    {
      nome: 'Espondilite Anquilosante',
      descricao: 'Doença inflamatória que afeta a coluna vertebral',
      icone: Bone,
    },
    {
      nome: 'Gota',
      descricao: 'Artrite causada pelo acúmulo de cristais de ácido úrico',
      icone: Zap,
    },
    {
      nome: 'Síndrome de Sjögren',
      descricao: 'Doença autoimune que afeta glândulas produtoras de fluidos',
      icone: Heart,
    },
  ];

  return (
    <section className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Doenças Tratadas
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Especializada no diagnóstico e tratamento de diversas doenças reumáticas e autoimunes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doencas.map((doenca, index) => {
            const IconComponent = doenca.icone;
            return (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <IconComponent className="text-primary-600" size={24} />
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {doenca.nome}
                  </h3>
                </div>
                <p className="text-secondary-600 text-sm">
                  {doenca.descricao}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-primary-50 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-primary-800 mb-3">
              Atendimento Personalizado
            </h3>
            <p className="text-primary-700">
              Cada paciente recebe um tratamento individualizado, considerando suas necessidades 
              específicas e histórico médico. Agende sua consulta para um diagnóstico preciso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
