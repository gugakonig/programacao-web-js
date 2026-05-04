const express = require("express");
const mustacheExpress = require("mustache-express");

const PORT = 8080;
const app = express();

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));

function campoVazio(valor) {
    return !valor || valor.trim() === "";
}

function prepararDados(dados) {
    const observacao = dados.observacao ? dados.observacao.trim() : "";

    return {
        nome: dados.nome ? dados.nome.trim() : "",
        sobrenome: dados.sobrenome ? dados.sobrenome.trim() : "",
        cpf: dados.cpf ? dados.cpf.trim() : "",
        data_nascimento: dados.data_nascimento || "",
        telefone: dados.telefone ? dados.telefone.trim() : "",
        cep: dados.cep ? dados.cep.trim() : "",
        endereco: dados.endereco ? dados.endereco.trim() : "",
        clinica: dados.clinica ? dados.clinica.trim() : "",
        especialidade: dados.especialidade ? dados.especialidade.trim() : "",
        data_hora_agendamento: dados.data_hora_agendamento || "",
        observacao: observacao,
        observacao_formatada: observacao === "" ? "Nenhuma observação informada." : observacao
    };
}

function validarDados(dados) {
    const erros = [];

    if (campoVazio(dados.nome)) {
        erros.push({ mensagem: "O campo Nome é obrigatório." });
    }

    if (campoVazio(dados.sobrenome)) {
        erros.push({ mensagem: "O campo Sobrenome é obrigatório." });
    }

    if (campoVazio(dados.cpf)) {
        erros.push({ mensagem: "O campo CPF é obrigatório." });
    }

    if (campoVazio(dados.data_nascimento)) {
        erros.push({ mensagem: "O campo Data de nascimento é obrigatório." });
    }

    if (campoVazio(dados.telefone)) {
        erros.push({ mensagem: "O campo Telefone é obrigatório." });
    }

    if (campoVazio(dados.cep)) {
        erros.push({ mensagem: "O campo CEP é obrigatório." });
    }

    if (campoVazio(dados.endereco)) {
        erros.push({ mensagem: "O campo Endereço é obrigatório." });
    }

    if (campoVazio(dados.clinica)) {
        erros.push({ mensagem: "O campo Clínica é obrigatório." });
    }

    if (campoVazio(dados.especialidade)) {
        erros.push({ mensagem: "O campo Especialidade é obrigatório." });
    }

    if (campoVazio(dados.data_hora_agendamento)) {
        erros.push({ mensagem: "O campo Data e hora do agendamento é obrigatório." });
    } else {
        const dataAgendamento = new Date(dados.data_hora_agendamento);
        const dataAtual = new Date();

        if (isNaN(dataAgendamento.getTime())) {
            erros.push({ mensagem: "A data e hora do agendamento são inválidas." });
        } else if (dataAgendamento <= dataAtual) {
            erros.push({
                mensagem: "A data e hora do agendamento devem ser superiores à data atual."
            });
        }
    }

    return erros;
}

app.get("/", (req, res) => {
    res.render("index.html", {
        erros: [],
        dados: {}
    });
});

app.post("/agendamento", (req, res) => {
    const dados_agendamento = prepararDados(req.body);
    const erros = validarDados(dados_agendamento);

    if (erros.length > 0) {
        return res.render("index.html", {
            erros: erros,
            dados: dados_agendamento
        });
    }

    res.render("agendamento.html", {
        dados_agendamento: dados_agendamento
    });
});

app.listen(PORT, () => {
    console.log("Aplicação rodando em http://localhost:" + PORT);
});