<template>
  <div class="auth">
    <my-logo class="logo" />
    <div class="auth-from">
      <h2>Login</h2>
      <form class="login-form" method="post">
        <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
        <div class="my-input">
          <label for="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            required
            autocomplete="username"
            v-model.trim="email"
          />
        </div>

        <div class="my-input">
          <label for="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            autocomplete="new-password"
            v-model.trim="password"
          />
        </div>

        <button
          type="submit"
          @click="tryLogin"
          @click.prevent="click"
          :disabled="isLoading"
        >
          Login
        </button>

        <p class="no-profile">
          No profile yet?
          <router-link to="/signup" class="link">Sign up here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
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
      //this.$router.push({ name: "showGames" });
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

<style scoped lang="scss"></style>
