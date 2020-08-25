<template>
  <div class="home">
    <h1>test</h1>
    <pre>{{ isLoading }}</pre>
    <pre>{{ sales }}</pre>
    <pre>{{ error }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";
import { useFetchSales } from "@/composables/useFetchSales";

const Home = defineComponent({
  name: "Home",
  components: {},
  setup() {
    const { isLoading, sales, fetchSales, error } = useFetchSales();
    onMounted(async () => {
      await fetchSales();
    });
    return { isLoading, sales, error };
  }
});

export default Home;
</script>
