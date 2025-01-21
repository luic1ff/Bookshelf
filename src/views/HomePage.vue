<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Верхняя панель -->
    <div class="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6 mb-8">
      <!-- Фильтры -->
      <div class="relative">
        <!-- Кнопка фильтров -->
        <button
            @click="toggleFilters"
            class="btn_reg bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          Фильтры
        </button>

        <!-- Список фильтров -->
        <transition name="fade-scale">
          <div
              v-if="showFilters"
              class="absolute top-full left-0 z-10 mt-2 w-64 rounded-lg bg-white dark:bg-[#212124] shadow-lg border dark:border-[#2a2a2d] transition-opacity duration-300"
          >
            <!-- Заголовок -->
            <div class="p-3 border-b dark:border-[#2a2a2d] bg-gray-100 dark:bg-[#1a1a1d] text-sm font-semibold text-gray-800 dark:text-white">
              Выберите фильтры
            </div>

            <!-- Навигация с фильтрами -->
            <nav class="flex flex-col p-3 gap-2">
              <div
                  v-for="(label, key) in filterLabels"
                  :key="key"
                  class="flex items-center gap-3 rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-[#2a2a2d] transition"
              >
                <div class="relative">
                  <input
                      type="checkbox"
                      :id="key"
                      v-model="filters[key]"
                      class="peer hidden"
                  />
                  <label
                      :for="key"
                      class="flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1d] peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:ring-2 peer-checked:ring-blue-400 transition"
                  >
                    <svg
                        v-if="filters[key]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="white"
                        class="h-4 w-4"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </label>
                </div>

                <label
                    :for="key"
                    class="cursor-pointer select-none text-gray-700 dark:text-gray-300 text-sm"
                >
                  {{ label }}
                </label>
              </div>
            </nav>
          </div>
        </transition>
      </div>

      <!-- Поиск и кнопка -->
      <div class="flex space-x-6 items-center">
        <div class="relative">
          <input
              v-model="searchQuery"
              type="text"
              class="w-56 dark:bg-[#212124] border border-gray-300 dark:border-none dark:text-white focus:ring-2 focus:ring-blue-700 outline-none rounded-md py-2 pl-10 pr-4"
              placeholder="Search..."
          />
          <i class="ri-search-line absolute left-3 top-2"></i>
        </div>
        <button class="btn_reg" @click="$router.push('/create')">Додати книгу</button>
      </div>
    </div>

    <!-- Заголовок -->
    <div class="text-5xl font-bold bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-transparent bg-clip-text mb-20">
      <h1>Перелік книг</h1>
    </div>

    <!-- Список книг или состояние загрузки -->
    <div v-if="isLoading" class="text-center">
      <p>Завантаження...</p>
    </div>
    <div
        v-auto-animate="{ duration: 300 }"
        v-else-if="filteredTasks.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <BookCard
          v-for="card in filteredTasks"
          :key="card.id"
          :book="card"
          @delete-card="deleteCard"
          @toggle-read-status="handleToggleReadStatus"
      />
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <h1 class="font-semibold text-2xl mt-24 h-full w-full text-center">Немає книг для відображення</h1>
      <i class="ri-emotion-sad-line text-8xl mt-4 text-green-400"></i>
      <p class="text-gray-400 mt-4">Якщо книги не знайдено, додайте її до каталогу.</p>
      <button class="btn_reg mt-6 mb-40" @click="$router.push('/create')">Додати книгу</button>
    </div>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import { useCardsStore } from "@/stores/cardsStore";
import { onMounted, onBeforeUnmount, computed, ref } from "vue";

export default {
  setup() {
    const cardsStore = useCardsStore();
    const {fetchCards, deleteCard, toggleReadStatus} = cardsStore;
    const cards = computed(() => cardsStore.cards);
    const isLoading = computed(() => cardsStore.isLoading);
    const searchQuery = ref("");
    const showFilters = ref(false);
    const filters = ref({
      oldBooks: false,
      newBooks: false,
      popularBooks: false,
      goodBooks: false,
      threeStarBooks: false
    });
    const filterLabels = {
      oldBooks: "Старые книги",
      newBooks: "Новые книги",
      popularBooks: "5 звезд",
      goodBooks: "4 звезды",
      threeStarBooks: "3 звезды"
    };

    const handleToggleReadStatus = (book) => {
      toggleReadStatus(book);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        showFilters.value = false;
      }
    };

    const toggleFilters = () => {
      showFilters.value = !showFilters.value;
    };

    const filteredTasks = computed(() => {
      const query = searchQuery.value.toLowerCase();
      const {oldBooks, newBooks, popularBooks, goodBooks, threeStarBooks} = filters.value;

      return cards.value.filter((task) => {
        const matchesSearch = ["title", "author", "year"].some((key) =>
            task[key]?.toString().toLowerCase().includes(query)
        );
        const isOldBook = oldBooks ? parseInt(task.year) < 2000 : true;
        const isNewBook = newBooks ? parseInt(task.year) >= 2000 : true;
        const isPopularBook = popularBooks ? task.rating === 5 : true;
        const isGoodBook = goodBooks ? task.rating === 4 : true;
        const isThreeStarBook = threeStarBooks ? task.rating === 3 : true;
        return matchesSearch && isOldBook && isNewBook && isPopularBook && isGoodBook && isThreeStarBook;
      });
    });

    onMounted(() => {
      fetchCards();
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      cards,
      isLoading,
      searchQuery,
      showFilters,
      filters,
      filterLabels,
      deleteCard,
      handleToggleReadStatus,
      toggleFilters,
      filteredTasks,
    };
  },
  components: {
    BookCard,
  },
};
</script>
