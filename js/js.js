let carrinho = [];

let quantidades = {
    paoFrances: 1,
    paoAcucar: 1,
    croissant: 1,
    boloChocolate: 1
};







/* FUNCTION -  muda a quantidade de cada produto */
function mudarQtd(produto, valor){
    quantidades[produto] += valor;
    if(quantidades[produto] < 1) quantidades[produto] = 1;
    let spanQuantidade = document.getElementById("qtd-" + produto)
    spanQuantidade.textContent = quantidades[produto];
}

/* adicionar produto ao carrinho */

function adicionar(nome, preco, produto){
    let qtd = quantidades[produto];
    carrinho.push(
        {
            nome: nome,
            preco: preco,
            quantidade: qtd
        }
    );
    atualizarCarrinho();
}

/* atualizar e fazer cálculos do carrinho */

function atualizarCarrinho(){
    let lista = document.getElementById("listaCarrinho");
    lista.innerHTML = "";

    let subtotal = 0;

    if(carrinho.length === 0){
        lista.innerHTML = '<li> Seu carrinho está vazio.</li>';
    }else{
        for(let item of carrinho){
            let valorItem = item.preco * item.quantidade;
            subtotal += valorItem;
           lista.innerHTML = `<li>
                                <span>${item.quantidade}x${item.nome}</span>
                                <span>R$ ${valorItem.toFixed(2)}</span>
                            </li>`;
        }
    }

    /* Calcular o desconto */
    let totalItens = 0;
    for(let item of carrinho){
        totalItens += item.quantidade;
    }

    let percentualDesconto = 0;

    if(totalItens >= 10){
        percentualDesconto = 15;
    }else if(totalItens >= 5){
        percentualDesconto = 10;
    }else if(totalItens >= 3){
        percentualDesconto = 3;
    }

    let valorDesconto = subtotal * percentualDesconto / 100;
    let total = subtotal - valorDesconto;

    /* Exibir valores na tela */
    document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById("desconto").textContent = `- R$ ${valorDesconto.toFixed(2)}`;
    document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById("pontos").textContent = Math.floor(total);
    
    calcularTroco();
}

/* Calcular o troco */
function calcularTroco(){
    let textoTotal = document.getElementById("total").textContent.replace("R$ ", "");
    let total = Number.parseFloat(textoTotal);
    let valorPago = Number.parseFloat(document.getElementById("valorPago").value);

    if(valorPago && valorPago >= total){
        let troco = valorPago - total;
        document.getElementById('troco').textContent = `R$ ${troco.toFixed(2)}`;
    }else{
        document.getElementById('troco').textContent = "R$ 0,00";
    }
}

/* Finalizar pedido */
function finalizar(){
    if(carrinho.length === 0){
        alert("Adicione produtos ao carrinho primeiro!");
    }
    let msg = document.getElementById("mensagemFinal");
    msg.style.display = "block";
    msg.textContent = "✅ Pedido realizado com sucesso!";
    carrinho = [];
    atualizarCarrinho();
    document.getElementById("valorPago").value = "";
}

