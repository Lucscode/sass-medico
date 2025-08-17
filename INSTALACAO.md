# Instruções de Instalação - Sistema SaaS Médico

## 🔧 Pré-requisitos

### 1. Instalar Node.js
Você precisa ter o Node.js instalado no seu computador.

**Para Windows:**
1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Reinicie o terminal após a instalação

**Para verificar se foi instalado corretamente:**
```bash
node --version
npm --version
```

## 🚀 Como Executar o Projeto

### 1. Abrir o Terminal
- Pressione `Windows + R`
- Digite `cmd` e pressione Enter
- Ou use o PowerShell

### 2. Navegar até a pasta do projeto
```bash
cd "D:\Arquivos Usuario\Documentos\OneDrive - Q Passo Alimentos Ltda\Área de Trabalho\sass_medico"
```

### 3. Instalar as dependências
```bash
npm install
```

### 4. Executar o projeto
```bash
npm run dev
```

### 5. Acessar a aplicação
Abra seu navegador e acesse:
```
http://localhost:3000
```

## 📋 Funcionalidades do Sistema

### ✅ Implementadas
- **Portfólio do Médico**: Informações completas do Dr. Carlos Silva
- **Horários de Atendimento**: Visualização dos horários disponíveis
- **Localização**: Endereço e informações de contato
- **Sistema de Agendamento**: 
  - Seleção de data e horário
  - Formulário de dados do paciente
  - Escolha entre convênio ou particular
  - Confirmação do agendamento
- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Interface Moderna**: Design limpo e profissional

### 🎯 Como Usar

1. **Navegar pelo Site**
   - Use o menu superior para navegar entre as seções
   - Clique em "Agendar Consulta" para começar

2. **Fazer um Agendamento**
   - Clique em "Agendar Consulta"
   - Selecione uma data disponível
   - Escolha um horário
   - Preencha seus dados
   - Confirme o agendamento

3. **Personalizar**
   - Edite `data/medico.ts` para alterar dados do médico
   - Edite `data/convenios.ts` para modificar convênios

## 🔧 Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Construir para produção
npm run build

# Executar versão de produção
npm start

# Verificar erros de linting
npm run lint
```

## 📱 Testando no Mobile

Para testar no seu celular:
1. Execute `npm run dev`
2. Anote o IP do seu computador (ex: 192.168.1.100)
3. No celular, acesse: `http://192.168.1.100:3000`

## 🛠️ Solução de Problemas

### Erro: "npm não é reconhecido"
- Instale o Node.js novamente
- Reinicie o terminal
- Verifique se o PATH está configurado

### Erro: "Porta 3000 já está em uso"
```bash
# Use uma porta diferente
npm run dev -- -p 3001
```

### Erro: "Módulo não encontrado"
```bash
# Reinstale as dependências
rm -rf node_modules
npm install
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o Node.js está instalado
2. Confirme se está na pasta correta
3. Tente reinstalar as dependências
4. Verifique se a porta 3000 está livre

---

**🎉 Parabéns! Seu sistema SaaS de agendamento médico está pronto para uso!**
