<template>
  <v-app class="w-100 h-100 app-global">
    <v-main class="w-100 h-100">
      <Home></Home>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Home from "@/components/Home.vue";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");

  return config;
});

</script>

<style scoped>
.app-global {
  background-color: #F4F4F4;
}
</style>
