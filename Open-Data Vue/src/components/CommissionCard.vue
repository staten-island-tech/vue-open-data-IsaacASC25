<template>
  <div class="card">
    <h3>District Name: {{ civics.community_district_name }}</h3>
    <p>Borough: {{ civics.borough }}</p>
    <p>Language: {{ civics.language }}</p>
    <p>LEP Population: {{ civics.lep_population_estimate }}</p>
  </div>
</template>

<script setup>
defineProps({
  civics: Object,
  id: Number
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
}
</style>