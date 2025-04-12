<template>
  <div
    class="group relative dark:bg-[#212124] bg-white rounded-xl transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-pointer hover:-translate-y-2 border border-gray-100 dark:border-[#2a2a2d]"
  >
    <!-- Year Badge -->
    <div
      class="absolute top-3 right-3 bg-gradient-to-br from-[#09D45E] to-[#09a84d] text-white shadow-lg font-bold w-14 h-14 flex items-center justify-center rounded-xl z-10"
    >
      <span class="drop-shadow-md">{{ book.year }}</span>
    </div>

    <!-- Book Image -->
    <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
      <div class="relative overflow-hidden aspect-[2/3]">
        <img
          :src="book.image"
          alt="Обложка книги"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </router-link>

    <!-- Content -->
    <div class="p-4 space-y-3">
      <!-- Title & Author -->
      <div class="space-y-1">
        <h3
          class="font-bold text-lg line-clamp-1 dark:text-gray-100 text-gray-900 transition-colors group-hover:text-[#09D45E]"
        >
          {{ book.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
          {{ book.author }}
        </p>
      </div>

      <!-- Description -->
      <p
        class="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed"
      >
        {{ book.description }}
      </p>

      <!-- Rating -->
      <div class="flex items-center justify-center space-x-1">
        <i
          v-for="star in 5"
          :key="star"
          :class="[
            star <= book.rating
              ? 'ri-star-fill text-yellow-400'
              : 'ri-star-line text-gray-300 dark:text-gray-600',
          ]"
          class="text-xl"
        ></i>
      </div>

      <!-- Actions -->
      <div v-if="isOwner" class="flex gap-2 pt-2">
        <button
          @click.stop="$emit('delete-card', book.id)"
          class="flex-1 flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-[#2a2a2d] hover:bg-[#d20f39] hover:text-white transition-all duration-300 group/button"
        >
          <i
            class="ri-close-line text-xl group-hover/button:rotate-90 transition-transform"
          ></i>
        </button>
        <router-link
          :to="{ name: 'EditCard', params: { id: book.id } }"
          @click.stop
          class="flex-1 flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-[#2a2a2d] hover:bg-[#09D45E] hover:text-white transition-all duration-300"
        >
          <i class="ri-edit-line text-xl"></i>
        </router-link>
      </div>

      <!-- Read Status -->
      <div
        class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[#2a2a2d]"
      >
        <span
          class="p-2 rounded-md transition-colors"
          :class="
            isRead
              ? 'text-green-500 bg-green-100 dark:bg-green-900/30'
              : 'text-gray-500 bg-gray-100 dark:bg-[#2a2a2d]'
          "
        >
          <i
            :class="isRead ? 'ri-book-marked-line' : 'ri-book-line'"
            class="text-2xl"
          ></i>
        </span>
        <button
          @click.stop="toggleReadStatus"
          class="px-4 py-2 rounded-lg font-medium transition-all duration-300"
          :class="
            isRead
              ? 'bg-[#d20f39]/10 text-[#d20f39] hover:bg-[#d20f39] hover:text-white'
              : 'bg-[#09D45E]/10 text-[#09D45E] hover:bg-[#09D45E] hover:text-white'
          "
        >
          {{ isRead ? "Скасувати" : "Прочитати" }}
        </button>
      </div>
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

    const isOwner = computed(() => props.book.userEmail === userEmail.value);

    const toggleReadStatus = () => {
      emit("toggle-read-status", props.book);
    };

    return {
      isRead,
      isOwner,
      toggleReadStatus,
    };
  },
});
</script>
