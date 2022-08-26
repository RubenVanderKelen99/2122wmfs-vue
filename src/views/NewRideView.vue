<template id="container">
  <NavHeader :authenticated="authenticated"></NavHeader>
  <div class="mainContent">
    <form class="createRide" method="post">
      <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
      <h2>Create new ride</h2>

      <div>
        <text class="label">Type </text>
        <select v-model="selectedType" id="selectType">
          <option v-for="type in types" :key="type.key" :value="type.value">
            {{ type.value }}
          </option>
        </select>
      </div>

      <div class="dateContainer">
        <text class="label">From</text>
        <Datepicker v-model="startTime" id="startTime"></Datepicker>
        <text class="label">To</text>
        <Datepicker v-model="endTime" id="endTime"></Datepicker>
      </div>

      <text id="subheader"
        >Click the map to select start/end location.
        <span v-if="startLocation"
          ><a @click="reset" id="resetLink">reset</a></span
        ></text
      >
      <div id="mapContainer">
        <GMapMap
          :center="center"
          :zoom="11"
          map-type-id="terrain"
          style="width: 40vw; height: 30vw"
          @clickable="true"
          @click="mark"
        >
          <div v-if="startLocation">
            <GMapMarker
              :position="{ lat: startLocation.lat, lng: startLocation.lng }"
              :icon="'http://maps.google.com/mapfiles/ms/icons/yellow.png'"
              :editable="false"
              :draggable="false"
            />
          </div>

          <div v-if="endLocation">
            <GMapMarker
              :position="{ lat: endLocation.lat, lng: endLocation.lng }"
              :icon="'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'"
              :editable="false"
              :draggable="false"
            />
          </div>

          <div v-if="path">
            <GMapPolyline
              :path="path"
              :editable="false"
              :options="options"
              ref="polyline"
            />
          </div>
        </GMapMap>

        <simple-button
          type="submit"
          title="Create Ride"
          :click="tryCreateRide"
          :disabled="isLoading"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import "@vuepic/vue-datepicker/dist/main.css";
import { mapActions, mapGetters } from "vuex";
import NavHeader from "../components/organisms/NavHeader.vue";
import SimpleButton from "../components/atoms/SimpleButton.vue";

export default {
  name: "MapView",
  components: { NavHeader, Datepicker, SimpleButton },
  data() {
    return {
      center: { lat: 51.0538286, lng: 3.7250121 },
      options: {
        strokeColor: "Yellow",
        strokeWeight: 5,
      },
      types: [
        { key: 1, value: "offer" },
        { key: 2, value: "request" },
      ],
      selectedType: "",
      startLocation: null,
      endLocation: null,
      path: null,
      startTime: null,
      endTime: null,
      submitted: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      rides: "rides/rides",
      isLoading: "rides/isLoading",
      error: "rides/error",
    }),
    errors() {
      if (!this.submitted) return;

      let errors = [];

      if (!this.selectedType) errors.push("Type is required");

      if (!this.startTime) errors.push("Starttime is required");

      if (!this.endTime) errors.push("Endtime is required");

      if (!this.startLocation || !this.endLocation)
        errors.push("A route is required");

      if (this.error) errors.push(this.error);

      return errors;
    },
  },
  methods: {
    ...mapActions({
      fetchRides: "rides/fetchRides",
      createRide: "rides/createRide",
      emptyError: "rides/emptyError",
    }),
    mark(event) {
      if (!this.startLocation) {
        this.startLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
      } else {
        this.endLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        this.path = [
          { lat: this.startLocation.lat, lng: this.startLocation.lng },
          { lat: this.endLocation.lat, lng: this.endLocation.lng },
        ];
      }
    },
    reset() {
      this.startLocation = null;
      this.endLocation = null;
      this.path = null;
    },
    async tryCreateRide() {
      this.submitted = true;
      if (this.errors.length === 0) {
        await this.createRide({
          data: {
            type: this.selectedType,
            start_time: moment(this.startTime).format("YYYY/MM/DD HH:MM:SS"),
            end_time: moment(this.endTime).format("YYYY/MM/DD HH:MM:SS"),
            lat_start: this.startLocation.lat,
            lng_start: this.startLocation.lng,
            lat_destination: this.endLocation.lat,
            lng_destination: this.endLocation.lng,
            user_id: 1,
          },
        });
      }
    },
  },
  watch: {
    selectedType() {
      this.emptyError();
    },
    startLocation() {
      this.emptyError();
    },
    endLocation() {
      this.emptyError();
    },
    startTime() {
      this.emptyError();
    },
    endTime() {
      this.emptyError();
    },
  },
  created() {
    this.emptyError();
  },
};
</script>

<style lang="scss">
.mainContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .dateContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.5em;

    .label {
      padding: 0.75em;
    }
  }
  a {
    color: grey;
    text-decoration: underline;
  }

  a:hover {
    color: #ffa500;
    cursor: pointer;
  }
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
#subheader {
  justify-self: center;
  align-self: center;
}
</style>
