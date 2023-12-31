<script setup>
import { ref } from "vue";
import TheProjectTile from "./TheProjectTile.vue";

const config = useRuntimeConfig();
const apiURL = config.public.apiUrl;
const projects = ref([]);
const projectsArray = ref([]);
const projectsCount = ref(projectsArray.value.length);
const showMore = ref(false);
const showMoreBtn = ref(projectsCount.value > 6);
const showCategoriesFilter = ref(false);
const showTechnologiesFilter = ref(false);
const selectedCategories = new Set();
const selectedTechnologies = new Set();
const activeFilters = ref(false);
const allProjects = [];
let categories = new Set();
    let technologies = new Set();
    const projectKey = ref(0);

useFetch(async () => {
  const response = await fetch(`${apiURL}/projects`)
  projects.value = await response.json()
})

watch(projects, () => {
  if (projects.value) {

    for (let i = 0; i < projects.value.length; i++) {
      allProjects.push({
        project: projects.value[i]._id,
        name: projects.value[i].Name,
        desc: projects.value[i].Description,
        image: projects.value[i].Image,
        webp: projects.value[i].WebP,
        website: projects.value[i].Website,
        github: projects.value[i].Github,
        projectFolder: projects.value[i].ProjectFolder,
        tech: projects.value[i].Technologies,
        cat: projects.value[i].Categories,
        date: projects.value[i].EndDate,
      });
      projects.value[i].Categories.forEach((cat) => {
        categories.add(cat);
      });
      projects.value[i].Technologies.forEach((tech) => {
        technologies.add(tech);
      });
    }
    const categoriesArray = Array.from(categories);
    const middleIndex = Math.floor(categoriesArray.length / 2);
    const firstHalf = categoriesArray
      .slice(0, middleIndex)
      .sort((a, b) => b.length - a.length);
    const secondHalf = categoriesArray.slice(middleIndex).sort((a, b) => a.length - b.length);

    let optimizedCategories = [];
    for (let i = 0; i < firstHalf.length; i++) {
      optimizedCategories.push(firstHalf[i]);
      if (secondHalf[i]) {
        optimizedCategories.push(secondHalf[i]);
      }
    }
    if (secondHalf.length > firstHalf.length) {
      optimizedCategories.push(secondHalf[secondHalf.length - 1]);
    }

    categories = new Set(optimizedCategories);

    const technologiesArray = Array.from(technologies);
    const middleIndexTech = Math.floor(technologiesArray.length / 2);
    const firstHalfTech = technologiesArray
      .slice(0, middleIndexTech)
      .sort((a, b) => b.length - a.length);
    const secondHalfTech = technologiesArray
      .slice(middleIndexTech)
      .sort((a, b) => a.length - b.length);

    let optimizedTechnologies = [];
    for (let i = 0; i < firstHalfTech.length; i++) {
      optimizedTechnologies.push(firstHalfTech[i]);
      if (secondHalfTech[i]) {
        optimizedTechnologies.push(secondHalfTech[i]);
      }
    }
    if (secondHalfTech.length > firstHalfTech.length) {
      optimizedTechnologies.push(secondHalfTech[secondHalfTech.length - 1]);
    }

    technologies = new Set(optimizedTechnologies);

    updateProjectsArray();
  }

});

function checkCategoryList() {
  showCategoriesFilter.value = !showCategoriesFilter.value;
  document.getElementById("category-title").classList.toggle("active");
  showCategoriesFilter.value &&
    document.getElementById("technology-title").classList.contains("active")
    ? checkTechnologyList()
    : null;
}

function checkTechnologyList() {
  showTechnologiesFilter.value = !showTechnologiesFilter.value;
  document.getElementById("technology-title").classList.toggle("active");
  showTechnologiesFilter.value &&
    document.getElementById("category-title").classList.contains("active")
    ? checkCategoryList()
    : null;
}

function checkCategoryFilter(event) {
  const target = event.target;
  target.parentElement.classList.toggle("active");
  if (target.checked) {
    selectedCategories.add(target.dataset.cat);
  } else {
    selectedCategories.delete(target.dataset.cat);
  }
  updateProjectsArray();
}

function checkTechnologyFilter(event) {
  const target = event.target;
  target.parentElement.classList.toggle("active");
  if (target.checked) {
    selectedTechnologies.add(target.dataset.tech);
  } else {
    selectedTechnologies.delete(target.dataset.tech);
  }
  updateProjectsArray();
}

function updateProjectsArray() {
  // Reset the projects array
  projectsArray.value = [];
  // Loop through all projects
  for (let i = 0; i < allProjects.length; i++) {
    let catMatch = selectedCategories.size === 0;
    let techMatch = selectedTechnologies.size === 0;

    // Check if the current project matches the selected categories
    if (!catMatch) {
      for (let j = 0; j < allProjects[i].cat.length; j++) {
        if (selectedCategories.has(allProjects[i].cat[j])) {
          catMatch = true;
          break;
        }
      }
    }

    // Check if the current project matches the selected technologies
    if (!techMatch) {
      for (let j = 0; j < allProjects[i].tech.length; j++) {
        if (selectedTechnologies.has(allProjects[i].tech[j])) {
          techMatch = true;
          break;
        }
      }
    }

    // If the project matches both categories and technologies, add it to the array
    if (catMatch && techMatch) {
      projectsArray.value.push(allProjects[i]);
    }
  }

  projectsArray.value.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Update the count of projects and show/hide the "show more" button
  projectsCount.value = projectsArray.value.length;
  showMoreBtn.value = projectsCount.value > 6;
  showMore.value = false;
  projectKey.value += 1;
  selectedCategories.size > 0 || selectedTechnologies.size > 0
    ? (activeFilters.value = true)
    : (activeFilters.value = false);

}

function resetAllFilters() {
  selectedCategories.clear();
  selectedTechnologies.clear();
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.parentElement.classList.remove("active");
  });
  updateProjectsArray();
}

</script>

<template>
  <div class="filter-section">
  <div class="title-container">
    <h3>Filter</h3>
    <span class="reset" v-if="activeFilters" @click="resetAllFilters()">Reset All</span>
  </div>
    <div class="filters-container">
      <div class="filter">
        <div class="filter-title" id="category-title" for="category" @click="checkCategoryList()">
          Categories
        </div>
        <div class="filter-options">
          <div class="filter-option" v-show="showCategoriesFilter" v-for="category in categories" :key="category">
            <input type="checkbox" :id="category" :data-cat="category" @input="checkCategoryFilter($event)" />
            <label :for="category">{{ category }}</label>
          </div>
        </div>
      </div>
      <div class="filter">
        <div class="filter-title" id="technology-title" for="technologyFilter" @click="checkTechnologyList()">
          Technologies
        </div>
        <div class="filter-options">
          <div class="filter-option" v-show="showTechnologiesFilter" v-for="technology in technologies" :key="technology">
            <input type="checkbox" :id="technology" :data-tech="technology" @input="checkTechnologyFilter($event)" />
            <label :for="technology">{{ technology }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="projects-container">
    <TheProjectTile v-for="project in projectsArray.slice(0, 6)" :key="project.project" :id="project.project"
      :name="project.name" :desc="project.desc" :img="project.image"  :website="project.website"
      :github="project.github" :projectFolder="project.projectFolder" :tech="project.tech" :categories="project.cat" />
    <div class="more-container projects-container">
      <TheProjectTile v-if="showMore" v-for="project in projectsArray.slice(6)" :id="project.project" :name="project.name"
        :desc="project.desc" :img="project.image" :website="project.website" :github="project.github"
        :projectFolder="project.projectFolder" :tech="project.tech" :categories="project.cat" />
    </div>
    <div v-if="projectsArray.length <= 0">Couldn't load projects</div>
  </div>
  <div class="cta-container" v-if="showMoreBtn">
    <button v-if="!showMore" class="cta" @click="showMore = true">Show more</button>
    <button v-if="showMore" class="cta" @click="showMore = false">Show less</button>
  </div>
</template>

<style>
.filter-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0;
  padding: 0vh 5vw 2vh 15vw;
}

.title-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.filter-section h3 {
  font-size: clamp(1.6rem, 2.1vw, 3.1rem);
  margin: 0 0 2vh 0;
}

.filters-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2vw;
  width: 90%;
}

.filter-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: clamp(1.2rem, 1.5vw, 2rem);
  margin: 0 0 1vh 0;
  padding: 0 2vw;
  cursor: pointer;
  border: 2px solid #3c6799;
  border-radius: 5px;
  width: fit-content;
  height: 3.5vh;
  transition: background-color 0.3s ease-in-out;
}

.filter-title.active,
.filter-title:hover {
  background-color: #3c6799;
  color: #f3f1ef;
}

.filter-title.active:hover {
  background-color: #f3f1ef;
  color: #3c6799;
}

.filter-options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 2vh 0;
  padding: 0;
}

.filter-option {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid #3c6799;
  border-radius: 5px;
  width: auto;
  height: 2.5vh;
  margin: 0 3vw 1vh 0;
  padding: 1% 2%;
  transition: background-color 0.3s ease-in-out;
}

.filter-option.active,
.filter-option:hover {
  background-color: #3c6799;
  color: #f3f1ef;
}

.filter-option.active:hover {
  background-color: #f3f1ef;
  color: #3c6799;
}

.filter-options input[type="checkbox"] {
  display: none;
}

.filter-option label {
  width: 100%;
  height: 90%;
  text-align: center;
}

.reset {
  margin: 0 0 2vh 15px;
  padding: 0;
  font-size: clamp(1rem, 1.3vw, 1.5rem);
  cursor: pointer;
  color: #f06449;
  text-decoration: underline;
}

.projects-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 0;
  padding: 0vh 5vw 5vh 13vw;
}

.more-container {
  width: 100%;
  padding: 0;
}

.cta-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0;
  padding: 0vh 5vw 5vh 13vw;
}

button.cta {
  background-color: transparent;
  border: 2px solid #f06449;
  border-radius: 5px;
  color: #f06449;
  font-size: clamp(1rem, 1.5vw, 2rem);
  padding: 0.5rem 1rem;
  margin: 0;
  cursor: pointer;
  width: 16%;
  height: 10%;
  transition: background-color 0.5s ease, width 0.5s ease, height 0.5s ease;
}

button.cta:hover {
  width: 18%;
  height: 11%;
}

.dark button.cta:hover {
  background-color: #3c6799;
}

.light button.cta:hover {
  background-color: #f3f1ef;
}

@media screen and (max-width: 768px) {
  .filters-container {
    flex-wrap: wrap;
  }
}
</style>
