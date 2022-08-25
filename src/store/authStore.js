import myAxios from "../../myAxios";
import myAxiosWithCredentials from "../../myAxiosWithCredentials";

export default {
  namespaced: true,
  state() {
    return {
      authenticated: false,
      error: "",
      user: {},
      isLoading: false,
    };
  },
  getters: {
    authenticated: (state) => {
      return state.authenticated;
    },
    error: (state) => {
      return state.error;
    },
    user: (state) => {
      return state.user;
    },
    isLoading: (state) => {
      return state.isLoading;
    },
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    },
    setError(state, error) {
      state.error = error;
    },
    setUser(state, user) {
      state.user = user;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    login({ commit, dispatch }, user) {
      commit("setIsLoading", true);
      myAxiosWithCredentials
        .get("http://localhost:8080/sanctum/csrf-cookie")
        .then(() => {
          myAxiosWithCredentials
            .post("http://localhost:8080/api/login", {
              email: user.email,
              password: user.password,
            })
            .then(async function () {
              await dispatch("fetchUser");
            })
            .catch(function (error) {
              if (error.response?.status >= 500) {
                commit("setError", "Internal server error");
              }
              if (error.response?.status > 400) {
                commit("setError", "Invalid email and/or password");
              }
            })
            .then(function () {
              commit("setIsLoading", false);
            });
        });
    },
    emptyError({ commit }) {
      commit("setError", "");
    },
    async fetchUser({ commit }) {
      await myAxiosWithCredentials
        .get("http://localhost:8080/api/user")
        .then((response) => {
          let user = response.data;
          commit("setUser", user);
          commit("setAuthenticated", true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
