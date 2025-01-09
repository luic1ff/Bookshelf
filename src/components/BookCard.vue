<template>
  <div
      class="relative dark:bg-[#212124] dark:border-none bg-white border border-gray-200 rounded-lg transition-all transform hover:scale-[105%] duration-300 hover:shadow-xl ease-in-out p-5 cursor-pointer"
  >
    <!-- Year Badge -->
    <div class="absolute -top-3 -right-3 size-16 bg-gray-100 dark:bg-[#2a2a2d] shadow-md font-semibold rounded-full grid place-items-center">
      <span>{{ book.year }}</span>
    </div>

    <!-- Book Image -->
    <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
      <img
          :src="book.image"
          alt="Зображення книги"
          class="w-full h-60 object-cover rounded-md mb-4"
      />
    </router-link>

    <!-- Book Title -->
    <h3 class="text-lg text-center font-bold mb-2 line-clamp-1">
      {{ book.title }}
    </h3>

    <!-- Book Author -->
    <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
      {{ book.author }}
    </p>

    <!-- Book Description -->
    <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
      {{ book.description }}
    </p>

    <!-- Book Rating -->
    <div class="flex items-center justify-center space-x-1 mb-4">
      <i
          v-for="star in 5"
          :key="star"
          :class="star <= book.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
          class="text-xl"
      ></i>
    </div>

    <!-- Actions -->
    <div class="flex space-x-2 mb-4">
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

    <!-- Mark as Read -->
    <div class="flex items-center justify-between">
      <span
          :class="isRead ? 'text-green-500 font-bold' : 'text-gray-500'"
      >
        {{ isRead ? 'Прочитано' : 'Не прочитано' }}
      </span>
      <button
          @click.stop="toggleReadStatus"
          class="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-300"
      >
        {{ isRead ? 'Скасувати' : 'Прочитати' }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";

export default defineComponent({
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const authStore = useAuthStore();

    // Получение email текущего пользователя
    const userEmail = computed(() => authStore.user?.email || "");

    // Проверка, прочитана ли книга
    const isRead = computed(() =>
        props.book.isReadBy && Array.isArray(props.book.isReadBy)
            ? props.book.isReadBy.includes(userEmail.value)
            : false
    );

    // Переключение статуса прочитанности
    const toggleReadStatus = () => {
      emit("toggle-read-status", props.book);
    };

    return {
      isRead,
      toggleReadStatus,
    };
  },
});
</script>
