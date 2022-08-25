import { createStore } from "vuex";
import rideStore from "./rideStore";

export default createStore({
  modules: {
    rides: rideStore,
  },
  state() {
    return {
      isLoading: false,
    };
  },
  getters: {
    isLoading: (state) => {
      return state.isLoading;
    },
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
});
