import myAxios from "../../myAxios";

export default {
  namespaced: true,
  state() {
    return {
      rides: [],
      ride: {},
      comments: [],
      isLoading: false,
      registered: false,
      error: "",
    };
  },
  getters: {
    rides: (state) => {
      return state.rides;
    },
    ride: (state) => {
      return state.ride;
    },
    comments: (state) => {
      return state.comment;
    },
    isLoading: (state) => {
      return state.isLoading;
    },
    registered: (state) => {
      return state.registered;
    },
    error: (state) => {
      return state.error;
    },
  },
  mutations: {
    setRides(state, rides) {
      state.rides = rides;
    },
    setRide(state, ride) {
      state.ride = ride;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setRegistered(state, registered) {
      state.registered = registered;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchRides({ commit }) {
      commit("setIsLoading", true);
      await myAxios
        .get("http://localhost:8080/api/rides")
        .then((response) => {
          console.log(response.data);
          let rides = response.data.data;
          commit("setRides", rides);
        })
        .catch((error) => {
          console.error(error);
        })
        .then(function () {
          commit("setIsLoading", false);
        });
    },
  },
};
