<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet class="mx-auto grey-col" width="400">
      <v-form fast-fail @submit.prevent="register">
        <v-text-field v-model="username" label="Почта" variant="underlined"></v-text-field>

        <v-text-field v-model="password" label="Пароль" variant="underlined"></v-text-field>

        <v-btn block class="mt-2" color="" type="submit" variant="outlined">Зарегистрироваться</v-btn>

      </v-form>
      <div class="mt-2">
        <p class="text-body-2">Есть аккаунт? <a href="/login">Авторизуйтесь</a></p>
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

const register = () => {
  axios.post(DefaultApi + "Users/register", {email: username.value, password: password.value})
    .then(response => {
      console.log(response.data);
    }, error => {
      console.log(error);
    });
};

</script>
<style scoped>
.grey-col {
  padding: 20px;
}
</style>
