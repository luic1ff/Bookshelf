<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4">Регистрация</h2>
    <form @submit.prevent="register">
      <input
          v-model="userData.email"
          type="email"
          placeholder="Email"
          required
          class="w-full p-2 border rounded mb-4"
      />
      <input
          v-model="userData.password"
          type="password"
          placeholder="Пароль"
          required
          class="w-full p-2 border rounded mb-4"
      />
      <button class="w-full p-2 bg-blue-500 text-white rounded">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      userData: {
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
    async register() {
      await this.userStore.register(this.userData);
      this.$router.push('/');
    },
  },
};
</script>
