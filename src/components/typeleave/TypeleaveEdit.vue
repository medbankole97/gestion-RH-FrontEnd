<template>
  <div class="container-fluid">
    <h2 class="text-center mb-4">{{ $t('editTypeLeave.title') }}</h2>

    <div class="d-flex justify-content-center">
      <!-- Wrapper pour le centrage -->
      <form @submit.prevent="onSubmit" class="form-container">
        <div class="mb-3">
          <label for="name" class="form-label">{{ $t('editTypeLeave.typeLeaveName') }}</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="form.name"
            :placeholder="$t('editTypeLeave.placeholder')"
            required
          />
        </div>

        <div class="d-flex justify-content-between">
          <router-link :to="{ name: 'list-type-leave' }" class="btn btn-secondary">
            <i class="fa-solid fa-arrow-left"></i> {{ $t('editTypeLeave.cancel') }}
          </router-link>
          <button type="submit" class="btn btn-success">
            <i class="fa-solid fa-save"></i> {{ $t('editTypeLeave.saveChanges') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useTypeLeaveStore } from '@/store/typeLeaveStore';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const typeLeaveStore = useTypeLeaveStore();

const form = ref({
  name: '',
});

// Charger les données du type de congé à éditer
const loadTypeLeave = async () => {
  try {
    const typeLeave = await typeLeaveStore.getById(route.params.id);
    form.value.name = typeLeave.name;
  } catch (error) {
    console.error('Error loading type leave:', error);
    toast.error($t('editTypeLeave.errorLoading'));
  }
};

// Mettre à jour les informations du type de congé
const onSubmit = async () => {
  try {
    await typeLeaveStore.update(route.params.id, form.value);
    toast.success('Type Leave updated successfully');
    router.push({ name: 'list-type-leave' });
  } catch (error) {
    console.error('Error updating type leave:', error);
    toast.error('Could not update type leave. Please try again.');
  }
};


// Charger les données lorsque le composant est monté
onMounted(loadTypeLeave);
</script>

<style scoped>
.container-fluid {
  padding: 20px 2em;
  margin-top: 50px;
  min-height: 20vh;
}

.d-flex {
  min-height: 10vh;
  align-items: center; 
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
