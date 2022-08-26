<template id="container">
  <NavHeader :authenticated="authenticated"></NavHeader>

  <div id="mapContainer">
    <GMapMap
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 50vw; height: 35vw"
      @clickable="true"
      @click="mark"
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
import NavHeader from "../components/organisms/NavHeader.vue";

export default {
  name: "MapView",
  components: { NavHeader },
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
      authenticated: "auth/authenticated",
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
