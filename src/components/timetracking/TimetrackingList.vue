<template>
    <div class="container-fluid">
      <h2 class="text-center mb-4">Time Tracking List</h2>
      <router-link to="/type-leave/new"  class="btn btn-primary mb-3">
          <i class="fa-solid fa-plus"></i> New Type Leave
        </router-link>
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
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
            <tr v-for="(timeTracking, index) in filteredTimeTrackings" :key="timeTracking.id">
              <td scope="row">{{ index + 1 }}</td>
              <td>{{ timeTracking.checkin_time }}</td>
              <td>{{ timeTracking.checkout_time || 'N/A' }}</td>
              <td>{{ getUserFullName(timeTracking.userId) }}</td>
              <td class="text-center">
                <font-awesome-icon 
                  icon="eye" 
                  class="text-info me-2 cursor-pointer" 
                  @click="editTimeTracking(timeTracking.id)"
                />
                <!-- <button  class="btn btn-warning btn-sm">Edit</button> -->
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
  
  const router = useRouter();
  const timeTrackingStore = useTimeTrackingStore();
  const userStore = useUserStore();
  
  onMounted(() => {
    timeTrackingStore.loadDataFromApi();
    userStore.loadDataFromApi();
  });
  
  const filteredTimeTrackings = computed(() => timeTrackingStore.timeTrackings);
  
  const getUserFullName = (userId) => {
    const user = userStore.users.find(u => u.id === userId);
    return user ? user.fullname : 'Unknown';
  };
  
  const editTimeTracking = (id) => {
    router.push({ name: 'edit-time-tracking', params: { id: id } });
  };
  
  const remove = async (id) => {
    if (confirm("Are you sure you want to delete this time tracking?")) {
      await timeTrackingStore.destroy(id);
    }
  };
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
  </style>
  