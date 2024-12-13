<template>
  <div>
    <!--    Header    -->

    <Header/>

    <!--    Books    -->

    <RouterView/>
    <!--    Footer    -->

    <Footer/>

    <!--    Scroll-Up    -->

    <ScrollUp/>

  </div>
</template>

<script>
import Header from '@/components/Layout/Header.vue'
import Cards from "@/views/HomePage.vue";
import Footer from "@/components/Layout/Footer.vue";
import ScrollUp from "@/components/Layout/ScrollUp.vue";
export default {
  components: {
    Header, Cards , Footer, ScrollUp,
  }
}
</script>

<style lang="scss" scoped>

</style>