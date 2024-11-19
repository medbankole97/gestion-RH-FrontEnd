import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore"; // Importer authStore pour l'utiliser dans userStore

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [], // Liste des utilisateurs
    currentUser: null, // Utilisateur connecté
    userForm: {
      fullname: null,
      email: null,
      password: null,
      status: true,
      role: null,
    },
    errors: {}, // Nouveau champ pour les erreurs
    searchResults: [], // Résultats de recherche (si nécessaire)
  }),

  actions: {
    // Charger les utilisateurs depuis l'API
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/users");
        this.users = resp.data.users;
      } catch (error) {
        console.error("Error loading users:", error);
        this.users = [];
      }
    },

    // Ajouter un nouvel utilisateur
    async store(user) {
      this.errors = {}; // Réinitialise les erreurs avant l'appel
      try {
        await axios.post("http://localhost:5000/users", user);
        await this.loadDataFromApi(); // Recharge les données après la création
        return true; // Indique que l'opération a réussi
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = this.parseErrors(error.response.data.errors);
          console.log(this.errors);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error; // Rejette la promesse pour indiquer un échec
      }
    },
    

    
 // Mettre à jour un utilisateur existant
async update(id, user) {
  this.errors = {}; // Réinitialise les erreurs avant l'appel
  try {
    const resp = await axios.put(`http://localhost:5000/users/${id}`, user);
    await this.loadDataFromApi(); // Recharge les données après la mise à jour
    return resp; // Retourne la réponse pour indiquer le succès
  } catch (error) {
    if (error.response && error.response.data.errors) {
      // Capture et parse les erreurs
      this.errors = this.parseErrors(error.response.data.errors);
      console.log(this.errors); // Débogage : Affiche les erreurs au besoin
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Rejette la promesse pour signaler un échec
  }
},


    // Supprimer un utilisateur
    async destroy(id) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        await this.loadDataFromApi();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },

    // Récupérer les détails d'un utilisateur par son ID
    async getById(id) {
      try {
        const resp = await axios.get(`http://localhost:5000/users/${id}`);
        return resp.data;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
      }
    },

    // Récupérer les données de l'utilisateur connecté
    async fetchUserData() {
      const authStore = useAuthStore(); // Accéder à authStore pour le token
      try {
        if (authStore.isAuthenticated) {
          const response = await axios.get("http://localhost:5000/auth/user");
          this.currentUser = response.data;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

      }
    },

    // Parse les erreurs renvoyées par le backend
    parseErrors(errorArray) {
      const parsed = {};
      errorArray.forEach((err) => {
        parsed[err.path] = err.msg; // Stocke chaque erreur par son chemin (ex: fullname, email)
      });
      return parsed;
    },

    // Réinitialiser les erreurs
    resetErrors() {
      this.errors = {};
    },

    // Réinitialiser le formulaire et les erreurs
    resetForm() {
      this.userForm = {
        fullname: null,
        email: null,
        password: null,
        status: true,
        role: null,
      };
      this.resetErrors();
    },
  },
});
