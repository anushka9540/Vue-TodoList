<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal">
        <p>Are you sure you want to delete this project?</p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="yes-btn">Yes</button>
          <button @click="closeModal" class="no-btn">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    isOpen: Boolean, 
  });
  
  const emit = defineEmits(['confirm', 'close']);
  
  const confirmDelete = () => {
    emit('confirm');
  };
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .modal-actions {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  
  .yes-btn {
    background: #e74c3c;
    color: white;
  }
  
  .no-btn {
    background: #3498db;
    color: white;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>
  