<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Добавить новую карточку</h1>
    <form @submit.prevent="addCard" class="space-y-4">
      <input
          v-model="newCard.title"
          placeholder="Название карточки"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
          required
      />
      <input
          v-model="newCard.description"
          placeholder="Описание карточки"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
          required
      />
      <input
          v-model="newCard.image"
          placeholder="URL изображения"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
          required
      />
      <div class="mb-4">
        <label class="block text-gray-700">Рейтинг</label>
        <div class="flex space-x-2">
          <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="setRating(star)"
              class="text-2xl focus:outline-none"
          >
            <i :class="star <= newCard.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"></i>
          </button>
        </div>
      </div>
      <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Добавить карточку
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newCard: {
        title: "",
        description: "",
        image: "",
        rating: 0,
      },
    };
  },
  methods: {
    setRating(star) {
      this.newCard.rating = star; // Устанавливаем рейтинг
    },
    async addCard() {
      try {
        await axios.post("http://localhost:3000/cards", this.newCard);
        this.$router.push("/");
      } catch (error) {
        console.error("Ошибка при добавлении карточки:", error);
      }
    },
  },
};
</script>
