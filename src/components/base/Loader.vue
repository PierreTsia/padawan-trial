<template>
  <v-skeleton-loader
    ref="skeleton"
    :boilerplate="false"
    :tile="false"
    :type="type"
    class="mx-auto"
  ></v-skeleton-loader>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const Loader = defineComponent({
  name: "Loader",
  props: ["type"]
});
export default Loader;
</script>

<style scoped></style>
