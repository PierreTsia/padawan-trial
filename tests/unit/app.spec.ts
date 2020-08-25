// @ts-ignore
import App from "@/App";
import Home from "@/views/Home.vue";
import UpsertSaleModal from "@/components/UpsertSaleModal.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueCompositionApi from "@vue/composition-api";
import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import flushPromises from "flush-promises";
import { mockSales } from "./home.spec";
import { Sale, SaleInput } from "@/models/index.model";
Vue.use(Vuetify);

const MOCK_SALES = mockSales(3);

jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: MOCK_SALES }),
  post: () => {
    return Promise.resolve({
      data: { title: "saleInput.title", description: "saleInput.description" }
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
  it("should have a modal component visible only if dialog === true", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UpsertSaleModal).vm.$el).not.toBeVisible();
    expect(wrapper.vm.$data.dialog).toBeFalsy();
    //TODO: change for an emited event from Child Component
    wrapper.vm.$data.toggleDialog();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.dialog).toBeTruthy();
    expect(wrapper.findComponent(UpsertSaleModal).vm.$el).toBeVisible();
  });

  it("should add a sale if modal emits 'onSave'", async () => {
    wrapper.vm.$data.toggleDialog();
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
});
