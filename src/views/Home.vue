<template>
  <div class="home container fluid d-flex fill-height align-content-start">
    <div class="container d-flex a" v-if="isLoading">
      <v-row>
        <v-col cols="12" md="4" v-for="(n, i) in 3" :key="`col-${i}`">
          <Loader type="list-item-avatar-three-line" />
        </v-col>
      </v-row>
    </div>
    <div class="container fill-height align-content-start" v-else>
      <SalesList :sales="sales" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";
import { useFetchSales } from "@/composables/useFetchSales";
import Loader from "@/components/base/Loader.vue";
import SalesList from "@/components/SalesList.vue";
const Home = defineComponent({
  name: "Home",
  components: { Loader, SalesList },
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
