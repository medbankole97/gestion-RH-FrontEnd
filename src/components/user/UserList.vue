<template>
  <div class="user-list-container">
    <h2 class="text-center mb-4">{{ $t('userList.title') }}</h2>

    <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
      <input 
        type="text" 
        class="form-control mb-2 mb-md-0 w-50 search-input"
        :placeholder="$t('userList.searchPlaceholder')"
        v-model="searchQuery"
      />
     
      <router-link :to="{ name: 'ajout-user' }" class="btn btn-dark add-user-button">
        <i class="fa-solid fa-plus"></i> {{ $t('userList.newUserButton') }}
      </router-link>
    </div>

    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered user-table">
        <thead class="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ $t('userList.fullname') }}</th>
            <th scope="col">{{ $t('userList.email') }}</th>
            <th scope="col">{{ $t('userList.role') }}</th>
            <th scope="col">{{ $t('userList.status') }}</th>
            <th scope="col" class="text-center">{{ $t('userList.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="text-center">{{ $t('userList.noData') }}</td>
          </tr>
          <tr v-for="(user, index) in filteredUsers" :key="user.id" class="table-row">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td :class="{'text-success': user.status, 'text-danger': !user.status}">
              {{ user.status ? $t('userList.active') : $t('userList.inactive') }}
            </td>
            <td class="text-center action-icons">
              <font-awesome-icon 
                icon="eye" 
                class="text-info me-2 cursor-pointer" 
                @click="viewDetails(user)" 
              />
              <font-awesome-icon 
                icon="edit" 
                class="text-warning me-2 cursor-pointer" 
                @click="editUser(user.id)" 
              />
              <font-awesome-icon 
                icon="trash" 
                class="text-danger cursor-pointer" 
                @click="remove(user.id)" 
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
import { useUserStore } from '@/store/userStore';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n'; // Importer useI18n pour les traductions
import { useAuthStore } from '../../store/authStore';

const router = useRouter();
const store = useUserStore();
const toast = useToast();
const { t } = useI18n(); // Obtenir la fonction de traduction
const searchQuery = ref("");

const authStore = useAuthStore();
const userRoles = ref(authStore.user.role);

const filteredUsers = computed(() => {
  if (searchQuery.value) {
    return store.users.filter((user) =>
      user.fullname.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return store.users;
});

const viewDetails = (user) => {
  router.push({ name: 'detail-user', params: { id: user.id } });
};

const editUser = (id) => {
  router.push({ name: 'modifier-user', params: { id: id } });
};

const remove = async (id) => {
  try {
    const verify = window.confirm(t('userList.deleteConfirmation')); // Utiliser t() pour la traduction
    if (verify) {
      await store.destroy(id);
      store.users = store.users.filter(user => user.id !== id);
      toast.success(t('userList.userDeleted')); // Utiliser t() pour la traduction
    }
  } catch (error) {
    toast.error(t('userList.deleteError')); // Utiliser t() pour la traduction
    console.error("Error deleting user:", error.message);
  }
};

onMounted(() => {
  store.loadDataFromApi();
});
</script>

<style scoped>
.user-list-container {
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

.add-user-button {
  border-radius: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.user-table {
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

.text-danger {
  font-weight: bold;
}
.cursor-pointer{
  cursor: pointer;
}
</style>