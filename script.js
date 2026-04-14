class SistemaCadastro{constructor(){this.currentUser=null;this.clients=[];this.products=[];this.users=[];this.init()}
 init(){this.loadFromStorage();this.setupEventListeners();this.setupMasks();this.checkAuth()}

 loadFromStorage(){const storedUsers=localStorage.getItem('sistema_usuarios');const storedClients=localStorage.getItem('sistema_clientes');const storedProducts=localStorage.getItem('sistema_produtos');const storedCurrentUser=localStorage.getItem('sistema_usuario_atual');if(storedUsers)this.users=JSON.parse(storedUsers);if(storedClients)this.clients=JSON.parse(storedClients);if(storedProducts)this.products=JSON.parse(storedProducts);if(storedCurrentUser)this.currentUser=JSON.parse(storedCurrentUser);if(this.users.length===0){this.createDefaultAdmin()}}

 saveToStorage(){localStorage.setItem('sistema_usuarios',JSON.stringify(this.users));localStorage.setItem('sistema_clientes',JSON.stringify(this.clients));localStorage.setItem('sistema_produtos',JSON.stringify(this.products));if(this.currentUser){localStorage.setItem('sistema_usuario_atual',JSON.stringify(this.currentUser))}}

 createDefaultAdmin(){const adminUser={id:this.generateId(),name:'Administrador',email:'admin@sistema.com',password:this.hashPassword('admin123'),createdAt:new Date().toISOString()};this.users.push(adminUser);this.saveToStorage()}

 showScreen(screenId){const screens=document.querySelectorAll('.screen');screens.forEach(screen=>{screen.classList.remove('active')});const targetScreen=document.getElementById(screenId);if(targetScreen){targetScreen.classList.add('active')}if(screenId==='mainScreen'&&this.currentUser){document.getElementById('userName').textContent=this.currentUser.name}}

 checkAuth(){if(this.currentUser){this.showScreen('mainScreen')}else{this.showScreen('loginScreen')}}

 async login(email,password){try{const user=this.users.find(u=>u.email===email);if(!user){throw new Error('Usuário não encontrado')}if(!this.verifyPassword(password,user.password)){throw new Error('Senha incorreta')}this.currentUser={id:user.id,name:user.name,email:user.email};this.saveToStorage();this.showScreen('mainScreen');this.showMessage('Sucesso','Login realizado com sucesso!','success');return true}catch(error){this.showMessage('Erro de Login',error.message,'error');return false}}

 async register(name,email,password){try{if(this.users.some(u=>u.email===email)){throw new Error('Este e-mail já está cadastrado')}if(password.length<6){throw new Error('A senha deve ter pelo menos 6 caracteres')}const newUser={id:this.generateId(),name:name.trim(),email:email.trim().toLowerCase(),password:this.hashPassword(password),createdAt:new Date().toISOString()};this.users.push(newUser);this.saveToStorage();this.showMessage('Sucesso','Conta criada com sucesso! Faça login para continuar.','success');this.showScreen('loginScreen');return true}catch(error){this.showMessage('Erro no Cadastro',error.message,'error');return false}}

 logout(){this.currentUser=null;localStorage.removeItem('sistema_usuario_atual');this.showScreen('loginScreen');this.showMessage('Logout','Você saiu do sistema com sucesso.','info')}

 async registerClient(clientData){try{const cpfLimpo=this.cleanCpf(clientData.cpf);if(this.clients.some(c=>this.cleanCpf(c.cpf)===cpfLimpo)){throw new Error('Já existe um cliente cadastrado com este CPF')}const newClient={id:this.generateId(),...clientData,cpf:clientData.cpf,createdAt:new Date().toISOString()};this.clients.push(newClient);this.saveToStorage();document.getElementById('clientRegisteredInfo').textContent=`O cliente ${newClient.name} (CPF: ${newClient.cpf}) foi cadastrado com sucesso!`;this.showScreen('clientRegisteredScreen');return true}catch(error){this.showMessage('Erro no Cadastro',error.message,'error');return false}}

 searchClient(cpf){const cpfLimpo=this.cleanCpf(cpf);const client=this.clients.find(c=>this.cleanCpf(c.cpf)===cpfLimpo);if(client){this.showMessage('Cliente Encontrado',`Nome: ${client.name}\nCPF: ${client.cpf}\nE-mail: ${client.email}\nTelefone: ${client.phone||'Não informado'}`,'info');return client}else{this.showMessage('Cliente Não Encontrado','Não foi encontrado nenhum cliente com este CPF.','warning');return null}}

 async registerProduct(productData){try{if(this.products.some(p=>p.ip===productData.ip)){throw new Error('Já existe um produto cadastrado com este IP')}if(!this.validateIP(productData.ip)){throw new Error('Formato de IP inválido')}const newProduct={id:this.generateId(),...productData,price:this.formatPriceToNumber(productData.price),createdAt:new Date().toISOString()};this.products.push(newProduct);this.saveToStorage();document.getElementById('productRegisteredInfo').textContent=`O produto ${newProduct.name} (IP: ${newProduct.ip}) foi cadastrado com sucesso!`;this.showScreen('productRegisteredScreen');return true}catch(error){this.showMessage('Erro no Cadastro',error.message,'error');return false}}

 searchProduct(ip){const product=this.products.find(p=>p.ip===ip);if(product){this.showMessage('Produto Encontrado',`Nome: ${product.name}\nIP: ${product.ip}\nCategoria: ${product.category}\nPreço: R$ ${product.price.toFixed(2)}\nQuantidade: ${product.quantity}`,'info');return product}else{this.showMessage('Produto Não Encontrado','Não foi encontrado nenhum produto com este IP.','warning');return null}}

 generateId(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}
 hashPassword(password){return btoa(password+'sistema_salt')}
 verifyPassword(password,hash){return this.hashPassword(password)===hash}
 cleanCpf(cpf){return cpf.replace(/\D/g,'')}
 validateIP(ip){const ipPattern=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;return ipPattern.test(ip)}
 formatPriceToNumber(price){const cleanPrice=price.replace(/[R$\s.]/g,'').replace(',','.');return parseFloat(cleanPrice)||0}
 formatPriceToDisplay(price){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(price)}

    // Máscaras de Formatação
    setupMasks() {
        // Máscara de CPF
        const cpfInputs = document.querySelectorAll('[id*="cpf"]');
        cpfInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length > 9) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
                }
                
                e.target.value = value;
            });
        });

        // Máscara de Telefone
        const phoneInput = document.getElementById('clientPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length > 10) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else if (value.length > 2) {
                    value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
                }
                
                e.target.value = value;
            });
        }

        // Máscara de Preço
        const priceInput = document.getElementById('productPrice');
        if (priceInput) {
            priceInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = (value / 100).toFixed(2);
                e.target.value = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(value);
            });
        }
    }

    // Configuração de Event Listeners
    setupEventListeners() {
        // Formulário de Login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                await this.login(email, password);
            });
        }

        // Formulário de Registro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                if (password !== confirmPassword) {
                    this.showMessage('Erro de Validação', 'As senhas não coincidem.', 'error');
                    return;
                }
                
                await this.register(name, email, password);
            });
        }

        // Formulário de Cliente
        const clientForm = document.getElementById('clientForm');
        if (clientForm) {
            clientForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const clientData = {
                    name: document.getElementById('clientName').value,
                    cpf: document.getElementById('clientCpfNew').value,
                    email: document.getElementById('clientEmail').value,
                    phone: document.getElementById('clientPhone').value,
                    address: document.getElementById('clientAddress').value
                };
                
                await this.registerClient(clientData);
            });
        }

        // Formulário de Produto
        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const productData = {
                    name: document.getElementById('productName').value,
                    ip: document.getElementById('productIpNew').value,
                    category: document.getElementById('productCategory').value,
                    price: document.getElementById('productPrice').value,
                    description: document.getElementById('productDescription').value,
                    quantity: parseInt(document.getElementById('productQuantity').value),
                    status: document.getElementById('productStatus').value
                };
                
                await this.registerProduct(productData);
            });
        }

        // Esqueci minha senha
        const forgotPasswordLink = document.querySelector('.forgot-password');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showMessage('Recuperação de Senha', 
                    'Para recuperar sua senha, entre em contato com o administrador do sistema.\n\nE-mail: admin@sistema.com', 
                    'info');
            });
        }
    }

    // Sistema de Mensagens
    showMessage(title, message, type = 'info') {
        const modal = document.getElementById('messageModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        // Remover classes de tipo anteriores
        modal.classList.remove('success', 'error', 'warning', 'info');
        
        // Adicionar classe de tipo
        modal.classList.add(type);
        
        // Mostrar modal
        modal.classList.add('active');
        
        // Auto-fechar após 5 segundos para mensagens de sucesso
        if (type === 'success') {
            setTimeout(() => {
                this.closeModal();
            }, 5000);
        }
    }

    closeModal() {
        const modal = document.getElementById('messageModal');
        modal.classList.remove('active');
    }

    // Relatórios e Estatísticas
    getStatistics() {
        return {
            totalClients: this.clients.length,
            totalProducts: this.products.length,
            totalUsers: this.users.length,
            activeProducts: this.products.filter(p => p.status === 'ativo').length,
            totalValue: this.products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
        };
    }

    // Exportação de Dados
    exportData(type) {
        let data, filename;
        
        switch(type) {
            case 'clients':
                data = this.clients;
                filename = 'clientes.json';
                break;
            case 'products':
                data = this.products;
                filename = 'produtos.json';
                break;
            default:
                data = {
                    clients: this.clients,
                    products: this.products,
                    users: this.users.map(u => ({...u, password: '***'}))
                };
                filename = 'backup_completo.json';
        }
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showMessage('Exportação Concluída', `Dados exportados com sucesso como ${filename}`, 'success');
    }
}

// Funções Globais para acesso pelo HTML
let sistema;

function showScreen(screenId) {
    sistema.showScreen(screenId);
}

function logout() {
    sistema.logout();
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.target.closest('button').querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function searchClient() {
    const cpf = document.getElementById('clientCpf').value;
    if (!cpf) {
        sistema.showMessage('Aviso', 'Por favor, digite um CPF para buscar.', 'warning');
        return;
    }
    sistema.searchClient(cpf);
}

function searchProduct() {
    const ip = document.getElementById('productIp').value;
    if (!ip) {
        sistema.showMessage('Aviso', 'Por favor, digite um IP para buscar.', 'warning');
        return;
    }
    sistema.searchProduct(ip);
}

function closeModal() {
    sistema.closeModal();
}

// Inicialização do Sistema
document.addEventListener('DOMContentLoaded', () => {
    sistema = new SistemaCadastro();
    
    // Adicionar atalhos de teclado
    document.addEventListener('keydown', (e) => {
        // Ctrl + L para logout
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            if (sistema.currentUser) {
                logout();
            }
        }
        
        // Esc para fechar modal
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Prevenir duplo clique em botões
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('dblclick', (e) => {
            e.preventDefault();
        });
    });
});

// Exportar para debug
window.SistemaCadastro = SistemaCadastro;
