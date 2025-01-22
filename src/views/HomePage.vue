<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6 mb-8">
      <!-- Фильтры -->
      <Filter
          :showFilters="showFilters"
          :filters="filters"
          :filterLabels="filterLabels"
          @toggle-filters="toggleFilters"
          @update:filters="(newFilters) => (filters = newFilters)"
      />

      <!-- Поиск и добавление книг -->
      <div class="flex space-x-6 items-center">
        <Search
            :searchQuery="searchQuery"
            @update:searchQuery="(newQuery) => (searchQuery = newQuery)"
        />
        <button class="btn_reg" @click="$router.push('/create')">Додати книгу</button>
      </div>
    </div>

    <!-- Заголовок -->
    <div class="text-5xl font-bold bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-transparent bg-clip-text mb-20">
      <h1>Перелік книг</h1>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="text-center">
      <p>Завантаження...</p>
    </div>

    <!-- Отображение книг -->
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

    <!-- Нет данных -->
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
import Filter from "@/components/Layout/Filter.vue";
import Search from "@/components/Layout/Search.vue";
import { useCardsStore } from "@/stores/cardsStore";
import { onMounted, computed, ref } from "vue";

export default {
  setup() {
    const cardsStore = useCardsStore();

    // Состояние из хранилища
    const { fetchCards, deleteCard, toggleReadStatus } = cardsStore;
    const cards = computed(() => cardsStore.cards);
    const isLoading = computed(() => cardsStore.isLoading);

    // Локальное состояние
    const searchQuery = ref("");
    const filters = ref({
      oldBooks: false,
      newBooks: false,
      popularBooks: false,
      goodBooks: false,
      threeStarBooks: false,
      twoStarBooks: false,
      oneStarBooks: false,
    });
    const filterLabels = {
      oldBooks: "Старі книги",
      newBooks: "Нові книги",
      popularBooks: "5 зірок",
      goodBooks: "4 зірки",
      threeStarBooks: "3 зірки",
      twoStarBooks: "2 зірки",
      oneStarBooks: "1 зірки",
    };

    // Управление фильтрами
    const showFilters = ref(false);
    const toggleFilters = () => {
      showFilters.value = !showFilters.value;
    };

    // Фильтрация книг
    const filteredTasks = computed(() => {
      const query = searchQuery.value.toLowerCase();
      const {
        oldBooks,
        newBooks,
        popularBooks,
        goodBooks,
        threeStarBooks,
        twoStarBooks,
        oneStarBooks,
      } = filters.value;

      return cards.value.filter((task) => {
        // Поиск
        const matchesSearch = ["title", "author", "year"].some((key) =>
            task[key]?.toString().toLowerCase().includes(query)
        );

        // Год выпуска
        const isOldBook = oldBooks && parseInt(task.year) < 2000;
        const isNewBook = newBooks && parseInt(task.year) >= 2000;
        const matchesYear =
            !oldBooks && !newBooks ? true : isOldBook || isNewBook;

        // Рейтинг
        const matchesRating =
            (popularBooks && task.rating === 5) ||
            (goodBooks && task.rating === 4) ||
            (threeStarBooks && task.rating === 3) ||
            (twoStarBooks && task.rating === 2) ||
            (oneStarBooks && task.rating === 1) ||
            (!popularBooks &&
                !goodBooks &&
                !threeStarBooks &&
                !twoStarBooks &&
                !oneStarBooks);

        return matchesSearch && matchesYear && matchesRating;
      });
    });

    // Обработчики событий
    const handleToggleReadStatus = (book) => {
      toggleReadStatus(book);
    };

    // Загрузка данных при монтировании
    onMounted(() => {
      fetchCards();
    });

    return {
      cards,
      isLoading,
      searchQuery,
      filters,
      filterLabels,
      deleteCard,
      handleToggleReadStatus,
      filteredTasks,
      showFilters,
      toggleFilters,
    };
  },
  components: {
    BookCard,
    Filter,
    Search,
  },
};
</script>
