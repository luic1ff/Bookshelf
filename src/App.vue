<template>
  <div>
    <!--    Header    -->
    <Header/>

    <!--    Books    -->
    <transition
        enter-active-class="transition-opacity duration-1000"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-1000"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
    >
      <router-view />
    </transition>

    <!--    Footer    -->
    <Footer v-if="showFooter"/>

    <!--    Scroll-Up    -->
    <ScrollUp/>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Header from '@/components/Layout/Header.vue';
import Footer from '@/components/Layout/Footer.vue';
import ScrollUp from '@/components/Layout/ScrollUp.vue';

export default {
  setup() {
    const router = useRouter();
    const showFooter = ref(true);

    // Обновляем видимость футера
    const updateFooterVisibility = () => {
      const currentPath = router.currentRoute.value.path;
      // Скрываем футер для маршрутов, которые начинаются с /edit/ или равны /create-card
      showFooter.value = !(currentPath.startsWith("/edit/") || currentPath === "/create" || currentPath === "/login" || currentPath === "/register");
    };

    // Следим за изменением маршрута
    watch(() => router.currentRoute.value.path, updateFooterVisibility, {immediate: true});

    return {showFooter};
  },
  components: {
    Header, Footer, ScrollUp,
  }
};
</script>

<style lang="scss" scoped>

</style>
