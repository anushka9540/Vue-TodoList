<template>
  <div class="container">
    <h1>{{ project?.title || 'Project Not Found' }}</h1>
    <p>{{ project?.details || 'No details available' }}</p>
    <p>
      Status: <strong>{{ project?.status || 'Unknown' }}</strong>
    </p>
    <router-link to="/">Back to Projects</router-link>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';

const projects = inject('projects');
const route = useRoute();

const project = computed(() => {
  return projects.value.find((p) => p.id === Number(route.params.id));
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  height: 350px;
}

h1 {
  font-size: 1.8rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #555;
}

a {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

a:hover {
  background: #2980b9;
}
</style>
