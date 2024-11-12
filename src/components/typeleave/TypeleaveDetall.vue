<template>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Type Leave Details</h3>
          <div v-if="typeLeave">
            <p><strong>Name:</strong> {{ typeLeave.name }}</p>
            <router-link :to="{ name: 'list-type-leave' }" class="btn btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> Back to List
            </router-link>
          </div>
          <div v-else>
            <p>Loading type leave details...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { useTypeLeaveStore } from '@/store/typeLeaveStore';
  
  const route = useRoute();
  const toast = useToast();
  const typeLeaveStore = useTypeLeaveStore();
  
  const typeLeave = ref(null);
  
  // Charger les détails du type de congé
  const loadTypeLeaveDetails = async () => {
    try {
      console.log('Fetching details for type leave with ID:', route.params.id); // Vérifier l'ID passé dans l'URL
      typeLeave.value = await typeLeaveStore.getById(route.params.id);
      console.log('Loaded type leave details:', typeLeave.value); // Vérifier les données récupérées
    } catch (error) {
      console.error('Error loading type leave details:', error);
      toast.error('Could not load type leave details.');
    }
  };
  
  // Charger les détails lorsque le composant est monté
  onMounted(loadTypeLeaveDetails);
  </script>
  
  <style scoped>
  .card {
    max-width: 500px;
    width: 100%;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  h3.card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  </style>
  