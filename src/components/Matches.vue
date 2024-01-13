<script lang="ts" setup>
import {TestData} from "@/assets/data/TestData";
import axios from "axios/index";
import {DefaultApi} from "@/env";
import {ref} from "vue";

const cardsData = ref();

await axios.get(DefaultApi + "Matches", {params: {PageNumber: 1, PageSize: 1000}})
  .then(response => {
    cardsData.value = response.data.items;
    for (let i = 0; i < response.data.totalCount; i++) {
    }
  }, error => {
    console.log(error);
  });
</script>

<template>
  <router-view/>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="(item, i) in TestData.urls" class="ml-5" order="last">
        <v-card
          class="mx-auto my-8"
          elevation="16"
          max-width="344"
        >
          <v-card-item>
            <v-card-title>
            </v-card-title>
            <v-card-subtitle>
              {{ TestData.nicknames[i] }}
            </v-card-subtitle>
          </v-card-item>
          <v-img :src=item></v-img>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore
            magna aliqua.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
