<template>
  <v-app class="w-100 h-100 app-global">
    <v-main class="w-100 h-100">
      <HelloWorld class="w-100 h-100" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'
</script>

<style scoped>
.app-global {
  background-color: #F4F4F4;
}
</style>
