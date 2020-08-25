<template>
  <v-col cols="12">
    <v-row align="start" justify="start">
      <v-col
        cols="12"
        class="col-sm-6 col-md-4"
        v-for="(sale, index) in sales"
        :key="index"
      >
        <SalePreview
          :sale="sale"
          @onViewItems="saleId => $emit('onViewItems', saleId)"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { Sale } from "../models/index.model";
import SalePreview from "@/components/SalePreview.vue";
interface SalesListsProps {
  sales: Sale[];
}
const SalesList = defineComponent({
  name: "SalesList",
  components: { SalePreview },
  props: ["sales"],
  setup(props: SalesListsProps) {}
});
export default SalesList;
</script>
