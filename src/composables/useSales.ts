import { computed, reactive, ref, toRefs } from "@vue/composition-api";
import { Sale, SaleItem, SaleInput } from "@/models/index.model";
import axios from "axios";
type FetchSalesState = {
  isLoading: boolean;
  sales: Sale[];
  items: SaleItem[];
  error: any;
};

type ItemsBySale = { [saleId: string]: SaleItem[] };

export const useSales = () => {
  const BASE_URL = "http://localhost:3000";
  const state: FetchSalesState = reactive({
    isLoading: false,
    sales: [],
    items: [],
    error: null
  });

  const itemsBySaleId = computed(() =>
    state.items.reduce((items, item) => {
      items[item.sale_id]
        ? items[item.sale_id].push(item)
        : (items[item.sale_id] = [item]);
      return items;
    }, {} as ItemsBySale)
  );

  const createSale = async (saleInput: SaleInput) => {
    const { data } = await axios.post(`${BASE_URL}/sales`, saleInput);
    state.sales.push(new Sale(data));
  };
  const createItem = async (saleItem: SaleItem) => {
    const { data } = await axios.post(`${BASE_URL}/items`, saleItem);
    state.items.push(new SaleItem(data));
  };

  const fetchSales = async () => {
    state.isLoading = true;
    try {
      const { data } = await axios.get(`${BASE_URL}/sales`);
      state.sales = data.map((saleInput: SaleInput) => new Sale(saleInput));
    } catch (e) {
      state.error = e;
    }
    state.isLoading = false;
  };

  const fetchItems = async () => {
    state.isLoading = true;
    try {
      const { data } = await axios.get(`${BASE_URL}/items`);
      state.items = data.map((saleItem: any) => new SaleItem(saleItem));
    } catch (e) {
      state.error = e;
    }
    state.isLoading = false;
  };

  return {
    ...toRefs(state),
    fetchSales,
    fetchItems,
    createSale,
    createItem,
    itemsBySaleId
  };
};
