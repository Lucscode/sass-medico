// Configurações para integrações de produção

export const config = {
  // Email (EmailJS)
  email: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    userId: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '',
  },

  // WhatsApp Business API - MOVER PARA BACKEND!
  whatsapp: {
    // ⚠️ ATENÇÃO: Estas chaves NÃO devem ser públicas!
    // Mover para API routes do Next.js
    apiKey: process.env.WHATSAPP_API_KEY || '',
    phoneNumber: process.env.WHATSAPP_PHONE || '',
  },

  // Google Maps
  maps: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  },

  // Configurações do sistema
  system: {
    maxAgendamentosPorDia: 20,
    intervaloConsulta: 30, // minutos
    diasAntecedencia: 30,
    horarioInicio: '08:00',
    horarioFim: '18:00',
  },

  // URLs
  urls: {
    admin: '/admin',
    agendamento: '/#agendamento',
  },
};

// Função para verificar se as configurações estão completas
export const checkConfig = () => {
  const missing = [];
  
  if (!config.email.serviceId) missing.push('EMAILJS_SERVICE_ID');
  if (!config.email.templateId) missing.push('EMAILJS_TEMPLATE_ID');
  if (!config.email.userId) missing.push('EMAILJS_USER_ID');
  if (!config.whatsapp.apiKey) missing.push('WHATSAPP_API_KEY');
  if (!config.maps.apiKey) missing.push('GOOGLE_MAPS_API_KEY');
  
  return {
    isComplete: missing.length === 0,
    missing,
  };
};
