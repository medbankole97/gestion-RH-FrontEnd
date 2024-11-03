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
// import "@fortawesome/fontawesome-free/css/all.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

library.add(fas, fab, far);
dom.watch();

library.add(faUser, faLock);

const app = createApp(App);
const pinia = createPinia();

// Utilisez Pinia avec votre application
app.use(pinia);
app.use(router);

// Initialiser l'état d'authentification avec le token du localStorage
const authStore = useAuthStore();
authStore.checkAuth();

// app.use(i18n); 
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
