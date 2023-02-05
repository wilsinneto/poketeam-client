<template>
  <div>
    <div class="text-center">
    <h1>Pokemons</h1>
    <router-link to="/">Home</router-link>
    </div>
    <br>
    <div class="container">
      <form>
        <div class="mb-3 col-4">
          <label for="name">Nome:</label>
          <input type="text" class="form-control" id="name" v-model="pokemon.name">
        </div>
        <div class="mb-3 col-4">
          <label for="specie">Espécie:</label>
          <input type="text" class="form-control" id="specie" v-model="pokemon.specie">
        </div>
        <div class="mb-3 col-8">
          <label for="imageUrl">URL da imagem:</label>
          <input type="text" class="form-control" id="imageUrl" v-model="pokemon.imageUrl">
        </div>
      </form>
      <button type="submit" class="btn btn-primary" @click="savePokemon">Salvar</button>
    </div>
    <br>
    <div class="container text-center" v-if="pokemons.length">
      <pokemon-list :pokemons="pokemons"/>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

import PokemonList from './PokemonList.vue'

export default {
  app: "Home",
  components: {
    PokemonList
  },
  data() {
    return {
      api: {},
      pokemon: {
        id: '',
        name: '',
        teamId: '',
        imageUrl: '',
        specie: ''
      },
      pokemons: []
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
      url: '/find-all-pokemons'
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
    if (status === 200) {
      this.pokemons = data
    }
  },
  methods: {
    async savePokemon() {
      const { data, status } = await this.api.request({
        method: 'POST',
        url: '/create-pokemon',
        data: this.pokemon
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

      if (status === 400 && data.name === 'MissingParamError') {
        alert('Os campos Nome e Espécie são obrigatórios.')
      }

      if (status === 201) {
        if (!this.pokemons.find(pokemon => pokemon.id === data.id)) {
          this.pokemons.push(data)
          this.pokemon = {}
        }
      }
    }
  }
}
</script>

<style></style>