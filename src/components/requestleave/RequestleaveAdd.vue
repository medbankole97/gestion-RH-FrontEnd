<template>
  <div class="request-leave-form-container">
    <h3 class="text-center mb-4">{{ $t('newRequestLeave') }}</h3>
    <form @submit.prevent="onSubmit" class="form-card">
      <div class="mb-3">
        <label for="start_date" class="form-label">{{ $t('startDate') }}</label>
        <input
          type="date"
          class="form-control"
          id="start_date"
          v-model="form.start_date"
          required
        />
      </div>
      <div class="mb-3">
        <label for="end_date" class="form-label">{{ $t('endDate') }}</label>
        <input
          type="date"
          class="form-control"
          id="end_date"
          v-model="form.end_date"
          required
        />
        <div v-if="!isValidDateRange" class="text-danger mt-1">
          {{ $t('endDateError') }}
        </div>
      </div>
      <div class="mb-3">
        <label for="motif" class="form-label">{{ $t('motif') }}</label>
        <textarea
          class="form-control"
          id="motif"
          v-model="form.motif"
          :placeholder="$t('searchPlaceholder')"
          required
        ></textarea>
      </div>
      <!-- Champ status désactivé pour les employés -->
      <div class="mb-3">
        <label for="status" class="form-label">{{ $t('status') }}</label>
        <select
          class="form-control"
          id="status"
          v-model="form.status"
          :disabled="isEmployee"
          required
        >
          <option value="PENDING">{{ $t('pending') }}</option>
          <option value="APPROVED">{{ $t('approved') }}</option>
          <option value="REJECTED">{{ $t('rejected') }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="typeLeaveId" class="form-label">{{ $t('typeLeave') }}</label>
        <select
          class="form-control"
          id="typeLeaveId"
          v-model="form.typeLeaveId"
          required
        >
          <option
            v-for="typeLeave in typeLeaves"
            :key="typeLeave.id"
            :value="typeLeave.id"
          >
            {{ typeLeave.name }}
          </option>
        </select>
      </div>
      <div class="d-flex justify-content-between">
        <router-link :to="{ name: 'list-request-leave' }" class="btn btn-secondary">
          <i class="fa-solid fa-arrow-left"></i> {{ $t('cancel') }}
        </router-link>
        <button
          type="submit"
          class="btn btn-success"
          :disabled="!isValidDateRange"
        >
          {{ $t('newRequestLeave') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRequestLeaveStore } from '@/store/requestLeaveStore';
import { useTypeLeaveStore } from '@/store/typeLeaveStore';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const requestLeaveStore = useRequestLeaveStore();
const typeLeaveStore = useTypeLeaveStore();
const toast = useToast();
const router = useRouter();

// Formulaire de demande
const form = ref({
  start_date: '',
  end_date: '',
  motif: '',
  status: 'PENDING', // Toujours initialisé à "PENDING"
  typeLeaveId: null,
});

// Liste des types de congés
const typeLeaves = ref([]);

// Simuler le rôle de l'utilisateur (peut venir d'une API ou d'un store utilisateur)
const userRole = ref('EMPLOYEE'); // Exemple : "EMPLOYEE" ou "MANAGER"

// Vérifier si l'utilisateur est un employé
const isEmployee = computed(() => userRole.value === 'EMPLOYEE');

// Validation des dates
const isValidDateRange = computed(() => {
  const startDate = new Date(form.value.start_date);
  const endDate = new Date(form.value.end_date);
  return !form.value.start_date || !form.value.end_date || endDate > startDate;
});

// Soumission du formulaire
const onSubmit = async () => {
  if (!isValidDateRange.value) {
    toast.error(t('endDateError'));
    return;
  }

  try {
    // Toujours forcer le statut à "PENDING" côté client
    form.value.status = 'PENDING';

    await requestLeaveStore.store(form.value);
    toast.success(t('addSuccess'));
    router.push({ name: 'list-request-leave' });
  } catch (error) {
    toast.error(t('addError'));
  }
};

// Chargement des types de congés
onMounted(async () => {
  await typeLeaveStore.loadDataFromApi();
  typeLeaves.value = typeLeaveStore.typeLeaves;
});
</script>


<style scoped>
/* Styles conservés sans modification */
.request-leave-form-container {
  max-width: 600px;
  margin: 0 auto;
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
</style>
