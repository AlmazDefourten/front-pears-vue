<template>
  <v-main
    class="w-100 h-100"
    style="display: flex; justify-content: start; justify-items: start; align-items: start;"
  >
    <div
      class="filters pr-5 pb-5"
      style="width: 20rem; height: 15rem"
    >
      <v-label
        class="mt-5 ml-5"
      >
        Пол
      </v-label>
      <div
        class="d-flex"
        style="height: 30%; display: table-cell; vertical-align: top;"
      >
        <v-checkbox
          class="ml-5"
          label="Мужской"
        />
        <v-checkbox
          class="ml-5"
          label="Женский"
        />
      </div>
      <v-select
        class="ml-5"
        label="Город"
      />
      <v-btn
        class="ml-5"
      >
        Расширенный поиск
      </v-btn>
    </div>
    <div
      class="w-25 h-75 mt-16"
      style="margin-left: 10%;"
    >
      <Swipes
        class="w-100 h-100"
      >
      </Swipes>
    </div>

  </v-main>
</template>

<script lang="ts" setup>
//
import Swipes from "@/components/Swipes.vue";
</script>
<style scoped>
.filters {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: #FFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  margin-left: 20%;
  margin-top: 15%;
}

.yes-no-button {
  width: 10vh;
  height: 10vh;
}
</style>
