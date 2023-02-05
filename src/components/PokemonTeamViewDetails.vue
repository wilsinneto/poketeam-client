<template>
  <div class="m-5">
    <a href="#" @click="goBack">Voltar</a>
    <br>
    <br>
    <br>
    <div class="card mb-3" style="max-width: 540px;">
      <div class="container">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title fw-bold">{{ pokemonTeam.name }}</h3>
              <p class="card-text"><span class="fw-bold">Id:</span> {{ this.$route.query }}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
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
    // adicionar get pokemon team
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
      url: '/find-pokemon-team' + this.$route.query.id
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