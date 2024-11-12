import axios from 'axios';
import { defineStore } from 'pinia';

export const useTimeTrackingStore = defineStore('timetrackingStore', {
  state: () => ({
    timeTrackings: [],
  }),

  actions: {
    async loadDataFromApi() {
      try {
        const resp = await axios.get('http://localhost:5000/time-trackings');
        console.log(resp.data.timeTrackings); // Vérifie les données reçues
        this.timeTrackings = resp.data.timeTrackings;
      } catch (error) {
        console.error('Error loading time trackings:', error);
        this.timeTrackings = [];
      }
    },

    async store(timeTracking) {
      return await axios.post('http://localhost:5000/time-trackings', timeTracking);
    },

    async update(id, timeTracking) {
      return await axios.put(`http://localhost:5000/time-trackings/${id}`, timeTracking);
    },

    async destroy(id) {
      await axios.delete(`http://localhost:5000/time-trackings/${id}`);
      this.timeTrackings = this.timeTrackings.filter(t => t.id !== id);
    },

    // Méthode pour récupérer un time tracking par son ID
    async fetchById(id) {
      try {
        const resp = await axios.get(`http://localhost:5000/time-trackings/${id}`);
        return resp.data;  // Retourne l'objet récupéré depuis l'API
      } catch (error) {
        console.error('Error fetching time tracking by ID:', error);
        return null;  // Retourne null si une erreur se produit
      }
    },
  },
});
