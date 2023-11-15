<script setup>
import TheSkillBar from "./TheSkillBar.vue";

const skills = ref([])
const config = useRuntimeConfig();
const apiURL = config.public.apiUrl;

useFetch(async ()=> {
  const response = await fetch(`${apiURL}/skills`)
  skills.value = await response.json()
})

const skillsArray = computed(() => {
  const skillsKeys = Object.keys(skills.value);
  return skillsKeys.map(key => ({
    skill: key,
    name: skills.value[key].skillName,
    percentage: skills.value[key].percentage,
    color: skills.value[key].color,
  }));
});

</script>

<template>
  <div class="skills-container">
        <TheSkillBar
            v-for="skill in skillsArray"
            :key="skill.skill"
            :skill="skill.name"
            :percentage="skill.percentage"
            :color="skill.color"
      />
  </div>
</template>

<style scoped>
.skills-container {
  display: flex;
  flex-wrap: wrap; /* Allow the items to wrap */
  justify-content: flex-start; /* Align items to the start of the container */
  align-items: flex-start; /* Align items to the start of the cross axis */
  width: 70vw;
  padding: 0vh 13vw 0vh 13vw; /* Adjusted padding for symmetry */
}

@media only screen and (max-width: 768px) {
  .skills-container {
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    padding: 0vh 5vw 0vh 5vw;
  }
}
</style>
