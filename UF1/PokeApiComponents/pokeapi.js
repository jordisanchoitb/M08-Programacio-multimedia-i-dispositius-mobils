const app = Vue.createApp({ /* Creamos la app de vue. */
    data() {
        return {
            result: null,
            pokemon: "",
            favoritePokemons: new Map(),
            favoritePokemonsbool: false
        }
    },
    mounted() {
        if (localStorage.getItem("favoritePokemons")) {
            try {
                this.favoritePokemons = new Map(JSON.parse(localStorage.getItem("favoritePokemons")));
                if (this.favoritePokemons.size > 0) {
                    this.favoritePokemonsbool = true;
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
            //console.log(this.pokemon);
            let pokemon = this.pokemon.toLowerCase();

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
                });
        }
    }
});