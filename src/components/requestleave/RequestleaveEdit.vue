<template>
  <div class="request-leave-form-container">
    <h3 class="text-center mb-4">{{ $t('editRequestLeave') }}</h3>
    <form @submit.prevent="onEdit" class="form-card">
      <div class="mb-3">
        <label for="start_date" class="form-label">{{ $t('startDate') }}</label>
        <input
          type="date"
          class="form-control"
          id="start_date"
          v-model="form.start_date"
          required disabled
        />
      </div>
      <div class="mb-3">
        <label for="end_date" class="form-label">{{ $t('endDate') }}</label>
        <input
          type="date"
          class="form-control"
          id="end_date"
          v-model="form.end_date"
          required disabled
        />
      </div>
      <div class="mb-3">
        <label for="motif" class="form-label">{{ $t('motif') }}</label>
        <textarea
          class="form-control"
          id="motif"
          v-model="form.motif"
          :placeholder="$t('reasonPlaceholder')"
          required disabled
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">{{ $t('status') }}</label>
        <select
          class="form-control"
          id="status"
          v-model="form.status"
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
          required disabled
        >
          <option v-for="typeLeave in typeLeaves" :key="typeLeave.id" :value="typeLeave.id">
            {{ typeLeave.name }}
          </option>
        </select>
      </div>
      <div class="d-flex justify-content-between">
        <router-link :to="{ name: 'list-request-leave' }" class="btn btn-secondary">
          <i class="fa-solid fa-arrow-left"></i> {{ $t('cancel') }}
        </router-link>
        <button type="submit" class="btn btn-success">{{ $t('saveChanges') }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRequestLeaveStore } from '@/store/requestLeaveStore';
import { useTypeLeaveStore } from '@/store/typeLeaveStore';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';
import { format } from 'date-fns';


const { t } = useI18n();
const requestLeaveStore = useRequestLeaveStore();
const typeLeaveStore = useTypeLeaveStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();

const form = ref({
  start_date: '',
  end_date: '',
  motif: '',
  status: 'PENDING',
  typeLeaveId: null
});

const typeLeaves = ref([]);

const onEdit = async () => {
  try {
    await requestLeaveStore.update(route.params.id, form.value);
    toast.success(t('toast.updateSuccess'));
    router.push({ name: 'list-request-leave' });
  } catch (error) {
    toast.error(t('toast.updateError'));
  }
};

onMounted(async () => {
  await typeLeaveStore.loadDataFromApi();
  typeLeaves.value = typeLeaveStore.typeLeaves;

  const requestLeave = await requestLeaveStore.getById(route.params.id);
  if (requestLeave) {
    form.value = {
      ...requestLeave,
      start_date: format(new Date(requestLeave.start_date), 'yyyy-MM-dd'), // Convertir la date
      end_date: format(new Date(requestLeave.end_date), 'yyyy-MM-dd'),     // Convertir la date
    };
  }
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
