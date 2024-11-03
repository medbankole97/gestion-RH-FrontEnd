<template>
  <div>
    <!-- Barre de navigation -->
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <ul class="nav">
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-user' }]"
              to="/user" @click="buttonFocus('list-user')"
            >
              <i :class="['fa-solid', 'fa-users', { active: $route.name === 'list-user' }]"></i>
              Users
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-timetracking' }]"
              to="/timetracking" @click="buttonFocus('list-timetracking')"
            >
              <i :class="['fas', 'fa-clock', { active: $route.name === 'list-timetracking' }]"></i>
              Time Tracking
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-request-leave' }]"
              to="/request-leave" @click="buttonFocus('list-request-leave')"
            >
              <i :class="['fas', 'fa-envelope', { active: $route.name === 'list-request-leave' }]"></i>
              Request Leave
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="['nav-link', { active: linkActive === 'list-type-leave' }]"
              to="/type-leave" @click="buttonFocus('list-type-leave')"
            >
              <i :class="['fas', 'fa-list', { active: $route.name === 'list-type-leave' }]"></i>
              Type Leave
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- <router-view /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const linkActive = ref('list-user'); // Par défaut "user" actif
const route = useRoute();

// Vérification de la route active au montage du composant
onMounted(() => {
  if (route.name === 'list-timetracking') {
    linkActive.value = 'list-timetracking';
  } else if (route.name === 'list-request-leave') {
    linkActive.value = 'list-request-leave';
  } else if (route.name === 'list-type-leave') {
    linkActive.value = 'list-type-leave';
  } else {
    linkActive.value = 'list-user'; // "user" par défaut
  }
});

const buttonFocus = (val) => {
  linkActive.value = val;
};
</script>

<style scoped>
/* Couleur noire par défaut */
.nav-link {
  color: black;
  transition: color 0.3s ease;
}


.nav-link.active {
  color: blue;
}


.nav-link i {
  color: black;
}

.nav-link.active i {
  color: blue;
}
</style>