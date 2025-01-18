<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Верхняя панель -->
    <div class="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6 mb-8">
      <!-- Фильтры -->
      <div class="relative">
        <button @click="toggleFilters" class="btn_reg">Фильтры</button>

        <!-- Список фильтров -->
        <div v-if="showFilters" class="absolute pt-2">
          <div class="relative flex flex-col rounded-md bg-white dark:bg-[#212124] shadow">
            <nav class="flex min-w-[240px] flex-col gap-1 p-2">
              <div v-for="(label, key) in filterLabels" :key="key" class="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-[#2a2a2d]">
                <input
                    type="checkbox"
                    :id="key"
                    v-model="filters[key]"
                    class="size-4 rounded-lg "
                />

                <label :for="key" class="cursor-pointer select-none size-full text-slate-600 dark:text-white text-sm">{{ label }}</label>
              </div>
            </nav>
          </div>
        </div>
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
import BookCard from '@/components/BookCard.vue';
import { useCardsStore } from '@/stores/cardsStore';
import { onMounted, computed, ref } from 'vue';

export default {
  setup() {
    const cardsStore = useCardsStore();
    const { fetchCards, deleteCard, toggleReadStatus } = cardsStore;
    const cards = computed(() => cardsStore.cards);
    const isLoading = computed(() => cardsStore.isLoading);
    const searchQuery = ref('');
    const showFilters = ref(false);
    const filters = ref({
      oldBooks: false,
      newBooks: false,
      popularBooks: false,
    });
    const filterLabels = {
      oldBooks: 'Старые книги',
      newBooks: 'Новые книги',
      popularBooks: '5 звезд',
    };

    onMounted(() => {
      fetchCards();
    });

    const handleToggleReadStatus = (book) => {
      toggleReadStatus(book);
    };

    const toggleFilters = () => {
      showFilters.value = !showFilters.value;
    };

    const filteredTasks = computed(() => {
      const query = searchQuery.value.toLowerCase();
      const { oldBooks, newBooks, popularBooks } = filters.value;

      return cards.value.filter((task) => {
        const matchesSearch = ['title', 'author', 'year'].some((key) =>
            task[key]?.toString().toLowerCase().includes(query)
        );
        const isOldBook = oldBooks ? parseInt(task.year) < 2000 : true;
        const isNewBook = newBooks ? parseInt(task.year) >= 2000 : true;
        const isPopularBook = popularBooks ? task.rating === 5 : true;
        return matchesSearch && isOldBook && isNewBook && isPopularBook;
      });
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
