# Sistema de Cadastro Profissional

Um sistema completo e profissional para cadastro de clientes e produtos, desenvolvido com tecnologias web modernas.

## 🚀 Funcionalidades

### 🔐 Autenticação de Usuários
- **Login seguro** com validação de credenciais
- **Cadastro de novos usuários** com validação de e-mail
- **Sistema de recuperação de senha**
- **Persistência de sessão** (usuário permanece logado)

### 👥 Gestão de Clientes
- **Busca por CPF** com formatação automática
- **Cadastro completo** com dados pessoais
- **Validação de CPF duplicado**
- **Campos disponíveis:**
  - Nome completo
  - CPF (com máscara 000.000.000-00)
  - E-mail
  - Telefone (com máscara (00) 00000-0000)
  - Endereço

### 📦 Gestão de Produtos
- **Busca por IP** com validação de formato
- **Cadastro completo** com informações detalhadas
- **Validação de IP duplicado**
- **Campos disponíveis:**
  - Nome do produto
  - Endereço IP
  - Categoria
  - Preço (com formatação monetária)
  - Descrição
  - Quantidade em estoque
  - Status (Ativo/Inativo/Em Manutenção)

### 💾 Armazenamento de Dados
- **Armazenamento local** (localStorage)
- **Persistência de dados** entre sessões
- **Backup automático** dos cadastros
- **Exportação de dados** em formato JSON

### 🎨 Interface Profissional
- **Design moderno e responsivo**
- **Animações suaves** e transições
- **Cores profissionais** e gradientes
- **Interface intuitiva** e fácil de usar
- **Totalmente responsivo** para mobile e desktop

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- LocalStorage disponível

## 🛠️ Instalação

1. **Baixe os arquivos** do projeto
2. **Extraia** para uma pasta de sua escolha
3. **Abra o arquivo `index.html`** em seu navegador

Ou clone o repositório:
```bash
git clone <url-do-repositorio>
cd cadastro.ap
```

## 🚀 Como Usar

### 1. Primeiro Acesso
- Abra o `index.html` no navegador
- Use o usuário administrador padrão:
  - **E-mail:** admin@sistema.com
  - **Senha:** admin123

### 2. Criando Novos Usuários
- Na tela de login, clique em **"Cadastre-se"**
- Preencha seus dados e crie sua conta
- Faça login com suas credenciais

### 3. Navegando pelo Sistema
- **Tela Principal:** Menu com opções para Clientes e Produtos
- **Clientes:** Busque por CPF ou cadastre novos clientes
- **Produtos:** Busque por IP ou cadastre novos produtos

### 4. Cadastrando Clientes
- Clique em **"Clientes"** no menu principal
- Use a busca por CPF ou preencha o formulário de novo cliente
- Todos os campos possuem validação automática
- Após o cadastro, você verá uma tela de confirmação

### 5. Cadastrando Produtos
- Clique em **"Produtos"** no menu principal
- Use a busca por IP ou preencha o formulário de novo produto
- O IP é validado automaticamente
- O preço é formatado como moeda brasileira
- Após o cadastro, você verá uma tela de confirmação

## 🎯 Dicas de Uso

### Atalhos de Teclado
- **Ctrl + L:** Fazer logout
- **Esc:** Fechar mensagens modais

### Formatação Automática
- **CPF:** Digite apenas números - o sistema formata automaticamente
- **Telefone:** Digite apenas números - o sistema formata automaticamente
- **Preço:** Digite apenas números - o sistema formata como moeda

### Validações
- **E-mail:** Verificação de formato válido
- **CPF:** Validação de formato e duplicidade
- **IP:** Validação de formato IPv4
- **Senhas:** Mínimo de 6 caracteres

## 🔧 Personalização

### Cores e Estilos
As cores principais podem ser personalizadas no arquivo `style.css`:
```css
:root {
    --primary-color: #4f46e5;    /* Cor principal */
    --secondary-color: #64748b;  /* Cor secundária */
    --success-color: #10b981;    /* Cor de sucesso */
    --error-color: #ef4444;      /* Cor de erro */
}
```

### Novos Campos
Para adicionar novos campos aos formulários:
1. Edite o HTML no arquivo `index.html`
2. Adicione as validações correspondentes no `script.js`
3. Ajuste o estilo se necessário no `style.css`

## 📊 Estrutura dos Dados

### Usuários
```json
{
    "id": "identificador_unico",
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "password": "senha_criptografada",
    "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Clientes
```json
{
    "id": "identificador_unico",
    "name": "Nome do Cliente",
    "cpf": "000.000.000-00",
    "email": "cliente@email.com",
    "phone": "(00) 00000-0000",
    "address": "Endereço completo",
    "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Produtos
```json
{
    "id": "identificador_unico",
    "name": "Nome do Produto",
    "ip": "192.168.1.1",
    "category": "categoria",
    "price": 99.90,
    "description": "Descrição detalhada",
    "quantity": 10,
    "status": "ativo",
    "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Segurança

### Senhas
- **Hashing:** Senhas são armazenadas com hash básico
- **Validação:** Mínimo de 6 caracteres
- **Recomendação:** Em produção, use bcrypt ou similar

### Dados
- **LocalStorage:** Dados armazenados localmente
- **Validação:** Todos os dados são validados antes do armazenamento
- **Backup:** Recomendado fazer backup periódico dos dados

## 🐛 Solução de Problemas

### Problemas Comuns

**Navegador não carrega:**
- Verifique se o JavaScript está habilitado
- Tente usar um navegador mais recente
- Verifique o console do navegador para erros

**Dados não salvam:**
- Verifique se o localStorage está disponível
- Limpe o cache do navegador
- Verifique o espaço de armazenamento disponível

**Formatação não funciona:**
- Verifique se todos os arquivos estão na mesma pasta
- Confirme se o JavaScript está sendo carregado
- Verifique o console para erros de JavaScript

### Debug
Para ativar o modo debug:
```javascript
// No console do navegador
localStorage.setItem('debug', 'true');
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablets
- ✅ Smartphones (Android, iOS)

## 🔄 Atualizações

### Versão 1.0.0
- ✅ Sistema de login e cadastro
- ✅ Gestão de clientes
- ✅ Gestão de produtos
- ✅ Interface responsiva
- ✅ Armazenamento local

### Próximas Funcionalidades
- 🔄 Edição de registros
- 🔄 Exclusão de registros
- 🔄 Relatórios e estatísticas
- 🔄 Exportação para Excel/CSV
- 🔄 Sistema de notificações
- 🔄 Dark mode

## 📞 Suporte

Para suporte técnico:
- **E-mail:** suporte@sistema.com
- **Documentação:** Verifique este arquivo README
- **FAQ:** Consulte a seção de solução de problemas

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

**Desenvolvido com ❤️ para facilitar o gerenciamento de cadastros**

*Sistema Profissional de Cadastro - Simples, Rápido e Eficiente*
