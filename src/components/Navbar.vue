<template>
  <div>
    <nav class="navbar navbar-expand-lg custom-navbar">
      <div class="container d-flex align-items-center">
        <!-- Logo à gauche -->
        <router-link to="/" class="navbar-brand">
          <img src="@/assets/rh1.jpg" alt="Logo" class="logo">
        </router-link>

        <!-- Menu centré -->
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-user' }]"
              to="/user" @click="buttonFocus('list-user')"
            >
              <i class="fa-solid fa-users"></i> Users
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-timetracking' }]"
              to="/timetracking" @click="buttonFocus('list-timetracking')"
            >
              <i class="fas fa-clock"></i> Time Tracking
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-request-leave' }]"
              to="/request-leave" @click="buttonFocus('list-request-leave')"
            >
              <i class="fas fa-envelope"></i> Request Leave
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-type-leave' }]"
              to="/type-leave" @click="buttonFocus('list-type-leave')"
            >
              <i class="fas fa-list"></i> Type Leave
            </router-link>
          </li>
        </ul>

        <!-- Déconnexion à droite -->
        <button @click="logout" class="btn btn-outline-light logout-button">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const linkActive = ref('list-user');
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.name === 'list-timetracking') {
    linkActive.value = 'list-timetracking';
  } else if (route.name === 'list-request-leave') {
    linkActive.value = 'list-request-leave';
  } else if (route.name === 'list-type-leave') {
    linkActive.value = 'list-type-leave';
  } else {
    linkActive.value = 'list-user';
  }
});

const buttonFocus = (val) => {
  linkActive.value = val;
};

const logout = () => {
  Swal.fire({
    title: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, logout'
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/login');
    }
  });
};
</script>

<style scoped>
/* Navbar custom styles */
.custom-navbar {
  background-color: #000; /* Fond noir */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.logo {
  height: 40px;
  width: auto;
  margin-right: 15px;
}

/* Centrer le menu */
.navbar-nav {
  display: flex;
  gap: 20px;
}

/* Couleurs et effets des liens */
.nav-link {
  color: #ffffff; /* Texte en blanc */
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}

.nav-link.active {
  color: #FFD700; /* Couleur dorée pour le lien actif */
}

.nav-link:hover {
  color: #FFD700;
  transform: scale(1.05);
}

.logout-button {
  margin-left: auto;
  color: #fff;
  border-color: #fff;
}

.logout-button:hover {
  background-color: #FF6B6B;
  border-color: #FF6B6B;
}

/* Ajustement responsive */
@media (max-width: 768px) {
  .navbar-nav {
    flex-direction: column;
    text-align: center;
  }
}
</style>
