<template>
  <div class="pokemon-grid" style="">
    <li class="list-group-item" v-for="pokemon in pokemons" :key="pokemon.id">
      <div style="cursor: pointer;" @click="openPokemonViewDetail(pokemon)">
        <img style="max-width: 167px; max-height: 247px;" :src="pokemon.imageUrl" :alt="pokemon.name">
        <div>
          <h5 class="card-title">{{ pokemon.name }}</h5>
          <span class="text-primary">{{ pokemon.specie }}</span>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "PokemonList",
  props: ["pokemons"],
  methods: {
    openPokemonViewDetail(pokemon) {
      this.$router.push({ path: "/pokemon-view-details", query: { data: pokemon } })
    }
  }
}
</script>

<style>
.pokemon-grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.pokemon-grid::after {
  flex: 1;
}
</style>