<!-- src/components/TimeTrackingDetail.vue -->
<template>
    <div class="container-fluid">
      <h2 class="text-center mb-4">Time Tracking Details</h2>
  
      <div class="mb-3">
        <strong>Check-in Time:</strong>
        <p>{{ timeTracking.checkin_time }}</p>
      </div>
  
      <div class="mb-3">
        <strong>Check-out Time:</strong>
        <p>{{ timeTracking.checkout_time || 'N/A' }}</p>
      </div>
  
      <div class="mb-3">
        <strong>User:</strong>
        <p>{{ getUserFullName(timeTracking.userId) }}</p>
      </div>
  
      <router-link to="/list-time-tracking" class="btn btn-secondary">Back to List</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTimeTrackingStore } from '@/store/timetrackingStore';
  import { useUserStore } from '@/store/userStore';
  
  const route = useRoute();
  const timeTrackingStore = useTimeTrackingStore();
  const userStore = useUserStore();
  
  const timeTracking = ref({});
  
  // Charger les données de l'enregistrement de pointage et les utilisateurs
  onMounted(async () => {
    await userStore.loadDataFromApi();
    timeTracking.value = await timeTrackingStore.getById(route.params.id);
  });
  
  const getUserFullName = (userId) => {
    const user = userStore.users.find((u) => u.id === userId);
    return user ? user.fullname : 'Unknown';
  };
  </script>
  
  <style scoped>
  .container-fluid {
    padding: 20px 2em;
    margin-top: 50px;
    min-height: 80vh;
  }
  </style>
  