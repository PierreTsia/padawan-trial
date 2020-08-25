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
import { defineComponent, onMounted, ref } from "@vue/composition-api";
import Loader from "@/components/base/Loader.vue";
import SalesList from "@/components/SalesList.vue";
import { Sale } from "@/models/index.model";

const Home = defineComponent({
  name: "Home",
  components: { Loader, SalesList },
  props: ["sales", "isLoading", "error"],
  setup({
    sales,
    isLoading,
    error
  }: {
    sales: Sale[];
    isLoading: boolean;
    error: string;
  }) {}
});

export default Home;
</script>
