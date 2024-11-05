<template>
    <div>
      <ul class="list-group">
        <li v-for="(entry, index) in entries" :key="index" class="list-group-item d-flex justify-content-between align-items-start">
          <div>
            <p><strong>Dátum:</strong> {{ entry.date }}</p>
            <p><strong>Munkaidő:</strong> {{ entry.startTime }} - {{ entry.endTime }}</p>
            <p><strong>Feladat:</strong> {{ entry.description }}</p>
            <p><strong>Címkék:</strong> {{ entry.tags.join(", ") }}</p>
          </div>
          <div class="button-group">
            <button @click="$emit('edit-entry', index)" class="btn btn-primary btn-sm me-2">Szerkesztés</button>
            <button @click="$emit('delete-entry', index)" class="btn btn-danger btn-sm">Törlés</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ["entries"]
  };
  </script>
  
  <style scoped>
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button-group {
    display: flex;
  }
  </style>
  