<template>
  <div class="request-leave-list-container">
    <h2 class="text-center mb-4">{{ $t('requestLeaveList') }}</h2>

    <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
      <input 
        type="text" 
        class="form-control mb-2 mb-md-0 w-50 search-input"
        :placeholder="$t('searchPlaceholder')"
        v-model="searchQuery"
      />
      <router-link to="/request-leave/new" class="btn btn-dark add-request-leave-button">
        <i class="fa-solid fa-plus"></i> {{ $t('newRequestLeave') }}
      </router-link>
    </div>

    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered request-leave-table">
        <thead class="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ $t('user') }}</th> <!-- Nouvelle colonne -->
            <th scope="col">{{ $t('email') }}</th>
            <th scope="col">{{ $t('startDate') }}</th>
            <th scope="col">{{ $t('endDate') }}</th>
            <th scope="col">{{ $t('motif') }}</th>
            <th scope="col">{{ $t('status') }}</th>
            <th scope="col">{{ $t('typeLeave') }}</th>
            <th scope="col" class="text-center">{{ $t('action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRequestLeaves.length === 0">
            <td colspan="8" class="text-center">{{ $t('noData') }}</td>
          </tr>
          <tr v-for="(requestLeave, index) in filteredRequestLeaves" :key="requestLeave.id" class="table-row">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ requestLeave.user?.fullname || 'N/A' }}</td> <!-- Nom de l'utilisateur -->
            <td>{{ requestLeave.user?.email || 'N/A' }}</td>
            <td>{{ formatDate(requestLeave.start_date) }}</td>
            <td>{{ formatDate(requestLeave.end_date) }}</td>
            <td>{{ requestLeave.motif }}</td>
            <td :class="{
              'text-success': requestLeave.status === 'APPROVED',
              'text-danger': requestLeave.status === 'REJECTED',
              'text-warning': requestLeave.status === 'PENDING'
            }">
              {{ $t(requestLeave.status.toLowerCase()) }}
            </td>
            <td>{{ getTypeLeaveName(requestLeave.typeLeaveId) }}</td>
            <td class="text-center action-icons">
              <font-awesome-icon 
                icon="eye" 
                class="text-info me-2 cursor-pointer" 
                @click="viewDetails(requestLeave)" 
              />
              <font-awesome-icon v-if="userRoles === 'MANAGER'" 
                icon="edit" 
                class="text-warning me-2 cursor-pointer" 
                @click="editRequestLeave(requestLeave.id)" 
              />
              <font-awesome-icon v-if="userRoles === 'ADMIN'" 
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
import { useToast } from 'vue-toastification';
import { useRequestLeaveStore } from '@/store/requestleaveStore';
import { useTypeLeaveStore } from '@/store/typeleaveStore';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../store/authStore';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const requestLeaveStore = useRequestLeaveStore();
const typeLeaveStore = useTypeLeaveStore();
const searchQuery = ref("");
const authStore = useAuthStore();
const userRoles = ref(authStore.user.role);

// Filtrer les demandes de congé en fonction de la recherche
const filteredRequestLeaves = computed(() => {
  if (searchQuery.value) {
    return requestLeaveStore.requestLeaves.filter((requestLeave) => {
      const userName = requestLeave.user?.fullname || '';
      return userName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
             requestLeave.motif.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
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
  if (confirm(t('confirmDelete'))) {
    try {
      await requestLeaveStore.destroy(id);
      toast.success(t('deleteSuccess')); // Notification de succès
    } catch (error) {
      toast.error(t('deleteError')); // Notification d'erreur
    }
  }
};

// Charger les données initiales
onMounted(() => {
  requestLeaveStore.loadDataFromApi();
  typeLeaveStore.loadDataFromApi();
});
</script>

<style scoped>
/* Styles */
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
.text-success {
  font-weight: bold;
}

.text-danger , .text-warning{
  font-weight: bold;
}

</style>
