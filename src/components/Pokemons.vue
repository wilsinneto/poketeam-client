<template>
  <main id="main">
    <h1>Pokemons!</h1>
    <router-link to="/">Home</router-link>
    <br>
    <br>
    <div class="container">
      <form>
        <div>
          <label for="name" class="form-label">Nome:</label>
          <input type="text" id="name" v-model="pokemon.name">
        </div>
        <div>
          <label for="specie" class="form-label">Espécie:</label>
          <input type="text" id="specie" v-model="pokemon.specie">
        </div>
        <div>
          <label for="imageUrl" class="form-label">URL da imagem:</label>
          <input type="text" id="imageUrl" v-model="pokemon.imageUrl">
        </div>
      </form>
        <button type="submit" class="btn btn-primary" @click="savePokemon">Salvar</button>
    </div>
    <br>
    <div class="container" v-if="pokemons.length">
      <pokemon-list :pokemons="pokemons"/>
    </div>
  </main>
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

<style>
#main {
  text-align: center;
  margin-top: 60px;
}
.section {
  max-width: 800px;
  height: 300px;
  margin: 80px auto 0 auto;
  display: flex; 
  align-items: center;
  justify-content: space-around;
  background-color: currentColor;
}
.link {
  text-decoration: none;
  height: 200px;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: #ccc;
}
.item{
  color: #2c3e50;
  margin-top: 43%;
}
</style>