<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Добавить новую карточку</h1>
    <form @submit.prevent="addCard" class="space-y-6 lg:space-y-4">
      <div class="relative">
        <input
            v-model="newCard.title"
            placeholder="Название карточки"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            required
        />
        <i class="ri-book-2-line absolute left-3 top-2 "></i>
      </div>
      <div class="relative">
        <input
            v-model="newCard.author"
            placeholder="Имя Автора"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            required
        />
        <i class="ri-user-line absolute left-3 top-2 "></i>
      </div>
      <div class="relative">
        <input
            v-model="newCard.year"
            placeholder="Год Выпуску"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            required
        />
        <i class="ri-earth-line absolute left-3 top-2 "></i>
      </div>
      <div class="relative">
        <input
            v-model="newCard.description"
            placeholder="Описание книги"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            required
        />
        <i class="ri-file-text-line absolute left-3 top-2 "></i>
      </div>
      <div class="relative">
        <input
            v-model="newCard.image"
            placeholder="URL Изображение"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            required
        />
        <i class="ri-image-circle-line absolute left-3 top-2 "></i>
      </div>
      <div class="mb-8">
        <div class="flex space-x-2">
          <label class="block text-xl font-bold text-center">Рейтинг:</label>
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
          class="w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
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
        author: "",
        year: "",
        description: "",
        image: "",
        rating: 0,
      },
    };
  },
  methods: {
    setRating(star) {
      this.newCard.rating = star;
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
