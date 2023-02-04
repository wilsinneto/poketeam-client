<template>
  <main id="main">
    <h1>Pokemons!</h1>
    <router-link to="/">Voltar</router-link>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  app: "Home",
  data() {
    return {
      api: {}
    }
  },
  async created() {
    this.api = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}` + '/api',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-headers': '*',
        'access-control-allow-Methods': '*',
      },
    })

    // await this.api.request({
    //   method
    // })
  },
  methods: {
    
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