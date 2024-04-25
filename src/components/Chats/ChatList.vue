<script lang="ts" setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {DefaultApi, MessagesHubConnection} from "@/env";

const activeChat = ref();
const parents = ref([]);
const messages = ref([]);
const messageForm = {
  content: ref(),
  me: true,
  created_at: "11:11am"
};

MessagesHubConnection.on("Receive", data => {
  messages.value.push({
    createTime: new Date(),
    content: data,
    me: false,
  });
});

async function sendMessage(message: string) {
  const msg = messageForm.content.value;
  messageForm.content.value = "";

  axios.post(DefaultApi + "Messages", {message: msg, userToId: activeChat.value})
    .then(response => {
    }, error => {
      console.log(error);
    });

  await MessagesHubConnection.invoke("send", activeChat.value, msg);
  messages.value.push({
    createTime: new Date(),
    content: msg,
    me: true,
  });
}

onMounted(async () => {
  await getMessages();
  await MessagesHubConnection.start();

  await axios.get(DefaultApi + "Messages/GetChats")
    .then(response => {
      parents.value = response.data;
    }, error => {
      console.log(error);
    });
});

async function getMessages() {
  await axios.get(DefaultApi + "Messages", {params: {UserId: activeChat.value}})
    .then(response => {
      messages.value = response.data;
    }, error => {
      console.log(error);
    });
}

</script>
<template>
  <div id="app">
    <v-container
      class="fill-height pa-0 "
    >
      <v-row class="no-gutters elevation-4">
        <v-col
          class="flex-grow-1 flex-shrink-0" cols="12"
          sm="3"
          style="border-right: 1px solid #0000001f;"
        >
          <v-responsive
            class="overflow-y-auto fill-height"
            height="500"
          >
            <v-list subheader>
              <v-list-item-group v-for="(item, index) in parents">
                <v-list-item
                  :key="`parent${index}`"
                  :value="item.id"
                  @click="() => {activeChat = item.id; getMessages();}"
                >
                  <v-list-item-avatar color="grey lighten-1 white--text">
                    <v-icon>
                      mdi-emoticon-outline
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"/>
                    <v-list-item-subtitle v-text="'hi'"/>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">
                      chat_bubble
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider
                  :key="`chatDivider${index}`"
                  class="my-0"
                />
              </v-list-item-group>
            </v-list>
          </v-responsive>
        </v-col>
        <v-col
          class="flex-grow-1 flex-shrink-0"
          cols="auto"
        >
          <v-responsive
            v-if="activeChat"
            class="overflow-y-hidden fill-height"
            height="500"
          >
            <v-card
              class="d-flex flex-column fill-height"
              flat
            >
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <template v-for="(msg, i) in messages">
                  <div
                    :class="{ 'd-flex flex-row-reverse': msg.me }"
                  >
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-hover
                          v-slot:default="{ hover }"
                        >
                          <v-chip
                            :color="msg.me ? 'primary' : ''"
                            class="pa-4 mb-2"
                            dark
                            style="height:auto;white-space: normal;"
                            v-on="on"
                          >
                            {{ msg.content }}
                            <sub
                              class="ml-2"
                              style="font-size: 0.5rem;"
                            >{{ msg.createTime }}</sub>
                            <v-icon
                              v-if="hover"
                              small
                            >
                              expand_more
                            </v-icon>
                          </v-chip>
                        </v-hover>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title>delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </v-card-text>
              <v-card-text class="flex-shrink-1">
                <v-text-field
                  v-model="messageForm.content.value"
                  append-outer-icon="send"
                  hide-details
                  label="Напишите сообщение"
                  no-details
                  outlined
                  type="text"
                  @keyup.enter="sendMessage(messageForm.content.value)"
                  @click:append-outer="sendMessage(messageForm.content.value)"
                />
              </v-card-text>
            </v-card>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
