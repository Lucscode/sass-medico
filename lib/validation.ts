// Utilitários de validação e sanitização de formulários

// Regex patterns para validação
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\+\-\(\)]{10,}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
  text: /^[a-zA-ZÀ-ÿ0-9\s\.,!?\-]{1,}$/,
};

// Função para sanitizar texto (remover caracteres perigosos)
export function sanitizeText(text: string): string {
  if (!text) return '';
  
  return text
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove caracteres HTML perigosos
    .substring(0, 1000); // Limita tamanho
}

// Função para sanitizar nome
export function sanitizeName(name: string): string {
  if (!name) return '';
  
  return name
    .trim()
    .replace(/[^a-zA-ZÀ-ÿ\s]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .substring(0, 100); // Limita tamanho
}

// Função para sanitizar telefone
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  // Remove caracteres não numéricos exceto +, -, (, ), espaços
  return phone.replace(/[^\d\s\+\-\(\)]/g, '');
}

// Função para sanitizar email
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  return email
    .trim()
    .toLowerCase()
    .substring(0, 254); // Limite RFC
}

// Validação de CPF
export function validateCPF(cpf: string): boolean {
  if (!cpf) return false;
  
  // Remove formatação
  const numbers = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (numbers.length !== 11) return false;
  
  // Verifica se não são todos iguais
  if (/^(\d)\1{10}$/.test(numbers)) return false;
  
  // Validação do primeiro dígito
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 >= 10) digit1 = 0;
  
  if (parseInt(numbers[9]) !== digit1) return false;
  
  // Validação do segundo dígito
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 >= 10) digit2 = 0;
  
  return parseInt(numbers[10]) === digit2;
}

// Validação de email
export function validateEmail(email: string): boolean {
  if (!email) return false;
  return patterns.email.test(email);
}

// Validação de telefone
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  return patterns.phone.test(phone);
}

// Validação de nome
export function validateName(name: string): boolean {
  if (!name) return false;
  return patterns.name.test(name) && name.length >= 2;
}

// Validação de data
export function validateDate(date: string): boolean {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30); // Máximo 30 dias no futuro
  
  return dateObj >= today && dateObj <= maxDate && !isNaN(dateObj.getTime());
}

// Validação de horário
export function validateTime(time: string): boolean {
  if (!time) return false;
  
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) return false;
  
  const [hours, minutes] = time.split(':').map(Number);
  return hours >= 8 && hours <= 18; // Horário comercial
}

// Interface para erros de validação
export interface ValidationErrors {
  [key: string]: string;
}

// Função principal de validação de agendamento
export function validateAgendamento(data: {
  nome: string;
  email: string;
  telefone: string;
  data: string;
  horario: string;
  convenio?: string;
  observacoes?: string;
}): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};
  
  // Validar nome
  if (!validateName(data.nome)) {
    errors.nome = 'Nome deve ter pelo menos 2 caracteres e conter apenas letras';
  }
  
  // Validar email
  if (!validateEmail(data.email)) {
    errors.email = 'Email deve ter um formato válido';
  }
  
  // Validar telefone
  if (!validatePhone(data.telefone)) {
    errors.telefone = 'Telefone deve ter pelo menos 10 dígitos';
  }
  
  // Validar data
  if (!validateDate(data.data)) {
    errors.data = 'Data deve ser hoje ou nos próximos 30 dias';
  }
  
  // Validar horário
  if (!validateTime(data.horario)) {
    errors.horario = 'Horário deve estar entre 08:00 e 18:00';
  }
  
  // Validar observações (opcional)
  if (data.observacoes && data.observacoes.length > 500) {
    errors.observacoes = 'Observações devem ter no máximo 500 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Função para sanitizar dados de agendamento
export function sanitizeAgendamentoData(data: any) {
  return {
    nome: sanitizeName(data.nome || ''),
    email: sanitizeEmail(data.email || ''),
    telefone: sanitizePhone(data.telefone || ''),
    data: data.data || '',
    horario: data.horario || '',
    convenio: sanitizeText(data.convenio || ''),
    observacoes: sanitizeText(data.observacoes || ''),
  };
}
