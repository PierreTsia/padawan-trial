<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleModal('search')">
        <v-icon>mdi-magnify-plus</v-icon>
      </v-btn>
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
        @onClose="toggleModal('saleItems')"
        @onItemCreated="addItem"
      />
      <SearchScreen
        :dialog="showModal.search"
        :items="items"
        :sales="sales"
        @onClose="toggleModal('search')"
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
import SearchScreen from "@/components/SearchScreen.vue";
import { SaleInput, Sale, SaleItem } from "@/models/index.model";

const App = defineComponent({
  name: "App",
  components: { SaleItemsModal, SearchScreen, UpsertSaleModal, Home },
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
      createItem,
      itemsBySaleId,
      items
    } = useSales();

    const showModal = reactive({
      upsertSale: false,
      saleItems: false,
      search: false
    });
    const toggleModal = (modal: "upsertSale" | "saleItems" | "search") =>
      (showModal[modal] = !showModal[modal]);

    const setActiveSale = (saleId: string) => {
      activeSaleId.value = saleId;
      toggleModal("saleItems");
    };
    const activeSaleId: Ref<string | null> = ref(null);
    const activeSaleName: ComputedRef<string> = computed(
      () =>
        sales.value.find(sale => sale?.id === activeSaleId.value)?.title ?? ""
    );
    const activeSaleItems: ComputedRef<SaleItem[]> = computed(() =>
      activeSaleId?.value ? itemsBySaleId.value[activeSaleId.value] ?? [] : []
    );

    const addSale = async (saleInput: SaleInput) => {
      await createSale(saleInput);
      toggleModal("upsertSale");
    };

    const addItem = async (description: string) => {
      const newItem = new SaleItem({
        description,
        sale_id: activeSaleId.value!
      });
      await createItem(newItem);
    };

    return {
      showModal,
      toggleModal,
      addSale,
      addItem,
      sales,
      items,
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
