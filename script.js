// Função para mostrar a seção selecionada
function showSection(section) {
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('agendar').style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById(section).style.display = 'block';
    if (section === 'agendar') updateClientesSelect();
    if (section === 'admin') {
        updateListaClientes();
        updateListaAgendamentos();
    }
}

// Utilitários para localStorage
function getClientes() {
    return JSON.parse(localStorage.getItem('clientes') || '[]');
}
function setClientes(clientes) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}
function getAgendamentos() {
    return JSON.parse(localStorage.getItem('agendamentos') || '[]');
}
function setAgendamentos(agendamentos) {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

// Cadastro de cliente
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = this.nome.value.trim();
    const telefone = this.telefone.value.trim();
    if (!nome || !telefone) return;
    const clientes = getClientes();
    clientes.push({ nome, telefone });
    setClientes(clientes);
    this.reset();
    alert('Cliente cadastrado!');
});

// Atualiza select de clientes no agendamento
function updateClientesSelect() {
    const select = document.querySelector('#formAgendar select[name="cliente"]');
    select.innerHTML = '';
    getClientes().forEach((cliente, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = `${cliente.nome} (${cliente.telefone})`;
        select.appendChild(option);
    });
}

// Agendar horário
document.getElementById('formAgendar').addEventListener('submit', function(e) {
    e.preventDefault();
    const clienteIdx = this.cliente.value;
    const dataHora = this.dataHora.value;
    if (clienteIdx === '' || !dataHora) return;
    const clientes = getClientes();
    const cliente = clientes[clienteIdx];
    const agendamentos = getAgendamentos();
    agendamentos.push({ cliente, dataHora });
    setAgendamentos(agendamentos);
    this.reset();
    alert('Horário agendado!');
});

// Atualiza lista de clientes no admin
function updateListaClientes() {
    const ul = document.getElementById('listaClientes');
    ul.innerHTML = '';
    getClientes().forEach((cliente, idx) => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} (${cliente.telefone})`;
        ul.appendChild(li);
    });
}

// Atualiza lista de agendamentos no admin
function updateListaAgendamentos() {
    const ul = document.getElementById('listaAgendamentos');
    ul.innerHTML = '';
    getAgendamentos().forEach((ag, idx) => {
        const li = document.createElement('li');
        li.textContent = `${ag.cliente.nome} - ${ag.cliente.telefone} | ${ag.dataHora}`;
        ul.appendChild(li);
    });
}

// Mostra a seção de cadastro ao carregar
showSection('cadastro');