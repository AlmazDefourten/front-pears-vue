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

axios.interceptors.response.use((response) => {
  return response;
}, (error) => { // Anything except 2XX goes to here
  console.log(error);
  if (error.message == "Network Error") {
    window.location = window.location.protocol + "//" + window.location.host + "/login"
  } else {
    return Promise.reject(error); // Delegate error to calling side
  }
});


</script>

<style scoped>
.app-global {
  background-color: #F4F4F4;
}
</style>
