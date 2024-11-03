<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-6 mx-auto">
        <h3 class="text-center">Edit User</h3>
        <form @submit.prevent="onEdit">
          <div class="mb-3">
            <label for="fullname" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="fullname" v-model="form.fullname"  />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="form.email"  />
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select class="form-control" id="role" v-model="form.role" >
              <option value="ADMIN">ADMIN</option>
              <option value="EMPLOYE">EMPLOYE</option>
            </select>
          </div>
          <div class="d-flex justify-content-between">
            <router-link :to="{ name: 'list-user' }" class="btn btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> Cancel
            </router-link>
            <button class="btn btn-success">Confirmer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { useUserStore } from '@store/userStore';

const store = useUserStore();
const route = useRoute();
const router = useRouter();

const userId = route.params.id;
console.log('User ID:', userId); // Vérifiez si userId est défini

const form = reactive({
  fullname: "",
  email: "",
  role: ""
});

const onEdit = async () => {
  try {
    await store.update(userId, {
      fullname: form.fullname,
      email: form.email,
      role: form.role
    });
    // Réinitialiser le formulaire après l'édition
    form.fullname = "";
    form.email = "";
    form.role = "";
    router.push('/users');
  } catch (error) {
    console.error(error); // Affichez l'erreur dans la console
    alert(error.message);
  }
};

onMounted(async () => {
  try {
    const user = await store.getById(userId);
    console.log('User Data:', user); // Vérifiez si les données de l'utilisateur sont chargées
    if (user) {
      form.fullname = user.fullname;
      form.email = user.email;
      form.role = user.role;
    } else {
      console.error('No user found with the given ID');
    }
  } catch (error) {
    console.error('Error fetching user:', error); // Affichez l'erreur dans la console
  }
});
</script>


<style scoped>
.container {
  padding: 20px;
}

@media (max-width: 576px) {
  .container {
    padding: 10px;
  }
}
</style>
