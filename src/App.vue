<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">Create New Sale</span>
        <v-icon>mdi-gavel</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="blue-grey lighten-5">
      <Home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "./views/Home.vue";

export default Vue.extend({
  name: "App",

  components: {
    Home
  },

  data: () => ({
    //
  })
});
</script>
