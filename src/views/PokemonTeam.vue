<template>
  <div>
    <div class="text-center">
      <h1>Pokemon Team</h1>
      <span class="text-primary" style="cursor: pointer; text-decoration: underline;" @click="goBack">Home</span>
    </div>
    <br>
    <div class="container">
      <form>
        <div class="mb-3 col-4">
          <label for="name" class="form-label">Nome:</label>
          <input type="text" id="name" class="form-control" v-model="pokemonTeam.name">
        </div>
        <div class="mb-3 col-4">
          <label for="pokemonList" class="form-label">Lista de pokémons:</label>
          <multiselect 
            v-model="pokemonListSelected" 
            track-by="name"
            label="name"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :options="pokemonsList"
          />
        </div>
      </form>
      <br>
      <button type="submit" class="btn btn-primary" @click="savePokemonTeam">Salvar</button>
      <br>
      <br>
    </div>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="col-4">Id</th>
                <th class="col-4">Nome</th>
                <th class="col-4">Opções</th>
              </tr>
            </thead>
            <tbody v-for="pokemonTeam in pokemonsTeam" :key="pokemonTeam.id">
              <tr>
                <td class="col-4">{{ pokemonTeam.id }}</td>
                <td class="col-4"><span class="text-success" style="cursor: pointer;" @click="openPokemonTeamViewDetails(pokemonTeam)">{{ pokemonTeam.name }}</span></td>
                <td class="col-4"><span class="text-primary" style="cursor: pointer; text-decoration: underline;" @click="removePokemonTeam(pokemonTeam)">Excluir</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

import { createPokemonTeam, findAllPokemonTeam, findAllPokemons, removePokemonTeam } from '@/services'

export default {
  app: "Pokemon Team",
  components: {
    Multiselect
  },
  data() {
    return {
      pokemonTeam: {
        name: '',
        pokemons: []
      },
      pokemonsList: [],
      pokemonListSelected: [],
      pokemonsTeam: []
    }
  },
  async created() {
    const { data, status } = await findAllPokemons()

    if (status === 200) {
      this.pokemonsList = data
    }

    const response = await findAllPokemonTeam()

    if (response.status === 200) {
      this.pokemonsTeam = response.data
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    openPokemonTeamViewDetails(pokemonTeam) {
      this.$router.push({ path: '/pokemon-team-view-details', query: { name: pokemonTeam.name } })
    },
    async removePokemonTeam(pokemonTeam) {
      const { data, status } = await removePokemonTeam(pokemonTeam.id)

      if (status === 400 && data.name === 'PokemonTeamNotFound') {
        return alert('Time de Pokemon não encontrado.')
      }

      const index = this.pokemonsTeam.findIndex(item => item.id === pokemonTeam.id)

      this.pokemonsTeam.splice(index, 1)
    },
    async savePokemonTeam() {
      const { data, status } = await createPokemonTeam({
        name: this.pokemonTeam.name,
        pokemons: this.pokemonListSelected
      })

      if (status === 400 && data.name === 'MissingParamError') {
        alert('O campo Nome é obrigatório.')
      }

      if (status === 400 && data.name === 'InvalidSpecieAlreadyExist') {
        alert('Lista de pokémons não pode conter dois ou mais da mesma espécie.')
      }
      
      if (status === 400 && data.name === 'InvalidPokemonsQuantity') {
        alert('Quantidade de pokémons por time não pode ser maior do que 6.')
      }

      if (status === 400 && data.name === 'InvalidNameError') {
        alert('Campo nome deve ter ao menos 3 caracteres.')
      }

      if (status === 201) {
        const pokemonTeam = this.pokemonsTeam.find(pokemonTeam => pokemonTeam.id === data.id)

        if (pokemonTeam) {
          return alert('Pokémon com mesmo nome já cadastrado.')
        }

        this.pokemonsTeam.push(data)
        this.pokemonTeam = {}
        this.pokemonListSelected = []
      }
    }
  }
}
</script>

<style></style>