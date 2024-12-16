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
    <a href="/" class="flex items-center space-x-4 font-lily text-xl"><div class="relative">
        <img
            src="/logo.svg"
            alt="logo_image"
            class="w-10">
        <img
            src="/santa-hat.png"
            alt="santa-hat"
            class="absolute -top-5 -right-3 rotate-20"/>
      </div>
        <p>BookShelf</p>
    </a>
    <div class="flex h-full items-center space-x-4 md:space-x-8">
      <div>
        <ThemeToggle/>
      </div>
      <div>
        <a href="https://github.com/luic1ff/Bookshelf">
          <i class="ri-github-fill text-2xl hover:text-[#7287fd] duration-300"></i>
        </a>
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

