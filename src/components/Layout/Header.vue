<script>
import ThemeToggle from '@/components/Layout/ThemeToggle.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  components: {
    ThemeToggle,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const profileTab = ref(false);
    const profileRef = ref(null);

    const navigateLog = () => {
      router.push('/login');
    };

    const toggleProfileOption = (event) => {
      event.stopPropagation();
      profileTab.value = !profileTab.value;
    };

    const closeProfileTab = () => {
      profileTab.value = false;
    };

    const profileRoute = () => {
      closeProfileTab();
      router.push('/profile');
    };

    const logout = () => {
      closeProfileTab();
      router.push('/');
      authStore.logout();
    };

    const handleClickOutside = (event) => {
      if (profileRef.value && !profileRef.value.contains(event.target)) {
        closeProfileTab();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      authStore,
      navigateLog,
      profileRoute,
      logout,
      toggleProfileOption,
      profileTab,
      closeProfileTab,
      profileRef,
    };
  },
};
</script>

<template>
  <header class="fixed top-0 w-full z-50">
    <div
        class="flex h-20 w-full bg-white dark:bg-[#1a1a1d] border-b border-gray-300 dark:border-[#212124] justify-between items-center px-12"
    >
      <router-link to="/" class="flex items-center space-x-4 font-lily text-xl">
        <div class="relative">
          <img src="/logo.svg" alt="logo_image" class="w-10" />
          <img
              src="/santa-hat.png"
              alt="santa-hat"
              class="absolute -top-5 -right-3 rotate-20"
          />
        </div>
        <p class="bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-transparent bg-clip-text dark:text-white">BookShelf</p>
      </router-link>
      <div class="flex h-full items-center space-x-4 md:space-x-8">
        <div>
          <ThemeToggle />
        </div>
        <div>
          <a href="https://github.com/luic1ff/Bookshelf">
            <i
                class="ri-github-fill text-2xl hover:text-[#7287fd] duration-300"
            ></i>
          </a>
        </div>
        <div>
          <button
              v-if="!authStore.isLoggedIn"
              class="btn_reg"
              @click="navigateLog"
          >
            Увійти
          </button>
          <button
              v-else
              class="py-2 px-3 bg-white border border-gray-100 dark:border-none dark:bg-[#212124] hover:-translate-y-0.5 hover:bg-gray-100 duration-300 active:opacity-50 rounded-md"
              @click.stop="toggleProfileOption"
          >
            <i class="ri-menu-line text-xl"></i>
          </button>
        </div>

        <transition name="fade-scale">
          <div
              v-if="profileTab"
              ref="profileRef"
              class="absolute top-20 right-10 p-4 bg-gray-100 dark:bg-[#212124] rounded-md shadow-lg z-50 transition-transform transform scale-95 opacity-0 duration-300"
              :class="{'scale-100 opacity-100': profileTab, 'scale-95 opacity-0': !profileTab}"
          >
            <div class="flex flex-col space-y-3">
              <button
                  @click="profileRoute"
                  class="px-3 py-2 bg-gray-200 dark:bg-[#2a2a2d] rounded-md hover:scale-105 transition-transform duration-300"
              >
                <i class="ri-user-line text-xl pr-1"></i>
                <span>Сторінка профілю</span>
              </button>
              <button
                  @click="logout"
                  class="px-3 py-2 bg-gray-200 dark:bg-[#2a2a2d] rounded-md hover:scale-105 transition-transform duration-300"
              >
                <i class="ri-logout-circle-r-line text-xl pr-1"></i>
                <span>Вийти</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.1s ease-in-out;
}
.fade-scale-enter-from {
  transform: scale(0.95);
  opacity: 0;
}
.fade-scale-enter-to {
  transform: scale(1);
  opacity: 1;
}
.fade-scale-leave-from {
  transform: scale(1);
  opacity: 1;
}
.fade-scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>