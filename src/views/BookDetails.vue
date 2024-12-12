<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="isLoading" class="text-center">
      <p>Загрузка...</p>
    </div>

    <div v-else-if="book" class="bg-white dark:bg-[#212124] rounded-lg p-6 shadow-lg">
      <img
          :src="book.image"
          alt="Обложка книги"
          class="w-full h-96 object-cover rounded-md mb-4"
      />
      <h1 class="text-3xl font-bold mb-4">{{ book.title }}</h1>
      <p class="text-gray-700 dark:text-gray-300 mb-4">{{ book.description }}</p>
      <div class="flex items-center space-x-1 mb-4">
        <i
            v-for="star in 5"
            :key="star"
            :class="star <= book.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
            class="text-xl"
        ></i>
      </div>
      <button
          @click="goBack"
          class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Назад
      </button>
    </div>

    <div v-else class="text-center">
      <p>Книга не найдена.</p>
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
