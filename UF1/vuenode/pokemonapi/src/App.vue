<template>
  <SearchPokemon @pokemonSeleccionado="guardarPokemon"/>

  <PokemonInfo :result="result" :errorsearch="errorsearch" :isfavorite="isFavorite" :alltypes="allTypes" @add-favorite="AnadirFavoritos"
    @delete-favorite="eliminaFavorito" />

  <FavoritePokemon :favoritepokemonsbool="favoritePokemonsbool" :allfavoritepokemons="allFavoritePokemons" />
</template>

<script>
import PokemonInfo from './components/PokemonInfo.vue';
import SearchPokemon from './components/SearchPokemon.vue';
import FavoritePokemon from './components/FavoritePokemon.vue';

export default {
  name: 'App',
  components: {
    PokemonInfo,
    SearchPokemon,
    FavoritePokemon
  },
  data() {
    return {
      result: null,
      pokemon: "",
      favoritePokemons: new Map(),
      favoritePokemonsbool: false,
      errorsearch: false
    }
  },
  mounted() {
    if (localStorage.getItem("favoritePokemons")) {
      try {
        this.favoritePokemons = new Map(JSON.parse(localStorage.getItem("favoritePokemons")));
        if (this.favoritePokemons.size > 0) {
          this.favoritePokemonsbool = true;
        } else {
          this.favoritePokemons = new Map();
        }
      }
      catch (e) {
        console.log(e);
        localStorage.removeItem("favoritePokemons");
      }
    }
  },
  computed: {
    isFavorite() {
      return this.favoritePokemons.has(this.result?.name);
    },
    allFavoritePokemons() {
      return Array.from(this.favoritePokemons.values());
    },
    allTypes() {
      return this.result?.types.map(type => type.type.name);
    }
  },
  methods: {
    guardarPokemon(pokemon) {
      this.pokemon = pokemon;
      this.conectarAPI();
    },
    AnadirFavoritos() {
      this.favoritePokemons.set(this.result?.name, this.result);
      this.UpdateLocalStorage();
      this.favoritePokemonsbool = true;
    },

    eliminaFavorito() {
      this.favoritePokemons.delete(this.result?.name);
      this.UpdateLocalStorage();
    },

    UpdateLocalStorage() {
      localStorage.setItem("favoritePokemons", JSON.stringify(Array.from(this.favoritePokemons.entries())));
    },

    conectarAPI() {
      if (this.pokemon === "") {
        this.result = null;
        this.errorsearch = false;
        return;
      }
      //console.log(this.pokemon);
      let pokemon;
      try {
        pokemon = this.pokemon.toLowerCase();
      } catch (error) {
        console.log(error);
        this.result = null;
        this.errorsearch = true;
        return;
      }
      const options = {
        method: "GET",
        cache: "default"
      };
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon, options)
        .then(response => response.json())
        .then(data => {
          this.result = data;
        })
        .catch(error => {
          console.log(error);
          this.result = null;
          this.errorsearch = true;
        });
    }
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#app>form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

#app>form>input {
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #a8a5a5;
}

#app>form>button {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #a8a5a5;
  background-color: #f0f0f0;
  cursor: pointer;
}

#pokemonInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
}

.favoritePokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
}

#divFavoritePokemon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  flex-wrap: wrap;
}

#h2favorite {
  text-align: center;
}
</style>
