<template>
  <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
        class="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
};
</script>
