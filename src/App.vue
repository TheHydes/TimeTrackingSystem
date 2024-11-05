<template>
  <div id="app" class="container">
    <h1 class="my-4">Időnyilvántartó rendszer</h1>

    <!-- Új bejegyzés űrlap -->
    <EntryForm
      @add-entry="addEntry"
      @update-entry="updateEntry"
      @delete-tag="deleteTag"
      :current-entry="currentEntry"
    />

    <!-- FilterControls Komponens -->
    <div class="my-4">
      <FilterControls @update-view="filterEntries" />
    </div>

    <!-- Lenyitható Bejegyzések -->
    <div class="accordion mb-4" id="entriesAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingEntries">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#entriesCollapse"
            aria-expanded="true"
            aria-controls="entriesCollapse"
          >
            Bejegyzések
          </button>
        </h2>
        <div
          id="entriesCollapse"
          class="accordion-collapse collapse show"
          aria-labelledby="headingEntries"
          data-bs-parent="#entriesAccordion"
        >
          <div class="accordion-body" style="max-height: 300px; overflow-y: auto;">
            <div v-if="filteredEntries.length === 0" class="text-center text-muted">
              Nincs bejegyzés
            </div>
            <EntryList
              v-else
              :entries="filteredEntries"
              @delete-entry="deleteEntry"
              @edit-entry="editEntry"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Lenyitható Statisztikák -->
    <div class="accordion" id="statsAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingStats">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#statsCollapse"
            aria-expanded="false"
            aria-controls="statsCollapse"
          >
            Statisztikák
          </button>
        </h2>
        <div
          id="statsCollapse"
          class="accordion-collapse collapse"
          aria-labelledby="headingStats"
          data-bs-parent="#statsAccordion"
        >
        <div class="accordion-body">
          <p>Összes munkaóra: {{ totalHours }} óra</p>
          <p>Címkék szerinti bontás:</p>
          <ul>
            <li v-for="(data, tag) in tagSummary" :key="tag">
              {{ tag }}: {{ data.count }} alkalom, {{ data.duration }} óra
            </li>
          </ul>
          <!-- Diagram megjelenítése -->
          <div class="chart-container mt-4">
            <TagStatisticsChart :data="tagSummary" />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntryForm from "./components/EntryForm.vue";
import EntryList from "./components/EntryList.vue";
import FilterControls from "./components/FilterControls.vue";
import TagStatisticsChart from "./components/TagStatisticsChart.vue"; // Importálás

import { calculateHours, summarizeTags, filterByView } from "./utils/dateUtils";

export default {
  components: {
    EntryForm,
    EntryList,
    FilterControls,
    TagStatisticsChart // Komponens regisztrálása
  },
  data() {
    return {
      entries: JSON.parse(localStorage.getItem("workEntries")) || [],
      filteredEntries: [],
      currentView: "daily",
      selectedDate: "",
      currentEntry: null // Az aktuálisan szerkesztendő bejegyzés adatai
    };
  },
  computed: {
    totalHours() {
      return (calculateHours(this.filteredEntries) / 60).toFixed(2); // percekből órára alakítva
    },
    tagSummary() {
      return summarizeTags(this.filteredEntries);
    }
  },
  methods: {
    addEntry(entry) {
      this.entries.push(entry);
      localStorage.setItem("workEntries", JSON.stringify(this.entries));
      this.filterEntries({ view: this.currentView, date: this.selectedDate });
    },
    updateEntry(updatedEntry) {
      if (updatedEntry) {
        this.entries.splice(this.currentEntry.index, 1, updatedEntry);
        localStorage.setItem("workEntries", JSON.stringify(this.entries));
      }
      this.currentEntry = null; // Kilépés a szerkesztési módból
      this.filterEntries({ view: this.currentView, date: this.selectedDate });
    },
    editEntry(index) {
      this.currentEntry = { ...this.entries[index], index };
    },
    filterEntries({ view, date }) {
      this.currentView = view;
      this.selectedDate = date;
      this.filteredEntries = filterByView(this.entries, view, date);
    },
    deleteEntry(index) {
      this.entries.splice(index, 1);
      localStorage.setItem("workEntries", JSON.stringify(this.entries));
      this.filterEntries({ view: this.currentView, date: this.selectedDate });
    },
    deleteTag(tag) {
      this.entries = this.entries.filter(entry => !entry.tags.includes(tag));
      localStorage.setItem("workEntries", JSON.stringify(this.entries));
      this.filterEntries({ view: this.currentView, date: this.selectedDate });
    },
    confirmClearAllEntries() {
      if (confirm("Biztosan törölni szeretné az összes bejegyzést?")) {
        this.clearAllEntries();
      }
    },
    clearAllEntries() {
      this.entries = [];
      localStorage.removeItem("workEntries");
      this.filteredEntries = [];
    }
  },
  created() {
    this.filterEntries({ view: "daily", date: "" });
  }
};
</script>

<style>
.chart-container {
  height: 400px;
}
</style>
