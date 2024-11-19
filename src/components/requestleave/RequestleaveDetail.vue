<template>
  <div class="request-leave-detail-container">
    <div class="card shadow-sm p-4">
      <h3 class="text-center mb-4 request-leave-title">{{ $t('requestLeave.details') }}</h3>
      <div class="request-leave-info">
        <p>
          <strong>{{ $t('requestLeave.startDate') }}:</strong> 
          <span>{{ formattedStartDate }}</span>
        </p>
        <p>
          <strong>{{ $t('requestLeave.endDate') }}:</strong> 
          <span>{{ formattedEndDate }}</span>
        </p>
        <p>
          <strong>{{ $t('requestLeave.motif') }}:</strong> 
          <span>{{ requestLeave.motif }}</span>
        </p>
        <p>
          <strong>{{ $t('requestLeave.status') }}:</strong> 
          <span>{{ requestLeave.status }}</span>
        </p>
        <p>
          <strong>{{ $t('requestLeave.typeLeave') }}:</strong> 
          <span>{{ typeLeaveName }}</span>
        </p>
      </div>
      <div class="text-center mt-4">
        <router-link :to="{ name: 'list-request-leave' }" class="btn btn-secondary back-button">
          <i class="fa-solid fa-arrow-left"></i> {{ $t('requestLeave.backToList') }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRequestLeaveStore } from '@/store/requestLeaveStore';
import { useTypeLeaveStore } from '@/store/typeLeaveStore';
import { useRoute } from 'vue-router';

const requestLeaveStore = useRequestLeaveStore();
const typeLeaveStore = useTypeLeaveStore();
const route = useRoute();

const requestLeave = ref({});
const typeLeaveName = ref('');

// Formatage des dates
const formattedStartDate = computed(() =>
  requestLeave.value.start_date
    ? new Date(requestLeave.value.start_date).toLocaleDateString('en-GB')
    : ''
);

const formattedEndDate = computed(() =>
  requestLeave.value.end_date
    ? new Date(requestLeave.value.end_date).toLocaleDateString('en-GB')
    : ''
);

onMounted(async () => {
  await typeLeaveStore.loadDataFromApi();

  // Charger la demande de congé par ID
  const data = await requestLeaveStore.getById(route.params.id);
  if (data) {
    requestLeave.value = data;

    // Trouver le nom du type de congé correspondant
    const typeLeave = typeLeaveStore.typeLeaves.find(
      (type) => type.id === requestLeave.value.typeLeaveId
    );
    typeLeaveName.value = typeLeave ? typeLeave.name : 'Unknown';
  }
});
</script>

<style scoped>
.request-leave-detail-container {
  display: flex;
  justify-content: center;
  padding: 3rem;
  max-width: 100%;
  margin: auto;
}

.card {
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  max-width: 600px;
  width: 100%;
}

.request-leave-title {
  color: #333;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.request-leave-info p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.request-leave-info p strong {
  color: #333;
  font-weight: bold;
}

.request-leave-info span {
  font-weight: 500;
}

.back-button {
  border-radius: 20px;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.back-button i {
  margin-right: 5px;
}
</style>
