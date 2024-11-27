<template>
  <div class="container-fluid">
    <h2 class="text-center mb-4">{{ $t('typeLeavess.addNew') }}</h2>

    <div class="d-flex justify-content-center">
      <!-- Wrapper pour le centrage -->
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="mb-3">
          <label for="name" class="form-label">{{ $t('typeLeavess.nameLabel') }}</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="typeLeaveForm.name"
            :class="{ 'is-invalid': errors.name }"
            required
          />
          <div v-if="errors.name" class="invalid-feedback">
            {{ errors.name }}
          </div>
        </div>

        <router-link to="/type-leave" class="btn btn-secondary me-2">
          <i class="fa-solid fa-arrow-left"></i> {{ $t('typeLeavess.cancel') }}
        </router-link>
        <button type="submit" class="btn btn-success">{{ $t('typeLeavess.add') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useTypeLeaveStore } from '@/store/typeleaveStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const typeLeaveStore = useTypeLeaveStore();

const typeLeaveForm = ref({
  name: '',
});

const errors = ref({});

const handleSubmit = async () => {
  try {
    // Reset errors before submitting
    errors.value = {};

    // Appel à l'API pour ajouter le type de congé
    await typeLeaveStore.store(typeLeaveForm.value);
    toast.success(t('typeLeavess.successMessage'));
    router.push({ name: 'list-type-leave' });
  } catch (error) {
    console.error('Error adding type leave:', error);

    // Gestion des erreurs venant du backend
    if (error.response && error.response.data && error.response.data.errors) {
      // Chercher l'erreur qui concerne le champ 'name'
      const nameError = error.response.data.errors.find(e => e.path === 'name');
      if (nameError) {
        errors.value.name = nameError.msg; // Extraire et afficher le message d'erreur
        toast.error(t('typeLeavess.errorMessage'));
      }
    } else {
      toast.error(t('typeLeavess.genericErrorMessage'));
    }
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
}

.form-container {
  width: 100%;
  max-width: 500px; /* Largeur maximale du formulaire */
  padding: 2em;
  background-color: #f9f9f9;
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
  border: 1px solid #ced4da;
}

.btn {
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
.is-invalid {
  border-color: #e74c3c !important;
}

.invalid-feedback {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
