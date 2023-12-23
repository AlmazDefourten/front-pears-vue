<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet class="mx-auto" width="400">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field v-model="username" label="Почта" variant="underlined"></v-text-field>

        <v-text-field v-model="password" label="Пароль" variant="underlined"></v-text-field>

        <v-btn block class="mt-2" color="primary" type="submit" variant="outlined">Зарегистрироваться</v-btn>

      </v-form>
      <div class="mt-2">
        <p class="text-body-2">Есть аккаунт? <a href="/login">Авторизуйтесь</a></p>
      </div>
    </v-sheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Your login logic here
    },
  },
}
</script>
