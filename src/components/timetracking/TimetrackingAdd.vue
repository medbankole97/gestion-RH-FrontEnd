<template>
  <div class="add-time-tracking-container mt-5">
    <h2 class="text-center mb-4">
      {{ isCheckinOnly ? $t('addTimeTracking.completeCheckout') : $t('addTimeTracking.title') }}
    </h2>

    <form @submit.prevent="handleSubmit">
      <div v-if="!isCheckinOnly" class="form-group mb-3">
        <label for="checkin_time">{{ $t('addTimeTracking.checkinLabel') }}</label>
        <input
          id="checkin_time"
          type="datetime-local"
          v-model="checkin_time"
          class="form-control"
          :min="todayMin"
          :max="todayMax"
          required
        />
      </div>
      <div v-if="isCheckinOnly || checkin_time" class="form-group mb-3">
        <label for="checkout_time">{{ $t('addTimeTracking.checkoutLabel') }}</label>
        <input
          id="checkout_time"
          type="datetime-local"
          v-model="checkout_time"
          class="form-control"
          :min="checkin_time || todayMin"
          :max="todayMax"
          :required="isCheckinOnly"
        />
        <small v-if="!isCheckinOnly" class="form-text text-muted">
          {{ $t('addTimeTracking.optionalCheckout') }}
        </small>
      </div>

      <router-link to="/timetracking" class="btn btn-dark mt-3 me-2">
        <i class="fa-solid fa-arrow-left"></i> {{ $t('cancel') }}
      </router-link>

      <button
        type="submit"
        class="btn btn-success mt-3"
        :disabled="!canSubmit"
      >
        {{ $t('addTimeTracking.saveButton') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTimeTrackingStore } from '@/store/timetrackingStore';

const router = useRouter();
const timeTrackingStore = useTimeTrackingStore();

const checkin_time = ref('');
const checkout_time = ref('');
const isCheckinOnly = ref(false); // Détermine si l'employé complète un enregistrement existant

const todayMin = ref(new Date().toISOString().split('T')[0] + 'T00:00');
const todayMax = ref(new Date().toISOString().split('T')[0] + 'T23:59');

// Vérifie si un enregistrement existant existe
onMounted(async () => {
  try {
    const existingEntry = await timeTrackingStore.getTodayEntry(); // Implémenter cette méthode
    if (existingEntry && existingEntry.checkin_time && !existingEntry.checkout_time) {
      isCheckinOnly.value = true;
      checkin_time.value = existingEntry.checkin_time;
    }
  } catch (error) {
    console.error('Error checking existing entry:', error);
  }
});

// Vérification de la validité
const canSubmit = computed(() => {
  if (isCheckinOnly.value) {
    return checkout_time.value !== '' && new Date(checkout_time.value) > new Date(checkin_time.value);
  }
  return checkin_time.value !== '';
});

// Soumission
const handleSubmit = async () => {
  try {
    if (isCheckinOnly.value) {
      // Mise à jour de l'heure de départ
      await timeTrackingStore.updateCheckoutTime({ checkout_time: checkout_time.value });
    } else {
      // Nouvel enregistrement
      await timeTrackingStore.store({
        checkin_time: checkin_time.value,
        checkout_time: checkout_time.value || null,
      });
    }
    router.push('/timetracking');
  } catch (error) {
    console.error('Error submitting time tracking:', error);
    alert($t('addTimeTracking.addError'));
  }
};
</script>

<style scoped>
.add-time-tracking-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}
</style>
