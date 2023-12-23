<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        :prepend-avatar=TestData().testUser.avatarUrl
        :title=TestData().testUser.name
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

export default {
  methods: {
    TestData() {
      return TestData
    }
  },
  data() {
    return {
      drawer: null,
    }
  },
}
</script>
