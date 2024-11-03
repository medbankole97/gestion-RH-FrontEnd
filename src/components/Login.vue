<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Log In</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@store/authStore';

// Déclarations de références pour les champs de connexion et l'erreur
const email = ref('');
const password = ref('');
const error = ref(null);

// Utilisation du store d'authentification et de Vue Router
const authStore = useAuthStore();
const router = useRouter();

// Fonction de connexion
const login = async () => {
  try {
    // Appel à la fonction login du store d'authentification
    await authStore.login(email.value, password.value);

    // Redirection vers la page dashboard après une connexion réussie
    router.push('/Navbar');
  } catch (err) {
    // Gestion de l'erreur en affichant le message dans l'interface
    error.value = err.message;
  }
};
</script>

<style scoped>
/* Styles pour le formulaire de connexion */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transform: translateY(50%);
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
