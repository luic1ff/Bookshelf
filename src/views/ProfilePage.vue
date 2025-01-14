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
    </div>

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-semibold" v-if="user">
        {{ showReadBooks ? "Прочитані книги" : "Додані книги" }}
      </h2>
      <div class="relative">
        <input
            v-model="searchQuery"
            type="text"
            class="w-56 dark:bg-[#212124] border border-gray-300 dark:border-none dark:text-white focus:ring-2 focus:ring-blue-700 outline-none rounded-md py-2 pl-10 pr-4"
            placeholder="Search..."
        />
        <i class="ri-search-line absolute left-3 top-2"></i>
      </div>
    </div>

    <div class="mb-6 flex justify-center">
      <button
          :class="{'bg-gray-100 dark:bg-[#2a2a2d]': !showReadBooks, 'bg-white': showReadBooks}"
          @click="showReadBooks = false"
          class="px-6 py-3 font-medium text-gray-900  border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-[#212124] dark:border-[#2a2a2d] dark:text-white dark:hover:text-white dark:hover:bg-[#2a2a2d] dark:focus:ring-blue-600 dark:focus:text-white">
        Додані книги
      </button>
      <button
          :class="{'bg-gray-100 dark:bg-[#2a2a2d]': showReadBooks, 'bg-white': !showReadBooks}"
          @click="showReadBooks = true"
          class="px-4 py-3 font-medium text-gray-900  border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-[#212124] dark:border-[#2a2a2d] dark:text-white dark:hover:text-white dark:hover:bg-[#2a2a2d] dark:focus:ring-blue-600 dark:focus:text-white">
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
import BookCard from "@/components/BookCard.vue";
import { useAuthStore } from "@/stores/authStore";
import { useCardsStore } from "@/stores/cardsStore";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      searchQuery: "",
      showReadBooks: false,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const cardsStore = useCardsStore();
    const router = useRouter();

    const user = computed(() => authStore.user);

    const handleToggleReadStatus = (book) => {
      cardsStore.toggleReadStatus(book);
    };

    function loginRoute() {
      router.push("/login");
    }

    function regRoute() {
      router.push("/register");
    }

    onMounted(() => {
      cardsStore.fetchCards();
    });

    const userCards = computed(() => {
      const userEmail = user.value?.email;
      if (!userEmail) return [];
      return cardsStore.cards.filter((card) => card.userEmail === userEmail);
    });

    const readBook = computed(() => {
      const userEmail = user.value?.email;
      if (!userEmail) return [];
      return cardsStore.cards.filter(
          (card) => Array.isArray(card.isReadBy) && card.isReadBy.includes(userEmail)
      );
    });

    const logout = () => {
      router.push("/");
      authStore.logout();
    };

    const deleteCard = (id) => {
      cardsStore.deleteCard(id);
    };

    return {
      user,
      userCards,
      logout,
      deleteCard,
      loginRoute,
      regRoute,
      handleToggleReadStatus,
      readBook,
    };
  },
  computed: {
    filteredCards() {
      const query = this.searchQuery.toLowerCase();
      const cards = this.showReadBooks ? this.readBook : this.userCards;

      return cards.filter((card) =>
          ["title", "author", "year"].some((key) =>
              card[key]?.toString().toLowerCase().includes(query)
          )
      );
    },
  },
  components: {
    BookCard,
  },
};
</script>
