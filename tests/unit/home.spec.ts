import Vue from "vue";
import Vuetify from "vuetify";
import { Sale } from "@/models/index.model";
import Loader from "@/components/base/Loader.vue";
import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Home from "@/views/Home.vue";
import SalePreview from "@/components/SalePreview.vue";
Vue.use(Vuetify);

export const generateSale = (index: number, label = "test") =>
  [label].map(
    title =>
      new Sale({
        id: `mockId-${index}`,
        title: `${title}-${index}`,
        description: `${title}-description-${index}`
      })
  );

export const mockSales = (length = 1): Sale[] =>
  Array.from(new Array(length)).flatMap((_, i) => generateSale(i));

const MOCK_SALES = mockSales(3);

describe("|-> Home.vue", () => {
  let wrapper: Wrapper<any>;
  const localVue = createLocalVue();
  beforeEach(() => {
    wrapper = shallowMount(Home, {
      localVue,
      propsData: { sales: MOCK_SALES }
    });
  });

  const loadingTestCases: [string, boolean][] = [
    ["loader", true],
    ["list of sales", false]
  ];

  test.each(loadingTestCases)(
    "should display a %s if isLoading is %s",
    async (elementToDisplay, isLoading) => {
      wrapper.setProps({ isLoading: isLoading });
      await wrapper.vm.$nextTick();
      await flushPromises();
      const loader = wrapper.findComponent(Loader);
      const salesPreviews = wrapper.findAllComponents(SalePreview);
      expect(loader.exists()).toEqual(isLoading);
      expect(salesPreviews.exists()).toEqual(!isLoading);
      if (!isLoading) {
        expect(salesPreviews.length).toEqual(MOCK_SALES.length);
      }
    }
  );
});
