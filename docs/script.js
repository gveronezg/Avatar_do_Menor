document.addEventListener('DOMContentLoaded', () => {
    const categorias = {
        pele: {
            container: document.querySelector('.pele'),
            prefixo: 'pele',
            maxItems: 8,
            indice: 0,
            imgAtiva: null
        },
        cabelo: {
            container: document.querySelector('.cabelo'),
            prefixo: 'cabelo',
            maxItems: 14,
            indice: 0,
            imgAtiva: null
        },
        olhos: {
            container: document.querySelector('.olhos'),
            prefixo: 'olho',
            maxItems: 5,
            indice: 0,
            imgEsquerda: null,
            imgDireita: null
        },
        boca: {
            container: document.querySelector('.boca'),
            prefixo: 'boca',
            maxItems: 7,
            indice: 0,
            imgAtiva: null
        },
        nariz: {
            container: document.querySelector('.nariz'),
            prefixo: 'nariz',
            maxItems: 24,
            indice: 0,
            imgAtiva: null
        },
        sobrancelhas: {
            container: document.querySelector('.sobrancelhas'),
            prefixo: 'sobrancelha',
            maxItems: 5,
            indice: 0,
            imgEsquerda: null,
            imgDireita: null
        }
    };

    let categoriaAtiva = 'pele';
    const tintLabel = document.getElementById('tint-label');
    const descricao = document.getElementById('descricao');

    // Array com os nomes das peles na ordem dos índices
    const nomesPele = [
        "Branca Clara",
        "Branca Média",
        "Amarela (Asiático)",
        "Parda (Mista)",
        "Indígena",
        "Preta Clara",
        "Preta Média",
        "Preta Escura"
    ];

    // Objeto com as descrições das peles
    const descricoesPele = {
        "Branca Clara": "A pele branca clara tem origem principalmente entre populações do norte da Europa, onde a baixa exposição solar favoreceu, ao longo de milênios, a seleção de peles mais claras para facilitar a síntese de vitamina D.",
        "Branca Média": "Presente em regiões do sul da Europa e partes do Oriente Médio, esse tom de pele tem raízes em populações que viviam em áreas com mais sol, mas que ainda apresentavam predominância de características europeias, com uma leve pigmentação natural.",
        "Amarela (Asiático)": "Com origem nas populações da Ásia Oriental, como chineses, japoneses e coreanos, o tom de pele amarelo é resultado de adaptações ambientais e genéticas ao clima e à radiação solar, combinadas com traços genéticos únicos dessas regiões.",
        "Parda (Mista)": "A pele parda reflete a mistura genética entre europeus, africanos e indígenas, especialmente evidente em países como o Brasil, sendo fruto direto dos intensos processos de miscigenação desde a colonização das Américas.",
        "Indígena": "Os povos indígenas das Américas têm tons de pele variados, geralmente de cobreado a bronzeado, originados de antigas migrações humanas da Ásia pelo estreito de Bering há mais de 15 mil anos, adaptando-se aos diferentes climas do continente.",
        "Preta Clara": "Com raízes principalmente em regiões do norte e centro da África, como Etiópia e Sudão, esse tom reflete uma combinação de ancestralidade subsaariana com influências de povos árabes e núbios ao longo dos séculos.",
        "Preta Média": "Muito comum na África Ocidental, esse tom está associado a populações que viveram por milênios em regiões de alta radiação solar, o que favoreceu a seleção de uma maior quantidade de melanina para proteger a pele.",
        "Preta Escura": "Associado a regiões como Sudão do Sul, Níger e partes do Congo, esse tom de pele é um dos mais ricos em melanina do mundo, resultado de adaptações genéticas a ambientes com intensa exposição solar ao longo de milhares de anos."
    };

    const criarImagem = (classe, src, categoria, novoIndice) => {
        const img = new Image();
        img.src = src;
        img.alt = `${categoria} ${novoIndice}`;
        img.classList.add(classe);
        return img;
    };

    const carregarImagemAtiva = (categoria) => {
        const config = categorias[categoria];
        const novoIndice = config.indice + 1;

        if (categoria === 'olhos' || categoria === 'sobrancelhas') {
            if (config.imgEsquerda) config.container.removeChild(config.imgEsquerda);
            if (config.imgDireita) config.container.removeChild(config.imgDireita);

            config.imgEsquerda = criarImagem(`${categoria}-esquerda`, `./img/${config.prefixo}${novoIndice}.png`, categoria, novoIndice);
            config.imgDireita = criarImagem(`${categoria}-direita`, `./img/${config.prefixo}${novoIndice}.png`, categoria, novoIndice);

            config.container.appendChild(config.imgEsquerda);
            config.container.appendChild(config.imgDireita);
        } else {
            if (config.imgAtiva) config.container.removeChild(config.imgAtiva);

            config.imgAtiva = criarImagem(`${categoria}-option`, `./img/${config.prefixo}${novoIndice}.png`, categoria, novoIndice);
            config.container.appendChild(config.imgAtiva);
        }

        // Atualiza o texto da descrição somente para a pele
        if (categoria === 'pele') {
            const nomePeleAtual = nomesPele[config.indice];
            descricao.textContent = descricoesPele[nomePeleAtual] || '';
        }
    };

    const navegar = (direcao) => {
        const config = categorias[categoriaAtiva];
        config.indice = direcao === 'proxima'
            ? (config.indice + 1) % config.maxItems
            : (config.indice - 1 + config.maxItems) % config.maxItems;

        carregarImagemAtiva(categoriaAtiva);
        atualizarContador();
    };

    window.esquerda = () => navegar('anterior');
    window.direita = () => navegar('proxima');

    for (const key in categorias) {
        window[key] = () => {
            categoriaAtiva = key;
            atualizarContador();
            carregarImagemAtiva(categoriaAtiva);
        };
    }

    const atualizarContador = () => {
        const config = categorias[categoriaAtiva];
        if (tintLabel) {
            tintLabel.textContent = `${categoriaAtiva.charAt(0).toUpperCase() + categoriaAtiva.slice(1)} ${config.indice + 1}`;
        }
    };

    // Inicializa todas as categorias
    for (const key in categorias) {
        carregarImagemAtiva(key);
    }

    // Função chamada ao clicar no botão Concluir
    function concluirAvatar() {
        // Pega o índice atual da pele
        const indicePeleAtual = categorias.pele.indice;
    
        // Usa o índice para pegar o nome da pele
        const nomePeleAtual = nomesPele[indicePeleAtual] || 'desconhecida';
    
        const declarando = nomePeleAtual.split(' ')[0];
        const mensagem = `Seu avatar sugere declarar sua pele como: ${declarando}\n\nPara confirmar esta declaração clique em OK, caso contrário clique em Cancelar.`;
    
        if (confirm(mensagem)) {
            window.location.href = 'index.html?msg=registro_concluido';
        }
        // Se cancelar, o usuário continua editando
    }

    // Registra o event listener do botão Concluir
    const btnConcluir = document.getElementById('btnConcluir');
    if (btnConcluir) {
        btnConcluir.addEventListener('click', concluirAvatar);
    }
});
