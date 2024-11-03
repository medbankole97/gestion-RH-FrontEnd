<template>
  <div class="container mt-4">
    <h3 class="text-center">User Details</h3>
    <div v-if="user" class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">{{ user.fullname }}</h5>
        <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
        <p class="card-text"><strong>Role:</strong> {{ user.role }}</p>
        <p class="card-text"><strong>Status:</strong> {{ user.status ? 'Active' : 'Inactive' }}</p>
      </div>
      <div class="card-footer text-center">
        <router-link :to="{ name: 'list-user' }" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Back to List
        </router-link>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Loading user details...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const route = useRoute();
const userId = route.params.id;
const user = ref(null);

onMounted(async () => {
  try {
    const data = await userStore.getById(userId);
    user.value = data;
  } catch (error) {
    console.error('Error loading user details:', error);
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.card {
  max-width: 500px;
  margin: 0 auto;
}
</style>
