document.addEventListener('DOMContentLoaded', () => {
    // --- BANCO DE DADOS DE JOGOS ---
    // Contém todos os assets para cada jogo.
    const gameDatabase = {
        gta: {
            id: 'gta',
            cardImage: 'imagens/jogo4.png', // VOCÊ PRECISA CRIAR ESTA IMAGEM
            logoImage: 'imagens/embreve.png',
            trailerVideo: 'imagens/gta6video.mp4',
            fallbackImage: 'imagens/capagta.webp'
        },
        cs: {
            id: 'cs',
            cardImage: 'imagens/jogo1.png',
            logoImage: 'imagens/dispocs.png', // CRIE ESTE ARQUIVO
            trailerVideo: 'imagens/csvideo.mp4', // CRIE ESTE ARQUIVO
            fallbackImage: 'imagens/jogo1.png' // CRIE ESTE ARQUIVO
        },
        witcher: {
            id: 'witcher',
            cardImage: 'imagens/jogo2.png',
            logoImage: 'imagens/embrevewi.png', // CRIE ESTE ARQUIVO
            trailerVideo: 'imagens/wivideo.mp4', // CRIE ESTE ARQUIVO
            fallbackImage: 'imagens/jogo2.png' // CRIE ESTE ARQUIVO
        },
        amongus: {
            id: 'amongus',
            cardImage: 'imagens/jogo3.png',
            logoImage: 'imagens/dispoamong.png', // CRIE ESTE ARQUIVO
            trailerVideo: 'imagens/amongvideo.mp4', // CRIE ESTE ARQUIVO
            fallbackImage: 'imagens/jogo3.png' // CRIE ESTE ARQUIVO
        }
    };

    // --- ESTADO DA APLICAÇÃO ---
    let featuredGameId = 'gta';
    let cardSlots = ['cs', 'witcher', 'amongus']; // IDs dos jogos nos 3 slots de cards

    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    const backgroundVideo = document.getElementById('background-video');
    const videoSource = document.getElementById('video-source');
    const videoFallback = document.getElementById('video-fallback');
    const emBreveBtn = document.getElementById('em-breve-btn');
    const emBreveLogo = document.getElementById('em-breve-logo');
    const cardElements = [
        document.getElementById('card-img-0'),
        document.getElementById('card-img-1'),
        document.getElementById('card-img-2')
    ];

    // --- FUNÇÃO PRINCIPAL PARA ATUALIZAR A TELA ---
    function updateDisplay() {
        const featuredGame = gameDatabase[featuredGameId];
        
        // Esconde os elementos antes de trocar o conteúdo para uma transição suave
        backgroundVideo.style.opacity = '0';
        emBreveLogo.style.opacity = '0';
        cardElements.forEach(img => img.style.opacity = '0');

        setTimeout(() => {
            // Atualiza o vídeo, fallback e logo em destaque
            videoSource.src = featuredGame.trailerVideo;
            videoFallback.style.backgroundImage = `url('${featuredGame.fallbackImage}')`;
            emBreveLogo.src = featuredGame.logoImage;
            backgroundVideo.load();
            backgroundVideo.play().catch(e => console.error("Erro ao tocar vídeo:", e));

            // Atualiza os 3 cards visíveis
            cardSlots.forEach((gameId, index) => {
                const cardGame = gameDatabase[gameId];
                cardElements[index].src = cardGame.cardImage;
                cardElements[index].alt = cardGame.name;
            });
            
            // Mostra os elementos novamente
            backgroundVideo.style.opacity = '1';
            emBreveLogo.style.opacity = '1';
            cardElements.forEach(img => img.style.opacity = '1');

        }, 400); // Tempo da transição
    }

    // --- EVENT LISTENERS ---

    // Adiciona evento de clique para cada card
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            const slotIndex = parseInt(event.currentTarget.dataset.slotIndex, 10);
            
            const gameIdOfClickedCard = cardSlots[slotIndex];
            const gameIdToDemote = featuredGameId;

            // Atualiza o estado
            featuredGameId = gameIdOfClickedCard;
            cardSlots[slotIndex] = gameIdToDemote;

            // Atualiza a tela com base no novo estado
            updateDisplay();
        });
    });

    // Evento para resetar ao clicar na logo "Em Breve"
    emBreveBtn.addEventListener('click', () => {
        // Só reseta se o jogo em destaque não for o GTA
        if (featuredGameId !== 'gta') {
            const gameIdToDemote = featuredGameId;
            
            // Encontra o slot que está com o GTA e o troca pelo jogo que estava em destaque
            const gtaSlotIndex = cardSlots.indexOf('gta');
            if (gtaSlotIndex !== -1) {
                 cardSlots[gtaSlotIndex] = gameIdToDemote;
            }
           
            featuredGameId = 'gta';
            updateDisplay();
        }
    });

    // --- Outras lógicas que já existiam ---
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const emBreveContainer = document.querySelector('.em-breve');
    const gameCardsContainer = document.querySelector('.cards-jogos');

    playPauseBtn.addEventListener('click', () => {
        if (backgroundVideo.paused) {
            backgroundVideo.play();
            videoFallback.style.display = 'none';
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            emBreveContainer.classList.remove('animar-logo');
        } else {
            backgroundVideo.pause();
            videoFallback.style.display = 'block';
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            emBreveContainer.classList.add('animar-logo');
        }
    });

    muteBtn.addEventListener('click', () => {
        backgroundVideo.muted = !backgroundVideo.muted;
        muteBtn.innerHTML = backgroundVideo.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });
    muteBtn.innerHTML = backgroundVideo.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';

    document.addEventListener('mousemove', (event) => {
        const mouseY = event.clientY;
        const windowHeight = window.innerHeight;
        const triggerZone = 200;

        if (mouseY > windowHeight - triggerZone) {
            gameCardsContainer.classList.add('visible');
        } else {
            gameCardsContainer.classList.remove('visible');
        }
    });
});