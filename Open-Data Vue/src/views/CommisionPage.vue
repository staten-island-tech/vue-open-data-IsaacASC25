<template>
  <div>
    <CommissionCard v-for="(civic, index) in civics" :key="index" :civics="civic" :id="index + 1" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CommissionCard from '@/components/CommissionCard.vue'

const civics = ref([])

async function getCivics() {
  console.log('did i run?')
  const response = await fetch('https://data.cityofnewyork.us/resource/ajin-gkbp.json')
  const data = await response.json()
  civics.value = data
}

onMounted(function () {
  getCivics()
})
</script>

<style scoped></style>
