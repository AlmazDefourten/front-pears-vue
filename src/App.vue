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
</script>

<style scoped>
.app-global {
  background-color: #F4F4F4;
}
</style>
