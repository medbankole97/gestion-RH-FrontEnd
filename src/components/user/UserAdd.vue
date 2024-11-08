<template>
  <div class="user-form-container">
    <div class="row mt-4">
      <div class="col-md-6 mx-auto">
        <h3 class="text-center">Add New User</h3>
        <form @submit.prevent="onSubmit" class="form-card">
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
              <option value="EMPLOYE">EMPLOYE</option>
              <option value="GESTIONNAIRE">GESTIONNAIRE</option>
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
import { useUserStore } from '@store/userStore';
import { useToast } from 'vue-toastification';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const form = ref({
  fullname: '',
  email: '',
  password: '',
  role: '',
  status: true
});

const onSubmit = async () => {
  try {
    await userStore.store(form.value);
    toast.success("User added successfully!", {
      position: "top-right",
      timeout: 2000,
    });
    router.push({ name: 'list-user' });
  } catch (err) {
    toast.error("Failed to add user", { position: "top-right", timeout: 2000 });
    console.error("Error adding user:", err);
  }
};
</script>

<style scoped>
.user-form-container {
  padding: 20px;
}

.form-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.form-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

h3 {
  color: #333;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
  color: #555;
}

.form-control {
  border-radius: 4px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.btn {
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn-success {
  background-color: #28a745;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

@media (max-width: 576px) {
  .user-form-container {
    padding: 10px;
  }
}
</style>
