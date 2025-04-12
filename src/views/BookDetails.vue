<template>
  <div class="p-6 max-w-6xl mx-auto min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-pulse flex flex-col items-center space-y-4">
        <div class="h-12 w-12 bg-[#09D45E] rounded-full animate-bounce"></div>
        <p class="text-gray-700 dark:text-gray-300 font-medium">
          Завантаження...
        </p>
      </div>
    </div>

    <!-- Content -->
    <transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div
        v-if="book"
        class="dark:bg-[#212124] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-[#2a2a2d]"
      >
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Image Section -->
          <div class="lg:w-1/2 relative overflow-hidden group">
            <div class="aspect-[2/3] bg-gray-100 dark:bg-[#2a2a2d]">
              <img
                :src="book.image"
                alt="Обкладинка книги"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div
              class="absolute bottom-4 left-4 bg-[#09D45E] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              Рейтинг: {{ book.rating }}/5
            </div>
          </div>

          <!-- Info Section -->
          <div class="lg:w-1/2 p-8 flex flex-col justify-between space-y-6">
            <div class="space-y-6">
              <div>
                <h1
                  class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight"
                >
                  {{ book.title }}
                </h1>
                <div class="flex items-center space-x-3 text-lg">
                  <span
                    class="bg-[#09D45E]/10 text-[#09D45E] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ book.year }}
                  </span>
                  <span class="text-gray-600 dark:text-gray-300">|</span>
                  <p class="text-gray-600 dark:text-gray-300 font-medium">
                    {{ book.author }}
                  </p>
                </div>
              </div>

              <p
                class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
              >
                {{ book.description }}
              </p>

              <div class="flex items-center space-x-2">
                <i
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    star <= book.rating
                      ? 'ri-star-fill text-yellow-400'
                      : 'ri-star-line text-gray-300 dark:text-gray-600',
                    'text-2xl transition-transform hover:scale-125',
                  ]"
                ></i>
              </div>
            </div>

            <!-- Back Button -->
            <button
              @click="goBack"
              class="group flex items-center justify-center space-x-2 rounded-xl shadow-md w-full py-4 bg-[#f3f4f6] dark:bg-[#2a2a2d] hover:bg-[#09D45E] dark:hover:bg-[#09D45E] hover:text-white transition-all duration-300"
            >
              <i class="ri-arrow-left-line text-2xl transition-transform"></i>
              <span
                class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors"
              >
                На головну
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Not Found State -->
    <transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div v-if="!book && !isLoading" class="text-center py-12">
        <div class="max-w-md mx-auto space-y-6">
          <div class="text-6xl text-[#d20f39]">
            <i class="ri-error-warning-line"></i>
          </div>
          <p class="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Книга не знайдена
          </p>
          <p class="text-gray-600 dark:text-gray-400">
            Перевірте правильність посилання або поверніться на головну
          </p>
          <button
            @click="goBack"
            class="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#09D45E] text-white font-semibold hover:bg-[#09a84d] transition-colors"
          >
            На головну
          </button>
        </div>
      </div>
    </transition>
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
img {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .hover\:text-white:hover {
  color: white;
}
</style>
