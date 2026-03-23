<template>
  <div>
    <CommissionCard v-for="(civic, index) in civics" :key="index" :civics="civic" :id="index + 1" />
      <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CommissionCard from '@/components/CommissionCard.vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
const civics = ref([])
async function getCivics() {
  console.log('did i run?')
  const response = await fetch('https://data.cityofnewyork.us/resource/ajin-gkbp.json')
  const data = await response.json()
  civics.value = data
}

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}

onMounted(function () {
  getCivics()
})
</script>

<style scoped></style>
