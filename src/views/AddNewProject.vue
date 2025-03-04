<template>
  <div class="form-container">
    <h1>Add a New Project</h1>
    <form @submit.prevent="addProject">
      <label>Title:</label>
      <input v-model="title" required class="title-box" />
  
      <label>Details:</label>
      <textarea v-model="details" required></textarea>
  
      <button type="submit">Add Project</button>
    </form>
    <router-link to="/">Back to Projects</router-link>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const projects = inject('projects');
const saveProjects = inject('saveProjects');
const lastId = inject('lastId');

const title = ref('');
const details = ref('');
const router = useRouter();

const addProject = () => {
  if (title.value.trim() === '') return;

  lastId.value++;

  projects.value.push({
    id: lastId.value,
    title: title.value,
    details: details.value || 'No details provided',
    status: 'ongoing'
  });

  saveProjects();

  title.value = '';
  details.value = '';

  router.push('/');
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  color: black;
}

.form-container {
  max-width: 500px;
  margin: auto;
  padding: 21px;
  background: white;
  height: 420px;
}

.title-box {
  border: none;
  border-bottom: 2px solid #7c7878;
}

label {
  color: rgb(100, 97, 97);
  font-size: 16px;
  font-weight: 500;
}

input,
textarea {
  width: 90%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 2px solid #7c7878;
  background: #f5f5f5;
  color: rgb(34, 33, 33);
  margin-bottom: 20px;
}

button {
  padding: 10px;
  background: #27ae60;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
}

button:hover {
  background: #219150;
}

@media (max-width: 600px) {
  .form-container {
    width: 84%;
    height: auto;
  }
}
</style>
