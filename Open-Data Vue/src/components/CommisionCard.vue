<template>
  <div class="card">
    <h3>{{ id }}</h3>
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