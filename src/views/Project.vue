<template>
  <div class="container">
    <h1>Projects</h1>
    <div class="filters">
      <button @click="filterStatus('all')">All</button>
      <button @click="filterStatus('completed')">Completed</button>
      <button @click="filterStatus('ongoing')">Ongoing</button>
    </div>
    <ul>
      <li v-for="project in filteredProjects" :key="project.id">
        <router-link :to="'/project/' + project.id">
          {{ project.title }}
        </router-link>
        <div class="actions">
          <button @click="toggleStatus(project)">✔</button>
          <button>
            <router-link :to="'/edit/' + project.id">✏️</router-link>
          </button>
          <button @click="deleteProject(project.id)">🗑</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';

const projects = inject('projects');
const selectedFilter = ref('all');

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'all') return projects.value;
  return projects.value.filter((proj) => proj.status === selectedFilter.value);
});

const filterStatus = (status) => {
  selectedFilter.value = status;
};

const toggleStatus = (project) => {
  project.status = project.status === 'completed' ? 'ongoing' : 'completed';
};

const deleteProject = (id) => {
  projects.value = projects.value.filter((p) => p.id !== id);
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: white;
  height: 350px;
  display: flex;
  flex-direction: column;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.filters button {
  width: 100px;
  background: none;
  color: rgb(100, 97, 97);
  border: none;
  cursor: pointer;
}

.filters button:hover {
  color: #2980b9;
}

h1 {
  font-size: 25px;
  font-weight: 500;
  color: black;
}

button {
  padding: 10px;
  border: none;
  background: #3498db;
  color: white;
  cursor: pointer;
}

.actions button {
  width: 40px;
}

.actions button:hover {
  background: #2980b9;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 250px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #3498db #f5f5f5;
}

ul::-webkit-scrollbar {
  width: 8px;
}

ul::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb {
  background: #3498db;
  border-radius: 10px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 5px;
  border-left: 5px solid #e91e63;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.actions {
  display: flex;
  gap: 5px;
}

@media (max-width: 600px) {
  .filters {
    flex-direction: row;
  }

  .filters button {
    padding: 5px;
    width: 70px;
    font-size: 13px;
  }

  .container {
    height: auto;
    width: 84%;
  }

  .actions {
    margin-left: 30px;
  }

  .actions button {
    padding: 5px;
  }

  li {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
