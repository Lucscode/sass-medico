'use client';

import { GraduationCap, Briefcase, Award, Heart } from 'lucide-react';
import { medicoData } from '@/data/medico';

export default function Sobre() {
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Sobre a Dra. {medicoData.nome.split(' ')[1]}
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Reumatologista especializada com vasta experiência no diagnóstico e tratamento 
            de doenças reumáticas e autoimunes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Formação */}
          <div className="space-y-8">
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Formação</h3>
              </div>
              <ul className="space-y-3">
                {medicoData.formacao.map((formacao, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-secondary-700">{formacao}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Experiência Profissional</h3>
              </div>
              <ul className="space-y-3">
                {medicoData.experiencia.map((experiencia, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-secondary-700">{experiencia}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Especialidades */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Especialidades</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-800 mb-2">Artrite Reumatoide</h4>
                  <p className="text-sm text-primary-700">
                    Diagnóstico e tratamento de artrite reumatoide
                  </p>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-800 mb-2">Lúpus Eritematoso</h4>
                  <p className="text-sm text-primary-700">
                    Tratamento de doenças autoimunes como lúpus
                  </p>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-800 mb-2">Fibromialgia</h4>
                  <p className="text-sm text-primary-700">
                    Diagnóstico e tratamento da fibromialgia
                  </p>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-800 mb-2">Osteoporose</h4>
                  <p className="text-sm text-primary-700">
                    Prevenção e tratamento da osteoporose
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Certificações</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-secondary-700">Sociedade Brasileira de Reumatologia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-secondary-700">Especialização em Doenças Autoimunes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-secondary-700">Residência em Reumatologia - UNICAMP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
