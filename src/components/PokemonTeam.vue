<template>
  <main id="main">
    <h1>Pokemon Team!</h1>
    <a @click="goBack">Voltar</a>
  </main>
</template>

<script>
export default {
  app: "Pokemon Team",
  methods: {
    goBack() {
      this.$router.go(-1);
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