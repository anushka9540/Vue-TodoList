<template>
  <div class="app-container">
    <nav>
      <router-link to="/">Projects</router-link>
      <router-link to="/add">Add a New Project</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const projects = ref([
  {
    id: 1,
    title: 'Create new homepage banner',
    details: 'Update the homepage with a fresh banner',
    status: 'ongoing'
  },
  {
    id: 2,
    title: 'Make marketing email',
    details: 'Send a promotional email to subscribers',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Update promo links',
    details: 'Ensure all promo links are correct',
    status: 'ongoing'
  }
]);

provide('projects', projects);
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
  background: #333;
  border-radius: 8px;
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background 0.3s;
}

nav a router-link-exact-active {
  background: #007bff;
}

nav a:hover {
  background: #007bff;
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
