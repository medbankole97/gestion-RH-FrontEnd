<template>
  <div class="user-edit-container">
    <div class="row mt-4">
      <div class="col-md-6 mx-auto">
        <h3 class="text-center">Edit User</h3>
        <form @submit.prevent="onEdit" class="form-card">
          <div class="mb-3">
            <label for="fullname" class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              v-model="form.fullname"
            
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.email"
            
            />
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select class="form-control" id="role" v-model="form.role">
              <option value="ADMIN">ADMIN</option>
              <option value="EMPLOYE">EMPLOYE</option>
              <option value="MANAGER">MANAGER</option>
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
            <button class="btn btn-success">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { useUserStore } from '@store/userStore';
import { useToast } from 'vue-toastification';

const store = useUserStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const userId = route.params.id;
const form = reactive({
  fullname: "",
  email: "",
  role: "",
  status: true // Ajoutez ici le statut avec `true` comme valeur par défaut
});

const onEdit = async () => {
  try {
    await store.update(userId, {
      fullname: form.fullname,
      email: form.email,
      role: form.role,
      status: form.status // Incluez le statut ici
    });
    toast.success("User updated successfully!");
    router.push('/users');
  } catch (error) {
    toast.error("Error updating user.");
    console.error("Error updating user:", error);
  }
};

onMounted(async () => {
  try {
    const user = await store.getById(userId);
    if (user) {
      form.fullname = user.fullname;
      form.email = user.email;
      form.role = user.role;
      form.status = user.status; // Assurez-vous de récupérer le statut ici
    } else {
      toast.error("User not found.");
    }
  } catch (error) {
    toast.error("Error fetching user.");
    console.error('Error fetching user:', error);
  }
});
</script>

<style scoped>
.user-edit-container {
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
  .user-edit-container {
    padding: 10px;
  }
}
</style>
