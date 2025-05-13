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

    const carregarImagemAtiva = (categoria) => {
        const config = categorias[categoria];
        const novoIndice = config.indice + 1;

        const criarImagem = (classe, src) => {
            const img = new Image();
            img.src = src;
            img.alt = `${categoria} ${novoIndice}`;
            img.classList.add(classe);
            return img;
        };

        if (categoria === 'olhos' || categoria === 'sobrancelhas') {
            if (config.imgEsquerda) config.container.removeChild(config.imgEsquerda);
            if (config.imgDireita) config.container.removeChild(config.imgDireita);

            config.imgEsquerda = criarImagem(`${categoria}-esquerda`, `./img/${config.prefixo}${novoIndice}.png`);
            config.imgDireita = criarImagem(`${categoria}-direita`, `./img/${config.prefixo}${novoIndice}.png`);

            config.container.appendChild(config.imgEsquerda);
            config.container.appendChild(config.imgDireita);
        } else {
            if (config.imgAtiva) config.container.removeChild(config.imgAtiva);

            const img = criarImagem(`${categoria}-option`, `./img/${config.prefixo}${novoIndice}.png`);
            config.container.appendChild(img);
            config.imgAtiva = img;
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
        };
    }

    const atualizarContador = () => {
        const config = categorias[categoriaAtiva];
        tintLabel.textContent = `${categoriaAtiva.charAt(0).toUpperCase() + categoriaAtiva.slice(1)} ${config.indice + 1}`;
    };

    for (const key in categorias) {
        carregarImagemAtiva(key);
    }
});
