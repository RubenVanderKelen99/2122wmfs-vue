<script>
import MapView from "./components/MapView.vue";
export default {
  name: "App",
  components: { MapView },
};
</script>

<template>
  <main id="mainContainer">
    <MapView />
  </main>
</template>

<style lang="scss">
#mainContainer {
  max-width: 100vw;
  height: 100vh;
}
</style>
