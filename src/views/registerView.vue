<template>
  <div class="auth">
    <NavHeader :authenticated="authenticated"></NavHeader>
    <div class="auth-form">
      <h2>Registration</h2>
      <form class="login-form" method="post">
        <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
        <simple-input
          id="name"
          label="Name"
          type="text"
          required
          v-model.trim="name"
        />

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

        <simple-input
          id="password-repeat"
          label="Repeat password"
          type="password"
          required
          autocomplete="new-password"
          v-model.trim="repeatPassword"
        />

        <simple-button
          type="submit"
          title="Registreren"
          :click="signUp"
          :disabled="isLoading"
        />

        <p class="no-profile">
          Already registered?
          <router-link to="/login" class="link">Go to login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NavHeader from "../components/organisms/NavHeader.vue";
import SimpleButton from "../components/atoms/SimpleButton.vue";
import SimpleInput from "../components/atoms/SimpleInput.vue";

export default {
  components: { SimpleInput, SimpleButton, NavHeader },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      submitted: false,
    };
  },
  computed: {
    errors() {
      if (!this.submitted) return;

      let errors = [];

      if (!this.name) errors.push("Name is required");

      let emailRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

      if (!this.email) errors.push("Email is required");
      else if (!emailRegex.test(this.email)) {
        errors.push(
          "The email provided does not follow the pattern name@domain.extension"
        );
      }

      if (!this.password) errors.push("Password is required");
      else if (this.password !== this.repeatPassword) {
        errors.push("Passwords do not match");
      }

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
      register: "auth/register",
      emptyError: "auth/emptyError",
    }),
    async signUp() {
      this.submitted = true;

      if (this.errors.length === 0) {
        await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.repeatPassword,
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
  },
  created() {
    this.emptyError();
  },
};
</script>

<style scoped lang="scss"></style>
