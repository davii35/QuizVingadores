const conteudos = {
    "ironman": {
        titulo: "Você é o Homem de Ferro!",
        referencia: "Gênio, bilionário, playboy, filantropo.",
        descricao: "Com uma mente afiada e respostas ainda mais rápidas, você sempre encontra uma saída criativa — mesmo que tenha que inventar no caminho. Sarcástico, cheio de atitude e estilo, você é o cérebro da equipe, mesmo quando está sendo teimoso(a). Por trás da arrogância charmosa, existe um coração gigante tentando fazer o certo. Você não veste uma armadura só por proteção, mas também por responsabilidade. Afinal, como você mesmo(a) diria: \"Eu sou o Homem de Ferro.\""
    },
    "blackwidow": {
        titulo: "Você é a Viúva Negra!",
        referencia: "Eu tenho dívidas vermelhas no meu registro... e quero apagá-las.",
        descricao: "Fria quando precisa, calculista quando convém, mas sempre com o coração no lugar certo. Você observa antes de agir, fala apenas o necessário, e quando se move... tudo já está sob controle. Seu passado pode ter sido complexo, mas hoje você luta pelo que acredita — sem precisar de aplausos. A confiança que depositam em você foi conquistada em silêncio. Um verdadeiro fantasma... com propósito."
    },
    "capitaoamerica": {
        titulo: "Você é o Capitão América!",
        referencia: "Eu posso fazer isso o dia todo.",
        descricao: "Corajoso(a), idealista e um verdadeiro(a) líder, você é movido(a) por princípios que não se dobram — mesmo quando o mundo inteiro diz o contrário. Você acredita em justiça, em fazer a coisa certa, e em nunca abandonar quem confia em você. Você não grita para comandar, lidera pelo exemplo. E se precisar ir até o fim por algo que acredita... ninguém vai te parar."
    },
    "hulk": {
        titulo: "Você é o Hulk!",
        referencia: "Esse é meu segredo, Capitão... eu estou sempre com raiva.",
        descricao: "Você tenta manter a calma, resolver as coisas com diálogo... mas quando chega ao limite, ninguém segura. Seu poder está na dualidade: entre a inteligência e o instinto, entre a razão e o caos. Por fora, talvez pareça inofensivo(a), mas por dentro há uma tempestade esperando o momento certo. E o mais incrível? Você aprende a conviver com isso — e transformar em força o que outros considerariam fraqueza."
    },
    "thor": {
        titulo: "Você é o Thor!",
        referencia: "Eu sou digno!",
        descricao: "Carismático(a), impulsivo(a) e com um senso de humor que atravessa reinos, você é pura energia. Gosta de viver com intensidade, de provar seu valor e de proteger os que ama com unhas, dentes... e trovões. Você já enfrentou perdas, dúvidas e inimigos poderosos, mas sua coragem permanece. No fim, você sabe: o poder não vem do martelo — vem de quem você é. E você é, sim, digno(a)."
    }
};

const titulo = document.querySelector(".titulo");
const referencia = document.querySelector(".referencia");
const descricao = document.querySelector(".descricao");
const btnVoltar = document.querySelector(".btn-voltar");

let personagemResultado;

function capturaResultado() {
    const parametros = new URLSearchParams(window.location.search);
    personagemResultado = parametros.get("resultado");
}

function insereImagens() {
    document.documentElement.style.setProperty("--background-image", `url(../img/bg-${personagemResultado}.jpg)`);
    document.documentElement.style.setProperty("--background-image-mobile", `url(../img/bg-${personagemResultado}--mobile.jpg)`);
}

function insereConteudo() {
    titulo.textContent = conteudos[personagemResultado].titulo;
    referencia.textContent = conteudos[personagemResultado].referencia;
    descricao.textContent = conteudos[personagemResultado].descricao;
    insereImagens();
}

btnVoltar.addEventListener("click", () => {
    window.location.href = "../index.html"
})

document.addEventListener("DOMContentLoaded", () => {
    capturaResultado();
    insereConteudo();
});