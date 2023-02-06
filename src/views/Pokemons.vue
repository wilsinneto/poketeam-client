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

<script>
import { findAllPokemons, createPokemon } from '@/services'

import PokemonList from '@/components/PokemonList.vue'

export default {
  app: "Home",
  components: {
    PokemonList
  },
  data() {
    return {
      pokemon: {
        id: '',
        name: '',
        teamId: null,
        imageUrl: '',
        specie: ''
      },
      pokemons: []
    }
  },
  async created() {
    const { data, status } = await findAllPokemons()

    if (status === 200) {
      this.pokemons = data
    }
  },
  methods: {
    async savePokemon() {
      const { data, status } = await createPokemon(this.pokemon)

      if (status === 400 && data.name === 'MissingParamError') {
        return alert('Os campos Nome e Espécie são obrigatórios.')
      }

      if (status === 201) {
        const pokemon = this.pokemons.find(pokemon => pokemon.id === data.id)

        if (pokemon) {
          return alert('Pokémon com mesmo nome já cadastrado.')
        }

        this.pokemons.push(data)
        this.pokemon = {}
      }
    }
  }
}
</script>

<style></style>