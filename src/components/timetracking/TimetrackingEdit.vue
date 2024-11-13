<template>
  <div class="edit-time-tracking-container">
    <h2 class="text-center mb-4">{{ $t('editTimeTracking.title') }}</h2>

    <form @submit.prevent="updateTimeTracking">
      <div class="form-group mb-3">
        <label for="checkin_time">{{ $t('editTimeTracking.checkinLabel') }}</label>
        <input
          id="checkin_time"
          type="datetime-local"
          v-model="checkin_time"
          class="form-control"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="checkout_time">{{ $t('editTimeTracking.checkoutLabel') }}</label>
        <input
          id="checkout_time"
          type="datetime-local"
          v-model="checkout_time"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-dark mt-3">{{ $t('editTimeTracking.updateButton') }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTimeTrackingStore } from '@/store/timetrackingStore';

const router = useRouter();
const route = useRoute();
const timeTrackingStore = useTimeTrackingStore();

const checkin_time = ref('');
const checkout_time = ref('');

onMounted(async () => {
  const timeTracking = await timeTrackingStore.fetchById(route.params.id);
  if (timeTracking) {
    checkin_time.value = timeTracking.checkin_time;
    checkout_time.value = timeTracking.checkout_time;
  }
});

const updateTimeTracking = async () => {
  if (new Date(checkout_time.value) <= new Date(checkin_time.value)) {
    alert($t("editTimeTracking.checkoutError"));
    return;
  }

  try {
    await timeTrackingStore.update(route.params.id, {
      checkin_time: checkin_time.value,
      checkout_time: checkout_time.value,
    });
    router.push('/timetracking');
  } catch (error) {
    console.error('Error updating time tracking:', error);
    alert($t("editTimeTracking.updateError"));
  }
};
</script>

<style scoped>
.edit-time-tracking-container {
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
