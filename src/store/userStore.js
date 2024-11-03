import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore"; // Importer authStore pour l'utiliser dans userStore

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    currentUser: null,
    userForm: {
      fullname: null,
      email: null,
      password: null,
      status: true,
      role: null,
    },
    searchResults: [],
  }),
  actions: {
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:5000/users");
        this.users = resp.data.users;
        console.log(this.users);
      } catch (error) {
        this.users = [];
      }
    },

    async store(user) {
      return await axios.post("http://localhost:5000/auth/register", user);
    },

    async update(id, user) {
      const resp = await axios.put(`http://localhost:5000/users/${id}`, user);
      await this.loadDataFromApi();
      return resp;
    },

    async destroy(id) {
      await axios.delete(`http://localhost:5000/users/${id}`);
      await this.loadDataFromApi();
    },

    async getById(id) {
      const resp = await axios.get(`http://localhost:5000/users/${id}`);
      return resp.data;
    },

    resetForm() {
      this.userForm.fullname = null;
      this.userForm.email = null;
      this.userForm.password = null;
      this.userForm.status = true;
      this.userForm.role = null;
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
        throw new Error("Could not fetch user data.");
      }
    },
  },
});
