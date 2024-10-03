const baseUrl='https://pokeapi.co/api/v2/pokemon/';
async function fetchPokemonDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');


    try {
        const response = await fetch(`${baseUrl}${pokemonId}`);
        const data = await response.json();

        document.getElementById('pokemonName').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById('pokemonImage').src = data.sprites.front_default;
        document.getElementById('pokemonHeight').textContent = data.height / 10 + ' m'; // Convert decimetres to meters
        document.getElementById('pokemonWeight').textContent = data.weight / 10 + ' kg'; // Convert hectograms to kilograms

        const abilitiesList = document.getElementById('abilitiesList');
        data.abilities.forEach(ability => {
            const listItem = document.createElement('li');
            listItem.textContent = ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
            abilitiesList.appendChild(listItem);
        });
    } catch (error) {
        console.error(`Error fetching Pokémon details:`, error);
    }
}

window.onload = fetchPokemonDetails;