import { shallowMount, Wrapper } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("|-> App.vue", () => {
  it("should mount the component", () => {
    const wrapper: Wrapper<any> = shallowMount(Home);
    expect(wrapper.exists()).toBeTruthy();
  });
});
