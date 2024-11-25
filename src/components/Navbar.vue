<template>
  <div>
    <nav class="navbar navbar-expand-lg custom-navbar">
      <div class="container d-flex align-items-center">
        <!-- Logo à gauche -->
        
          <img src="@/assets/rh1.jpg" alt="Logo" class="logo">
       

        <!-- Menu centré -->
        <ul class="navbar-nav mx-auto">
            <!-- Lien vers la page Accueil -->
  <li class="nav-item">
    <router-link
      :class="['nav-link', { active: linkActive === 'home' }]"
      to="/home-page"
      @click="buttonFocus('home')"
    >
      <i class="fas fa-home"></i> {{ t('navbar.home') }}
    </router-link>
  </li>

          <li class="nav-item">
            <router-link  v-if="userRoles === 'ADMIN' "
              :class="['nav-link', { active: linkActive === 'list-user' }]"
              to="/user" @click="buttonFocus('list-user')"
            >
              <i class="fa-solid fa-users"></i> {{ t('navbar.users') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-timetracking' }]"
              to="/timetracking" @click="buttonFocus('list-timetracking')"
            >
              <i class="fas fa-clock"></i> {{ t('navbar.timetracking') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-request-leave' }]"
              to="/request-leave" @click="buttonFocus('list-request-leave')"
            >
              <i class="fas fa-envelope"></i> {{ t('navbar.requestLeave') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-type-leave' }]"
              to="/type-leave" @click="buttonFocus('list-type-leave')"
            >
              <i class="fas fa-list"></i> {{ t('navbar.typeLeave') }}
            </router-link>
          </li>
        </ul>

        <!-- Sélecteur de langue -->
        <select v-model="selectedLanguage" @change="changeLanguage" class="language-selector me-4">
          <option value="en">En</option>
          <option value="fr">Fr</option>
          <option value="ar">Ar</option>
        </select>

        <!-- Ajouter cette section à droite de la barre de navigation -->
        <div v-if="authStore.isAuthenticated" class="user-info d-flex align-items-center me-4">
  <i class="fas fa-user-circle text-light me-2"></i>
  <span class="text-light">{{ authStore.user?.fullname }}</span>
</div>



        <!-- Déconnexion à droite -->
        <button @click="logout" class="btn btn-outline-light logout-button">
          <i class="fas fa-sign-out-alt"></i> {{ t('navbar.logout') }}
        </button>
      </div>
    </nav>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { useI18n } from 'vue-i18n'; // Module de traduction
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const { t, locale } = useI18n(); // Récupérer la fonction pour changer la langue
const selectedLanguage = ref(locale.value); // Langue par défaut

const linkActive = ref('home');
const route = useRoute();
const router = useRouter();

const userRoles = ref(authStore.user.role);

onMounted(() => {
  // Vérifie si l'utilisateur est authentifié au chargement de la navbar
  authStore.checkAuth();

  if (route.name === 'list-timetracking') {
    linkActive.value = 'list-timetracking';
  } else if (route.name === 'list-request-leave') {
    linkActive.value = 'list-request-leave';
  } else if (route.name === 'list-type-leave') {
    linkActive.value = 'list-type-leave';
  } else if (route.name === 'list-user') {
    linkActive.value = 'list-user';
  } 
  else {
    linkActive.value = 'home';
  }
});

const buttonFocus = (val) => {
  linkActive.value = val;
};

const logout = () => {
  Swal.fire({
    title: t('navbar.confirmLogout'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t('navbar.yesLogout')
  }).then((result) => {
    if (result.isConfirmed) {
      authStore.logout(); // Déconnecte l'utilisateur
      router.push('/'); // Redirige vers la page d'accueil
    }
  });
};

const changeLanguage = () => {
  locale.value = selectedLanguage.value; // Change la langue de l'application
};
</script>


<style scoped>
/* Navbar custom styles */
.custom-navbar {
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.user-info {
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
}

.logo {
  height: 40px;
  width: auto;
  margin-right: 15px;
}

.navbar-nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}

.nav-link.active {
  color: #FFD700;
}

.nav-link:hover {
  color: #FFD700;
  transform: scale(1.05);
}

.logout-button {
  color: #fff;
  border-color: #fff;
}

.logout-button:hover {
  background-color: #FF6B6B;
  border-color: #FF6B6B;
}

.language-selector {
  margin-left: 15px;
  padding: 0.1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #000;
}

@media (max-width: 768px) {
  .navbar-nav {
    flex-direction: column;
    text-align: center;
  }
}
</style>
