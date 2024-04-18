<script lang="ts" setup>
import axios from "axios";
import {DefaultApi} from "@/env";
import {onMounted, ref} from "vue";

const cardsData = ref([]);

const updateKey = ref(0);

const base64 = "data:image/png;base64,";

onMounted(async () => {
  const response = await axios.get(DefaultApi + "Matches", {params: {PageNumber: 1, PageSize: 1000}})
      .then(response => {
        cardsData.value = response.data;
        updateKey.value++;
      }, error => {
        console.log(error);
      });
})

function startMessage(id: string) {
  axios.post(DefaultApi + "Messages", {message: "Данный пользователь свайпнул вас! Начните общение сейчас!", userToId: id})
      .then(response => {
        window.location = window.location.protocol + "//" + window.location.host + "/chat";
      }, error => {
        console.log(error);
      });
}

</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="(item, i) in cardsData" :key="updateKey" class="ml-5" order="last">
        <v-card
            class="mx-auto my-8"
            elevation="16"
            max-width="344"
        >
          <v-card-item>
            <v-card-title>
            </v-card-title>
            <v-card-subtitle>
              {{ item.realName }}
            </v-card-subtitle>
          </v-card-item>
          <v-img :src="base64 + item.file"></v-img>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
          <v-btn
              block class="mt-2" color="" text="Написать сообщение" type="submit"
              variant="outlined"
              @click="startMessage(item.id)">
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
