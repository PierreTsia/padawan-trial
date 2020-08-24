<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { defineComponent } from "@vue/composition-api";
const Home = defineComponent({
  name: "Home",
  components: {
    HelloWorld
  }
});

export default Home;
</script>
