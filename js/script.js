//pegar no html
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.image_pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const botaoPrev = document.querySelector('.btn-prev');
const botaoNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => { //achar o pokemon

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIresponse.status == 200)
    {
        const data = await APIresponse.json(); //pegar todos os dados do pakemon(a api esta em .json)
        return data;
    }    
}

const rendePokemon = async (pokemon) => { //pegar a imagem do pokemon

    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);
    if(data)
    {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name; //na Api tem uma variavel name q estou chamando no meu script agora
        pokemonNumber.innerHTML = data.id; //na Api tem uma variavel ID q estou chamando no meu script agora
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
        input.value = '';
    }else{
        pokemonImage.style.display = 'none';

        pokemonNumber.innerHTML = 0;
        pokemonName.innerHTML = 'Nao existe :c'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    rendePokemon(input.value.toLowerCase());

});
botaoPrev.addEventListener('click', () => {
    if(searchPokemon > 1)
    {
        searchPokemon--;
        rendePokemon(searchPokemon)
    }
});
botaoNext.addEventListener('click', () => {
    searchPokemon++;
    rendePokemon(searchPokemon)
});

rendePokemon(searchPokemon);