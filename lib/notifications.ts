import { Agendamento } from '@/types';
import { medicoData } from '@/data/medico';

// Configuração para envio de emails (usando EmailJS como exemplo)
export const sendEmailNotification = async (agendamento: Agendamento) => {
  try {
    // Para produção, você pode usar:
    // - EmailJS (fácil de implementar)
    // - SendGrid
    // - Nodemailer (backend)
    
    const emailData = {
      to_email: medicoData.email,
      to_name: medicoData.nome,
      from_name: `${agendamento.paciente.nome} ${agendamento.paciente.sobrenome}`,
      from_email: agendamento.paciente.email,
      subject: 'Novo Agendamento - Sistema Médico',
      message: `
        <h2>Novo Agendamento Recebido</h2>
        <p><strong>Paciente:</strong> ${agendamento.paciente.nome} ${agendamento.paciente.sobrenome}</p>
        <p><strong>Email:</strong> ${agendamento.paciente.email}</p>
        <p><strong>WhatsApp:</strong> ${agendamento.paciente.whatsapp}</p>
        <p><strong>Data:</strong> ${new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
        <p><strong>Horário:</strong> ${agendamento.horario}</p>
        <p><strong>Tipo:</strong> ${agendamento.paciente.particular ? 'Particular' : agendamento.paciente.convenio}</p>
        ${agendamento.observacoes ? `<p><strong>Observações:</strong> ${agendamento.observacoes}</p>` : ''}
        <p><strong>ID do Agendamento:</strong> ${agendamento.id}</p>
      `
    };

    // Aqui você implementaria a integração real
    console.log('Email enviado:', emailData);
    
    // Simular envio bem-sucedido
    return { success: true, message: 'Email enviado com sucesso' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, message: 'Erro ao enviar email' };
  }
};

// Enviar confirmação para o paciente
export const sendPatientConfirmation = async (agendamento: Agendamento) => {
  try {
    const emailData = {
      to_email: agendamento.paciente.email,
      to_name: `${agendamento.paciente.nome} ${agendamento.paciente.sobrenome}`,
      subject: 'Confirmação de Agendamento',
      message: `
        <h2>Agendamento Confirmado!</h2>
        <p>Olá ${agendamento.paciente.nome},</p>
        <p>Seu agendamento foi realizado com sucesso!</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Detalhes da Consulta:</h3>
          <p><strong>Médico:</strong> ${medicoData.nome}</p>
          <p><strong>Especialidade:</strong> ${medicoData.especialidade}</p>
          <p><strong>Data:</strong> ${new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
          <p><strong>Horário:</strong> ${agendamento.horario}</p>
          <p><strong>Endereço:</strong> ${medicoData.endereco.rua}, ${medicoData.endereco.numero} - ${medicoData.endereco.bairro}, ${medicoData.endereco.cidade}</p>
          <p><strong>ID do Agendamento:</strong> ${agendamento.id}</p>
        </div>
        <p><strong>Importante:</strong> O médico entrará em contato para confirmar o agendamento.</p>
        <p>Em caso de dúvidas, entre em contato: ${medicoData.telefone}</p>
      `
    };

    console.log('Confirmação enviada para paciente:', emailData);
    return { success: true, message: 'Confirmação enviada' };
  } catch (error) {
    console.error('Erro ao enviar confirmação:', error);
    return { success: false, message: 'Erro ao enviar confirmação' };
  }
};

// Enviar WhatsApp (usando API do WhatsApp Business)
export const sendWhatsAppNotification = async (agendamento: Agendamento) => {
  try {
    const message = `🩺 *Novo Agendamento*
    
👤 *Paciente:* ${agendamento.paciente.nome} ${agendamento.paciente.sobrenome}
📧 *Email:* ${agendamento.paciente.email}
📱 *WhatsApp:* ${agendamento.paciente.whatsapp}
📅 *Data:* ${new Date(agendamento.data).toLocaleDateString('pt-BR')}
⏰ *Horário:* ${agendamento.horario}
💰 *Tipo:* ${agendamento.paciente.particular ? 'Particular' : agendamento.paciente.convenio}
🆔 *ID:* ${agendamento.id}

${agendamento.observacoes ? `📝 *Observações:* ${agendamento.observacoes}` : ''}

Por favor, confirme este agendamento.`;

    // Aqui você implementaria a integração com WhatsApp Business API
    console.log('WhatsApp enviado:', message);
    
    return { success: true, message: 'WhatsApp enviado' };
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return { success: false, message: 'Erro ao enviar WhatsApp' };
  }
};
