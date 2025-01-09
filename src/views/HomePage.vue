<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-center md:justify-end space-x-6 mb-8 text-right">
      <div class="relative">
        <input
            v-model="searchQuery"
            type="text"
            class="w-56 dark:bg-[#212124] border border-gray-300 dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            placeholder="Search..."
        />
        <i class="ri-search-line absolute left-3 top-2"></i>
      </div>
      <button class="btn_reg" @click="$router.push('/create')">
        Додати книгу
      </button>
    </div>

    <div class="text-5xl font-bold bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-transparent bg-clip-text mb-20">
      <h1>Перелік книг</h1>
    </div>

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
      <h1 class="font-semibold text-2xl mt-24 h-full w-full text-center">
        Немає книг для відображення
      </h1>
      <i
          class="ri-emotion-sad-line text-8xl mt-4 text-green-400"
      ></i>
      <p class="text-gray-400 mt-4">
        Якщо книги не знайдено, додайте її до каталогу.
      </p>
      <button
          class="btn_reg mt-6 mb-40"
          @click="$router.push('/create')"
      >
        Додати книгу
      </button>
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import { useCardsStore } from '@/stores/cardsStore';
import { onMounted, computed } from 'vue';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  setup() {
    const cardsStore = useCardsStore();
    const { fetchCards, deleteCard, toggleReadStatus } = cardsStore;
    const cards = computed(() => cardsStore.cards);
    const isLoading = computed(() => cardsStore.isLoading);

    const handleToggleReadStatus = (book) => {
      toggleReadStatus(book);
    };

    onMounted(() => {
      fetchCards();
    });

    return {
      cards,
      isLoading,
      deleteCard,
      handleToggleReadStatus,
    };
  },
  computed: {
    filteredTasks() {
      const query = this.searchQuery.toLowerCase();
      return this.cards.filter((task) =>
          ['title', 'author', 'year'].some((key) =>
              task[key]?.toString().toLowerCase().includes(query)
          )
      );
    },
  },
  components: {
    BookCard,
  },
};
</script>