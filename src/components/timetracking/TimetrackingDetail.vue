<template>
  <div class="detail-time-tracking-container mt-5">
    <h2 class="text-center mb-4">{{ $t('timeTracking.details') }}</h2>

    <div class="detail-item">
      <strong>{{ $t('timeTracking.checkinTime') }}:</strong> {{ formattedCheckinTime }}
    </div>
    <div class="detail-item">
      <strong>{{ $t('timeTracking.checkoutTime') }}:</strong> {{ formattedCheckoutTime }}
    </div>

    <button @click="goBack" class="btn btn-secondary mt-3">
      {{ $t('timeTracking.back') }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTimeTrackingStore } from '@/store/timetrackingStore';
import dayjs from 'dayjs';

const router = useRouter();
const route = useRoute();
const timeTrackingStore = useTimeTrackingStore();

const checkin_time = ref('');
const checkout_time = ref('');

onMounted(async () => {
  console.log('Fetching time tracking with ID:', route.params.id); // Log l'ID que nous récupérons
  const timeTrackingResponse = await timeTrackingStore.fetchById(route.params.id);
  console.log('Fetched time tracking:', timeTrackingResponse); // Log les données récupérées depuis l'API

  if (timeTrackingResponse && timeTrackingResponse.timeTracking) {
    const timeTracking = timeTrackingResponse.timeTracking;
    checkin_time.value = timeTracking.checkin_time;
    checkout_time.value = timeTracking.checkout_time;
    console.log('Check-in:', checkin_time.value, 'Check-out:', checkout_time.value); // Log les valeurs des temps
  } else {
    console.log('No time tracking found for the provided ID.');
  }
});

const formattedCheckinTime = computed(() => {
  console.log('Formatted Check-in Time:', checkin_time.value); // Log la valeur formatée du checkin
  return checkin_time.value ? dayjs(checkin_time.value).format('DD/MM/YYYY HH:mm') : 'N/A';
});

const formattedCheckoutTime = computed(() => {
  console.log('Formatted Check-out Time:', checkout_time.value); // Log la valeur formatée du checkout
  return checkout_time.value ? dayjs(checkout_time.value).format('DD/MM/YYYY HH:mm') : 'N/A';
});

const goBack = () => {
  router.push('/timetracking');
};
</script>

<style scoped>
.detail-time-tracking-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.detail-item {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
</style>
