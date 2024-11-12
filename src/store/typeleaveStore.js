import axios from "axios";
import { defineStore } from "pinia";

export const useTypeLeaveStore = defineStore("typeLeaveStore", {
  state: () => ({
    typeLeaves: [],
    typeLeaveForm: {
      name: null,
    },
  }),

  actions: {
    // Charger les types de congés depuis l'API
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/type-leaves");
        this.typeLeaves = resp.data.typeLeaves;
        console.log("Loaded type leaves:", this.typeLeaves);
      } catch (error) {
        this.typeLeaves = [];
        console.error("Error loading type leaves:", error);
      }
    },

    // Créer un nouveau type de congé sans vérifier l'authentification
    async store(typeLeave) {
      try {
        const resp = await axios.post("http://localhost:5000/type-leaves", typeLeave);

        // Recharger les données après ajout
        await this.loadDataFromApi();
        return resp;
      } catch (error) {
        console.error("Error adding type leave:", error);
      }
    },

    // Mettre à jour un type de congé
    async update(id, typeLeave) {
      try {
        const resp = await axios.put(`http://localhost:5000/type-leaves/${id}`, typeLeave);
        await this.loadDataFromApi();
        return resp;
      } catch (error) {
        console.error("Error updating type leave:", error);
      }
    },

    // Supprimer un type de congé
    async destroy(id) {
      try {
        await axios.delete(`http://localhost:5000/type-leaves/${id}`);
        await this.loadDataFromApi();
      } catch (error) {
        console.error("Error deleting type leave:", error);
      }
    },

    // Récupérer un type de congé par ID
    async getById(id) {
      try {
        const resp = await axios.get(`http://localhost:5000/type-leaves/${id}`);
        return resp.data.typeLeave;
      } catch (error) {
        console.error("Error fetching type leave:", error);
      }
    },

    // Réinitialiser le formulaire de type de congé
    resetForm() {
      this.typeLeaveForm.name = null;
    },
  },
});
