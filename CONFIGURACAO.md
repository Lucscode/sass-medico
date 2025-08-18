# Configuração do Sistema SaaS Médico

## 🚀 Configurações Necessárias para Produção

### 1. **Email (EmailJS - Recomendado)**

#### Passo a Passo:
1. Acesse: https://www.emailjs.com/
2. Crie uma conta gratuita
3. Configure um serviço de email (Gmail, Outlook, etc.)
4. Crie um template de email
5. Obtenha as credenciais

#### Variáveis de Ambiente:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
```

### 2. **WhatsApp Business API**

#### Opções:
- **WhatsApp Business API** (oficial)
- **Twilio** (alternativa)
- **Zapier** (automation)

#### Variáveis de Ambiente:
```env
NEXT_PUBLIC_WHATSAPP_API_KEY=your_whatsapp_api_key
NEXT_PUBLIC_WHATSAPP_PHONE=5511999999999
```

### 3. **Google Maps**

#### Passo a Passo:
1. Acesse: https://console.cloud.google.com/
2. Crie um projeto
3. Ative a Maps JavaScript API
4. Crie uma chave de API

#### Variáveis de Ambiente:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📋 Configurações do Sistema

### Variáveis Opcionais:
```env
NEXT_PUBLIC_MAX_AGENDAMENTOS_POR_DIA=20
NEXT_PUBLIC_INTERVALO_CONSULTA=30
NEXT_PUBLIC_DIAS_ANTECEDENCIA=30
```

## 🔧 Como Configurar

### 1. **No Vercel:**
1. Acesse o dashboard do Vercel
2. Vá em Settings > Environment Variables
3. Adicione cada variável

### 2. **Localmente:**
1. Crie um arquivo `.env.local`
2. Adicione as variáveis
3. Reinicie o servidor

## 📧 Configuração do EmailJS

### Template de Email para o Médico:
```html
<h2>Novo Agendamento Recebido</h2>
<p><strong>Paciente:</strong> {{paciente_nome}} {{paciente_sobrenome}}</p>
<p><strong>Email:</strong> {{paciente_email}}</p>
<p><strong>WhatsApp:</strong> {{paciente_whatsapp}}</p>
<p><strong>Data:</strong> {{data}}</p>
<p><strong>Horário:</strong> {{horario}}</p>
<p><strong>Tipo:</strong> {{tipo_consulta}}</p>
<p><strong>Observações:</strong> {{observacoes}}</p>
<p><strong>ID:</strong> {{id_agendamento}}</p>
```

### Template de Confirmação para o Paciente:
```html
<h2>Agendamento Confirmado!</h2>
<p>Olá {{paciente_nome}},</p>
<p>Seu agendamento foi realizado com sucesso!</p>
<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
  <h3>Detalhes da Consulta:</h3>
  <p><strong>Médico:</strong> {{medico_nome}}</p>
  <p><strong>Especialidade:</strong> {{medico_especialidade}}</p>
  <p><strong>Data:</strong> {{data}}</p>
  <p><strong>Horário:</strong> {{horario}}</p>
  <p><strong>Endereço:</strong> {{endereco}}</p>
  <p><strong>ID:</strong> {{id_agendamento}}</p>
</div>
<p><strong>Importante:</strong> O médico entrará em contato para confirmar.</p>
```

## 📱 Configuração do WhatsApp

### Mensagem Padrão:
```
🩺 *Novo Agendamento*

👤 *Paciente:* {{paciente_nome}} {{paciente_sobrenome}}
📧 *Email:* {{paciente_email}}
📱 *WhatsApp:* {{paciente_whatsapp}}
📅 *Data:* {{data}}
⏰ *Horário:* {{horario}}
💰 *Tipo:* {{tipo_consulta}}
🆔 *ID:* {{id_agendamento}}

{{observacoes}}

Por favor, confirme este agendamento.
```

## 🗺️ Configuração do Google Maps

### Implementação:
1. Adicione a chave da API
2. O mapa será carregado automaticamente
3. Mostrará a localização da clínica

## 🔒 Segurança

### Recomendações:
- ✅ Use HTTPS em produção
- ✅ Configure domínios permitidos no Google Maps
- ✅ Use variáveis de ambiente
- ✅ Não exponha chaves de API no código

## 📞 Suporte

### Em caso de problemas:
1. Verifique se todas as variáveis estão configuradas
2. Teste as integrações individualmente
3. Verifique os logs do console
4. Entre em contato com o suporte

## 🎯 Checklist de Configuração

- [ ] EmailJS configurado
- [ ] Templates de email criados
- [ ] WhatsApp API configurada
- [ ] Google Maps API configurada
- [ ] Variáveis de ambiente definidas
- [ ] Testes realizados
- [ ] Backup configurado

---

**⚠️ Importante:** Sem essas configurações, o sistema funcionará apenas localmente com dados mockados.
