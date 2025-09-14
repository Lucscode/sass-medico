// Utilitários de criptografia para dados sensíveis
// NOTA: Esta é uma implementação básica. Para produção, considere usar bibliotecas mais robustas

const ENCRYPTION_KEY = 'sass-medico-key-2024'; // Em produção, use uma chave mais segura

// Função para gerar hash simples (não é criptografia real, apenas ofuscação)
function simpleHash(text: string): string {
  let hash = 0;
  if (text.length === 0) return hash.toString();
  
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
}

// Função para "criptografar" dados (ofuscação básica)
export function encryptData(data: string): string {
  try {
    // Converter para base64 com chave simples
    const combined = data + '|' + ENCRYPTION_KEY;
    const encoded = btoa(encodeURIComponent(combined));
    return encoded;
  } catch (error) {
    console.error('Erro ao criptografar dados:', error);
    return data; // Retorna dados originais em caso de erro
  }
}

// Função para "descriptografar" dados
export function decryptData(encryptedData: string): string {
  try {
    const decoded = decodeURIComponent(atob(encryptedData));
    const parts = decoded.split('|');
    
    if (parts.length !== 2 || parts[1] !== ENCRYPTION_KEY) {
      throw new Error('Chave de descriptografia inválida');
    }
    
    return parts[0];
  } catch (error) {
    console.error('Erro ao descriptografar dados:', error);
    return encryptedData; // Retorna dados originais em caso de erro
  }
}

// Função para mascarar dados sensíveis (para exibição)
export function maskSensitiveData(data: string, type: 'cpf' | 'phone' | 'email'): string {
  switch (type) {
    case 'cpf':
      // 123.456.789-01 -> 123.***.***-01
      return data.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '$1.***.***-$4');
    
    case 'phone':
      // (11) 99999-9999 -> (11) 9****-9999
      return data.replace(/(\(\d{2}\)\s\d{1})(\d{4})-(\d{4})/, '$1****-$3');
    
    case 'email':
      // usuario@email.com -> us****@email.com
      const [local, domain] = data.split('@');
      const maskedLocal = local.length > 2 
        ? local.substring(0, 2) + '*'.repeat(local.length - 2)
        : local;
      return `${maskedLocal}@${domain}`;
    
    default:
      return data;
  }
}

// Função para validar se dados estão criptografados
export function isEncryptedData(data: string): boolean {
  try {
    // Tentar decodificar - se funcionar, provavelmente está criptografado
    const decoded = atob(data);
    return decoded.includes('|' + ENCRYPTION_KEY);
  } catch {
    return false;
  }
}

// Função para limpar dados sensíveis do localStorage
export function clearSensitiveData(): void {
  try {
    const keys = Object.keys(localStorage);
    const sensitiveKeys = keys.filter(key => 
      key.includes('agendamento') || 
      key.includes('paciente') || 
      key.includes('medico')
    );
    
    sensitiveKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('Dados sensíveis removidos do localStorage');
  } catch (error) {
    console.error('Erro ao limpar dados sensíveis:', error);
  }
}
