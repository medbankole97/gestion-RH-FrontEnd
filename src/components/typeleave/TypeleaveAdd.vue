<template>
  <div class="container-fluid">
    <h2 class="text-center mb-4">Add New Type Leave</h2>

    <div class="d-flex justify-content-center"> <!-- Wrapper pour le centrage -->
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="mb-3">
          <label for="name" class="form-label">Leave Name</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="typeLeaveForm.name"
            required
          />
        </div>

        <div class="mb-3">
          <label for="userId" class="form-label">Select User</label>
          <select
            id="userId"
            class="form-select"
            v-model="typeLeaveForm.userId"
            required
          >
            <option value="" disabled>Select a user</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.fullname }}
            </option>
          </select>
        </div>
        <router-link to="/list-type-leave" class="btn btn-secondary me-2"> <i class="fa-solid fa-arrow-left"></i> Cancel</router-link>
        <button type="submit" class="btn btn-success">Add Type Leave</button>
        
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTypeLeaveStore } from '@/store/typeleaveStore';
import { useUserStore } from '@/store/userStore';

const router = useRouter();
const typeLeaveStore = useTypeLeaveStore();
const userStore = useUserStore();

const typeLeaveForm = ref({
  name: '',
  userId: null,
});

onMounted(async () => {
  try {
    await userStore.loadDataFromApi();
  } catch (error) {
    console.error("Error loading users:", error);
  }
});

const handleSubmit = async () => {
  try {
    await typeLeaveStore.store(typeLeaveForm.value);
    router.push({ name: 'list-type-leave' });
  } catch (error) {
    console.error("Error adding type leave:", error);
  }
};

const users = computed(() => userStore.users);
</script>

<style scoped>
.container-fluid {
  padding: 20px 2em;
  margin-top: 50px;
  min-height: 20vh;
}

.d-flex {
  min-height: 10vh;
  /* align-items: center;  */
}

.form-container {
  width: 100%;
  max-width: 500px; /* Largeur maximale du formulaire */
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
