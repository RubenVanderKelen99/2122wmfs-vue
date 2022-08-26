<template>
  <main>
    <NavHeader :authenticated="authenticated"></NavHeader>
    <text>profileView</text>
  </main>
</template>

<script>
import NavHeader from "../components/organisms/NavHeader.vue";

export default {
  components: { NavHeader },
};
</script>
