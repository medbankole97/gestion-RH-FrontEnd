<template>
  <div id="app">
    <!-- Affiche Navbar si la route n'est pas la page de connexion -->
    <Navbar v-if="$route.name !== 'login'" />
    
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/Navbar.vue';

// Récupère le store d'authentification
const authStore = useAuthStore();

// Vérifie l'authentification au démarrage de l'application
onMounted(() => {
  authStore.checkAuth();
});
</script>
