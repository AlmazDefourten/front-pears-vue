<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        :prepend-avatar=profilePicture
        :title=realName
        size="x-large"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item href="/profile" prepend-icon="mdi-account" title="Профиль" value="myfiles"></v-list-item>
      <v-list-item href="/" prepend-icon="mdi-cards" title="Свайпы" value="shared"></v-list-item>
      <v-list-item href="/matches" prepend-icon="mdi-account-multiple" title="Совпадения" value="shared"></v-list-item>
      <v-list-item href="/chat" prepend-icon="mdi-message-outline" title="Чаты" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import {TestData} from "@/assets/data/TestData";
import axios from "axios";
import {DefaultApi} from "@/env";

export default {
  methods: {
    async updateInfo() {
      await axios.get(DefaultApi + "Cards/GetUserInfo")
        .then(response => {
          this.realName = response.data.realName;
          this.description = response.data.description;
          this.profilePicture = "data:image/png;base64," + response.data.file;
        }, error => {
          console.log(error);
        });
    }
  },
  async mounted() {
    await this.updateInfo();
  },
  data() {
    return {
      drawer: null,
      realName: null,
      description: null,
      profilePicture: null
    }
  },
}
</script>
