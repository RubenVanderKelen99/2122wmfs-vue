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
      <div :key="index" v-for="(ride, index) in rides.requested_rides">
        <GMapMarker
          :position="{ lat: ride.lat_start, lng: ride.lng_start }"
          :icon="'http://maps.google.com/mapfiles/ms/icons/blue.png'"
          :editable="false"
          :draggable="false"
        />
        <GMapMarker
          :position="{ lat: ride.lat_destination, lng: ride.lng_destination }"
          :icon="'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'"
          :editable="false"
          :draggable="false"
        />
      </div>
      <div :key="index" v-for="(ride, index) in rides.offered_rides">
        <GMapMarker
          :position="{ lat: ride.lat_start, lng: ride.lng_start }"
          :icon="'http://maps.google.com/mapfiles/ms/icons/green.png'"
          :editable="false"
          :draggable="false"
        />
        <GMapMarker
          :position="{ lat: ride.lat_destination, lng: ride.lng_destination }"
          :icon="'http://maps.google.com/mapfiles/ms/icons/green-dot.png'"
          :editable="false"
          :draggable="false"
        />
      </div>
      <GMapPolyline
        :key="index"
        v-for="(ride, index) in rides.requested_rides"
        :path="[
          { lat: ride.lat_start, lng: ride.lng_start },
          { lat: ride.lat_destination, lng: ride.lng_destination },
        ]"
        :editable="false"
        :options="requestOptions"
        ref="polyline"
      />
      <GMapPolyline
        :key="index"
        v-for="(ride, index) in rides.offered_rides"
        :path="[
          { lat: ride.lat_start, lng: ride.lng_start },
          { lat: ride.lat_destination, lng: ride.lng_destination },
        ]"
        :editable="false"
        :options="offerOptions"
        ref="polyline"
      />
    </GMapMap>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
    };
  },
  computed: {
    ...mapGetters({
      rides: "rides/rides",
      isLoading: "rides/isLoading",
    }),
  },
  methods: {
    ...mapActions({
      fetchRides: "rides/fetchRides",
    }),
  },
  created() {
    this.fetchRides();
  },
  /*data() {
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
          icon: "http://maps.google.com/mapfiles/ms/icons/green.png",
        },
        {
          position: {
            lat: 51.07,
            lng: 3.7350121,
          },
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        },
      ],
      requestMarkers: [
        {
          position: {
            lat: 51.0838286,
            lng: 3.7250121,
          },
          icon: "http://maps.google.com/mapfiles/ms/icons/blue.png",
        },
        {
          position: {
            lat: 51.09,
            lng: 3.7350121,
          },
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
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
  },*/
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
