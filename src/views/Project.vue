<template>
  <div class="project-container">
    <h1>Projects</h1>

    <div class="filters">
      <button v-for="status in ['all', 'completed', 'ongoing']" 
              :key="status" 
              @click="filterStatus(status)" 
              :class="{ active: selectedFilter === status }">
        {{ status.charAt(0).toUpperCase() + status.slice(1) }}
      </button>
    </div>

    <ul class="project-list" v-if="filteredProjects.length">
      <li v-for="project in filteredProjects" 
          :key="project.id" 
          :class="{ completed: project.status === 'completed' }"
          @click="showDetails(project.id, $event)">
          
        <div class="project-item">
          <div class="project-title">
            {{ project.title }}
          </div>

          <div class="project-actions">
            <button @click="toggleStatus(project)" 
                    class="btn status-btn" 
                    :class="{ 'completed-btn': project.status === 'completed' }">
              ✔
            </button>
            <router-link :to="'/edit/' + project.id">
              <button class="btn">✏️</button>
            </router-link>
            <button @click="deleteProject(project.id)" class="btn">🗑</button>
          </div>
        </div>

        <p v-if="expandedProject === project.id" class="project-details">
          {{ project.details }}
        </p>
      </li>
    </ul>

    <p v-else class="no-projects">No projects found. Add a project!</p>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';

const projects = inject('projects');
const saveProjects = inject('saveProjects');

const selectedFilter = ref('all');
const expandedProject = ref(null);

const filteredProjects = computed(() =>
  selectedFilter.value === 'all'
    ? projects.value
    : projects.value.filter((proj) => proj.status === selectedFilter.value)
);

const filterStatus = (status) => (selectedFilter.value = status);

const showDetails = (id, event) => {
  // Prevent expanding details if clicking inside an action button
  if (event.target.closest('.btn')) return;

  expandedProject.value = expandedProject.value === id ? null : id;
};

const toggleStatus = (project) => {
  project.status = project.status === 'completed' ? 'ongoing' : 'completed';
  saveProjects();
};

const deleteProject = (id) => {
  projects.value = projects.value.filter((p) => p.id !== id);
  saveProjects();
};
</script>

<style scoped>
.project-container {
  max-width: 500px;
  margin: auto;
  padding: 21px;
  background: white;
  height: 420px;
  overflow: hidden;
}

h1 {
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  color: black;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.filters button {
  padding: 8px 15px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
}

.filters button.active {
  font-weight: bold;
  color: #000;
}

.project-list {
  max-height: 250px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f5f5f5;
}

.project-list::-webkit-scrollbar {
  width: 6px;
}

.project-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.project-list::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.no-projects {
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background: #f8f8f8;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-left: 5px solid #e91e63;
  word-wrap: break-word;
  overflow-wrap: break-word;
  cursor: pointer;
}

li.completed {
  border-left: 5px solid #2ecc71 !important;
}

.project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.project-title {
  font-size: 18px;
  font-weight: bold;
  color: #4a90e2;
  cursor: pointer;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background: #2980b9;
}

.completed-btn {
  background: #2ecc71 !important;
}

.completed-btn:hover {
  background: #27ae60 !important;
}

.project-details {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  text-align: left;
}

@media (max-width: 600px) {
  .container {
    width: 84%;
    max-width: 500px;
    height: auto;
    margin: auto;
    padding: 20px;
  }

  .filters {
    display: flex;
    gap: 0px;
    align-items: center;
    justify-content: center;
  }

  .project-list {
    max-height: 250px;
    overflow-y: auto;
  }

  .btn {
    padding: 6px;
    font-size: 14px;
  }

  .project-item {
    flex-direction: column;
    gap: 1px;
  }

  .project-title {
    font-size: 13px;
  }

  h1 {
    font-size: 25px;
  }
}
</style>
