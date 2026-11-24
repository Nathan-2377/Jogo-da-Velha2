
document.addEventListener('DOMContentLoaded', function() {

    // Selecionando os elementos HTML
    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status');

    let jogadorAtual = 'Lua';
    let jogoAtivo = true;

    // Array que representa as nove casas
    let tabuleiro = ['', '', '', '', '', '', '', '', ''];

    // Possibilidades de vitória
    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Função responsável pelas jogadas
    function clica(event) {

        const celula = event.currentTarget;
        const indice = Array.from(celulas).indexOf(celula);

        // Impede jogar em casas ocupadas
        if (tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
        }

        // Registra a jogada
        tabuleiro[indice] = jogadorAtual;
        celula.appendChild(carregaImagem(jogadorAtual));

        // Verifica se houve vitória
        if (verifica(jogadorAtual)) {

            jogoAtivo = false;
            status.textContent = `O jogador ${jogadorAtual} venceu!`;

            // Reinicia automaticamente após 2 segundos
            setTimeout(resetJogo, 2000);

        } else if (tabuleiro.includes('')) {

            jogadorAtual = jogadorAtual === 'Lua' ? 'Sol' : 'Lua';

            status.textContent = `É a vez do jogador ${jogadorAtual}`;

        } else {

            // Caso todas as casas estejam ocupadas
            jogoAtivo = false;
            status.textContent = 'Empate!';

            // Reinicia automaticamente após 2 segundos
            setTimeout(resetJogo, 2000);
        }
    }

    // Verifica as combinações vencedoras
    function verifica(jogador) {

        for (const jogadas of possibilidades) {

            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                return true;
            }
        }

        return false;
    }

    // Carrega a imagem de cada personagem
    function carregaImagem(jogador) {

        const imagem = new Image();

        imagem.src = jogador === 'Lua'
            ? 'images/Lua.jpg'
            : 'images/Sol.jpg';

        imagem.alt = jogador;

        return imagem;
    }

    // Reinicia automaticamente a partida
    function resetJogo() {

        tabuleiro = ['', '', '', '', '', '', '', '', ''];

        jogoAtivo = true;
        jogadorAtual = 'Lua';

        // Limpa as imagens das nove casas
        celulas.forEach((celula) => {
            celula.textContent = '';
        });

        // Atualiza a mensagem
        status.textContent = 'É a vez do jogador Lua';
    }

    // Eventos de clique nas células
    celulas.forEach((celula) => {
        celula.addEventListener('click', clica);
    });

});
