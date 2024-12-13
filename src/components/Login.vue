<template>
  <div class="login-background">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group password-group">
  <label for="password">Password</label>
  <div class="password-wrapper">
    <input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      id="password"
      required
    />
    <button type="button" class="toggle-password" @click="togglePassword">
      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
    </button>
  </div>
</div>

        <button type="submit" class="login-button">Log In</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
      <!-- Forgot Password Link -->
      <p class="forgot-password">
        <router-link to="/forgot-password">Forgot Password?</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useAuthStore } from '@store/authStore';
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};


const email = ref('');
const password = ref('');
const error = ref(null);
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    await authStore.login(email.value, password.value);

    Swal.fire({
      icon: 'success',
      title: 'Successfully Authenticated',
      text: 'You are now logged in!',
      showConfirmButton: false,
      timer: 1500
    });

    router.push('/home-page');
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
.login-background {
  background-image: linear-gradient(to bottom right, #e0f7fa);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h2 {
  color: #080808;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
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
  border-color: #030303;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #0f0f0f;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover {
  background-color: #858282;
  transform: scale(1.05);
}

.error-message {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.forgot-password {
  margin-top: 1rem;
}

.forgot-password a {
  color: #050505;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.password-group {
  position: relative;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  flex: 1;
}

.toggle-password {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #555;
  font-size: 1.2rem;
}

.toggle-password:focus {
  outline: none;
}

.toggle-password:hover {
  color: #000;
}

</style>
