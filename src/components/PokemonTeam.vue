<template>
  <main id="main">
    <h1>Pokemon Team!</h1>
    <a href="#" @click="goBack">Home</a>
    <br>
    <br>
    <div class="container">
      <form>
        <div class="col-6">
          <label for="name" class="form-label">Nome:</label>
          <input type="text" id="name" v-model="pokemonTeam.name">
        </div>
        <div class="col-6">
          <label for="pokemonList" class="form-label">Espécie:</label>
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
              <td class="col-4"><a href="#" @click="removePokemonTeam(pokemonTeam)">Excluir</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'

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
      this.pokemonsList = data
    }

    const response = await this.api.request({
      method: 'GET',
      url: '/find-all-pokemon-team'
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
    async removePokemonTeam(pokemonsTeam) {
      const { data, status } = await this.api.request({
        method: 'DELETE',
        url: '/remove-pokemon-team/' + pokemonsTeam.id,
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
        return alert('Time de Pokemon não encontrado.')
      }

      const index = this.pokemonsTeam.findIndex(item => item.id === pokemonsTeam.id)

      this.pokemonsTeam.splice(index, 1)
    },
    async savePokemonTeam() {
      const { data, status } = await this.api.request({
        method: 'POST',
        url: '/create-pokemon-team',
        data: {
          name: this.pokemonTeam.name,
          pokemons: this.pokemonListSelected
        }
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
        if (!this.pokemonsTeam.find(pokemonTeam => pokemonTeam.id === data.id)) {
          this.pokemonsTeam.push(data)
          this.pokemonTeam = {}
          this.pokemonListSelected = []
        }
      }
    }
  }
}
</script>

<style>
a {
  cursor: pointer;
}
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