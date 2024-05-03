<template>
    <form @submit.prevent="enviarPokemon">
        <input type="text" v-model="pokemon" placeholder="Nombre del pokemon">
        <button type="submit">Buscar</button>
    </form>
</template>
<script>
export default {
    name: 'SearchPokemon',
    emits: ['pokemonSeleccionado'],
    data() {
        return {
            pokemon: ''
        }
    },
    methods: {
        enviarPokemon() {
            this.$emit('pokemonSeleccionado', this.pokemon);
        }
    }
}
</script>
<style scoped></style>