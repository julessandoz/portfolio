<template>
  <div class="skill-card-wrapper">
    <Icon class="skill-icon" :name="props.icon" size="90px" />
    <h2 class="skill-name">{{ skill }}</h2>
    <p v-if="props.category != 'Language'" class="skill-experience">
      Experience: {{ experience }} {{ experience < 2 ? "year" : "years" }}
    </p>
    <p v-if="props.category == 'Language'" class="skill-experience">
      {{ languageLevel }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  skill: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: Object,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

let languageLevel = "Native";

if (props.category == "Language" && props.skill != "French") {
  languageLevel =
    props.experience >= 10
      ? "Bilingual"
      : props.experience >= 5
      ? "Proficient"
      : "Beginner";
}

const darkColor = props.color.dark;
const lightColor = props.color.light;
</script>

<style scoped>
.skill-card-wrapper {
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-template-rows: 60px 30px;
  gap: 0 10px;
}

.skill-icon {
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 2;
}

.dark .skill-icon {
  color: v-bind(darkColor);
}

.light .skill-icon {
  color: v-bind(lightColor);
}

.skill-name {
  grid-column-start: 2;
  grid-row-start: 1;
  justify-self: start;
  align-self: center;
  margin: 0;
}

.skill-experience {
  grid-column-start: 2;
  grid-row-start: 2;
  justify-self: start;
  align-self: baseline;
  margin: 0;
}
</style>
