<template>
    <v-responsive class="align-center text-center fill-height">
      <LeftBar></LeftBar>
      <v-main class="w-100 h-100" style="display: flex; justify-content: start; justify-items: start; align-items: start;">
        <div class="filters" style="width: 283px; height: 283px"></div>
        <Swipes style="background-color: #FBFBFB;" class="h-100"></Swipes>
      </v-main>
    </v-responsive>
</template>

<script setup lang="ts">
  //
import LeftBar from "@/components/LeftBar.vue";
  import Swipes from "@/components/Swipes.vue";
</script>
<style scoped>
.filters {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: #FFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  margin-left: 10%;
}
</style>
