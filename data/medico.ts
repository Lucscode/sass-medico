import { Medico, HorarioAtendimento } from '@/types';

export const medicoData: Medico = {
  id: '1',
  nome: 'Dra. Karla Toledo Martins',
  especialidade: 'Reumatologia',
  crm: 'CRM SP 76610',
  rqe: 'RQE Nº: 97985',
  email: 'karla.toledo.martins@email.com',
  telefone: '(19) 99999-9999',
  whatsapp: '(19) 99999-9999',
  endereco: {
    rua: 'Rua Paulo Cézar Fidélis',
    numero: '39',
    bairro: 'Loteamento Residencial Vila Bella',
    cidade: 'Campinas',
    estado: 'SP',
    cep: '13087-000',
    latitude: -22.9064,
    longitude: -47.0616,
  },
  horarios: [
    {
      id: '1',
      diaSemana: 1, // Segunda
      horaInicio: '08:00',
      horaFim: '12:00',
      ativo: true,
    },
    {
      id: '2',
      diaSemana: 1, // Segunda
      horaInicio: '14:00',
      horaFim: '18:00',
      ativo: true,
    },
    {
      id: '3',
      diaSemana: 2, // Terça
      horaInicio: '08:00',
      horaFim: '12:00',
      ativo: true,
    },
    {
      id: '4',
      diaSemana: 2, // Terça
      horaInicio: '14:00',
      horaFim: '18:00',
      ativo: true,
    },
    {
      id: '5',
      diaSemana: 3, // Quarta
      horaInicio: '08:00',
      horaFim: '12:00',
      ativo: true,
    },
    {
      id: '6',
      diaSemana: 3, // Quarta
      horaInicio: '14:00',
      horaFim: '18:00',
      ativo: true,
    },
    {
      id: '7',
      diaSemana: 4, // Quinta
      horaInicio: '08:00',
      horaFim: '12:00',
      ativo: true,
    },
    {
      id: '8',
      diaSemana: 4, // Quinta
      horaInicio: '14:00',
      horaFim: '18:00',
      ativo: true,
    },
    {
      id: '9',
      diaSemana: 5, // Sexta
      horaInicio: '08:00',
      horaFim: '12:00',
      ativo: true,
    },
    {
      id: '10',
      diaSemana: 5, // Sexta
      horaInicio: '14:00',
      horaFim: '18:00',
      ativo: true,
    },
  ],
  biografia: 'Médica especialista em Reumatologia com vasta experiência no diagnóstico e tratamento de doenças reumáticas. Atende adultos com foco em artrites, doenças autoimunes e dores articulares.',
  formacao: [
    'Medicina - Universidade de Campinas (UNICAMP)',
    'Residência em Reumatologia - Hospital das Clínicas UNICAMP',
    'Especialização em Doenças Autoimunes',
    'Membro da Sociedade Brasileira de Reumatologia',
  ],
  experiencia: [
    'Reumatologista na Sensi Saúde - Campinas',
    'Médica assistente no Hospital das Clínicas UNICAMP',
    'Especialista em doenças reumáticas e autoimunes',
    'Experiência em artrite reumatoide, lúpus e fibromialgia',
  ],
  foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
};
