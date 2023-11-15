<template>
  <div class="skill-item">
  <p>{{ skill }}</p>
  <div class="bar-container">
    <div class="skill-bar"></div>
  </div>
</div>
</template>

<script setup>
const props = defineProps({
  skill: {},
  percentage: {},
  color: {},
});

const colorDark = props.color.dark;
const colorLight = props.color.light;
const percentage = props.percentage;

</script>

<style>
.skill-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(40% - 10px);
  margin: 3vh 3vw ;
}
.bar-container {
  width: 100%;
  height: 10px;
  border-radius: 20px;
  margin: -10px 0 30px 0;
}

.dark .bar-container {
  background-color: rgba(238, 238, 238, 0.4);
}

.light .bar-container {
  background-color: rgba(46, 80, 119, 0.4);
}

.skill-bar {
  height: 100%;
  width: v-bind(percentage);
  border-radius: 20px;
  transition: width 1s ease;
}

.dark .skill-bar {
  background: v-bind(colorDark);
}

.light .skill-bar {
  background: v-bind(colorLight);
}
</style>