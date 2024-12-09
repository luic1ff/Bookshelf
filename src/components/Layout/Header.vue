<script>
import ThemeToggle from "@/components/Layout/ThemeToggle.vue";

export default {
  components: {
    ThemeToggle,
  }
}
</script>

<template>
  <header class="flex h-20 w-full bg-[#eff1f5] dark:bg-[#1e2030] shadow-lg justify-between items-center px-12 ">
    <div>
      <a href="/" class="font-lily text-xl">Bookshelf</a>
    </div>
    <div class="flex h-full items-center space-x-8">
      <div>
        <ThemeToggle/>
      </div>
      <div>
        <button class="btn_reg">
          <router-link to="/login">Login</router-link>
        </button>
      </div>
    </div>
  </header>
</template>

<style>

</style>