<script>
import ThemeToggle from "@/components/Layout/ThemeToggle.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

export default {
  components: {
    ThemeToggle,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    function navigateLog() {
      router.push("/login");
    }

    return { authStore, navigateLog };
  },
};
</script>

<template>
  <header class="flex h-20 w-full bg-white dark:bg-[#1a1a1d] border-b border-gray-100 dark:border-[#212124] justify-between items-center px-12">
    <div class="flex items-center space-x-4">
      <img
          src="/logo.svg"
          alt="logo_image"
          class="w-10">
      <a href="/" class="font-lily text-xl">Bookshelf</a>
    </div>
    <div class="flex h-full items-center space-x-8">
      <div>
        <ThemeToggle/>
      </div>
      <div>
        <button
            v-if="!authStore.isLoggedIn"
            class="btn_reg"
            @click="navigateLog">Sign in</button>
        <button
            v-else
            class="btn_out"
            @click="authStore.logout">LogOut</button>
      </div>
    </div>
  </header>
</template>

