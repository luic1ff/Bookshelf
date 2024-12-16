<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div v-if="isLoading" class="text-center">
      <p class="text-gray-700 dark:text-gray-300">Загрузка...</p>
    </div>

    <div v-else-if="book" class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row">
        <!-- Left: Image -->
        <div class="md:w-1/2 p-4">
          <img
              :src="book.image"
              alt="Обложка книги"
              class="w-full h-auto object-cover rounded-md"
          />
        </div>

        <!-- Right: Book Information -->
        <div class="md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h1 class="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{{ book.title }}</h1>
            <p class="text-gray-600 dark:text-gray-300 mb-2"><span class="font-medium">Автор:</span> {{ book.author }}</p>
            <p class="text-gray-600 dark:text-gray-300 mb-2"><span class="font-medium">Год издания:</span> {{ book.year }}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">{{ book.description }}</p>
            <div class="flex items-center space-x-1">
              <i
                  v-for="star in 5"
                  :key="star"
                  :class="star <= book.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
                  class="text-xl"
              ></i>
            </div>
          </div>
          <div class="mt-4">
            <button
                @click="goBack"
                class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-700 dark:text-gray-300">Книга не найдена.</p>
    </div>
  </div>
</template>

<script>
import { useCardsStore } from "@/stores/cardsStore";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const cardsStore = useCardsStore();
    const isLoading = computed(() => cardsStore.isLoading);
    const book = ref(null);

    onMounted(async () => {
      book.value = await cardsStore.fetchCardById(route.params.id);
    });

    const goBack = () => {
      router.push("/");
    };

    return {
      book,
      isLoading,
      goBack,
    };
  },
};
</script>

