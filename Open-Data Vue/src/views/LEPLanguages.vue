<template>
  <div class="charts-wrapper">
    <h1>NYC Limited English Proficiency Data (2015–2019)</h1>
    <div v-if="!loaded" class="loading">Loading data...</div>
    <div v-if="loaded" class="charts-grid">
      <div class="chart-container">
        <h2>LEP Population by Borough</h2>
        <Bar :data="boroughChartData" :options="chartOptions" />
      </div>
    </div>
    <div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const loaded = ref(false)
const boroughChartData = ref(null)
const languageChartData = ref(null)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (val) => val.toLocaleString()
      }
    }
  }
}

async function fetchData() {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/ajin-gkbp.json?$limit=50000'
    )
    const data = await response.json()

    const boroughTotals = {}
    for (const row of data) {
      const borough = row.borough || 'Unknown'
      const pop = parseInt(row.lep_population_estimate) || 0
      boroughTotals[borough] = (boroughTotals[borough] || 0) + pop
    }

    const boroughsSorted = Object.entries(boroughTotals).sort((a, b) => b[1] - a[1])

    boroughChartData.value = {
      labels: boroughsSorted.map(([b]) => b),
      datasets: [
        {
          label: 'LEP Population',
          data: boroughsSorted.map(([, v]) => v),
          backgroundColor: [
            '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f'
          ],
          borderRadius: 6
        }
      ]
    }
  }
}

    

onMounted(fetchData)
</script>

<style scoped>
.charts-wrapper {
  padding: 2rem;
  font-family: sans-serif;
}

h1 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #333;
}

h2 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #555;
}

.loading {
  font-size: 1.1rem;
  color: #888;
  margin-top: 2rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.chart-container {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  position: relative; 
}
</style>