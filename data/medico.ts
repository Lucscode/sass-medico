import { Medico, HorarioAtendimento } from '@/types';

export const medicoData: Medico = {
  id: '1',
  nome: 'Dr. Carlos Silva',
  especialidade: 'Cardiologia',
  crm: '12345-SP',
  email: 'dr.carlos.silva@email.com',
  telefone: '(11) 99999-9999',
  whatsapp: '(11) 99999-9999',
  endereco: {
    rua: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    latitude: -23.5505,
    longitude: -46.6333,
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
  biografia: 'Médico cardiologista com mais de 15 anos de experiência em diagnóstico e tratamento de doenças cardiovasculares. Especializado em ecocardiografia, eletrocardiografia e tratamento de hipertensão arterial.',
  formacao: [
    'Medicina - Universidade de São Paulo (USP)',
    'Residência em Cardiologia - Hospital das Clínicas',
    'Especialização em Ecocardiografia - Sociedade Brasileira de Cardiologia',
    'Mestrado em Cardiologia - USP',
  ],
  experiencia: [
    'Cardiologista no Hospital das Clínicas (2010-2015)',
    'Médico assistente no Instituto do Coração (2015-2020)',
    'Diretor médico da Clínica CardioVida (2020-presente)',
    'Professor convidado da Faculdade de Medicina da USP',
  ],
  foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
};
