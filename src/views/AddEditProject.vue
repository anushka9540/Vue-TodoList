<template>
  <div class="form-container">
    <div v-if="!projectNotFound">
      <h1>{{ isEditing ? 'Edit Project' : 'Add a New Project' }}</h1>

      <form @submit.prevent="handleSubmit">
        <label>Title:</label>
        <input v-model.trim="formData.title" @input="validate('title')" @keydown.enter.prevent class="title-box" />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>

        <label>Details:</label>
        <textarea v-model.trim="formData.details" @input="validate('details')"></textarea>
        <p v-if="errors.details" class="error">{{ errors.details }}</p>

        <button type="submit" :disabled="!isFormValid">
          {{ isEditing ? 'Update Project' : 'Add Project' }}
        </button>
      </form>
    </div>

    <p v-else class="error-message">OOPs No Todo is Found !</p>

    <router-link to="/">Back to Projects</router-link>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const projects = inject('projects');
const saveProjects = inject('saveProjects');
const router = useRouter();
const route = useRoute();
const formData = ref({ title: '', details: '' });
const errors = ref({ title: '', details: '' });
const isEditing = ref(false);
const projectToEdit = ref(null);
const projectNotFound = ref(false);
const rules = {
  title: { required: true, min: 3, max: 50 },
  details: { required: true, min: 10, max: 300 }
};
const validate = (field) => {
  const value = formData.value[field].trim();
  const { required, min, max } = rules[field];
  errors.value[field] =
    !value && required
      ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
      : value.length < min
        ? `${field.charAt(0).toUpperCase() + field.slice(1)
        } must be at least ${min} characters.`
        : value.length > max
          ? `${field.charAt(0).toUpperCase() + field.slice(1)
          } cannot exceed ${max} characters.`
          : '';
};
const isFormValid = computed(
  () => !errors.value.title && !errors.value.details
);
const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

const handleSubmit = () => {
  validate('title');
  validate('details');
  if (!isFormValid.value) return;
  if (isEditing.value && projectToEdit.value) {
    projectToEdit.value.title = formData.value.title;
    projectToEdit.value.details = formData.value.details;
  } else {
    projects.value.push({
      id: generateRandomId(),
      title: formData.value.title,
      details: formData.value.details,
      status: 'ongoing'
    });
  }
  saveProjects();
  router.push('/');
};

onMounted(() => {
  const projectId = route.params.id ? Number(route.params.id) : null;

  if (projectId === null) {
    return;
  }

  projectToEdit.value = projects.value.find((p) => p.id === projectId);

  if (projectToEdit.value) {
    formData.value.title = projectToEdit.value.title;
    formData.value.details = projectToEdit.value.details;
    isEditing.value = true;
  } else {
    projectNotFound.value = true;
  }
});
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
  height: 420px;
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

.error-message {
  font-size: 35px;
  color: red;
  font-weight: bold;
  margin-top: 70px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: 10px;
  margin-left: 20px;
  text-align: left;
}

@media (max-width: 600px) {
  .form-container {
    width: 84%;
    height: auto;
  }
}
</style>
