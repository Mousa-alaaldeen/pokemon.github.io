async function fetchAllPokemons() {
    const gridContainer = document.getElementById("pokemonGrid");
    const baseUrl="https://pokeapi.co/api/v2/pokemon";
    gridContainer.innerHTML = ''; 

    fetch(baseUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching the total number of Pokémon');
        }
        return response.json();
    })
    .then(data => {
        const totalPokemons = data.count; 
        console.log('===================================');
        console.log(totalPokemons);
        
        
        for (let i = 1; i <= totalPokemons; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(pokemonResponse => {
                    if (!pokemonResponse.ok) {
                        throw new Error(`Error fetching Pokémon ${i}`);
                    }
                    return pokemonResponse.json();
                })
                .then(pokemonData => {
                    const imgDiv = document.createElement('div');
                    imgDiv.classList.add('p-3', 'm-1', 'bg-danger-subtle');
                    const imgElement = document.createElement('img');
                    imgElement.src = pokemonData.sprites.front_default;
                    imgElement.alt = pokemonData.name;
                    const nameElement = document.createElement('p');
                    const a = document.createElement('a');
                    a.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
                    a.href = `index1.html?id=${i}`;
                    a.target = "_blank"; 
                    nameElement.appendChild(a);
                    imgDiv.appendChild(imgElement);
                    imgDiv.appendChild(nameElement);
                    gridContainer.appendChild(imgDiv);
                })
                .catch(error => {
                    console.error(`Error fetching Pokémon ${i}:`, error);
                });
        }
    })
    .catch(error => {
        console.error("Error fetching the total number of Pokémon:", error);
    });

}

window.onload = fetchAllPokemons;
