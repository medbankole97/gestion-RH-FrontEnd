// src/store/timetrackingStore.js
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
  },
});
