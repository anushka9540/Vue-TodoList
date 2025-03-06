import { createRouter, createWebHistory } from 'vue-router';
import Project from '../views/Project.vue';
import ProjectForm from '../views/AddEditProject.vue';

const routes = [
  { path: '/', component: Project },
  { path: '/add', component: ProjectForm },
  { path: '/edit/:id', component: ProjectForm } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

