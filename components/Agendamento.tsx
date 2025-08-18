'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, User, Mail, Phone, CreditCard, CheckCircle } from 'lucide-react';
import { format, addDays, startOfDay, isAfter, isBefore, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { medicoData } from '@/data/medico';
import { conveniosData } from '@/data/convenios';
import { Agendamento as AgendamentoType } from '@/types';
import { saveAgendamento, isHorarioDisponivel } from '@/lib/storage';
import { sendEmailNotification, sendPatientConfirmation, sendWhatsAppNotification } from '@/lib/notifications';

interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  whatsapp: string;
  convenio: string;
  particular: boolean;
  observacoes?: string;
}

export default function Agendamento() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'calendar' | 'form' | 'confirmation'>('calendar');
  const [agendamento, setAgendamento] = useState<AgendamentoType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();

  const watchParticular = watch('particular');

  // Gerar próximos 30 dias disponíveis
  const generateAvailableDates = () => {
    const dates = [];
    const today = startOfDay(new Date());
    
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      
      // Verificar se o médico atende neste dia da semana
      const hasHorarios = medicoData.horarios.some(h => h.diaSemana === dayOfWeek && h.ativo);
      
      if (hasHorarios && isAfter(date, today)) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Gerar horários disponíveis para a data selecionada
  const generateAvailableTimes = (date: Date) => {
    const dayOfWeek = date.getDay();
    const horarios = medicoData.horarios.filter(h => h.diaSemana === dayOfWeek && h.ativo);
    
    const times: string[] = [];
    horarios.forEach(horario => {
      let currentTime = new Date(`2000-01-01T${horario.horaInicio}`);
      const endTime = new Date(`2000-01-01T${horario.horaFim}`);
      
      while (currentTime < endTime) {
        times.push(format(currentTime, 'HH:mm'));
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Intervalos de 30 min
      }
    });
    
    return times;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setStep('calendar');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Por favor, selecione uma data e horário');
      return;
    }

    const dataFormatada = format(selectedDate, 'yyyy-MM-dd');
    
    // Verificar se o horário ainda está disponível
    if (!isHorarioDisponivel(dataFormatada, selectedTime)) {
      toast.error('Este horário não está mais disponível. Por favor, escolha outro.');
      return;
    }

    const novoAgendamento: AgendamentoType = {
      id: Date.now().toString(),
      medicoId: medicoData.id,
      paciente: {
        nome: data.nome,
        sobrenome: data.sobrenome,
        email: data.email,
        whatsapp: data.whatsapp,
        convenio: data.particular ? undefined : data.convenio,
        particular: data.particular,
      },
      data: dataFormatada,
      horario: selectedTime,
      status: 'pendente',
      observacoes: data.observacoes,
      createdAt: new Date().toISOString(),
    };

    try {
      // Salvar agendamento
      const saved = saveAgendamento(novoAgendamento);
      if (!saved) {
        toast.error('Erro ao salvar agendamento. Tente novamente.');
        return;
      }

      // Enviar notificações
      const loadingToast = toast.loading('Enviando notificações...');
      
      const [emailResult, patientEmailResult, whatsappResult] = await Promise.allSettled([
        sendEmailNotification(novoAgendamento),
        sendPatientConfirmation(novoAgendamento),
        sendWhatsAppNotification(novoAgendamento)
      ]);

      toast.dismiss(loadingToast);

      // Verificar resultados
      const notifications = [];
      if (emailResult.status === 'fulfilled' && emailResult.value.success) {
        notifications.push('Email para médico');
      }
      if (patientEmailResult.status === 'fulfilled' && patientEmailResult.value.success) {
        notifications.push('Email para paciente');
      }
      if (whatsappResult.status === 'fulfilled' && whatsappResult.value.success) {
        notifications.push('WhatsApp');
      }

      if (notifications.length > 0) {
        toast.success(`Agendamento realizado! Notificações enviadas: ${notifications.join(', ')}`);
      } else {
        toast.success('Agendamento realizado! (Notificações em processamento)');
      }

      setAgendamento(novoAgendamento);
      setStep('confirmation');

    } catch (error) {
      console.error('Erro ao processar agendamento:', error);
      toast.error('Erro ao processar agendamento. Tente novamente.');
    }
  };

  return (
    <section id="agendamento" className="py-16 bg-secondary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Agendar Consulta
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Escolha uma data e horário disponível para sua consulta
          </p>
        </div>

        <div className="card">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step === 'calendar' ? 'text-primary-600' : 'text-secondary-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'calendar' ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
                  1
                </div>
                <span className="text-sm font-medium">Data e Horário</span>
              </div>
              <div className="w-8 h-1 bg-secondary-200"></div>
              <div className={`flex items-center space-x-2 ${step === 'form' ? 'text-primary-600' : 'text-secondary-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'form' ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
                  2
                </div>
                <span className="text-sm font-medium">Dados</span>
              </div>
              <div className="w-8 h-1 bg-secondary-200"></div>
              <div className={`flex items-center space-x-2 ${step === 'confirmation' ? 'text-primary-600' : 'text-secondary-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
                  3
                </div>
                <span className="text-sm font-medium">Confirmação</span>
              </div>
            </div>
          </div>

          {/* Step 1: Calendar */}
          {step === 'calendar' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Selecione uma Data
                </h3>
                <p className="text-secondary-600">
                  Escolha uma data disponível para sua consulta
                </p>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-secondary-600 py-2">
                    {day}
                  </div>
                ))}
                
                {availableDates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedDate && isSameDay(date, selectedDate)
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                  >
                    {format(date, 'd')}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">
                    Horários Disponíveis - {format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })}
                  </h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {generateAvailableTimes(selectedDate).map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Form */}
          {step === 'form' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Dados do Paciente
                </h3>
                <p className="text-secondary-600">
                  Preencha seus dados para confirmar o agendamento
                </p>
                <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                  <p className="text-primary-800 font-medium">
                    {format(selectedDate!, 'dd/MM/yyyy', { locale: ptBR })} às {selectedTime}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      {...register('nome', { required: 'Nome é obrigatório' })}
                      className="input-field"
                      placeholder="Seu nome"
                    />
                    {errors.nome && (
                      <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Sobrenome *
                    </label>
                    <input
                      type="text"
                      {...register('sobrenome', { required: 'Sobrenome é obrigatório' })}
                      className="input-field"
                      placeholder="Seu sobrenome"
                    />
                    {errors.sobrenome && (
                      <p className="text-red-600 text-sm mt-1">{errors.sobrenome.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'E-mail é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'E-mail inválido'
                        }
                      })}
                      className="input-field"
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      {...register('whatsapp', { required: 'WhatsApp é obrigatório' })}
                      className="input-field"
                      placeholder="(11) 99999-9999"
                    />
                    {errors.whatsapp && (
                      <p className="text-red-600 text-sm mt-1">{errors.whatsapp.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Convênio
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        {...register('particular')}
                        value="true"
                        className="text-primary-600"
                      />
                      <span className="text-secondary-700">Atendimento Particular</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        {...register('particular')}
                        value="false"
                        className="text-primary-600"
                      />
                      <span className="text-secondary-700">Convênio</span>
                    </label>
                  </div>
                </div>

                {!watchParticular && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Selecione o Convênio *
                    </label>
                    <select
                      {...register('convenio', { 
                        required: !watchParticular ? 'Convênio é obrigatório' : false 
                      })}
                      className="input-field"
                    >
                      <option value="">Selecione um convênio</option>
                      {conveniosData.filter(c => c.nome !== 'Particular').map((convenio) => (
                        <option key={convenio.id} value={convenio.nome}>
                          {convenio.nome}
                        </option>
                      ))}
                    </select>
                    {errors.convenio && (
                      <p className="text-red-600 text-sm mt-1">{errors.convenio.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    {...register('observacoes')}
                    className="input-field"
                    rows={3}
                    placeholder="Alguma observação sobre sua consulta..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep('calendar')}
                    className="btn-secondary"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Confirmar Agendamento
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && agendamento && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="text-green-600" size={64} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  Agendamento Confirmado!
                </h3>
                <p className="text-secondary-600">
                  Sua consulta foi agendada com sucesso. Você receberá uma confirmação por e-mail.
                </p>
              </div>

              <div className="card max-w-md mx-auto">
                <h4 className="font-semibold text-secondary-900 mb-4">Detalhes do Agendamento</h4>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Paciente:</span>
                    <span className="font-medium">{agendamento.paciente.nome} {agendamento.paciente.sobrenome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Data:</span>
                    <span className="font-medium">{format(new Date(agendamento.data), 'dd/MM/yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Horário:</span>
                    <span className="font-medium">{agendamento.horario}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Tipo:</span>
                    <span className="font-medium">
                      {agendamento.paciente.particular ? 'Particular' : agendamento.paciente.convenio}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Status:</span>
                    <span className="font-medium text-yellow-600">Aguardando Confirmação</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Importante:</strong> O médico será notificado e entrará em contato para confirmar o agendamento.
                </p>
              </div>

              <button
                onClick={() => {
                  setStep('calendar');
                  setSelectedDate(null);
                  setSelectedTime('');
                  setAgendamento(null);
                }}
                className="btn-primary"
              >
                Novo Agendamento
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
