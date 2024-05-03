app.component("info-poke", {
    props: ['result', 'isfavorite', 'alltypes'],
    // evita warning del emit
    emits: ['add-favorite', 'delete-favorite'],
    methods: {
        AnadirFavoritos() {
            this.$emit("add-favorite");
        },
        eliminaFavorito() {
            this.$emit("delete-favorite");
        }
    },
    template: /*html*/
        `<div v-if="result" id="pokemonInfo">
            <h1>{{ result.name.charAt(0).toUpperCase() + result.name.slice(1) }}</h1>
            <img :src="result.sprites.front_default" :alt="pokemonName">
            <h2 v-show="result">Types</h2>
            <p v-for="pokemontype in alltypes">{{ pokemontype }}</p>
            <button v-if="isfavorite" @click="eliminaFavorito">Quitar favoritos</button>
            <button v-else @click="AnadirFavoritos">Añadir favoritos</button> 
        </div>
        <p v-else>No se ha encontrado nada, comprueba que el nombre este correctamente puesto</p>`
})