<template>
  <div id="app">
    <!-- Affiche Navbar si la route n'est pas la page de connexion -->
    <Navbar v-if="$route.name !== 'login'" />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
</script>
