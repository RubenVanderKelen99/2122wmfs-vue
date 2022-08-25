<script>
import LoginView from "./views/LoginView.vue";
export default {
  name: "App",
  components: { LoginView },
};
</script>

<template>
  <main id="mainContainer">
    <LoginView />
  </main>
</template>

<style lang="scss">
#mainContainer {
  max-width: 100vw;
  height: 100vh;
}
</style>
