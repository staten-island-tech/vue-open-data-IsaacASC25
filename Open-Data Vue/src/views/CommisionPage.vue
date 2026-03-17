<template> 
    <div>
      <CommisionCard v-for = "(home,index) in homeless" :key="home.name" :civics = "civic" :id = "index + 1"/>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import {useRoute} from 'vue'
const route = useRoute()
const civic = ref()
async function getCivics() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
watch(
  () => route.params.id,
  function () {
    getCivics()
  },
)
onMounted(function () {
  getCivics(route.params.id)
})
</script>

<style scoped>

</style> 