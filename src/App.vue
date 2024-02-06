<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to = "/">Inicio</RouterLink>
      <RouterLink to = "/search">Buscar</RouterLink>
      <RouterLink to = "/contact">Soporte</RouterLink>
      <RouterLink to = "/access">Acceder</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>

</style>