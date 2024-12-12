<template>
  <div>
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
export default {
  components: {
    Header, Cards , Footer,
  }
}
</script>

<style lang="scss" scoped>

</style>