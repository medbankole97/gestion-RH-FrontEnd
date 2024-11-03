<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-6 mx-auto">
        <h3 class="text-center">Add New User</h3>
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="fullname" class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              placeholder="At least 5 characters required!"
              v-model="form.fullname"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter a valid email address"
              v-model="form.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter a secure password"
              v-model="form.password"
              required
            />
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select class="form-control" id="role" v-model="form.role" required>
              <option value="" disabled>Select a role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="EMPLOYEE">EMPLOYE</option>
            </select>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="status"
              v-model="form.status"
            />
            <label class="form-check-label" for="status">Active</label>
          </div>
          <div class="d-flex justify-content-between">
            <router-link :to="{ name: 'list-user' }" class="btn btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> Cancel
            </router-link>
            <button class="btn btn-success">Add User</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@store/userStore'; // Ajustez selon la structure de votre dossier

const userStore = useUserStore();
const form = ref({
  fullname: '',
  email: '',
  password: '', // Ajoutez un champ pour le mot de passe
  role: '',
  status: true // Active par défaut
});
const router = useRouter();

const onSubmit = async () => {
  try {
    await userStore.store(form.value);
    router.push({ name: 'list-user' }); // Rediriger vers la liste des utilisateurs
  } catch (err) {
    console.error("Error adding user:", err);
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

@media (max-width: 576px) {
  .container {
    padding: 10px;
  }
}
</style>
