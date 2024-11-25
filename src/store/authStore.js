import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', { email, password });
        const { accessToken, user } = response.data;

        this.isAuthenticated = true;
        this.token = accessToken;
        this.user = user;
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('authUser', JSON.stringify(user));

        

        // Ajout de l'authentification dans les headers d'axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
        this.isAuthenticated = false;
        this.token = null;
        this.user = null;
        throw new Error(error.response?.data?.error || 'Login failed');
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      delete axios.defaults.headers.common["Authorization"];
    },

    checkAuth() {
      try {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("authUser");
    
        console.log("Token récupéré :", token);
        console.log("Utilisateur récupéré :", user);
    
        if (token && user) {
          this.isAuthenticated = true;
          this.token = token;
          this.user = JSON.parse(user);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          this.isAuthenticated = false;
          this.token = null;
          this.user = null;
        }
      } catch (error) {
        console.error("Erreur dans checkAuth :", error);
        this.isAuthenticated = false;
        this.token = null;
        this.user = null;
      }
    },
    
  },
});
