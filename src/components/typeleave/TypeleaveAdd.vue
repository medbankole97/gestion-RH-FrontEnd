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

        <!-- Champ 'User' supprimé -->

        <router-link to="/list-type-leave" class="btn btn-secondary me-2"> <i class="fa-solid fa-arrow-left"></i> Cancel</router-link>
        <button type="submit" class="btn btn-success">Add Type Leave</button>
        
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTypeLeaveStore } from '@/store/typeleaveStore';

const router = useRouter();
const typeLeaveStore = useTypeLeaveStore();

const typeLeaveForm = ref({
  name: '', // 'userId' supprimé
});

const handleSubmit = async () => {
  try {
    await typeLeaveStore.store(typeLeaveForm.value);
    router.push({ name: 'list-type-leave' });
  } catch (error) {
    console.error("Error adding type leave:", error);
  }
};
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
  /* border-radius: 8px; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
  font-size: 1rem;
}

.form-control {
  padding: 0.75rem;
  font-size: 1rem;
  /* border-radius: 5px; */
  border: 1px solid #ced4da;
}

.form-select {
  padding: 0.75rem;
  font-size: 1rem;
  /* border-radius: 5px; */
  border: 1px solid #ced4da;
}

.btn {
  /* border-radius: 20px; */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.text-center {
  text-align: center;
}
</style>
