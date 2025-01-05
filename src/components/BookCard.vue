<template>
  <div
      class="bookcard relative dark:bg-[#212124] dark:border-none bg-white border border-gray-100 rounded-lg transition-all transform hover:rotate-[3deg] hover:scale-95  duration-300 hover:shadow-xl ease-in-out p-5 cursor-pointer"
  >
    <div class="absolute -top-3 -right-3 size-16 bg-gray-100 dark:bg-[#2a2a2d] shadow-md font-semibold rounded-full grid place-items-center">
      <span>{{ book.year }}</span>
    </div>
    <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
      <img
          :src="book.image"
          alt="Зображення книги"
          class="w-full h-60 object-cover rounded-md mb-4"
      />
    </router-link>
    <h3 class="text-lg text-center font-bold mb-2 line-clamp-1">
      {{ book.title }}
    </h3>
    <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
      {{ book.author }}
    </p>
    <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
      {{ book.description }}
    </p>
    <div class="flex items-center justify-center space-x-1 mb-4">
      <i
          v-for="star in 5"
          :key="star"
          :class="star <= book.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
          class="text-xl"
      ></i>
    </div>
    <div class="flex space-x-2">
      <button
          @click.stop="$emit('delete-card', book.id)"
          class="hover:text-white dark:bg-[#2a2a2d] hover:bg-[#d20f39] dark:hover:bg-[#d20f39] bg-gray-100 shadow-md size-12 py-1 px-3 rounded-md duration-300 w-full"
      >
        <i class="ri-close-large-line"></i>
      </button>
      <router-link
          :to="{ name: 'EditCard', params: { id: book.id } }"
          @click.stop
          class="hover:text-white dark:bg-[#2a2a2d] hover:bg-[#09D45E] dark:hover:bg-[#09D45E] bg-gray-100 shadow-md size-12 py-1 px-3 rounded-md duration-300 w-full flex items-center justify-center"
      >
        <i class="ri-edit-line"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>

