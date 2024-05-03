<template>
    <h2 id="h2favorite" v-show="favoritepokemonsbool">Favoritos</h2>
    <div id="divFavoritePokemon" v-show="favoritepokemonsbool">
        <div v-for="favoritePokemon in allfavoritepokemons" :key="favoritePokemon" class="favoritePokemon">
            <h3>{{ favoritePokemon.name.charAt(0).toUpperCase() + favoritePokemon.name.slice(1) }}</h3>
            <img :src="favoritePokemon.sprites.front_default" :alt="favoritePokemon.name">
        </div>
    </div>
</template>
<script>
export default {
    name: 'FavoritePokemon',
    props: ['favoritepokemonsbool', 'allfavoritepokemons'],
}
</script>
<style scoped></style>