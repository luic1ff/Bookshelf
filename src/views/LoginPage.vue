<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 dark:bg-[#1A1A1A]">
    <div class="max-w-md w-full bg-white dark:bg-[#2C2C2C] p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Вход</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              class="mt-1 block w-full p-2 border rounded-lg dark:bg-[#212124] dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Пароль</label>
          <input
              type="password"
              id="password"
              v-model="password"
              required
              class="mt-1 block w-full p-2 border rounded-lg dark:bg-[#212124] dark:text-white"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-white py-2 rounded-lg hover:opacity-80 transition"
        >
          Войти
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Нет аккаунта?
        <router-link to="/register" class="text-blue-500 hover:underline">Зарегистрироваться</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import {ref} from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const login = async () => {
      await authStore.login(email.value, password.value);
      if (authStore.isLoggedIn) {
        router.push("/");
      }
    };

    return {email, password, login};
  },
};
</script>
