<template>
  <div class="time-tracking-list-container">
    <h2 class="text-center mb-4">Time Tracking List</h2>

    <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
      <input
        type="text"
        class="form-control mb-2 mb-md-0 w-50 search-input"
        placeholder="Search..."
        v-model="searchQuery"
      />

      <router-link to="/timetracking/new" class="btn btn-dark add-time-tracking-button">
        <i class="fa-solid fa-plus"></i> New Time Tracking
      </router-link>
    </div>

    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered time-tracking-table">
        <thead class="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Check-in Time</th>
            <th scope="col">Check-out Time</th>
            <th scope="col">User</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredTimeTrackings.length === 0">
            <td colspan="5" class="text-center">No data available</td>
          </tr>
          <tr v-for="(timeTracking, index) in filteredTimeTrackings" :key="timeTracking.id" class="table-row">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ formatDate(timeTracking.checkin_time) }}</td>
            <td>{{ timeTracking.checkout_time ? formatDate(timeTracking.checkout_time) : 'N/A' }}</td>
            <td>{{ getUserFullName(timeTracking.userId) }}</td>
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
              <font-awesome-icon 
                icon="trash" 
                class="text-danger cursor-pointer" 
                @click="remove(timeTracking.id)" 
              />
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
import { useUserStore } from '@/store/userStore';
import dayjs from 'dayjs';

const router = useRouter();
const timeTrackingStore = useTimeTrackingStore();
const userStore = useUserStore();

const searchQuery = ref(""); 

onMounted(() => {
  timeTrackingStore.loadDataFromApi();
  userStore.loadDataFromApi();
});

const filteredTimeTrackings = computed(() => {
  if (searchQuery.value) {
    return timeTrackingStore.timeTrackings.filter((timeTracking) =>
      getUserFullName(timeTracking.userId).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return timeTrackingStore.timeTrackings;
});

const getUserFullName = (userId) => {
  const user = userStore.users.find(u => u.id === userId);
  return user ? user.fullname : 'Unknown';
};

const formatDate = (date) => dayjs(date).format('DD/MM/YYYY HH:mm');

const viewTimeTracking = (id) => {
  router.push({ name: 'view-time-tracking', params: { id } });
};

const editTimeTracking = (id) => {
  router.push({ name: 'edit-time-tracking', params: { id } });
};

const remove = async (id) => {
  if (confirm("Are you sure you want to delete this time tracking?")) {
    await timeTrackingStore.destroy(id);
  }
};
</script>

<style scoped>
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
