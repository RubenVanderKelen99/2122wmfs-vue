<template>
  <div>
    <text>test</text>
    <GMapMap
      :center="{ lat: 51.093048, lng: 6.84212 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 50vw; height: 450px"
    >
    </GMapMap>
  </div>
</template>

<script>
export default {
  name: "MapView",
};
</script>

<style lang="scss"></style>
