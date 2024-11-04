<template>
    <div class="container-fluid">
      <h2 class="text-center mb-4">Type Leave List</h2>
  
      <div class="d-flex flex-column flex-md-row justify-content-between mb-4">
        <input 
          type="text" 
          class="form-control mb-2 mb-md-0 w-50"
          placeholder="Search..."
          v-model="searchQuery"
        />
       
        <router-link to="/type-leave/new"  class="btn btn-primary mb-3">
          <i class="fa-solid fa-plus"></i> New Type Leave
        </router-link>
      </div>
  
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
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
            <tr v-for="(typeLeave, index) in filteredTypeLeaves" :key="typeLeave.id">
              <td scope="row">{{ index + 1 }}</td>
              <td>{{ typeLeave.name }}</td>
              <td>{{ getUserFullName(typeLeave.userId) }}</td>
              <td class="text-center">
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
  import { useUserStore } from '@/store/userStore'; // Importez le store utilisateur
  
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
  .container-fluid {
    padding: 20px 2em;
    margin-top: 50px; 
    min-height: 80vh; 
  }
  
  .table-responsive {
    max-width: 100%;
    overflow-x: auto;
  }
  .cursor-pointer {
      cursor: pointer;
  }
  </style>
  