<template>
  <main id="main">
    <h1>Olá, Seja bem vindo ao seu sistema de Pokéteam!</h1>
    <section class="section">
      <a class="link" rel="pokemons" @click="toPokemons()">
        <div class="item">
          Pokémons
        </div>
      </a>
      <a class="link" rel="pokemon-team" @click="toPokemonTeam()">
        <div class="item">
          Pokémon Team
        </div>
      </a>
    </section>
  </main>
</template>

<script>
export default {
  app: "Home",
  methods: {
    toPokemons() {
      this.$router.push("/pokemons");
    },
    toPokemonTeam() {
      this.$router.push("/pokemon-team")
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