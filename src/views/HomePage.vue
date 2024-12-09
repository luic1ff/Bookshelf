<template>
  <div class="p-6 max-w-6xl  mx-auto">
    <div class="mb-8 text-right">
      <button class="btn_reg">
        <router-link
            to="/create"
            class=""
        >
          Добавить карточку
        </router-link>
      </button>
    </div>



    <div v-if="cards.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
          v-for="card in cards"
          :key="card.id"
          class="dark:bg-[#24273a] dark:border-gray-800 bg-[#eff1f5] border border-gray-200  rounded-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl p-4 cursor-pointer"
      >
        <img
            :src="card.image"
            alt="Изображение карточки"
            class="w-full h-60 object-cover rounded-md mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">{{ card.title }}</h3>
        <p class="text-gray-700 dark:text-gray-500 mb-2">{{ card.description }}</p>
        <div class="flex items-center justify-center space-x-1 mb-2">
          <!-- Звезды -->
          <i
              v-for="star in 5"
              :key="star"
              :class="star <= card.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
              class="text-xl"
          ></i>
        </div>
        <div class="flex flex-col space-y-2 ">
          <button
              @click="deleteCard(card.id)"
              class="bg-[#d20f39] text-white py-1 px-3 rounded-md hover:bg-opacity-70 transition w-full"
          >
            <i class="ri-close-large-line"></i>
          </button>

          <router-link
              :to="{ name: 'EditCard', params: { id: card.id } }"
              class="bg-[#40a02b] text-white py-1 px-3 rounded-md hover:bg-opacity-70 transition w-full flex items-center justify-center"
          >
            <i class="ri-edit-line"></i>
          </router-link>
        </div>
      </div>

    </div>
    <div v-else class="flex flex-col justify-center items-center" >
      <h1 class="font-semibold text-2xl mt-24 h-full w-full text-center">Нет карточек для отображения</h1>
      <i class="ri-emotion-sad-line text-8xl mt-4 text-green-400"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    async fetchCards() {
      try {
        const response = await axios.get("http://localhost:3000/cards");
        this.cards = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке карточек:", error);
      }
    },
    async deleteCard(id) {
      try {
        await axios.delete(`http://localhost:3000/cards/${id}`);
        this.cards = this.cards.filter((card) => card.id !== id);
      } catch (error) {
        console.error("Ошибка при удалении карточки:", error);
      }
    },
  },
  mounted() {
    this.fetchCards();
  },
};
</script>

