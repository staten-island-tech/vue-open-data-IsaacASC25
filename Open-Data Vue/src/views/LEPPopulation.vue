<template>
  <div class="charts-wrapper">
    <h1>NYC Limited English Proficiency Data (2015–2019)</h1>
    <div v-if="!loaded" class="loading">Loading data...</div>
    <div v-if="loaded" class="charts-grid">
    <div class="chart-container">
      <h2>Top 10 Languages by LEP Population</h2>
      <Bar :data="languageChartData" :options="chartOptions" />
    </div>
  </div>
</div>
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
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const loaded = ref(false)
const boroughChartData = ref(null)
const languageChartData = ref(null)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (val) => val.toLocaleString(),
      },
    },
  },
}

async function fetchData() {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/ajin-gkbp.json?$limit=50000',
    )
    const data = await response.json()

    const languageTotals = {}
    for (const row of data) {
      const lang = row.language || 'Unknown'
      const pop = parseInt(row.lep_population_estimate) || 0
      languageTotals[lang] = (languageTotals[lang] || 0) + pop
    }

    const top10 = Object.entries(languageTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    languageChartData.value = {
      labels: top10.map(([lang]) => lang),
      datasets: [
        {
          label: 'LEP Population',
          data: top10.map(([, v]) => v),
          backgroundColor: '#4e79a7',
          borderRadius: 6,
        },
      ],
    }

    loaded.value = true
  } catch (error) {
    console.error('Failed to fetch data:', error)
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
