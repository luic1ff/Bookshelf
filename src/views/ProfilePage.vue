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
          <button
					class="btn_reg ml-1 mr-2"
					@click="loginRoute"
				>
					Увійти
				</button>
            <span>або</span>
            <button
					class="btn_reg ml-1 mr-2"
					@click="regRoute"
				>

          Зареєструватися
				</button>
        </p>
      </div>
    </div>

    <div v-if="userCards.length > 0" class="mt-10">
      <div v-if="user" class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-semibold">Мої книги</h2>
        <div class="relative">
          <input
              v-model="searchQuery"
              type="text"
              class="w-56 dark:bg-[#212124] border border-gray-300 dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
              placeholder="Search..."
          />
          <i class="ri-search-line absolute left-3 top-2"></i>
        </div>
      </div>
      <div
          v-if="user"
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

    <div v-else-if="user" class="flex flex-col justify-center items-center mt-24">
      <h1 class="font-semibold text-2xl text-center">У вас ще немає доданих книг.</h1>
      <i class="ri-emotion-sad-line text-8xl mt-4 mb-10 text-green-400"></i>
    </div>

    <div v-else class="text-center text-xl mt-24">
      <p>Ви не авторизовані.</p>
      <router-link to="/login" class="text-blue-500 underline">Увійти</router-link>
    </div>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import { useAuthStore } from '@/stores/authStore';
import { useCardsStore } from '@/stores/cardsStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  setup() {
    const authStore = useAuthStore();
    const cardsStore = useCardsStore();
    const { toggleReadStatus } = cardsStore;
    const router = useRouter();

    const user = computed(() => authStore.user);

    const handleToggleReadStatus = (book) => {
      toggleReadStatus(book);
    };

    function loginRoute() {
			router.push('/login')
		}

    function regRoute() {
			router.push('/register')
		}

    onMounted(() => {
      cardsStore.fetchCards();
    });

    const userCards = computed(() => {
      return cardsStore.cards.filter(card => card.userEmail === user.value?.email);
    });

    const logout = () => {
      router.push('/');
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
      handleToggleReadStatus
    };
  },
  computed: {
    filteredCards() {
      const query = this.searchQuery.toLowerCase();
      return this.userCards.filter(card =>
          ['title', 'author', 'year'].some(key =>
              card[key]?.toString().toLowerCase().includes(query)
          )
      );
    },
  },
  components: {
    BookCard,
  }
};
</script>