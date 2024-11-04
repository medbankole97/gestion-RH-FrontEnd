import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore"; 

export const useTypeLeaveStore = defineStore("typeLeaveStore", {
  state: () => ({
    typeLeaves: [],
    typeLeaveForm: {
      name: null,
      userId: null,
    },
    users: [], // Ajoutez cette ligne pour stocker les utilisateurs
  }),
  actions: {
    // Charger les types de congés depuis l'API
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/type-leaves");
        this.typeLeaves = resp.data.typeLeaves;
        console.log(this.typeLeaves);
      } catch (error) {
        this.typeLeaves = [];
        console.error("Error loading type leaves:", error);
      }
    },

    // Charger les utilisateurs depuis l'API
    async loadUsersFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/users"); // Assurez-vous que cette route existe
        this.users = resp.data.users; // Assurez-vous que la structure des données est correcte
        console.log(this.users);
      } catch (error) {
        this.users = [];
        console.error("Error loading users:", error);
      }
    },

    // Créer un nouveau type de congé
    async store(typeLeave) {
      const resp = await axios.post("http://localhost:5000/type-leaves", typeLeave);
      await this.loadDataFromApi();
      return resp;
    },

    // Mettre à jour un type de congé existant
    async update(id, typeLeave) {
      const resp = await axios.put(`http://localhost:5000/type-leaves/${id}`, typeLeave);
      await this.loadDataFromApi();
      return resp;
    },

    // Supprimer un type de congé
    async destroy(id) {
      await axios.delete(`http://localhost:5000/type-leaves/${id}`);
      await this.loadDataFromApi();
    },

    // Récupérer un type de congé par ID
    async getById(id) {
      const resp = await axios.get(`http://localhost:5000/type-leaves/${id}`);
      return resp.data;
    },

    // Réinitialiser le formulaire de type de congé
    resetForm() {
      this.typeLeaveForm.name = null;
      this.typeLeaveForm.userId = null;
    },
  },
});
