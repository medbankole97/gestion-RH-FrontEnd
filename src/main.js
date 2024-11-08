import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "@router";
import { useAuthStore } from '@/store/authStore';
// import i18n from "./i18n"; 

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importer des icônes spécifiques
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

import Toast, { POSITION } from "vue-toastification"; // Importer vue-toastification
import "vue-toastification/dist/index.css"; // Importer le style

// Ajouter les icônes à la bibliothèque
library.add(fas, fab, far);
dom.watch();
library.add(faUser, faLock);

const app = createApp(App);
const pinia = createPinia();

// Options pour vue-toastification
const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000, // Durée d'affichage des notifications
  closeOnClick: true,
  pauseOnHover: true,
};

// Utiliser les plugins avec votre application
app.use(pinia);
app.use(router);
app.use(Toast, toastOptions); // Appliquer vue-toastification avec options

// Initialiser l'état d'authentification avec le token du localStorage
const authStore = useAuthStore();
authStore.checkAuth();

// app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
