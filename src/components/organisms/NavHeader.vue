<template>
  <div class="container-nav">
    <small-logo />
    <nav>
      <div class="header-nav">
        <ul>
          <li>
            <router-link :to="{ name: 'home' }" exact-active-class="active"
              >Home
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'newRide' }" exact-active-class="active"
              >Nieuwe Rit
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'profile' }" exact-active-class="active"
              >Mijn Profiel
            </router-link>
          </li>
          <li v-if="!authenticated">
            <router-link :to="{ name: 'login' }" exact-active-class="active"
              >Inloggen
            </router-link>
          </li>
          <li v-if="authenticated">
            <div @click="logout" class="logout">Uitloggen</div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SmallLogo from "../atoms/SmallLogo.vue";

export default {
  components: { SmallLogo },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
  props: {
    authenticated: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
.container-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  nav {
    width: 100%;
    margin-bottom: 1rem;
    border-bottom: solid #e0e0e0 1px;

    .header-nav {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;

      ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 0;
        list-style: none;

        .small-logo {
          margin-right: 2.5rem;
        }

        li {
          margin-right: 2rem;

          a {
            color: #000000;
            text-decoration: none;
          }

          a:hover,
          .active {
            color: #ffa500;
          }
        }
      }

      .logout {
        color: #000000;
      }

      .logout:hover {
        cursor: pointer;
        color: #ffa500;
      }
    }
  }
}
</style>
