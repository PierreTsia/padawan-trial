// @ts-ignore
import App from "@/App";
import Home from "@/views/Home.vue";
import UpsertSaleModal from "@/components/UpsertSaleModal.vue";
import SaleItemsModal from "@/components/SaleItemsModal.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueCompositionApi from "@vue/composition-api";
import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import flushPromises from "flush-promises";
import { mockSales } from "./home.spec";
Vue.use(Vuetify);

const MOCK_SALES = mockSales(3);

jest.mock("axios", () => ({
  get: (url: string) => {
    const resolvedData = url.endsWith("/sales") ? MOCK_SALES : [];
    return Promise.resolve({ data: resolvedData });
  },
  post: (url: string) => {
    const entityType = url.endsWith("/sales") ? "saleInput" : "itemInput";
    const resolvedEntity: {
      id: string;
      description: string;
      title: string;
      sale_id?: string;
    } = {
      title: `${entityType}.title`,
      description: `${entityType}.description`,
      id: `${entityType}.mockId`
    };
    if (entityType === "itemInput") {
      resolvedEntity["sale_id"] = `${entityType}.mockSaleId`;
    }

    return Promise.resolve({
      data: resolvedEntity
    });
  }
}));

describe("|-> App.vue", () => {
  let wrapper: Wrapper<any>;
  const localVue = createLocalVue();
  localVue.use(VueCompositionApi);
  beforeEach(() => {
    wrapper = shallowMount(App, { localVue });
  });
  it("should fetch sales on mounted hook and pass Home array of Sales", async () => {
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.$data.sales).toEqual(MOCK_SALES);
    expect(wrapper.vm.$data.error).toEqual(null);
    expect(wrapper.vm.$data.isLoading).toEqual(false);
    const home = wrapper.findComponent(Home);
    expect(home.props().sales).toEqual(MOCK_SALES);
  });
  it("should display the Home Component", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Home).vm.$el).toBeVisible();
  });
  it("should display upsertSale modal if showModal.upsertSale is true ", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UpsertSaleModal).vm.$el).not.toBeVisible();
    expect(wrapper.vm.$data.showModal.upsertSale).toBeFalsy();
    //TODO: change for an emited event from Child Component
    wrapper.vm.$data.toggleModal("upsertSale");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.showModal.upsertSale).toBeTruthy();
    expect(wrapper.findComponent(UpsertSaleModal).vm.$el).toBeVisible();
  });

  it("should add a sale if modal emits 'onSave'", async () => {
    wrapper.vm.$data.toggleModal("upsertSale");
    const [saleInput] = mockSales();
    const initialSalesCount = wrapper.vm.$data.sales.length;

    const spy = jest.spyOn(wrapper.vm, "addSale");
    await wrapper.vm.$nextTick();
    const modal = wrapper.findComponent(UpsertSaleModal);
    modal.vm.$emit("onSave", saleInput);
    expect(spy).toHaveBeenCalledWith(saleInput);
    await wrapper.vm.$nextTick();
    await flushPromises();
    const newSalesCount = wrapper.vm.$data.sales.length;
    expect(newSalesCount).toEqual(initialSalesCount + 1);
    expect(wrapper.vm.$data.sales[newSalesCount - 1]).toEqual({
      id: expect.any(String),
      title: "saleInput.title",
      description: "saleInput.description"
    });
  });

  it("should display an items modals with an item list when an active sale is set", async () => {
    expect(wrapper.findComponent(SaleItemsModal).vm.$el).not.toBeVisible();
    const home = wrapper.findComponent(Home);
    home.vm.$emit("onViewItems", MOCK_SALES[0].id);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.activeSaleId).toEqual(MOCK_SALES[0].id);
    expect(wrapper.findComponent(SaleItemsModal).vm.$el).toBeVisible();
  });

  it("should add an item if items modal emits @onItemCreated", async () => {
    const home = wrapper.findComponent(Home);
    home.vm.$emit("onViewItems", "itemInput.mockSaleId");
    await wrapper.vm.$nextTick();
    const itemModal = wrapper.findComponent(SaleItemsModal);
    expect(wrapper.vm.$data.activeSaleItems).toHaveLength(0);
    itemModal.vm.$emit("onItemCreated", "test-description");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.$data.activeSaleItems).toEqual([
      {
        id: "itemInput.mockId",
        title: "itemInput.title",
        description: "itemInput.description",
        sale_id: "itemInput.mockSaleId"
      }
    ]);
  });
});
