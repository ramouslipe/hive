function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ nome, preco });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Jogo adicionado ao carrinho!');
    window.location.href = "carrinho.html";
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('itens-carrinho');
    const totalSpan = document.getElementById('total');
    lista.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.nome}</strong> - R$ ${item.preco.toFixed(2)}
                        <button onclick="removerItem(${index})">Remover</button>`;
        lista.appendChild(li);
    });

    totalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}
