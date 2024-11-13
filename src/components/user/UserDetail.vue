<template>
  <div class="user-detail-container">
    <div class="card shadow-sm p-4">
      <h3 class="text-center mb-4 user-detail-title">{{ $t('userDetail.title') }}</h3>
      <div class="user-info">
        <p><strong>{{ $t('userDetail.fullname') }}:</strong> <span>{{ user.fullname }}</span></p>
        <p><strong>{{ $t('userDetail.email') }}:</strong> <span>{{ user.email }}</span></p>
        <p><strong>{{ $t('userDetail.role') }}:</strong> <span>{{ user.role }}</span></p>
        <p>
          <strong>{{ $t('userDetail.status') }}:</strong>
          <span :class="{'badge-active': user.status, 'badge-inactive': !user.status}">
            {{ user.status ? $t('userDetail.active') : $t('userDetail.inactive') }}
          </span>
        </p>
      </div>
      <div class="text-center mt-4">
        <router-link :to="{ name: 'list-user' }" class="btn btn-dark back-button">
          <i class="fa-solid fa-arrow-left"></i> {{ $t('userDetail.backToList') }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { useToast } from 'vue-toastification';

const route = useRoute();
const store = useUserStore();
const toast = useToast();
const userId = route.params.id;

const user = ref({
  fullname: '',
  email: '',
  role: '',
  status: null
});

onMounted(async () => {
  try {
    const userData = await store.getById(userId);
    console.log("User Data:", userData);
    if (userData && userData.user) {
      user.value = userData.user;
    } else {
      toast.error("User not found.");
    }
  } catch (error) {
    toast.error("Error fetching user details.");
    console.error("Error fetching user details:", error);
  }
});
</script>

<style scoped>
.user-detail-container {
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
  max-width: 600px; /* Limite la largeur de la carte sur de grands écrans */
  width: 100%; /* Prend toute la largeur disponible jusqu'à la limite max-width */
}

.user-detail-title {
  color: #333;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.user-info p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.user-info p strong {
  color: #333;
  font-weight: bold;
}

.user-info span {
  font-weight: 500;
}

.badge-active {
  color: #28a745;
  font-weight: bold;
}

.badge-inactive {
  color: #dc3545;
  font-weight: bold;
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

