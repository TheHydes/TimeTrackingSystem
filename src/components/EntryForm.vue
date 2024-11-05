<template>
    <div class="mb-4">
      <h2 v-if="isEditing">Bejegyzés szerkesztése</h2>
      <h2 v-else>Új bejegyzés</h2>
      <form @submit.prevent="isEditing ? updateEntry() : submitEntry()" class="row g-2">
        <div class="col-md-3">
          <input v-model="date" type="date" class="form-control" required />
        </div>
        <div class="col-md-2">
          <input v-model="startTime" type="time" class="form-control" required />
        </div>
        <div class="col-md-2">
          <input v-model="endTime" type="time" class="form-control" required />
        </div>
        <div class="col-md-3">
          <input v-model="description" placeholder="Feladat leírása" class="form-control" required />
        </div>
  
        <!-- Címkék legördülő menü -->
        <div class="col-md-3">
          <label for="tags">Címke:</label>
          <select v-model="selectedTag" class="form-select" id="tags">
            <option v-for="tag in tagsList" :key="tag">{{ tag }}</option>
          </select>
        </div>
  
        <!-- Új címke hozzáadása -->
        <div class="col-md-3 mt-3">
          <input
            v-model="newTag"
            placeholder="Új címke neve"
            class="form-control"
            id="new-tag"
          />
          <button @click="addNewTag" type="button" class="btn btn-primary mt-2">
            Új címke hozzáadása
          </button>
        </div>
  
        <!-- Címkék törlése - görgethető legördülő menü -->
        <div class="col-md-3 mt-3">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Címkék törlése
            </button>
            <ul class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
              <li v-for="tag in tagsList" :key="tag" class="d-flex justify-content-between align-items-center px-3 tag-item">
                <span>{{ tag }}</span>
                <button @click="confirmDeleteTag(tag)" class="btn btn-danger btn-sm">Törlés</button>
              </li>
            </ul>
          </div>
        </div>
  
        <div class="col-12 mt-3">
          <button type="submit" class="btn btn-success">{{ isEditing ? 'Mentés' : 'Bejegyzés mentése' }}</button>
          <button v-if="isEditing" type="button" @click="cancelEdit" class="btn btn-secondary ms-2">Mégse</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentEntry: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        selectedTag: "Projekt",
        tagsList: JSON.parse(localStorage.getItem("tagsList")) || ["Projekt", "Ügyfél", "Kutatás", "Fejlesztés", "Tesztelés"],
        newTag: "" // Új címke mező értéke
      };
    },
    computed: {
      isEditing() {
        return !!this.currentEntry;
      }
    },
    watch: {
      currentEntry: {
        immediate: true,
        handler(entry) {
          if (entry) {
            this.date = entry.date || "";
            this.startTime = entry.startTime || "";
            this.endTime = entry.endTime || "";
            this.description = entry.description || "";
            this.selectedTag = entry.tags[0] || "Projekt";
          }
        }
      }
    },
    methods: {
      submitEntry() {
        const newEntry = {
          date: this.date,
          startTime: this.startTime,
          endTime: this.endTime,
          description: this.description,
          tags: [this.selectedTag]
        };
        this.$emit("add-entry", newEntry);
        this.resetForm();
      },
      updateEntry() {
        const updatedEntry = {
          date: this.date,
          startTime: this.startTime,
          endTime: this.endTime,
          description: this.description,
          tags: [this.selectedTag]
        };
        this.$emit("update-entry", updatedEntry);
        this.resetForm();
      },
      cancelEdit() {
        this.resetForm();
        this.$emit("update-entry", null);
      },
      addNewTag() {
        if (this.newTag && !this.tagsList.includes(this.newTag)) {
          // Első betű nagybetűsítése
          this.newTag = this.newTag.charAt(0).toUpperCase() + this.newTag.slice(1);
          
          this.tagsList.push(this.newTag); // Új címke hozzáadása a listához
          this.selectedTag = this.newTag;  // Az új címke kiválasztása
          localStorage.setItem("tagsList", JSON.stringify(this.tagsList)); // Címkék mentése localStorage-ba
          this.newTag = "";  // Új címke mező törlése
        } else {
          alert("Ez a címke már létezik vagy üres.");
        }
      },
      confirmDeleteTag(tag) {
        if (confirm(`Biztosan törölni szeretné a(z) "${tag}" címkét? Az ehhez tartozó bejegyzések is törlésre kerülnek.`)) {
          this.deleteTag(tag);
        }
      },
      deleteTag(tag) {
        this.tagsList = this.tagsList.filter(t => t !== tag);
        localStorage.setItem("tagsList", JSON.stringify(this.tagsList));
        this.$emit("delete-tag", tag);
      },
      resetForm() {
        this.date = "";
        this.startTime = "";
        this.endTime = "";
        this.description = "";
        this.selectedTag = "Projekt";
      }
    }
  };
  </script>
  
  <style scoped>
  .scrollable-menu {
    max-height: 200px;
    overflow-y: auto;
  }
  .tag-item {
    gap: 10px;
    margin-bottom: 5px;
  }
  </style>
  