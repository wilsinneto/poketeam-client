<template>
  <div class="m-5">
    <span class="text-primary" style="cursor: pointer; text-decoration: underline;" @click="goBack">Pokemon Team</span>
    <br>
    <br>
    <br>
      <div class="container">
      <div class="card">
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
import axios from 'axios'
import PokemonList from './PokemonList.vue'

export default {
  name: 'PokemonTeamViewDetails',
  components: {
    PokemonList
  },
  data() {
    return {
      api: {},
      pokemonTeam: {
        id: '',
        name: '',
        pokemons: []
      }
    }
  },
  async created() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-headers': '*',
        'access-control-allow-Methods': '*',
      },
    })
    const { data, status } = await this.api.request({
      method: 'GET',
      url: `/find-pokemon-team/${this.$route.query.name}`
    })
    .catch(function (error) {
      if (error.response) {
        return {
          data: error.response.data,
          status: error.response.status
        }
      } else if (error.request) {
        return error.request
      } else {
        return error.message
      }
    });

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