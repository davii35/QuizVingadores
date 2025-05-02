const form = document.querySelector(".quiz");
const inputResultado = document.querySelector("#input-resultado");
const sessaoApresentacao = document.querySelector(".apresentacao");
const sessaoQuiz = document.querySelector(".quiz");
const btnComecar = document.querySelector(".apresentacao__btn-comecar");
const listaBtnProxima = document.querySelectorAll(".pergunta__btn-proxima");

const gabarito = [
    { A: "blackwidow", B: "ironman", C: "hulk", D: "capitaoamerica", E: "thor" },
    { A: "capitaoamerica", B: "ironman", C: "blackwidow", D: "hulk", E: "thor" },
    { A: "capitaoamerica", B: "thor", C: "blackwidow", D: "hulk", E: "ironman" },
    { A: "thor", B: "ironman", C: "capitaoamerica", D: "hulk", E: "blackwidow" },
    { A: "capitaoamerica", B: "ironman", C: "blackwidow", D: "hulk", E: "thor" },
    { A: "ironman", B: "capitaoamerica", C: "blackwidow", D: "thor", E: "hulk" },
    { A: "capitaoamerica", B: "blackwidow", C: "hulk", D: "thor", E: "ironman" },
];

const tabelaPontos = {
    ironman: 0,
    capitaoamerica: 0,
    blackwidow: 0,
    hulk: 0,
    thor: 0
};

let resultadoFinal = "", indicePergunta, listaRespostasDoUsuario = [], listaPerguntas = [];

function alternaVisibilidadeEntreSessoes() {
    sessaoApresentacao.classList.toggle("sessao-oculta");
    sessaoQuiz.classList.toggle("sessao-oculta");
}

function avancaPergunta() {
    const perguntaAtual = listaPerguntas[indicePergunta]
    const perguntaSeguinte = listaPerguntas[indicePergunta + 1];
    perguntaAtual.style.opacity = 0;
    setTimeout(() => {
        perguntaAtual.classList.remove("pergunta-atual");
        perguntaSeguinte.classList.add("pergunta-atual");
    }, 200);
}

function salvaResposta(resposta) {
    listaRespostasDoUsuario[indicePergunta] = resposta;
}

function validaResposta() {
    const perguntaAtual = listaPerguntas[indicePergunta];
    const listaInputs = perguntaAtual.querySelectorAll("input");

    for (let input of listaInputs) {
        if (input.checked) {
            salvaResposta(input.value);
            input.checked = false;
            return true
        }
    }
}

function obtemListaPerguntas() {
    listaPerguntas = document.querySelectorAll(".form__pergunta");
}

function calculaPontos() {
    for (let i = 0; i < listaRespostasDoUsuario.length; i++) {
        let resposta = listaRespostasDoUsuario[i];
        let personagem = gabarito[i][resposta];
        tabelaPontos[personagem]++;
    }
}

function identificaMaisVotados() {
    let maiorPontuacao = 0;
    let personagensEscolhidos = [];
    let listaTabelaPontos = Object.entries(tabelaPontos);

    listaTabelaPontos.forEach((personagem) => {
        let nomePersonagem = personagem[0];
        let pontosPersonagem = personagem[1];

        if (pontosPersonagem > maiorPontuacao) {
            maiorPontuacao = pontosPersonagem;
            personagensEscolhidos = [nomePersonagem];
        } else if (pontosPersonagem === maiorPontuacao) {
            personagensEscolhidos.push(nomePersonagem);
        }
    })

    if (personagensEscolhidos.length === 1) {
        return personagensEscolhidos;
    } else {
        let indiceAleatorio = Math.floor(Math.random() * personagensEscolhidos.length)
        return personagensEscolhidos[indiceAleatorio];
    }
}

function calculaResultado() {
    calculaPontos();
    resultadoFinal = identificaMaisVotados();
}

function verificaFimDoQuiz() {
    if (indicePergunta + 1 === listaPerguntas.length) return true
}

function iniciaQuiz() {
    alternaVisibilidadeEntreSessoes();
    obtemListaPerguntas();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculaResultado();
    const urlComResultado = `resultado.html?resultado=${encodeURIComponent(resultadoFinal)}`;
    window.location.href = urlComResultado;
})

listaBtnProxima.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        indicePergunta = Number(event.target.dataset.indice);
        if (validaResposta() && !verificaFimDoQuiz()) avancaPergunta();
    })
})

btnComecar.addEventListener("click", iniciaQuiz);