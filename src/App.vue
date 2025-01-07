<template>
  <div>
    <!-- ErrorMessage -->
    <ErrorModal v-if="errorMessage" :error="errorMessage" @close="clearError" />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <router-view v-slot="{ Component }">
      <transition
          mode="out-in"
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0 translate-x-full"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-500"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-full"
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Footer -->
    <Footer v-if="showFooter" />

    <!-- Scroll-Up -->
    <ScrollUp />
  </div>
</template>

<script>
import ErrorModal from '@/components/Layout/ErrorModal.vue'
import Footer from '@/components/Layout/Footer.vue'
import Header from '@/components/Layout/Header.vue'
import ScrollUp from '@/components/Layout/ScrollUp.vue'
import { useErrorStore } from '@/stores/errorStore'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const errorStore = useErrorStore()
    const showFooter = ref(true)

    // Обновляем видимость футера на основе текущего маршрута
    const updateFooterVisibility = () => {
      const currentPath = router.currentRoute.value.path
      showFooter.value = !(
          currentPath.startsWith('/edit/') ||
          currentPath === '/create' ||
          currentPath === '/login' ||
          currentPath === '/register'
      )
    }

    // Следим за изменением маршрута и обновляем видимость футера
    watch(() => router.currentRoute.value.path, updateFooterVisibility, {
      immediate: true,
    })

    const clearError = () => {
      errorStore.clearError()
    }

    return {
      showFooter,
      clearError,
      errorMessage: errorStore.errorMessage,
    }
  },
  components: {
    Header,
    Footer,
    ScrollUp,
    ErrorModal,
  },
}
</script>
