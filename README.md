# Sistema SaaS de Agendamento Médico

Um sistema completo de agendamento médico desenvolvido com Next.js, TypeScript e Tailwind CSS. O sistema permite que pacientes agendem consultas online de forma simples e intuitiva.

## 🚀 Funcionalidades

### Para Pacientes
- **Portfólio do Médico**: Visualização completa das informações do médico
- **Horários de Atendimento**: Consulta dos horários disponíveis
- **Localização**: Mapa e informações de localização da clínica
- **Agendamento Online**: Sistema completo de agendamento com:
  - Seleção de data e horário
  - Formulário de dados do paciente
  - Escolha entre convênio ou particular
  - Confirmação do agendamento
- **Notificações**: Recebimento de confirmações por e-mail

### Para Médicos
- **Notificações Automáticas**: Recebe notificações de novos agendamentos
- **Gestão de Horários**: Controle dos horários de atendimento
- **Informações de Contato**: Dados completos para contato

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Framework CSS utilitário
- **React Hook Form**: Gerenciamento de formulários
- **Date-fns**: Manipulação de datas
- **Lucide React**: Ícones modernos
- **React Hot Toast**: Notificações toast
- **Framer Motion**: Animações (preparado para uso)

## 📁 Estrutura do Projeto

```
sass_medico/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Sobre.tsx
│   ├── Horarios.tsx
│   ├── Localizacao.tsx
│   ├── Agendamento.tsx
│   └── Footer.tsx
├── data/
│   ├── medico.ts
│   └── convenios.ts
├── types/
│   └── index.ts
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd sass_medico
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

## 📋 Funcionalidades Detalhadas

### 1. Portfólio do Médico
- Informações pessoais e profissionais
- Especialidades e formação
- Experiência profissional
- Certificações

### 2. Horários de Atendimento
- Visualização dos horários por dia da semana
- Informações sobre duração da consulta
- Política de cancelamento

### 3. Localização
- Endereço completo da clínica
- Informações de contato
- Horário de funcionamento
- Instruções de como chegar

### 4. Sistema de Agendamento
- **Passo 1**: Seleção de data e horário
- **Passo 2**: Preenchimento dos dados do paciente
- **Passo 3**: Confirmação do agendamento

### 5. Formulário de Agendamento
- Nome e sobrenome
- E-mail
- WhatsApp
- Escolha entre convênio ou particular
- Observações opcionais

## 🎨 Design System

### Cores
- **Primary**: Azul (#0ea5e9) - Cor principal
- **Secondary**: Cinza (#64748b) - Cor secundária
- **Success**: Verde (#22c55e) - Confirmações
- **Error**: Vermelho (#ef4444) - Erros
- **Warning**: Amarelo (#f59e0b) - Avisos

### Componentes
- Botões primários e secundários
- Campos de input padronizados
- Cards com sombras
- Navegação responsiva

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Configuração

### Dados do Médico
Edite o arquivo `data/medico.ts` para personalizar:
- Informações pessoais
- Horários de atendimento
- Endereço
- Especialidades

### Convênios
Edite o arquivo `data/convenios.ts` para adicionar/remover convênios.

## 📧 Notificações

O sistema está preparado para integração com:
- **E-mail**: Nodemailer, SendGrid, etc.
- **WhatsApp**: API do WhatsApp Business
- **SMS**: Twilio, etc.

### Exemplo de Integração
```typescript
// Em components/Agendamento.tsx
const enviarNotificacao = async (agendamento: Agendamento) => {
  // Integração com serviço de e-mail
  await fetch('/api/notificacoes', {
    method: 'POST',
    body: JSON.stringify(agendamento)
  });
};
```

## 🗺️ Integração com Mapas

Para integrar mapas reais, você pode usar:
- **Google Maps**: API do Google Maps
- **Leaflet**: Biblioteca open-source
- **Mapbox**: Alternativa ao Google Maps

### Exemplo com Google Maps
```typescript
// Instalar: npm install @googlemaps/js-api-loader
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: 'SUA_API_KEY',
  version: 'weekly'
});
```

## 🔒 Segurança

- Validação de formulários no frontend
- Sanitização de dados
- HTTPS obrigatório em produção
- Proteção contra XSS

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Fazer upload da pasta .next
```

### Outros
O projeto pode ser deployado em qualquer plataforma que suporte Next.js.

## 📈 Próximas Funcionalidades

- [ ] Painel administrativo para médicos
- [ ] Sistema de login/registro
- [ ] Histórico de consultas
- [ ] Sistema de avaliações
- [ ] Integração com prontuário eletrônico
- [ ] Pagamento online
- [ ] Lembretes automáticos
- [ ] Telemedicina integrada

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um e-mail para [seu-email@exemplo.com]

---

**Desenvolvido com ❤️ para facilitar o agendamento de consultas médicas**
