import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore"; // Si nécessaire, importer authStore pour l'utiliser dans typeLeaveStore

export const useTypeLeaveStore = defineStore("typeLeaveStore", {
  state: () => ({
    typeLeaves: [],
    typeLeaveForm: {
      name: null,
    },
    errors: {}, // Nouveau champ pour stocker les erreurs
  }),

  actions: {
    // Charger les types de congés depuis l'API
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/type-leaves");
        this.typeLeaves = resp.data.typeLeaves;
        console.log("Loaded type leaves:", this.typeLeaves);
      } catch (error) {
        console.error("Error loading type leaves:", error);
        this.typeLeaves = [];
      }
    },

    // Créer un nouveau type de congé
    async store(typeLeave) {
      this.errors = {}; // Réinitialise les erreurs avant l'appel
      try {
        const resp = await axios.post("http://localhost:5000/type-leaves", typeLeave);
        // Recharger les données après ajout
        await this.loadDataFromApi();
        return resp; // Retourne la réponse si l'ajout a réussi
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = this.parseErrors(error.response.data.errors);
          console.log(this.errors); // Affiche les erreurs dans la console
        } else {
          console.error("Unexpected error:", error);
        }
        throw error; // Relance l'erreur pour le composant
      }
    },

    // Mettre à jour un type de congé
    async update(id, typeLeave) {
      this.errors = {}; // Réinitialise les erreurs
      try {
        const resp = await axios.put(`http://localhost:5000/type-leaves/${id}`, typeLeave);
        await this.loadDataFromApi();
        return resp;
      } catch (error) {
        if (error.response?.data?.errors) {
          this.errors = this.parseErrors(error.response.data.errors);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error; // Relance l'erreur pour le composant
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

    // Réinitialiser les erreurs
    resetErrors() {
      this.errors = {};
    },

    // Réinitialiser le formulaire et les erreurs
    resetForm() {
      this.typeLeaveForm.name = null;
      this.resetErrors();
    },

    // Parse les erreurs renvoyées par le backend
    parseErrors(errorArray) {
      const parsed = {};
      errorArray.forEach((err) => {
        parsed[err.path] = err.msg; // Stocke chaque erreur par son chemin (ex: name)
      });
      return parsed;
    },
  },
});
