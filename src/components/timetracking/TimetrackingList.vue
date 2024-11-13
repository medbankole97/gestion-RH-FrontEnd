<template>
  <div class="time-tracking-list-container">
    <h2 class="text-center mb-4">{{ $t('timeTrackingList.title') }}</h2>

    <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
      <input
  type="text"
  class="form-control mb-2 mb-md-0 w-50 search-input"
  :placeholder="$t('timeTrackingList.searchPlaceholder')"
  v-model="searchQuery"
/>

<router-link to="/timetracking/new" class="btn btn-dark add-time-tracking-button">
  <i class="fa-solid fa-plus"></i> {{ $t('timeTrackingList.newTimeTrackingButton') }}
</router-link>
    </div>

    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered time-tracking-table">
        <thead class="table-header">
          <tr>
    <th scope="col">{{ $t('timeTrackingList.columns.index') }}</th>
    <th scope="col">{{ $t('timeTrackingList.columns.checkinTime') }}</th>
    <th scope="col">{{ $t('timeTrackingList.columns.checkoutTime') }}</th>
    <th scope="col" class="text-center">{{ $t('timeTrackingList.columns.action') }}</th>
  </tr>
        </thead>
        <tbody>
          <tr v-if="filteredTimeTrackings.length === 0">
  <td colspan="4" class="text-center">{{ $t('timeTrackingList.noDataMessage') }}</td>
</tr>
          <tr v-for="(timeTracking, index) in filteredTimeTrackings" :key="timeTracking.id" class="table-row">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ timeTracking.checkin_time || 'N/A' }}</td>
            <td>{{ timeTracking.checkout_time || 'N/A' }}</td>
            <td class="text-center action-icons">
              <font-awesome-icon 
                icon="eye" 
                class="text-info me-2 cursor-pointer" 
                @click="viewTimeTracking(timeTracking.id)" 
              />
              <font-awesome-icon 
                icon="edit" 
                class="text-warning me-2 cursor-pointer" 
                @click="editTimeTracking(timeTracking.id)" 
              />
              <!-- <font-awesome-icon 
                icon="trash" 
                class="text-danger cursor-pointer" 
                @click="remove(timeTracking.id)" 
              /> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTimeTrackingStore } from '@/store/timetrackingStore';

const router = useRouter();
const timeTrackingStore = useTimeTrackingStore();
const searchQuery = ref("");

onMounted(() => {
  timeTrackingStore.loadDataFromApi();
});

const filteredTimeTrackings = computed(() => {
  if (searchQuery.value) {
    return timeTrackingStore.timeTrackings.filter((timeTracking) =>
      getUserFullName(timeTracking.userId).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return timeTrackingStore.timeTrackings;
});

const viewTimeTracking = (id) => {
  router.push({ name: 'detail-timetracking', params: { id } });
};

const editTimeTracking = (id) => {
  router.push({ name: 'modifier-timetracking', params: { id } });
};

const remove = async (id) => {
  if (confirm($t("timeTrackingList.deleteConfirmation"))) {
    await timeTrackingStore.destroy(id);
  }
};
</script>

<style scoped>
/* Votre CSS reste le même */
.time-tracking-list-container {
  padding: 20px 2em;
  margin-top: 50px; 
  min-height: 80vh; 
  max-width: 90%;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 1px 1px rgba(172, 170, 170, 0.1);
}

.actions-container {
  align-items: center;
}

.search-input {
  max-width: 300px;
  border-radius: 20px;
  padding: 0.5rem 1rem;
}

.add-time-tracking-button {
  border-radius: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.time-tracking-table {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  background-color: hsl(211, 100%, 50%);
  color: white;
}

.table-header th {
  font-weight: bold;
}

.table-row:hover {
  background-color: #f1f1f1;
}

.text-center {
  text-align: center;
}

.action-icons .cursor-pointer {
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.action-icons .cursor-pointer:hover {
  transform: scale(1.1);
}
</style>
