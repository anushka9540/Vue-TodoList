import { createRouter, createWebHistory } from 'vue-router';
import Projects from '../views/Project.vue';
import AddProject from '../views/AddNewProject.vue';
import ProjectDetail from '../views/ProjectDetails.vue';
import EditProject from '../views/EditProject.vue';

const routes = [
  { path: '/', component: Projects },
  { path: '/add', component: AddProject },
  { path: '/project/:id', component: ProjectDetail, props: true },
  { path: '/edit/:id', component: EditProject, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
