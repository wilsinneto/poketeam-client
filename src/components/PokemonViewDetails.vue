<template>
  <div class="m-5">
    <span class="text-primary" style="cursor: pointer; text-decoration: underline;" @click="goBack">Voltar</span>
    <br>
    <br>
    <br>
    <div class="card mb-3" style="max-width: 540px;">
      <div class="container">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="this.$route.query.data.imageUrl" class="img-fluid rounded-start" :alt="this.$route.query.data.name">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title fw-bold">{{ this.$route.query.data.name }}</h3>
              <p class="card-text"><span class="fw-bold">Id:</span> {{ this.$route.query.data.id }}</p>
              <p class="card-text"><span class="fw-bold">Espécie:</span> <span class="text-primary">{{ this.$route.query.data.specie }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>