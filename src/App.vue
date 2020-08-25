<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn text @click="toggleDialog" class="dialog-toggle">
        <span class="mr-2">Create New Sale</span>
        <v-icon>mdi-gavel</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="blue-grey lighten-5">
      <Home :sales="sales" />
      <UpsertSaleModal
        v-show="dialog"
        :dialog="dialog"
        @onCancel="toggleDialog"
        @onSave="addSale"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { useSales } from "@/composables/useSales";
import Home from "./views/Home.vue";
import UpsertSaleModal from "@/components/UpsertSaleModal.vue";
import { SaleInput } from "@/models/index.model";

const App = defineComponent({
  name: "App",
  components: { UpsertSaleModal, Home },
  setup() {
    const dialog = ref(false);
    const { isLoading, sales, fetchSales, error, createSale } = useSales();

    onMounted(async () => {
      await fetchSales();
    });

    const addSale = async (saleInput: SaleInput) => {
      const savedSale = await createSale(saleInput);
      sales.value.push(savedSale);
      toggleDialog();
    };
    const toggleDialog = () => (dialog.value = !dialog.value);

    return { addSale, dialog, toggleDialog, sales, error, isLoading };
  }
});
export default App;
</script>
