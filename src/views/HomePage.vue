<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-center md:justify-end space-x-6 mb-8 text-right">
      <div class="relative">
        <input
            v-model="searchQuery"
            type="text"
            class="w-56 dark:bg-[#212124] border border-gray-300 dark:border-none dark:text-white outline-none  rounded-md py-2 pl-10 pr-4"
            placeholder="Search...">
        <i class="ri-search-line absolute left-3 top-2 "></i>

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

    <div v-auto-animate="{ duration: 300 }" v-else-if="cards.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
          v-for="card in filteredTasks"
          :key="card.id"
          class="relative dark:bg-[#212124] dark:border-none  bg-white border border-gray-300 rounded-lg transition duration-300 hover:shadow-xl hover:scale-[103%] p-5 cursor-pointer"
      >
        <div class="absolute -top-3 -right-3 size-16 bg-gray-200 dark:bg-[#2a2a2d] font-semibold rounded-full grid place-items-center">
          <span>{{card.year}}</span>
        </div>
        <router-link
            :to="{ name: 'BookDetails', params: { id: card.id } }">
          <img
              :src="card.image"
              alt="Зображення книги"
              class="w-full h-60 object-cover rounded-md mb-4">
        </router-link>
        <h3 class="text-lg text-center font-bold mb-2 line-clamp-1">{{ card.title }}</h3>
        <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">{{card.author}}</p>
        <p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">{{ card.description }}</p>
        <div class="flex items-center justify-center space-x-1 mb-4">
          <i
              v-for="star in 5"
              :key="star"
              :class="star <= card.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
              class="text-xl"
          ></i>
        </div>
        <div class="flex space-x-2">
          <button
              @click.stop="deleteCard(card.id)"
              class="hover:bg-gradient-to-br from-[#d20f39] to-red-500 dark:bg-[#2a2a2d] bg-[#d20f39] text-white size-12 py-1 px-3 rounded-md  transition duration-300 w-full"
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

    <div v-else class="flex flex-col justify-center items-center">
      <h1 class="font-semibold text-2xl mt-24 h-full w-full text-center">Немає книг для відображення</h1>
      <i class="ri-emotion-sad-line text-8xl mt-4 mb-40 text-green-400"></i>
    </div>
  </div>
</template>

<script>
import { useCardsStore } from "@/stores/cardsStore";
import { onMounted, computed } from "vue";

export default {

  data(){
    return {
      searchQuery: "",

    }
  },
  setup() {
    const cardsStore = useCardsStore();
    const {fetchCards, deleteCard} = cardsStore;
    const cards = computed(() => cardsStore.cards);
    const isLoading = computed(() => cardsStore.isLoading);

    onMounted(() => {
      fetchCards();
    });

    return {
      cards,
      isLoading,
      deleteCard,
    };
  },
  computed: {
    filteredTasks() {
      const query = this.searchQuery.toLowerCase();
      return this.cards.filter((task) =>
          ['title', 'author', 'year'].some(key =>
              task[key]?.toString().toLowerCase().includes(query)
          )
      );
    },
  }
};
</script>
