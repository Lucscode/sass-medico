import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: 'Token não encontrado' },
        { status: 401 }
      );
    }
    
    // Verificar token JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');
    
    try {
      const { payload } = await jwtVerify(token, secret);
      
      return NextResponse.json({
        authenticated: true,
        user: payload.user,
        role: payload.role
      });
      
    } catch (jwtError) {
      return NextResponse.json(
        { authenticated: false, error: 'Token inválido' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Erro na verificação:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Erro interno' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  );
}
