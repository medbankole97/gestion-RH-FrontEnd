import axios from "axios";
import { defineStore } from "pinia";

export const useRequestLeaveStore = defineStore("requestLeaveStore", {
  state: () => ({
    requestLeaves: [],
    requestLeaveForm: {
      start_date: null,
      end_date: null,
      motif: '',
      status: 'PENDING', // Valeur par défaut pour le statut
      typeLeaveId: null,
    },
    typeLeaves: [], // Liste des types de congés
  }),

  actions: {
    // Charger toutes les demandes de congé depuis l'API
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/request-leaves");
        this.requestLeaves = resp.data.requestLeaves;
        console.log("Loaded request leaves:", this.requestLeaves);
      } catch (error) {
        this.requestLeaves = [];
        console.error("Error loading request leaves:", error);
      }
    },

    // Charger les types de congé depuis l'API
    async loadTypeLeavesFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/type-leaves");
        this.typeLeaves = resp.data.typeLeaves;
        console.log("Loaded type leaves:", this.typeLeaves);
      } catch (error) {
        this.typeLeaves = [];
        console.error("Error loading type leaves:", error);
      }
    },

    // Créer une nouvelle demande de congé sans vérifier l'authentification
    async store(requestLeave) {
      try {
        const resp = await axios.post("http://localhost:5000/request-leaves", requestLeave);
        
        // Recharger les données après ajout
        await this.loadDataFromApi();
        return resp;
      } catch (error) {
        console.error("Error creating request leave:", error);
      }
    },

    // Mettre à jour une demande de congé existante
    async update(id, requestLeave) {
      try {
        const resp = await axios.put(`http://localhost:5000/request-leaves/${id}`, requestLeave);
        
        // Recharger les données après mise à jour
        await this.loadDataFromApi();
        return resp;
      } catch (error) {
        console.error("Error updating request leave:", error);
      }
    },

    // Supprimer une demande de congé
    async destroy(id) {
      try {
        await axios.delete(`http://localhost:5000/request-leaves/${id}`);
        
        // Recharger les données après suppression
        await this.loadDataFromApi();
      } catch (error) {
        console.error("Error deleting request leave:", error);
      }
    },

    // Récupérer une demande de congé par ID
    async getById(id) {
      try {
        const resp = await axios.get(`http://localhost:5000/request-leaves/${id}`);
        return resp.data.requestLeave;
      } catch (error) {
        console.error("Error fetching request leave:", error);
      }
    },

    // Réinitialiser le formulaire de demande de congé
    resetForm() {
      this.requestLeaveForm = {
        start_date: null,
        end_date: null,
        motif: '',
        status: 'PENDING',
        typeLeaveId: null,
      };
    },
  },
});
