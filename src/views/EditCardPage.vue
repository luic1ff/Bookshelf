<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Редактировать карточку</h1>
    <form @submit.prevent="updateCard" class="space-y-4">
      <input
          v-model="card.title"
          placeholder="Название карточки"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
          required
      />
      <input
          v-model="card.description"
          placeholder="Описание карточки"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
          required
      />
      <input
          v-model="card.image"
          placeholder="URL изображения"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
          required
      />
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Рейтинг</label>
        <div class="flex space-x-2">
          <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="setRating(star)"
              class="text-2xl focus:outline-none"
          >
            <i
                :class="star <= card.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"
            ></i>
          </button>
        </div>
      </div>
      <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Сохранить изменения
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      card: {
        title: "",
        description: "",
        image: "",
      },
    };
  },
  async created() {
    const { id } = this.$route.params;
    try {
      const response = await axios.get(`http://localhost:3000/cards/${id}`);
      this.card = response.data;
    } catch (error) {
      console.error("Ошибка при загрузке карточки:", error);
    }
  },
  methods: {
    setRating(star) {
      this.card.rating = star; 
    },
    async updateCard() {
      const { id } = this.$route.params;
      try {
        await axios.put(`http://localhost:3000/cards/${id}`, this.card);
        this.$router.push("/");
      } catch (error) {
        console.error("Ошибка при обновлении карточки:", error);
      }
    },
  },
};
</script>
