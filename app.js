const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            image: data.sprites.front_default,
            id: data.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokeman => `
        <div class="pokemon">
            <img src="${pokeman.image}" alt="${pokeman.name}"/>
            <h2>${pokeman.id}. ${pokeman.name}</h2>
        </div>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}
