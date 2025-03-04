<template>
  <div class="container">
    <h1>Edit Project</h1>
    <form @submit.prevent="updateProject">
      <label>Title:</label>
      <input v-model="title" required class="title-box" />
  
      <label>Details:</label>
      <textarea v-model="details"></textarea>
  
      <button type="submit">Update Project</button>
    </form>
    <router-link to="/">Back to Projects</router-link>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const projects = inject('projects');
const saveProjects = inject('saveProjects');
const route = useRoute();
const router = useRouter();

const project = computed(() =>
  projects.value.find((p) => p.id === Number(route.params.id))
);

const title = ref(project.value?.title || '');
const details = ref(project.value?.details || '');

const updateProject = () => {
  if (project.value) {
    project.value.title = title.value;
    project.value.details = details.value;
    saveProjects();
    router.push('/');
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

h1 {
  font-size: 1.8rem;
  color: #333;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
  color: rgb(100, 97, 97);
  font-weight: 500;
}

.title-box {
  border: none;
  border-bottom: 2px solid #7c7878;
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
}

button {
  margin-top: 15px;
  padding: 10px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #219150;
}

a {
  display: inline-block;
  margin-top: 15px;
  text-decoration: none;
  color: #3498db;
}
</style>
