<template>
  <v-col cols="12">
    <v-row align="start" justify="start">
      <SalePreview
        v-for="sale in sales"
        :sale="sale"
        :key="`sale-${sale.id}`"
        class="col-md-4 col-sm-6"
      />
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
