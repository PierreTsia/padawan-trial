import axios from "axios";
import VueCompositionApi from "@vue/composition-api";
import { Sale } from "@/models/index.model";
import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Home from "@/views/Home.vue";
jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: mockSales })
}));

describe("|-> App.vue", () => {
  let wrapper: Wrapper<any>;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    wrapper = shallowMount(Home, { localVue });
  });
  it("should fetch sales on mounted hook and return an array of Sales", async () => {
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.$data.sales).toEqual(mockSales);
    expect(wrapper.vm.$data.error).toEqual(null);
    expect(wrapper.vm.$data.isLoading).toEqual(false);
  });
});

const mockSales = [
  { id: 1, title: "test-titles", description: "test-description" }
].map(sale => new Sale(sale));
