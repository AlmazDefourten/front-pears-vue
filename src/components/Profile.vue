<script lang="ts" setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import {DefaultApi} from "@/env";

const realName = ref<string>();
const description = ref<string>();
const profilePicture = ref();

const profilePictureUpdate = ref();

function save() {
  const fd = new FormData();
  console.log(profilePictureUpdate.value[0]);
  if (profilePictureUpdate.value != null) {
    fd.append("file", profilePictureUpdate.value[0]);
  }
  fd.append("realName", realName.value);
  fd.append("description", description.value);

  axios.post(DefaultApi + "Profile/UpdateProfile", fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      updateInfo();
    }, error => {
      console.log(error);
    });
}

function exit() {
  localStorage.removeItem("accessToken");
  window.location = window.location.protocol + "//" + window.location.host + "/login";
}

onMounted(async () => {
  await updateInfo();
})

async function updateInfo() {
  await axios.get(DefaultApi + "Cards/GetUserInfo")
    .then(response => {
      realName.value = response.data.realName;
      description.value = response.data.description;
      profilePicture.value = "data:image/png;base64," + response.data.file;
    }, error => {
      console.log(error);
    });
}

</script>

<template>
  <v-card class="mx-auto" max-width="434" tile>
    <v-img :src="profilePicture"></v-img>
    <v-label class="ml-2">Изменить аватар</v-label>
    <v-file-input
      v-model="profilePictureUpdate"
      accept="image/png, image/jpeg, image/bmp"
    />
    <v-label class="ml-2">Общая информация</v-label>
    <v-list-item color="rgba(0, 0, 0, .4)">
      <v-list-item-content>
        <v-text-field v-model="realName" class="title"></v-text-field>
      </v-list-item-content>
    </v-list-item>
    <v-label class="ml-2">Обо мне</v-label>
    <v-text-field v-model="description">
    </v-text-field>
    <v-btn block text="Сохранить" @click="() => save()"></v-btn>
    <v-btn block color="red" text="Выйти" @click="exit"></v-btn>
  </v-card>
</template>

<style scoped>
</style>
