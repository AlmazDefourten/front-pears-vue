<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet class="mx-auto" width="400">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field v-model="username" label="Почта" variant="underlined"></v-text-field>

        <v-text-field v-model="password" label="Пароль" variant="underlined"></v-text-field>
        <a class="text-body-2 font-weight-regular" href="#">Забыли пароль?</a>

        <v-btn block class="mt-2" color="primary" type="submit" variant="outlined">Авторизоваться</v-btn>

      </v-form>
      <div class="mt-2">
        <p class="text-body-2">Нет аккаунта? <a href="/registration">Зарегистрируйтесь</a></p>
      </div>
    </v-sheet>
  </div>
</template>
<script setup>

import axios from "axios";
import {ref} from "vue";
import {DefaultApi} from "@/env";

const username = ref("");
const password = ref("");

const login = () => {
  axios.post(DefaultApi + "Users/login", {email: username.value, password: password.value})
    .then(response => {
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
    }, error => {
      console.log(error);
    });
}
</script>
