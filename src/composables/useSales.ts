import { reactive, ref, toRefs } from "@vue/composition-api";
import { Sale, SaleItem, SaleInput } from "@/models/index.model";
import axios from "axios";
type FetchSalesState = {
  isLoading: boolean;
  sales: Sale[];
  error: any;
};

export const useSales = () => {
  const BASE_URL = "http://localhost:3000";
  const state: FetchSalesState = reactive({
    isLoading: false,
    sales: [],
    error: null
  });

  const createSale = async (saleInput: SaleInput): Promise<Sale> => {
    const { data } = await axios.post(`${BASE_URL}/sales`, saleInput);
    return new Sale(data);
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

  return { ...toRefs(state), fetchSales, createSale };
};
