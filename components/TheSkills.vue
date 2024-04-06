<script setup>
const skills = ref([]);
const config = useRuntimeConfig();
const apiURL = config.public.apiUrl;
// const showSkillBars = ref(false);

useFetch(async () => {
  const response = await fetch(`${apiURL}/skills`);
  skills.value = await response.json();
});

const mixedSkills = computed(() => {
  const skillsKeys = Object.keys(skills.value);
  return skillsKeys.map((key) => ({
    skill: key,
    name: skills.value[key].skillName,
    percentage: skills.value[key].percentage,
    color: skills.value[key].color,
    icon: skills.value[key].iconName,
    experience: skills.value[key].experience,
    category: skills.value[key].category,
  }));
});

const skillsArray = computed(() => {
  return mixedSkills.value.sort((a, b) => b.experience - a.experience);
});

const technicalSkills = computed(() => {
  return skillsArray.value.filter((skill) => skill.category === "Technical");
});

const languageSkills = computed(() => {
  return skillsArray.value.filter((skill) => skill.category === "Language");
});

const otherSkills = computed(() => {
  return skillsArray.value.filter((skill) => skill.category === "Other");
});
</script>

<template>
  <div class="skill-cards-container">
    <div class="technical-skills">
      <h2>Technical skills</h2>
      <div class="skill-cards-wrapper">
        <TheSkillCard
          v-for="skill in technicalSkills"
          :key="skill.skill"
          :skill="skill.name"
          :icon="skill.icon"
          :experience="skill.experience"
          :color="skill.color"
          category="Technical"
        />
      </div>
    </div>
    <div class="other-skills">
      <h2>Other skills</h2>
      <div class="skill-cards-wrapper">
        <TheSkillCard
          v-for="skill in otherSkills"
          :key="skill.skill"
          :skill="skill.name"
          :icon="skill.icon"
          :experience="skill.experience"
          :color="skill.color"
          category="Other"
        />
      </div>
    </div>
    <div class="language-skills">
      <h2>Languages</h2>
      <div class="skill-cards-wrapper">
        <TheSkillCard
          v-for="skill in languageSkills"
          :key="skill.skill"
          :skill="skill.name"
          :icon="skill.icon"
          :experience="skill.experience"
          :color="skill.color"
          category="Language"
        />
      </div>
    </div>
  </div>
  <!-- <div v-show="showSkillBars" class="skill-bars-container">
    <TheSkillBar
      v-for="skill in skillsArray"
      :key="skill.skill"
      :skill="skill.name"
      :percentage="skill.percentage"
      :color="skill.color"
    />
  </div> -->
</template>

<style scoped>
.skill-cards-container {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-inline: 15vw;
}

.skill-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.skill-bars-container {
  display: flex;
  flex-wrap: wrap; /* Allow the items to wrap */
  justify-content: flex-start; /* Align items to the start of the container */
  align-items: flex-start; /* Align items to the start of the cross axis */
  width: 70vw;
  padding: 0vh 13vw 0vh 13vw; /* Adjusted padding for symmetry */
}

@media only screen and (max-width: 768px) {
  .skill-bars-container {
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    padding: 0vh 5vw 0vh 5vw;
  }
}
</style>
