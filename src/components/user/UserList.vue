<template>
  <div class="container-fluid">
    <h2 class="text-center mb-4">User List</h2>

    <div class="d-flex flex-column flex-md-row justify-content-between mb-4">
      <input 
        type="text" 
        class="form-control mb-2 mb-md-0 w-50"
        placeholder="Search..."
        v-model="searchQuery"
      />
     
      <router-link :to="{ name: 'ajout-user' }" class="btn btn-primary mb-3">
        <i class="fa-solid fa-plus"></i> New User
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fullname</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="text-center">No data available</td>
          </tr>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.status ? 'Active' : 'Inactive' }}</td>
            <td class="text-center">
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
const router = useRouter(); 
const store = useUserStore();
const searchQuery = ref(""); 

const filteredUsers = computed(() => {
  if (searchQuery.value) {
    return store.users.filter((user) =>
      user.fullname.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return store.users;
});

const viewDetails = (user) => {
  console.log("Viewing details for:", user);
  router.push({ name: 'detail-user', params: { id: user.id } });
};

const editUser = (id) => {
  router.push({ name: 'modifier-user', params: { id: id } });
};

const remove = async (id) => {
  try {
    const verify = window.confirm("Are you sure you want to delete this user?");
    if (verify) {
      await store.destroy(id); 
      store.users = store.users.filter(user => user.id !== id);
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};

onMounted(() => {
  store.loadDataFromApi();
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
