<template>
  <div class="form-container">
    <h1>Add a New Project</h1>
    <form @submit.prevent="addProject">
      <label>Title:</label>
      <input v-model.trim="title" @input="validate('title')" @keydown.enter.prevent class="title-box" />
      <p v-if="errors.title" class="error">{{ errors.title }}</p>
  
      <label>Details:</label>
      <textarea v-model.trim="details" @input="validate('details')"></textarea>
      <p v-if="errors.details" class="error">{{ errors.details }}</p>
  
      <button type="submit" :disabled="!isFormValid">Add Project</button>
    </form>
    <router-link to="/">Back to Projects</router-link>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';

const projects = inject('projects');
const saveProjects = inject('saveProjects');
const lastId = inject('lastId');
const router = useRouter();

const title = ref('');
const details = ref('');
const errors = ref({ title: '', details: '' });

const rules = {
  title: { required: true, min: 3, max: 50 },
  details: { required: true, min: 10, max: 200 }
};

const validate = (field) => {
  const value = field === 'title' ? title.value.trim() : details.value.trim();
  const { required, min, max } = rules[field];

  errors.value[field] =
    !value && required ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` :
      value.length < min ? `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${min} characters.` :
        value.length > max ? `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed ${max} characters.` :
          '';
};

const isFormValid = computed(() => !errors.value.title && !errors.value.details);

const addProject = () => {
  validate('title');
  validate('details');

  if (!isFormValid.value) return;

  projects.value.push({
    id: ++lastId.value,
    title: title.value,
    details: details.value,
    status: 'ongoing'
  });

  saveProjects();
  title.value = details.value = '';
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
  height: auto;
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
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background: #27ae60;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #219150;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .form-container {
    width: 84%;
    height: auto;
  }
}
</style>
