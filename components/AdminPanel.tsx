'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { getAgendamentos, updateAgendamentoStatus, exportAgendamentos } from '@/lib/storage';
import { Agendamento } from '@/types';

export default function AdminPanel() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [filter, setFilter] = useState<'todos' | 'pendente' | 'confirmado' | 'cancelado'>('todos');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAgendamentos();
  }, []);

  const loadAgendamentos = () => {
    const allAgendamentos = getAgendamentos();
    setAgendamentos(allAgendamentos);
  };

  const filteredAgendamentos = agendamentos.filter(ag => {
    if (filter === 'todos') return true;
    return ag.status === filter;
  });

  const handleStatusUpdate = async (id: string, newStatus: Agendamento['status']) => {
    setLoading(true);
    try {
      const success = updateAgendamentoStatus(id, newStatus);
      if (success) {
        loadAgendamentos();
        toast.success(`Status atualizado para ${newStatus}`);
      } else {
        toast.error('Erro ao atualizar status');
      }
    } catch (error) {
      toast.error('Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const data = exportAgendamentos();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agendamentos-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Agendamentos exportados com sucesso!');
  };

  const getStatusColor = (status: Agendamento['status']) => {
    switch (status) {
      case 'pendente': return 'text-yellow-600 bg-yellow-100';
      case 'confirmado': return 'text-green-600 bg-green-100';
      case 'cancelado': return 'text-red-600 bg-red-100';
      case 'reagendado': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: Agendamento['status']) => {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'confirmado': return 'Confirmado';
      case 'cancelado': return 'Cancelado';
      case 'reagendado': return 'Reagendado';
      default: return status;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">
          Painel Administrativo
        </h1>
        <p className="text-secondary-600">
          Gerencie os agendamentos dos pacientes
        </p>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('todos')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'todos' 
                ? 'bg-primary-600 text-white' 
                : 'bg-secondary-200 text-secondary-700 hover:bg-secondary-300'
            }`}
          >
            Todos ({agendamentos.length})
          </button>
          <button
            onClick={() => setFilter('pendente')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'pendente' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            Pendentes ({agendamentos.filter(ag => ag.status === 'pendente').length})
          </button>
          <button
            onClick={() => setFilter('confirmado')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'confirmado' 
                ? 'bg-green-600 text-white' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Confirmados ({agendamentos.filter(ag => ag.status === 'confirmado').length})
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadAgendamentos}
            disabled={loading}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Atualizar
          </button>
          <button
            onClick={handleExport}
            className="btn-primary"
          >
            Exportar Dados
          </button>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="space-y-4">
        {filteredAgendamentos.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-secondary-400" size={48} />
            <h3 className="text-lg font-medium text-secondary-900 mt-4">
              Nenhum agendamento encontrado
            </h3>
            <p className="text-secondary-600">
              {filter === 'todos' 
                ? 'Ainda não há agendamentos registrados.' 
                : `Não há agendamentos com status "${getStatusText(filter)}".`
              }
            </p>
          </div>
        ) : (
          filteredAgendamentos.map((agendamento) => (
            <div key={agendamento.id} className="card">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Informações do Paciente */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {agendamento.paciente.nome} {agendamento.paciente.sobrenome}
                      </h3>
                      <p className="text-secondary-600">
                        {format(new Date(agendamento.data), 'dd/MM/yyyy', { locale: ptBR })} às {agendamento.horario}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agendamento.status)}`}>
                      {getStatusText(agendamento.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="text-secondary-400" size={16} />
                      <span className="text-secondary-700">{agendamento.paciente.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="text-secondary-400" size={16} />
                      <span className="text-secondary-700">{agendamento.paciente.whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="text-secondary-400" size={16} />
                      <span className="text-secondary-700">
                        {agendamento.paciente.particular ? 'Particular' : agendamento.paciente.convenio}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-secondary-400" size={16} />
                      <span className="text-secondary-700">
                        ID: {agendamento.id}
                      </span>
                    </div>
                  </div>

                  {agendamento.observacoes && (
                    <div className="bg-secondary-50 p-3 rounded-lg">
                      <p className="text-sm text-secondary-700">
                        <strong>Observações:</strong> {agendamento.observacoes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-start">
                  {agendamento.status === 'pendente' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(agendamento.id, 'confirmado')}
                        disabled={loading}
                        className="btn-primary flex items-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Confirmar
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(agendamento.id, 'cancelado')}
                        disabled={loading}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <XCircle size={16} />
                        Cancelar
                      </button>
                    </>
                  )}
                  
                  {agendamento.status === 'confirmado' && (
                    <button
                      onClick={() => handleStatusUpdate(agendamento.id, 'cancelado')}
                      disabled={loading}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      Cancelar
                    </button>
                  )}

                  {agendamento.status === 'cancelado' && (
                    <button
                      onClick={() => handleStatusUpdate(agendamento.id, 'pendente')}
                      disabled={loading}
                      className="btn-primary flex items-center gap-2"
                    >
                      <RefreshCw size={16} />
                      Reativar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
