<template id="container">
  <div id="header">
    <div id="headerLeft">
      <text>header</text>
    </div>
    <div id="headerMiddle">
      <img src="../assets/l4ylogo.svg" id="logo" alt="logo" />
    </div>
    <div id="headerRight">
      <text>HeaderItem 1</text>
      <text>HeaderItem 2</text>
      <text>HeaderItem 3</text>
      <text>HeaderItem 4</text>
    </div>
  </div>

  <div id="mapContainer">
    <GMapMap
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 50vw; height: 50vw"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in offerMarkers"
        :icon="'http://maps.google.com/mapfiles/ms/icons/green-dot.png'"
        :position="m.position"
        :editable="false"
        :draggable="false"
      />
      <GMapMarker
        :key="index"
        v-for="(m, index) in requestMarkers"
        :icon="'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'"
        :position="m.position"
        :editable="false"
        :draggable="false"
      />
      <GMapPolyline
        :key="index"
        v-for="(m, index) in offerPaths"
        :path="m.path"
        :editable="false"
        :options="offerOptions"
        ref="polyline"
      />
      <GMapPolyline
        :key="index"
        v-for="(m, index) in requestPaths"
        :path="m.path"
        :editable="false"
        :options="requestOptions"
        ref="polyline"
      />
    </GMapMap>
  </div>
</template>

<script>
export default {
  name: "MapView",
  data() {
    return {
      center: { lat: 51.0538286, lng: 3.7250121 },
      offerOptions: {
        strokeColor: "LightGreen",
        strokeWeight: 5,
      },
      requestOptions: {
        strokeColor: "CornflowerBlue",
        strokeWeight: 5,
      },
      offerMarkers: [
        {
          position: {
            lat: 51.0538286,
            lng: 3.7250121,
          },
        },
        {
          position: {
            lat: 51.07,
            lng: 3.7350121,
          },
        },
      ],
      requestMarkers: [
        {
          position: {
            lat: 51.0838286,
            lng: 3.7250121,
          },
        },
        {
          position: {
            lat: 51.09,
            lng: 3.7350121,
          },
        },
      ],
      offerPaths: [
        {
          path: [
            { lat: 51.0538286, lng: 3.7250121 },
            { lat: 51.07, lng: 3.7350121 },
          ],
        },
      ],
      requestPaths: [
        {
          path: [
            { lat: 51.0838286, lng: 3.7250121 },
            { lat: 51.09, lng: 3.7350121 },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#mapContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
#header {
  display: flex;
  justify-content: space-around;
}
#logo {
  width: 256px;
  height: 256px;
}
</style>
