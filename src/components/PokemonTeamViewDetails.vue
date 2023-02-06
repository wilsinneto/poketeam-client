<template>
  <div class="m-5">
    <span class="text-primary" style="cursor: pointer; text-decoration: underline;" @click="goBack">Voltar</span>
    <br>
    <br>
    <br>
    <div class="card">
      <div class="container">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title fw-bold">{{ pokemonTeam.name }}</h3>
              <br>
              <p class="card-text"><span class="fw-bold">Id:</span> {{ pokemonTeam.id }}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container" v-if="pokemonTeam.pokemons.length">
      <pokemon-list :pokemons="pokemonTeam.pokemons"/>
    </div>
  </div>
</template>

<script>
import PokemonList from './PokemonList.vue'

import { findPokemonTeam } from '@/services'

export default {
  name: 'PokemonTeamViewDetails',
  components: {
    PokemonList
  },
  data() {
    return {
      pokemonTeam: {
        id: '',
        name: '',
        pokemons: []
      }
    }
  },
  async created() {
    const { data, status } = await findPokemonTeam(this.$route.query.name)

    if (status === 400 && data.name === 'PokemonTeamNotFound') {
      alert('Pokémon não encontrado.')
    }

    if (status === 200) {
      this.pokemonTeam = data
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>