<template>
  <div class="card">
    <div class="card-body">
      <ul class="list-group">
        <div class="card-group">
          <div class="card d-flex flex-row">
            <li class="list-group-item" v-for="pokemon in pokemons" :key="pokemon.id">
              <div style="cursor: pointer;" @click="openPokemonViewDetail(pokemon)">
                <img :src="pokemon.imageUrl" class="card-img-top" :alt="pokemon.name">
                <div class="card-body">
                    <h5 class="card-title">{{ pokemon.name }}</h5>
                    <span class="text-primary">{{ pokemon.specie }}</span>
                </div>
              </div>
            </li>
          </div>
        </div>
      </ul>
    </div>
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

</style>