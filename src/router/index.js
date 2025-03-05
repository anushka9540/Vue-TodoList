import { createRouter, createWebHistory } from 'vue-router';
import Project from '../views/Project.vue';
import AddNewProject from '../views/AddNewProject.vue';

const routes = [
  { path: '/', component: Project },
  { path: '/add', component: AddNewProject },
  { path: '/edit/:id', component: AddNewProject } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

