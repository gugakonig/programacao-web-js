const express = require('express');
const app = express();

const PORT = 3000;

let estoque = [];

// adicionar
app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;

    estoque.push({
        id: Number(id),
        nome: nome,
        quantidade: Number(qtd)
    });

    res.send('Produto adicionado!');
});

// listar
app.get('/listar', (req, res) => {
    res.json(estoque);
});

// remover
app.get('/remover/:id', (req, res) => {
    const id = Number(req.params.id);
    estoque = estoque.filter(p => p.id !== id);
    res.send('Produto removido!');
});

// editar
app.get('/editar/:id/:qtd', (req, res) => {
    const id = Number(req.params.id);
    const qtd = Number(req.params.qtd);

    const produto = estoque.find(p => p.id === id);

    if (produto) {
        produto.quantidade = qtd;
        res.send('Produto atualizado!');
    } else {
        res.send('Produto não encontrado');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});