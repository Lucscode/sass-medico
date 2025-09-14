import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Função para gerar JWT
async function generateToken(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');
  
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Verificar senha (em produção, use hash + salt)
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD não configurado');
      return NextResponse.json(
        { error: 'Configuração de admin não encontrada' },
        { status: 500 }
      );
    }
    
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      );
    }
    
    // Gerar token JWT
    const token = await generateToken({ 
      user: 'admin',
      role: 'administrator',
      timestamp: Date.now()
    });
    
    // Criar resposta com cookie seguro
    const response = NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso'
    });
    
    // Configurar cookie seguro
    response.cookies.set('admin-token', token, {
      httpOnly: true, // Não acessível via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS em produção
      sameSite: 'strict', // Proteção CSRF
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  );
}
