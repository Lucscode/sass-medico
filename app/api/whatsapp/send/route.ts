import { NextRequest, NextResponse } from 'next/server';

// Interface para o payload da requisição
interface WhatsAppMessage {
  nome: string;
  telefone: string;
  mensagem: string;
  dataAgendamento?: string;
  horarioAgendamento?: string;
}

// Função para enviar mensagem via WhatsApp Business API
async function sendWhatsAppMessage(messageData: WhatsAppMessage) {
  try {
    const apiKey = process.env.WHATSAPP_API_KEY;
    const phoneNumber = process.env.WHATSAPP_PHONE;
    
    if (!apiKey || !phoneNumber) {
      throw new Error('Configurações do WhatsApp não encontradas');
    }

    // Formatar mensagem
    let mensagem = `Olá ${messageData.nome}!\n\n`;
    
    if (messageData.dataAgendamento && messageData.horarioAgendamento) {
      mensagem += `Confirmamos seu agendamento para:\n`;
      mensagem += `📅 Data: ${messageData.dataAgendamento}\n`;
      mensagem += `🕐 Horário: ${messageData.horarioAgendamento}\n\n`;
    }
    
    mensagem += `Mensagem: ${messageData.mensagem}\n\n`;
    mensagem += `Atenciosamente,\nDra. Karla Toledo Martins`;

    // Chamada para WhatsApp Business API
    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumber}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: messageData.telefone.replace(/\D/g, ''), // Remove caracteres não numéricos
        type: 'text',
        text: {
          body: mensagem
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WhatsApp API Error: ${errorData.error?.message || 'Erro desconhecido'}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se é requisição válida
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Método não permitido' },
        { status: 405 }
      );
    }

    // Parse do body
    const body: WhatsAppMessage = await request.json();
    
    // Validação básica
    if (!body.nome || !body.telefone || !body.mensagem) {
      return NextResponse.json(
        { error: 'Dados obrigatórios: nome, telefone e mensagem' },
        { status: 400 }
      );
    }

    // Validar formato do telefone (básico)
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!phoneRegex.test(body.telefone)) {
      return NextResponse.json(
        { error: 'Formato de telefone inválido' },
        { status: 400 }
      );
    }

    // Sanitizar dados (básico)
    const sanitizedData: WhatsAppMessage = {
      nome: body.nome.trim().substring(0, 100), // Limitar tamanho
      telefone: body.telefone.trim(),
      mensagem: body.mensagem.trim().substring(0, 1000), // Limitar tamanho
      dataAgendamento: body.dataAgendamento?.trim(),
      horarioAgendamento: body.horarioAgendamento?.trim(),
    };

    // Enviar mensagem
    const result = await sendWhatsAppMessage(sanitizedData);

    return NextResponse.json({
      success: true,
      messageId: result.messages?.[0]?.id,
      message: 'Mensagem enviada com sucesso'
    });

  } catch (error) {
    console.error('Erro na API WhatsApp:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: 'Não foi possível enviar a mensagem'
      },
      { status: 500 }
    );
  }
}

// Método GET não permitido
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  );
}
