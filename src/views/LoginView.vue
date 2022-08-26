<template>
  <NavHeader :authenticated="authenticated"></NavHeader>
  <div class="auth-container">
    <div class="auth-from">
      <h2>Login</h2>
      <form class="login-form" method="post">
        <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
        <simple-input
          id="email"
          label="Email"
          type="email"
          required
          autocomplete="username"
          v-model.trim="email"
        />

        <simple-input
          id="password"
          label="Password"
          type="password"
          required
          autocomplete="new-password"
          v-model.trim="password"
        />

        <simple-button
          type="submit"
          title="Login"
          :click="tryLogin"
          :disabled="isLoading"
        />

        <p class="no-profile">
          New user?
          <router-link to="/register" class="link">Register here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SimpleInput from "../components/atoms/SimpleInput.vue";
import SimpleButton from "../components/atoms/SimpleButton.vue";
import NavHeader from "../components/organisms/NavHeader.vue";

export default {
  components: { NavHeader, SimpleInput, SimpleButton },
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    errors() {
      if (!this.submitted) return;

      let errors = [];

      let emailRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

      if (!this.email) errors.push("Email is required");
      else if (!emailRegex.test(this.email)) {
        errors.push(
          "The email provided does not follow the pattern name@domain.extension"
        );
      }

      if (!this.password) errors.push("Password is required");

      if (this.error) errors.push(this.error);

      return errors;
    },
    ...mapGetters({
      authenticated: "auth/authenticated",
      error: "auth/error",
      isLoading: "auth/isLoading",
    }),
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      emptyError: "auth/emptyError",
    }),
    async tryLogin() {
      this.submitted = true;

      if (this.errors.length === 0) {
        await this.login({
          email: this.email,
          password: this.password,
        });
      }
    },
  },
  watch: {
    authenticated() {
      this.$router.push({ name: "home" });
    },
    email() {
      this.emptyError();
    },
    password() {
      this.emptyError();
    },
  },
  created() {
    this.emptyError();
  },
};
</script>

<style scoped lang="scss">
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
