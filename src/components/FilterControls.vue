<template>
    <div class="d-flex align-items-center mb-3">
      <label for="view" class="me-2">Válaszd ki a nézetet:</label>
      <select id="view" v-model="selectedView" class="form-select me-2" style="width: 150px;" @change="updateView">
        <option value="daily">Napi</option>
        <option value="weekly">Heti</option>
        <option value="monthly">Havi</option>
      </select>
  
      <!-- Dinamikus dátumválasztó a nézet alapján -->
      <div v-if="selectedView === 'daily'" class="me-2">
        <input type="date" v-model="selectedDate" @change="updateDate" class="form-control" />
      </div>
      <div v-else-if="selectedView === 'weekly'" class="me-2">
        <input type="week" v-model="selectedDate" @change="updateDate" class="form-control" />
      </div>
      <div v-else-if="selectedView === 'monthly'" class="me-2">
        <input type="month" v-model="selectedDate" @change="updateDate" class="form-control" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedView: "daily", // alapértelmezett nézet
        selectedDate: "", // dátumválasztó értéke
      };
    },
    methods: {
      updateView() {
        this.$emit("update-view", { view: this.selectedView, date: this.selectedDate });
      },
      updateDate() {
        this.$emit("update-view", { view: this.selectedView, date: this.selectedDate });
      }
    },
    watch: {
      selectedView() {
        // Amikor a nézet változik, töröljük az előzőleg kiválasztott dátumot
        this.selectedDate = "";
      }
    }
  };
  </script>
  