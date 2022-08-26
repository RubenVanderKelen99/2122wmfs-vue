import myAxios from "../../myAxios";
import myAxiosWithCredentials from "../../myAxiosWithCredentials";

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
      await myAxiosWithCredentials
        .get("http://localhost:8080/sanctum/csrf-cookie")
        .then(() => {
          myAxiosWithCredentials
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
        });
    },
    async createRide({ commit, dispatch }, data) {
      commit("setIsLoading", true);
      console.log(data);
      await myAxiosWithCredentials
        .post(`http://localhost:8080/api/rides`, {
          type: data.data.type,
          lat_start: data.data.lat_start,
          lng_start: data.data.lng_start,
          lat_destination: data.data.lat_destination,
          lng_destination: data.data.lng_destination,
          start_time: data.data.start_time,
          end_time: data.data.end_time,
          user1_id: data.data.user_id,
        })
        .then(async () => {
          await dispatch("fetchRides");
        })
        .catch((error) => {
          if (error.response?.status >= 500) {
            commit("setError", "Internal server error");
          } else if (error.response?.status === 442) {
            commit("setError", "Something is wrong with the data");
          } else {
            commit("setError", "error");
          }
        })
        .then(function () {
          commit("setIsLoading", false);
        });
    },
    emptyError({ commit }) {
      commit("setError", "");
    },
  },
};
