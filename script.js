// Array para armazenar os dados da safra
let dadosSafra = [];

// Elementos do DOM
const form = document.getElementById('safra-form');
const tipoInput = document.getElementById('tipo');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const tabelaCorpo = document.querySelector('#safra-table tbody');

// Elementos do Dashboard
const txtGanhos = document.getElementById('total-ganhos');
const txtGastos = document.getElementById('total-gastos');
const txtPerdido = document.getElementById('total-perdido');
const txtSaldo = document.getElementById('saldo-liquido');

// Função para formatar moeda em Real (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para atualizar os cards do painel principal
function atualizarDashboard() {
    let ganhos = 0;
    let gastos = 0;
    let perdido = 0;

    dadosSafra.forEach(item => {
        if (item.tipo === 'ganho') ganhos += item.valor;
        if (item.tipo === 'gasto') gastos += item.valor;
        if (item.tipo === 'perdido') perdido += item.valor;
    });

    const saldoLiquido = ganhos - gastos; // Perda física geralmente já reduz o ganho ou vira gasto, aqui calculamos ganho - gasto real.

    txtGanhos.textContent = formatarMoeda(ganhos);
    txtGastos.textContent = formatarMoeda(gastos);
    txtPerdido.textContent = formatarMoeda(perdido);
    txtSaldo.textContent = formatarMoeda(saldoLiquido);

    // Mudar a cor do saldo se for negativo
    if (saldoLiquido < 0) {
        txtSaldo.style.color = '#c62828';
    } else {
        txtSaldo.style.color = '#1565c0';
    }
}

// Função para renderizar a tabela na tela
function renderizarTabela() {
    tabelaCorpo.innerHTML = '';

    dadosSafra.forEach((item, index) => {
        const linha = document.createElement('tr');

        // Define a classe da tag baseada no tipo
        const badgeClasse = `badge badge-${item.tipo}`;
        const tipoTexto = item.tipo === 'ganho' ? 'Ganho' : item.tipo === 'gasto' ? 'Gasto' : 'Perda';

        linha.innerHTML = `
            <td><span class="${badgeClasse}">${tipoTexto}</span></td>
            <td>${item.descricao}</td>
            <td>${formatarMoeda(item.valor)}</td>
            <td><button class="btn-deletar" onclick="excluirItem(${index})">❌</button></td>
        `;

        tabelaCorpo.appendChild(linha);
    });
}

// Função para adicionar novo registro
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    const novoItem = {
        tipo: tipoInput.value,
        descricao: descricaoInput.value,
        valor: parseFloat(valorInput.value)
    };

    dadosSafra.push(novoItem);
    
    // Atualiza a tela
    renderizarTabela();
    atualizarDashboard();

    // Limpa o formulário
    descricaoInput.value = '';
    valorInput.value = '';
    tipoInput.focus();
});

// Função para excluir um item
function excluirItem(index) {
    dadosSafra.splice(index, 1);
    renderizarTabela();
    atualizarDashboard();
}