<template>
  <div class="type-leave-list-container">
    <h2 class="text-center mb-4">Type Leave List</h2>

    <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
      <input 
        type="text" 
        class="form-control mb-2 mb-md-0 w-50 search-input"
        placeholder="Search..."
        v-model="searchQuery"
      />

      <router-link to="/type-leave/new" class="btn btn-dark add-type-leave-button">
        <i class="fa-solid fa-plus"></i> New Type Leave
      </router-link>
    </div>

    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered type-leave-table">
        <thead class="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">User</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredTypeLeaves.length === 0">
            <td colspan="4" class="text-center">No data available</td>
          </tr>
          <tr v-for="(typeLeave, index) in filteredTypeLeaves" :key="typeLeave.id" class="table-row">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ typeLeave.name }}</td>
            <td>{{ getUserFullName(typeLeave.userId) }}</td>
            <td class="text-center action-icons">
              <font-awesome-icon 
                icon="eye" 
                class="text-info me-2 cursor-pointer" 
                @click="viewDetails(typeLeave)" 
              />
              <font-awesome-icon 
                icon="edit" 
                class="text-warning me-2 cursor-pointer" 
                @click="editTypeLeave(typeLeave.id)" 
              />
              <font-awesome-icon 
                icon="trash" 
                class="text-danger cursor-pointer" 
                @click="remove(typeLeave.id)" 
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
import { useTypeLeaveStore } from '@/store/typeleaveStore';
import { useUserStore } from '@/store/userStore';

const router = useRouter(); 
const typeLeaveStore = useTypeLeaveStore();
const userStore = useUserStore(); // Créez une instance du store utilisateur
const searchQuery = ref(""); 

const filteredTypeLeaves = computed(() => {
  if (searchQuery.value) {
    return typeLeaveStore.typeLeaves.filter((typeLeave) =>
      typeLeave.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return typeLeaveStore.typeLeaves;
});

// Récupérer le nom complet de l'utilisateur en fonction de userId
const getUserFullName = (userId) => {
  const user = userStore.users.find(u => u.id === userId);
  return user ? user.fullname : 'Unknown';
};

const viewDetails = (typeLeave) => {
  console.log("Viewing details for:", typeLeave);
  router.push({ name: 'detail-type-leave', params: { id: typeLeave.id } });
};

const editTypeLeave = (id) => {
  router.push({ name: 'modifier-type-leave', params: { id: id } });
};

const remove = async (id) => {
  try {
    const verify = window.confirm("Are you sure you want to delete this type leave?");
    if (verify) {
      await typeLeaveStore.destroy(id); 
      typeLeaveStore.typeLeaves = typeLeaveStore.typeLeaves.filter(typeLeave => typeLeave.id !== id);
    }
  } catch (error) {
    console.error("Error deleting type leave:", error.message);
  }
};

onMounted(() => {
  typeLeaveStore.loadDataFromApi();
  userStore.loadDataFromApi(); // Chargez également les utilisateurs
});
</script>

  
<style scoped>
.type-leave-list-container {
  padding: 20px 2em;
  margin-top: 50px; 
  min-height: 80vh; 
  max-width: 90%;
  margin: 0 auto; /* Center align the content */
  border-radius: 8px;
  box-shadow:  1px 1px rgba(172, 170, 170, 0.1);
}

.actions-container {
  align-items: center;
}

.search-input {
  max-width: 300px;
  border-radius: 20px;
  padding: 0.5rem 1rem;
}

.add-type-leave-button {
  border-radius: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.type-leave-table {
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
</style>
