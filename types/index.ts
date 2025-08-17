export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;
  whatsapp: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    latitude: number;
    longitude: number;
  };
  horarios: HorarioAtendimento[];
  biografia: string;
  formacao: string[];
  experiencia: string[];
  foto: string;
}

export interface HorarioAtendimento {
  id: string;
  diaSemana: number; // 0 = Domingo, 1 = Segunda, etc.
  horaInicio: string;
  horaFim: string;
  ativo: boolean;
}

export interface Agendamento {
  id: string;
  medicoId: string;
  paciente: {
    nome: string;
    sobrenome: string;
    email: string;
    whatsapp: string;
    convenio?: string;
    particular: boolean;
  };
  data: string;
  horario: string;
  status: 'pendente' | 'confirmado' | 'cancelado' | 'reagendado';
  observacoes?: string;
  createdAt: string;
}

export interface Convenio {
  id: string;
  nome: string;
  ativo: boolean;
}

export interface HorarioDisponivel {
  data: string;
  horarios: string[];
}
