<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn text @click="toggleModal('upsertSale')" class="dialog-toggle">
        <span class="mr-2">Create New Sale</span>
        <v-icon>mdi-gavel</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="blue-grey lighten-5">
      <Home :sales="sales" @onViewItems="setActiveSale" />
      <UpsertSaleModal
        v-show="showModal.upsertSale"
        :dialog="showModal.upsertSale"
        @onCancel="toggleModal('upsertSale')"
        @onSave="addSale"
      />
      <SaleItemsModal
        v-show="showModal.saleItems"
        :dialog="showModal.saleItems"
        :saleName="activeSaleName"
        :items="activeSaleItems"
        @onCancel="toggleModal('saleItems')"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  reactive,
  computed,
  ComputedRef
} from "@vue/composition-api";
import { useSales } from "@/composables/useSales";
import Home from "./views/Home.vue";
import UpsertSaleModal from "@/components/UpsertSaleModal.vue";
import SaleItemsModal from "@/components/SaleItemsModal.vue";
import { SaleInput, Sale, SaleItem } from "@/models/index.model";

const App = defineComponent({
  name: "App",
  components: { SaleItemsModal, UpsertSaleModal, Home },
  setup() {
    onMounted(async () => {
      await fetchSales();
      await fetchItems();
    });

    const {
      isLoading,
      sales,
      fetchSales,
      fetchItems,
      error,
      createSale,
      itemsBySaleId
    } = useSales();

    const showModal = reactive({
      upsertSale: false,
      saleItems: false
    });
    const toggleModal = (modal: "upsertSale" | "saleItems") =>
      (showModal[modal] = !showModal[modal]);

    const activeSaleId: Ref<string | null> = ref(null);
    const activeSaleName: ComputedRef<string> = computed(
      () =>
        sales.value.find(sale => sale?.id === activeSaleId.value)?.title ?? ""
    );
    const activeSaleItems: ComputedRef<SaleItem[]> = computed(() =>
      activeSaleId?.value ? itemsBySaleId.value[activeSaleId.value] : []
    );

    const setActiveSale = (saleId: string) => {
      activeSaleId.value = saleId;
      toggleModal("saleItems");
    };

    const addSale = async (saleInput: SaleInput) => {
      await createSale(saleInput);
      toggleModal("upsertSale");
    };

    return {
      showModal,
      toggleModal,
      addSale,
      sales,
      error,
      isLoading,
      itemsBySaleId,
      activeSaleId,
      activeSaleName,
      activeSaleItems,
      setActiveSale
    };
  }
});
export default App;
</script>
