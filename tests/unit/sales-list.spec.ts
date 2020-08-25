import SalesList from "@/components/SalesList.vue";
import SalePreview from "@/components/SalePreview.vue";
import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import { mockSales } from "./home.spec";

describe("|-> SalesList.vue", () => {
  let wrapper: Wrapper<any>;
  const localVue = createLocalVue();
  beforeEach(() => {
    wrapper = shallowMount(SalesList, { localVue });
  });

  it("should display a SalePreview component of each i in sales prop", async () => {
    const SALES_COUNT = 5;
    wrapper.setProps({ sales: mockSales(SALES_COUNT) });
    await wrapper.vm.$nextTick();
    const expectedProps = wrapper.vm.$props.sales;
    expect(expectedProps).toHaveLength(SALES_COUNT);
    const SalePreviews = wrapper.findAllComponents(SalePreview);
    expect(SalePreviews).toHaveLength(SALES_COUNT);
  });
});
