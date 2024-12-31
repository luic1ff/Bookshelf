<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-5xl font-bold bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-transparent bg-clip-text mb-4">
          Профіль користувача
        </h1>
        <p class="text-gray-700 dark:text-gray-300" v-if="user">
          Ласкаво просимо, <span class="font-semibold">{{ user.name }}</span>!
        </p>
      </div>
      <div>
        <button
            v-if="user"
            @click="logout"
            class="hover:bg-gradient-to-br from-[#d20f39] to-red-500 dark:bg-[#2a2a2d] bg-[#d20f39] text-white  py-2 px-4 rounded-md transition duration-300"
        >
          Вийти
        </button>
        <router-link
            v-else
            to="/login"
            class="hover:bg-gradient-to-br from-[#4CF191] to-[#09D45E] dark:bg-[#2a2a2d] bg-[#09D45E] text-white size-12 py-2 px-4 rounded-md transition duration-300"
        >
          Увійти
        </router-link>
      </div>
    </div>

    <div v-if="userCards.length > 0" class="mt-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-semibold">Мої книги</h2>
        <div class="relative">
          <input
              v-model="searchQuery"
              type="text"
              class="w-56 dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
              placeholder="Пошук книг..."
          />
          <i class="ri-search-line absolute left-3 top-2"></i>
        </div>
      </div>
      <div
          v-auto-animate="{ duration: 300 }"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
            v-for="card in filteredCards"
            :key="card.id"
            class="relative dark:bg-[#212124] bg-gray-100 rounded-lg transition duration-300 hover:shadow-xl hover:scale-[103%] p-5"
        >
          <div class="absolute -top-3 -right-3 size-16 bg-gray-200 dark:bg-[#2a2a2d] font-semibold rounded-full grid place-items-center">
            <span>{{ card.year }}</span>
          </div>
          <router-link :to="{ name: 'BookDetails', params: { id: card.id } }">
            <img
                :src="card.image"
                alt="Зображення книги"
                class="w-full h-60 object-cover rounded-md mb-4"
            />
          </router-link>
          <h3 class="text-lg text-center font-bold mb-2 line-clamp-1">
            {{ card.title }}
          </h3>
          <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
            {{ card.author }}
          </p>
          <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
            {{ card.description }}
          </p>
          <div class="flex space-x-2">
            <button
                @click.stop="deleteCard(card.id)"
                class="hover:bg-gradient-to-br from-[#d20f39] to-red-500 dark:bg-[#2a2a2d] bg-[#d20f39] text-white size-12 py-1 px-3 rounded-md transition duration-300 w-full"
            >
              <i class="ri-close-large-line"></i>
            </button>
            <router-link
                :to="{ name: 'EditCard', params: { id: card.id } }"
                @click.stop
                class="hover:bg-gradient-to-br from-[#4CF191] to-[#09D45E] dark:bg-[#2a2a2d] bg-[#09D45E] text-white size-12 py-1 px-3 rounded-md transition duration-300 w-full flex items-center justify-center"
            >
              <i class="ri-edit-line"></i>
            </router-link>
          </div>
        </div>
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
    const router = useRouter();

    const user = computed(() => authStore.user);

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
};
</script>