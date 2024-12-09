<template>
  <div>
    <!--    Loader    -->


    <!--    Header    -->

    <Header/>

    <!--    Books    -->

    <RouterView/>

    <Footer/>
  </div>
</template>

<script>

import Header from '@/components/Layout/Header.vue'
import Cards from "@/views/HomePage.vue";
import Footer from "@/components/Layout/Footer.vue";
import { useUserStore } from '@/stores/userStore';
import { useLoadingStore } from './stores/loadingStore';
import Loader from '@/components/Loader.vue';
export default {
  setup() {
    const userStore = useUserStore();
    userStore.checkAuth();
    const loadingStore = useLoadingStore();

    return {
      isLoading: loadingStore.isLoading
    };
  },
  components: {
    Header, Cards , Footer, Loader,
  }
}
</script>

<style lang="scss" scoped>

</style>