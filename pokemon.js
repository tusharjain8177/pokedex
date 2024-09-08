const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMsg = document.querySelector("#not-found-message");

let allPokemon = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemon = data.results;
    displayPokemon(allPokemon)
  });

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed To Load Data");
  }
}

function displayPokemon(pokemon) {
  listWrapper.innerHTML = "";

  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `<div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">#${pokemon.name}</p>
        </div>
    `;
    listItem.addEventListener("click", async () => {
        const success = await fetchPokemonDataBeforeRedirect(pokemonID);
        if (success){
            window.location.href = `./pokemon-details.html?id=${pokemonID}`;
        }
    });
    listWrapper.appendChild(listItem);
  });
}




searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim(); // Added trim to remove extra spaces
  let filterPokemons = [];

  console.log("Search Term:", searchTerm); // Debugging

  if (numberFilter.checked) {
    filterPokemons = allPokemon.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      console.log("Pokemon ID:", pokemonID); // Debugging
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filterPokemons = allPokemon.filter((pokemon) => {
      console.log("Pokemon Name:", pokemon.name); // Debugging
      return pokemon.name.toLowerCase().startsWith(searchTerm);
    });
  } else {
    filterPokemons = allPokemon;
  }

  console.log("Filtered Pokemons:", filterPokemons); // Debugging

  displayPokemon(filterPokemons);

  // Show or hide the "Not Found" message based on the results
  if (filterPokemons.length === 0) {
    notFoundMsg.style.display = "block";
  } else {
    notFoundMsg.style.display = "none";
  }
}


const closeSearch = document.querySelector(".search-close-icon");
closeSearch.addEventListener("click", clearSearch);

function clearSearch(){
    searchInput.value = ""
    displayPokemon(allPokemon)
}