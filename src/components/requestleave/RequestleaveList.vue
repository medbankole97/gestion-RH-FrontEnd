<template>
  <div class="request-leave-list-container">
    <h2 class="text-center mb-4">Request Leave List</h2>

    <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
      <input 
        type="text" 
        class="form-control mb-2 mb-md-0 w-50 search-input"
        placeholder="Search..."
        v-model="searchQuery"
      />
      <router-link to="/request-leave/new" class="btn btn-dark add-request-leave-button">
        <i class="fa-solid fa-plus"></i> New Request Leave
      </router-link>
    </div>

    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered request-leave-table">
        <thead class="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Motif</th>
            <th scope="col">Status</th>
            <th scope="col">Type Leave</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRequestLeaves.length === 0">
            <td colspan="7" class="text-center">No data available</td>
          </tr>
          <tr v-for="(requestLeave, index) in filteredRequestLeaves" :key="requestLeave.id" class="table-row">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ formatDate(requestLeave.start_date) }}</td>
            <td>{{ formatDate(requestLeave.end_date) }}</td>
            <td>{{ requestLeave.motif }}</td>
            <td :class="{'text-success': requestLeave.status === 'APPROUVE', 'text-danger': requestLeave.status === 'REJETE', 'text-warning': requestLeave.status === 'EN_ATTENTE'}">
              {{ requestLeave.status }}
            </td>
            <td>{{ getTypeLeaveName(requestLeave.typeLeaveId) }}</td>
            <td class="text-center action-icons">
              <font-awesome-icon 
                icon="eye" 
                class="text-info me-2 cursor-pointer" 
                @click="viewDetails(requestLeave)" 
              />
              <font-awesome-icon 
                icon="edit" 
                class="text-warning me-2 cursor-pointer" 
                @click="editRequestLeave(requestLeave.id)" 
              />
              <font-awesome-icon 
                icon="trash" 
                class="text-danger cursor-pointer" 
                @click="remove(requestLeave.id)" 
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
import { useRequestLeaveStore } from '@/store/requestleaveStore';
import { useTypeLeaveStore } from '@/store/typeleaveStore';

const router = useRouter();
const requestLeaveStore = useRequestLeaveStore();
const typeLeaveStore = useTypeLeaveStore();
const searchQuery = ref("");

// Filtrer les demandes de congé en fonction de la recherche
const filteredRequestLeaves = computed(() => {
  if (searchQuery.value) {
    return requestLeaveStore.requestLeaves.filter((requestLeave) =>
      requestLeave.motif.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return requestLeaveStore.requestLeaves;
});

// Formater la date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Obtenir le nom du type de congé
const getTypeLeaveName = (typeLeaveId) => {
  const typeLeave = typeLeaveStore.typeLeaves.find(t => t.id === typeLeaveId);
  return typeLeave ? typeLeave.name : 'Unknown';
};

const viewDetails = (requestLeave) => {
  router.push({ name: 'detail-requestleave', params: { id: requestLeave.id } });
};

const editRequestLeave = (id) => {
  router.push({ name: 'modifier-request-leave', params: { id: id } });
};

const remove = async (id) => {
  if (confirm("Are you sure you want to delete this request leave?")) {
    await requestLeaveStore.destroy(id);
  }
};

// Charger les données initiales
onMounted(() => {
  requestLeaveStore.loadDataFromApi();
  typeLeaveStore.loadDataFromApi();
});
</script>

<style scoped>
/* Appliquer des styles similaires à TypeLeaveList.vue */
.request-leave-list-container {
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

.add-request-leave-button {
  border-radius: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.request-leave-table {
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
