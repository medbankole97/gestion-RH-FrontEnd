<template>
  <div class="add-time-tracking-container">
    <h2 class="text-center mb-4">{{ $t('addTimeTracking.title') }}</h2>

    <form @submit.prevent="addTimeTracking">
  <div class="form-group mb-3">
    <label for="checkin_time">{{ $t('addTimeTracking.checkinLabel') }}</label>
    <input
      id="checkin_time"
      type="datetime-local"
      v-model="checkin_time"
      class="form-control"
      required
    />
  </div>
  <div class="form-group mb-3">
    <label for="checkout_time">{{ $t('addTimeTracking.checkoutLabel') }}</label>
    <input
      id="checkout_time"
      type="datetime-local"
      v-model="checkout_time"
      class="form-control"
      required
    />
  </div>
  <router-link to="/timetracking" class="btn btn-dark mt-3 me-2">
  Cancel
</router-link>

  <button type="submit" class="btn btn-dark mt-3">{{ $t('addTimeTracking.saveButton') }}</button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTimeTrackingStore } from '@/store/timetrackingStore';

const router = useRouter();
const timeTrackingStore = useTimeTrackingStore();

const checkin_time = ref('');
const checkout_time = ref('');

const addTimeTracking = async () => {
  if (new Date(checkout_time.value) <= new Date(checkin_time.value)) {
    alert($t("addTimeTracking.checkoutError"));
    return;
  }

  try {
    await timeTrackingStore.store({
      checkin_time: checkin_time.value,
      checkout_time: checkout_time.value,
    });
    router.push('/timetracking');
  } catch (error) {
    console.error('Error adding time tracking:', error);
    alert($t("addTimeTracking.addError"));
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
