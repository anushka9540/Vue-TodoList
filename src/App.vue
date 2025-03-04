<template>
  <div class="app-container">
    <nav class="nav">
      <router-link to="/" exact-active-class="active-link">Projects</router-link>
      <router-link to="/add" exact-active-class="active-link">Add a New Project</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const projects = ref([]);
const lastId = ref(0);
const saveProjects = () => {
  localStorage.setItem('projects', JSON.stringify(projects.value));
  localStorage.setItem('lastId', lastId.value);
};

const storedProjects = localStorage.getItem('projects');
if (storedProjects) {
  projects.value = JSON.parse(storedProjects);
  lastId.value = Number(localStorage.getItem('lastId')) || 0;
}

provide('projects', projects);
provide('lastId', lastId);
provide('saveProjects', saveProjects);
</script>

<style scoped>
.app-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

nav {
  width: 515px;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px;
  background: #494949;
  border-radius: 8px;
}

.nav {
  display: flex;
  gap: 20px;
  font-size: 18px;
}

.nav a {
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  position: relative;
}

.nav a.active-link {
  font-weight: bold;
}

.nav a.active-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 2px;
  background-color: #e91e63;
}

@media (max-width: 600px) {
  nav {
    width: auto;
    width: 89%;
    flex-direction: row;
    align-items: center;
  }
}
</style>
