<template>
  <button
      class="fixed z-50 right-4 size-16 bg-gray-200 dark:bg-[#2a2a2d] rounded-md transition-all duration-300 hover:-translate-y-2 ease-in-out -bottom-1/2"
      @click="scrollToTop"
      :class="{ 'bottom-4': showScrollUp, '-bottom-1/2': !showScrollUp }"
  >
    <i class="ri-arrow-up-s-line text-3xl"></i>
  </button>
</template>

<script>
export default {
  data() {
    return {
      showScrollUp: false, // Показывать ли кнопку
    };
  },
  methods: {
    handleScroll() {
      this.showScrollUp = window.scrollY >= 150;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>