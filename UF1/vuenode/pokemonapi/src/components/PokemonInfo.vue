<template>
    <div v-if="result" id="pokemonInfo">
        <h1>{{ result?.name.charAt(0).toUpperCase() + result?.name.slice(1) }}</h1>
        <img :src="result.sprites.front_default" :alt="pokemonName">
        <h2 v-show="result">Types</h2>
        <p v-for="pokemontype in alltypes" :key="pokemontype">{{ pokemontype }}</p>
        <button v-if="isfavorite" @click="eliminaFavorito">Quitar favoritos</button>
        <button v-else @click="AnadirFavoritos">Añadir favoritos</button>
    </div>
    <p v-else-if="errorsearch">Pokemon no encontrado (comprueba que el nombre este correctamente puesto)</p>
    <p v-else>Introduce un pokemon para buscar</p>
</template>
<script>
export default {
    name: 'PokemonInfo',
    props: ['result', 'isfavorite', 'alltypes', 'errorsearch'],
    emits: ['add-favorite', 'delete-favorite'],
    methods: {
        AnadirFavoritos() {
            this.$emit("add-favorite");
        },
        eliminaFavorito() {
            this.$emit("delete-favorite");
        }
    }
}
</script>
<style scoped>
p {
    text-align: center;
}
</style>