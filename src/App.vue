<template>
  <div id="app">
   <!-- Affiche Navbar sauf sur les pages login et forgot-password -->
   <Navbar v-if="$route.name !== 'login' && $route.name !== 'ForgotPassword' && $route.name !== 'ResetPassword'" />

    
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
