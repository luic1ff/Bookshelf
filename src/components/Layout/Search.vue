<template>
  <div class="relative">
    <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        class="w-56 dark:bg-[#212124] border border-gray-300 dark:border-none dark:text-white focus:ring-2 focus:ring-blue-700 outline-none rounded-md py-2 pl-10 pr-4"
        placeholder="Search..."
    />
    <i class="ri-search-line absolute left-3 top-2"></i>
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
};
</script>
