import { Agendamento } from '@/types';

// Chave para localStorage
const STORAGE_KEY = 'sass_medico_agendamentos';

// Salvar agendamento no localStorage
export const saveAgendamento = (agendamento: Agendamento): boolean => {
  try {
    const existingAgendamentos = getAgendamentos();
    const updatedAgendamentos = [...existingAgendamentos, agendamento];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAgendamentos));
    return true;
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error);
    return false;
  }
};

// Buscar todos os agendamentos
export const getAgendamentos = (): Agendamento[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return [];
  }
};

// Buscar agendamento por ID
export const getAgendamentoById = (id: string): Agendamento | null => {
  try {
    const agendamentos = getAgendamentos();
    return agendamentos.find(ag => ag.id === id) || null;
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    return null;
  }
};

// Atualizar status do agendamento
export const updateAgendamentoStatus = (id: string, status: Agendamento['status']): boolean => {
  try {
    const agendamentos = getAgendamentos();
    const updatedAgendamentos = agendamentos.map(ag => 
      ag.id === id ? { ...ag, status } : ag
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAgendamentos));
    return true;
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return false;
  }
};

// Verificar se horário está disponível
export const isHorarioDisponivel = (data: string, horario: string): boolean => {
  try {
    const agendamentos = getAgendamentos();
    const conflictingAgendamento = agendamentos.find(ag => 
      ag.data === data && 
      ag.horario === horario && 
      ag.status !== 'cancelado'
    );
    
    return !conflictingAgendamento;
  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    return false;
  }
};

// Limpar agendamentos antigos (mais de 30 dias)
export const cleanupOldAgendamentos = (): void => {
  try {
    const agendamentos = getAgendamentos();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const filteredAgendamentos = agendamentos.filter(ag => {
      const agendamentoDate = new Date(ag.data);
      return agendamentoDate > thirtyDaysAgo;
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredAgendamentos));
  } catch (error) {
    console.error('Erro ao limpar agendamentos antigos:', error);
  }
};

// Exportar agendamentos (para backup)
export const exportAgendamentos = (): string => {
  try {
    const agendamentos = getAgendamentos();
    return JSON.stringify(agendamentos, null, 2);
  } catch (error) {
    console.error('Erro ao exportar agendamentos:', error);
    return '';
  }
};

// Importar agendamentos (para backup)
export const importAgendamentos = (data: string): boolean => {
  try {
    const agendamentos = JSON.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));
    return true;
  } catch (error) {
    console.error('Erro ao importar agendamentos:', error);
    return false;
  }
};
