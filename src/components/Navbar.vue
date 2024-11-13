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
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">عربي</option>
        </select>

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
import { useI18n } from 'vue-i18n'; // Importez le module de traduction
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const { t, locale } = useI18n(); // Récupérez la fonction pour changer la langue
const selectedLanguage = ref(locale.value); // Assignez la langue par défaut à l'option sélectionnée

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
    title: t('navbar.confirmLogout'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t('navbar.yesLogout')
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/');
    }
  });
};
const changeLanguage = () => {
  locale.value = selectedLanguage.value; // Changez la langue de l'application
};
</script>

<style scoped>
/* Navbar custom styles */
.custom-navbar {
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  padding: 0.5rem;
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
