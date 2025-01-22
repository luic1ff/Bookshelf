<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-transparent bg-clip-text mb-8">
          Профіль користувача
        </h1>
        <p class="text-gray-700 dark:text-gray-300" v-if="user">
          Ласкаво просимо, <span class="font-semibold">{{ user.name }}</span>!
        </p>
        <p class="text-gray-700 dark:text-gray-300" v-else>Немає профілю,
          <button class="btn_reg ml-1 mr-2" @click="loginRoute">Увійти</button>
          <span>або</span>
          <button class="btn_reg ml-1 mr-2" @click="regRoute">Зареєструватися</button>
        </p>
      </div>
      <h2 class="text-3xl font-semibold" v-if="user">
        {{ showReadBooks ? "Прочитані книги" : "Додані книги" }}
      </h2>
    </div>


    <div class="flex justify-between items-center mb-6">

      <Filter
          :showFilters="showFilters"
          :filters="filters"
          :filterLabels="filterLabels"
          @toggle-filters="toggleFilters"
          @update:filters="updateFilters"
      />
      <Search
          :searchQuery="searchQuery"
          @update:searchQuery="updateSearchQuery"
      />
    </div>

    <div class="mb-6 flex justify-center">
      <button
          :class="{'bg-gray-100 dark:bg-[#2a2a2d]': !showReadBooks, 'bg-white': showReadBooks}"
          @click="showReadBooks = false"
          class="px-6 py-3 font-medium text-gray-900 border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-[#212124] dark:border-[#2a2a2d] dark:text-white dark:hover:text-white dark:hover:bg-[#2a2a2d] dark:focus:ring-blue-600 dark:focus:text-white">
        Додані книги
      </button>
      <button
          :class="{'bg-gray-100 dark:bg-[#2a2a2d]': showReadBooks, 'bg-white': !showReadBooks}"
          @click="showReadBooks = true"
          class="px-4 py-3 font-medium text-gray-900 border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-[#212124] dark:border-[#2a2a2d] dark:text-white dark:hover:text-white dark:hover:bg-[#2a2a2d] dark:focus:ring-blue-600 dark:focus:text-white">
        Прочитані книги
      </button>
    </div>

    <div v-if="filteredCards.length > 0" class="mt-10">
      <div
          v-auto-animate="{ duration: 300 }"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <BookCard
            v-for="card in filteredCards"
            :key="card.id"
            :book="card"
            @delete-card="deleteCard"
            @toggle-read-status="handleToggleReadStatus"
        />
      </div>
    </div>

    <div v-else class="flex flex-col justify-center items-center mt-24">
      <h1 class="font-semibold text-2xl text-center">Книг немає.</h1>
      <i class="ri-emotion-sad-line text-8xl mt-4 mb-10 text-green-400"></i>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useCardsStore } from "@/stores/cardsStore";
import BookCard from "@/components/BookCard.vue";
import Filter from "@/components/Layout/Filter.vue";
import Search from "@/components/Layout/Search.vue";

export default {
  components: { BookCard, Filter, Search },
  setup() {
    const authStore = useAuthStore();
    const cardsStore = useCardsStore();
    const router = useRouter();

    const user = computed(() => authStore.user);

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
    const showFilters = ref(false);
    const showReadBooks = ref(false);

    const filterLabels = {
      oldBooks: "Старі книги",
      newBooks: "Нові книги",
      popularBooks: "5 зірок",
      goodBooks: "4 зірки",
      threeStarBooks: "3 зірки",
      twoStarBooks: "2 зірки",
      oneStarBooks: "1 зірка",
    };

    const userCards = computed(() => {
      const userEmail = user.value?.email;
      if (!userEmail) return [];
      return cardsStore.cards.filter((card) => card.userEmail === userEmail);
    });

    const readBooks = computed(() => {
      const userEmail = user.value?.email;
      if (!userEmail) return [];
      return cardsStore.cards.filter((card) => card.isReadBy?.includes(userEmail));
    });

    const filteredCards = computed(() => {
      const cards = showReadBooks.value ? readBooks.value : userCards.value;
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

      return cards.filter((card) => {
        const matchesSearch = ["title", "author", "year"].some((key) =>
            card[key]?.toString().toLowerCase().includes(query)
        );

        const isOldBook = oldBooks && parseInt(card.year) < 2000;
        const isNewBook = newBooks && parseInt(card.year) >= 2000;
        const matchesYear = !oldBooks && !newBooks ? true : isOldBook || isNewBook;

        const matchesRating =
            (popularBooks && card.rating === 5) ||
            (goodBooks && card.rating === 4) ||
            (threeStarBooks && card.rating === 3) ||
            (twoStarBooks && card.rating === 2) ||
            (oneStarBooks && card.rating === 1) ||
            (!popularBooks &&
                !goodBooks &&
                !threeStarBooks &&
                !twoStarBooks &&
                !oneStarBooks);

        return matchesSearch && matchesYear && matchesRating;
      });
    });

    const loginRoute = () => router.push("/login");
    const regRoute = () => router.push("/register");
    const toggleFilters = () => (showFilters.value = !showFilters.value);
    const updateFilters = (newFilters) => (filters.value = newFilters);
    const updateSearchQuery = (newQuery) => (searchQuery.value = newQuery);
    const handleToggleReadStatus = (book) => cardsStore.toggleReadStatus(book);
    const deleteCard = (id) => cardsStore.deleteCard(id);

    onMounted(() => cardsStore.fetchCards());

    return {
      user,
      searchQuery,
      filters,
      showFilters,
      showReadBooks,
      filterLabels,
      filteredCards,
      userCards,
      readBooks,
      loginRoute,
      regRoute,
      toggleFilters,
      updateFilters,
      updateSearchQuery,
      handleToggleReadStatus,
      deleteCard,
    };
  },
};
</script>