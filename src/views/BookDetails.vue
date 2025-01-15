<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div v-if="isLoading" class="text-center">
      <p class="text-gray-700 dark:text-gray-300">Завантаження...</p>
    </div>

    <div v-else-if="book" class="dark:bg-[#212124] dark:border-none bg-white border border-gray-300 rounded-lg shadow-md">
      <div class="flex flex-col lg:flex-row">
        <!-- Зображення книги -->
        <div class="lg:w-1/2 p-4">
          <img
              :src="book.image"
              alt="Обкладинка книги"
              class="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        <!-- Інформація про книгу -->
        <div class="lg:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{{ book.title }}</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-3">
              <span class="font-semibold">Автор:</span> {{ book.author }}
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-3">
              <span class="font-semibold">Рік видання:</span> {{ book.year }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{{ book.description }}</p>
            <div class="flex items-center space-x-1">
              <i
                  v-for="star in 5"
                  :key="star"
                  :class="star <= book.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
                  class="text-2xl"
              ></i>
            </div>
          </div>
          <div class="mt-6">
            <button
                @click="goBack"
                class="flex items-center justify-center rounded-md shadow-md w-full py-2 bg-[#f3f4f6] dark:bg-[#2a2a2d] hover:bg-opacity-80  duration-300">
              <i class="ri-arrow-left-line text-2xl"></i>
              <span class="pr-4 font-semibold">На головну</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-700 dark:text-gray-300">Книга не знайдена.</p>
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

<style scoped>
@media (min-width: 1024px) {
  .lg\:w-1\/2 {
    flex: 1;
  }
}

img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.02);
}
</style>