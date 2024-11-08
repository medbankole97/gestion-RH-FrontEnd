<template>
    <div class="container-fluid">
      <h2 class="text-center mb-4">Add New Time Tracking</h2>
  
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="checkin" class="form-label">Check-in Time</label>
          <input
            type="datetime-local"
            id="checkin"
            class="form-control"
            v-model="timeTrackingForm.checkin_time"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="checkout" class="form-label">Check-out Time</label>
          <input
            type="datetime-local"
            id="checkout"
            class="form-control"
            v-model="timeTrackingForm.checkout_time"
          />
        </div>
  
        <div class="mb-3">
          <label for="userId" class="form-label">Select User</label>
          <select
            id="userId"
            class="form-select"
            v-model="timeTrackingForm.userId"
            required
          >
            <option value="" disabled>Select a user</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.fullname }}
            </option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary">Add Time Tracking</button>
        <router-link to="/list-time-tracking" class="btn btn-secondary ms-2">Cancel</router-link>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTimeTrackingStore } from '@/store/timetrackingStore';
  import { useUserStore } from '@/store/userStore';
  
  const router = useRouter();
  const timeTrackingStore = useTimeTrackingStore();
  const userStore = useUserStore();
  
  const timeTrackingForm = ref({
    checkin_time: '',
    checkout_time: '',
    userId: null,
  });
  
  onMounted(async () => {
    await userStore.loadDataFromApi();
  });
  
  const handleSubmit = async () => {
    try {
      await timeTrackingStore.store(timeTrackingForm.value);
      router.push({ name: 'list-time-tracking' });
    } catch (error) {
      console.error('Error adding time tracking:', error);
    }
  };
  
  const users = computed(() => userStore.users);
  </script>
  
  <style scoped>
  .container-fluid {
    padding: 20px 2em;
    margin-top: 50px;
    min-height: 80vh;
    width: 80%;
  }
  </style>
  