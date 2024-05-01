<script lang="ts" setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {DefaultApi, MessagesHubConnection} from "@/env";
import PictureInput from "vue-picture-input";

const activeChat = ref();
const parents = ref([]);
const messages = ref([]);
const messageForm = {
  content: ref(),
  me: true,
  created_at: "11:11am"
};
const messageFormWithPicture = {
  content: ref(),
  file: File,
  me: true,
  created_at: "11:11am"
};

const isImageModalOpened = ref(false);

const mainInput = ref(null);

MessagesHubConnection.on("Receive", async (data, withFile) => {
  if (withFile) {
    console.log("adadadad")
    await getMessages();
  } else {
    messages.value.push({
      createTime: new Date(),
      content: data,
      me: false,
    });
    await axios.get(DefaultApi + "Messages/GetChats")
      .then(response => {
        parents.value = response.data;
      }, error => {
        console.log(error);
      });
  }
});

async function sendMessage(message: string) {
  const msg = messageForm.content.value;
  messageForm.content.value = "";

  const fd = new FormData();
  fd.append("message", msg);
  fd.append("userToId", activeChat.value);

  await axios.post(DefaultApi + "Messages", fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  await MessagesHubConnection.invoke("send", activeChat.value, msg, false);
  await getMessages();

  await axios.get(DefaultApi + "Messages/GetChats")
    .then(response => {
      parents.value = response.data;
    }, error => {
      console.log(error);
    });
}

async function sendMessageWithPicture(message: string) {
  const msg = messageFormWithPicture.content.value;
  messageFormWithPicture.content.value = "";

  const fd = new FormData();
  console.log(messageFormWithPicture.file);
  if (messageFormWithPicture.file != null) {
    fd.append("file", messageFormWithPicture.file);
  }
  fd.append("message", msg);
  fd.append("userToId", activeChat.value);

  await axios.post(DefaultApi + "Messages", fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  isImageModalOpened.value = false;

  await MessagesHubConnection.invoke("send", activeChat.value, msg, true);
  await getMessages();

  await axios.get(DefaultApi + "Messages/GetChats")
    .then(response => {
      parents.value = response.data;
    }, error => {
      console.log(error);
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
  if (mainInput.value != null) {
    mainInput.value.$el.scrollIntoView({behavior: 'smooth'});
  }
}

function onChange(img, a) {
  messageFormWithPicture.file = img.target.files[0];
}

</script>
<template>
  <div id="app">
    <v-container
      class="fill-height pa-0"
    >
      <v-row class="no-gutters elevation-4">
        <v-col
          class="flex-grow-1 flex-shrink-0" cols="12"
          sm="3"
          style="border-right: 1px solid #0000001f;"
        >
          <v-responsive
            class="overflow-y-auto fill-height w-25 sticky"
            height="500"
          >
            <v-list subheader>
              <v-list-item-group v-for="(item, index) in parents">
                <v-list-item
                  :key="`parent${index}`"
                  :value="item.id"
                  @click="() => {activeChat = item.id; getMessages();}"
                >
                  <v-avatar :rounded="100">
                    <v-img
                      :src="'data:image/png;base64,' + item.iconFile"></v-img>
                  </v-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"/>
                    <v-list-item-subtitle
                      v-text="item.lastMessage?.length >= 10 ? item?.lastMessage + '...' : item?.lastMessage"/>
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
          ref="messageContainer"
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
                  <div v-if="msg.file" :class="{ 'd-flex flex-row-reverse': msg.me }">
                    <v-chip
                      v-if="msg.file"
                      :color="msg.me ? 'primary' : ''"
                      class="pa-4 mb-2 pa-2"
                      dark
                      label
                      style="height:auto;white-space: normal;"
                    >
                      <v-img
                        v-if="msg.file"
                        :src="'data:image/png;base64,' + msg.file"
                        width="350px">
                      </v-img>
                    </v-chip>
                  </div>
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
                            <div>
                              {{ msg.content }}
                              <div class="d-flex">
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
                              </div>
                            </div>
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
                  ref="mainInput"
                  v-model="messageForm.content.value"
                  append-inner-icon="mdi-paperclip"
                  append-outer-icon="send"
                  hide-details
                  label="Напишите сообщение"
                  no-details
                  outlined
                  type="text"
                  @keyup.enter="sendMessage(messageForm.content.value)"
                  @click:append-outer="sendMessage(messageForm.content.value)"
                  @click:append-inner="() => isImageModalOpened = true"
                />
              </v-card-text>
              <v-dialog
                v-model="isImageModalOpened"
                max-width="480"
              >
                <v-card title="Отправка сообщения с картинкой">
                  <template v-slot:text>
                    <div id="imageinput" class="w-100 h-100">
                      <picture-input
                        ref="pictureInputt"
                        :customStrings="{
                          upload: '<h1>Bummer!</h1>',
                          drag: 'Перенесите сюда картинку или нажмите для выбора',
                        }"
                        :removable="true"
                        accept="image/jpeg,image/png"
                        class="w-100 h-100"
                        height="600"
                        margin="16"
                        size="10"
                        width="600"
                        @change="onChange">
                      </picture-input>
                      <br><br>
                      <v-text-field
                        v-model="messageFormWithPicture.content.value"
                        append-outer-icon="send"
                        hide-details
                        label="Напишите сообщение"
                        no-details
                        outlined
                        type="text"
                        @keyup.enter="sendMessageWithPicture(messageFormWithPicture.content.value)"
                        @click:append-outer="sendMessageWithPicture(messageFormWithPicture.content.value)"
                      />
                    </div>
                  </template>

                  <v-card-actions>
                    <v-btn
                      text="Закрыть"
                      variant="text"
                      @click="isImageModalOpened = false"
                    ></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      text="Отправить"
                      variant="text"
                      @click="() => sendMessageWithPicture(messageFormWithPicture.content.value)"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-card>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
#imageinput {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.sticky {
  position: fixed;
}
</style>
