<template>
  <div class="user-form-container">
    <div class="row mt-4">
      <div class="col-md-6 mx-auto">
        <h3 class="text-center">{{ $t('userAdd.title') }}</h3>
        <form @submit.prevent="onSubmit" class="form-card">
          <div class="mb-3">
            <label for="fullname" class="form-label">{{ $t('userAdd.fullname') }}</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              :class="{ 'is-invalid': errors.fullname }"
              :placeholder="$t('userAdd.fullnamePlaceholder')"
              v-model="form.fullname"
              required
            />
            <div v-if="errors.fullname" class="invalid-feedback">
              {{ errors.fullname }}
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">{{ $t('userAdd.email') }}</label>
            <input
              type="email"
              class="form-control"
              id="email"
              :class="{ 'is-invalid': errors.email }"
              :placeholder="$t('userAdd.emailPlaceholder')"
              v-model="form.email"
              required
            />
            <div v-if="errors.email" class="invalid-feedback">
              {{ errors.email }}
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">{{ $t('userAdd.password') }}</label>
            <input
              type="password"
              class="form-control"
              id="password"
              :class="{ 'is-invalid': errors.password }"
              :placeholder="$t('userAdd.passwordPlaceholder')"
              v-model="form.password"
              required
            />
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">{{ $t('userAdd.role') }}</label>
            <select
              class="form-control"
              id="role"
              :class="{ 'is-invalid': errors.role }"
              v-model="form.role"
              required
            >
              <option value="" disabled>{{ $t('userAdd.rolePlaceholder') }}</option>
              <option value="ADMIN">{{ $t('userAdd.roleAdmin') }}</option>
              <option value="EMPLOYE">{{ $t('userAdd.roleEmployee') }}</option>
              <option value="MANAGER">{{ $t('userAdd.roleManager') }}</option>
            </select>
            <div v-if="errors.role" class="invalid-feedback">
              {{ errors.role }}
            </div>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="status"
              v-model="form.status"
            />
            <label class="form-check-label" for="status">{{ $t('userAdd.status') }}</label>
          </div>
          <div class="d-flex justify-content-between">
            <router-link :to="{ name: 'list-user' }" class="btn btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> {{ $t('userAdd.cancelButton') }}
            </router-link>
            <button class="btn btn-success">{{ $t('userAdd.addButton') }}</button>
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

// Form data
const form = ref({
  fullname: '',
  email: '',
  password: '',
  role: '',
  status: true,
});

// Errors object
const errors = ref({});

// Submit handler
const onSubmit = async () => {
  try {
    // Reset errors before submitting
    errors.value = {};

    await userStore.store(form.value);

    toast.success("User added successfully!", {
      position: "top-right",
      timeout: 2000,
    });
    router.push({ name: 'list-user' });
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      // Map backend validation errors to local errors
      err.response.data.errors.forEach((error) => {
        errors.value[error.path] = error.msg;
      });
    } else {
      toast.error("Failed to add user", { position: "top-right", timeout: 2000 });
    }
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
.invalid-feedback {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
.is-invalid {
  border-color: #e74c3c;
}

</style>