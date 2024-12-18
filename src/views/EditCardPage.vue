<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Редагувати книгу</h1>
    <Form @submit="updateCard" class="space-y-6">
      <div class="relative">
        <Field
            name="title"
            v-model="card.title"
            placeholder="Назва картки"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            :rules="titleRules"
        />
        <i class="ri-book-2-line absolute left-3 top-2 "></i>
        <ErrorMessage name="title" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="author"
            v-model="card.author"
            placeholder="Ім'я автора"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|min:3"
        />
        <i class="ri-user-line absolute left-3 top-2 "></i>
        <ErrorMessage name="author" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="year"
            v-model="card.year"
            placeholder="Рік випуску"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|numeric|min_value:1000|max_value:9999"
        />
        <i class="ri-earth-line absolute left-3 top-2 "></i>
        <ErrorMessage name="year" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="description"
            v-model="card.description"
            placeholder="Опис книги"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|min:10"
        />
        <i class="ri-file-text-line absolute left-3 top-2 "></i>
        <ErrorMessage name="description" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="image"
            v-model="card.image"
            placeholder="URL зображення"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|url"
        />
        <i class="ri-image-circle-line absolute left-3 top-2 "></i>
        <ErrorMessage name="image" class="text-red-500 text-sm" />
      </div>

      <!-- Рейтинг -->
      <div class="mb-8">
        <div class="flex space-x-2">
          <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="card.rating = star"
              class="text-2xl focus:outline-none"
          >
            <i :class="star <= card.rating ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-400'"></i>
          </button>
        </div>
      </div>

      <button
          type="submit"
          class="w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Зберегти
      </button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, min, url, numeric, min_value, max_value } from "@vee-validate/rules";
import axios from "axios";
import { useCardsStore } from "@/stores/cardsStore";
import { ref } from 'vue'

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      card: {
        id: null,
        title: "",
        description: "",
        image: "",
        author: "",
        year: "",
        rating: null,
      },
      originalTitle: "",
    };
  },
  async created() {
    const { id } = this.$route.params;
    try {
      const response = await axios.get(`http://localhost:3000/cards/${id}`);
      this.card = response.data;
      this.originalTitle = response.data.title;
    } catch (error) {
      console.error("Помилка при завантаженні картки:", error);
    }
  },
  setup() {
    const cardsStore = useCardsStore();

    const originalTitle = ref(""); // Створюємо реактивне поле для оригінальної назви

    const titleRules = async (value) => {
      if (!value) return "Поле обов'язкове.";

      // Перевіряємо, якщо поточне значення збігається з оригінальною назвою
      if (value === originalTitle.value) return true;

      // Перевіряємо унікальність через store
      const isUnique = await cardsStore.isTitleUnique(value);
      if (!isUnique) {
        return "Назва вже існує.";
      }
      return true;
    };


    // Визначення правил для інших полів
    defineRule("required", required);
    defineRule("min", min);
    defineRule("url", url);
    defineRule("numeric", numeric);
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);

    configure({
      validateOnInput: true,
      generateMessage: (ctx) => {
        const messages = {
          required: `Поле ${ctx.field} обов'язкове.`,
          min: `${ctx.field} повинно містити мінімум ${ctx.rule.params[0]} символів.`,
          url: `${ctx.field} повинно бути коректним URL.`,
          numeric: `${ctx.field} повинно бути числом.`,
          min_value: `${ctx.field} повинно бути не менше ${ctx.rule.params[0]}.`,
          max_value: `${ctx.field} повинно бути не більше ${ctx.rule.params[0]}.`,
        };
        return messages[ctx.rule.name] || "Помилка.";
      },
    });

    return { titleRules, originalTitle };
  },
  methods: {
    async updateCard() {
      const { id } = this.$route.params;
      try {
        await axios.put(`http://localhost:3000/cards/${id}`, this.card);
        this.$router.push("/");
      } catch (error) {
        console.error("Помилка при оновленні картки:", error.message);
      }
    },
  },
};
</script>