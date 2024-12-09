<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4">Вход</h2>
    <form @submit.prevent="login">
      <input
          v-model="credentials.email"
          type="email"
          placeholder="Email"
          required
          class="w-full p-2 border rounded mb-4"
      />
      <input
          v-model="credentials.password"
          type="password"
          placeholder="Пароль"
          required
          class="w-full p-2 border rounded mb-4"
      />
      <button class="w-full p-2 bg-blue-500 text-white rounded">Войти</button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    async login() {
      await this.userStore.login(this.credentials);
      this.$router.push('/');
    },
  },
};
</script>
