<template>
  <v-card color="primary" dark class="col-12">
    <v-card-title class="headline text-center">{{ sale.title }}</v-card-title>
    <v-card-subtitle>{{ sale.description }}</v-card-subtitle>
    <v-card-actions class="d-flex justify-center">
      <v-btn outlined
        ><v-icon class="mr-2">mdi-lamps</v-icon>
        View sale details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const SalePreview = defineComponent({
  name: "SalePreview",
  props: ["sale"]
});
export default SalePreview;
</script>
