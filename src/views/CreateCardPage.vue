<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Добавить новую карточку</h1>
    <Form @submit="addCard" class="space-y-6 lg:space-y-4">
      <div class="relative">
        <Field
            name="title"
            v-model="newCard.title"
            placeholder="Название карточки"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            :rules="titleRules"
        />
        <i class="ri-book-2-line absolute left-3 top-2 "></i>
        <ErrorMessage name="title" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="author"
            v-model="newCard.author"
            placeholder="Имя автора"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|min:3"
        />
        <i class="ri-user-line absolute left-3 top-2 "></i>
        <ErrorMessage name="author" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="year"
            v-model="newCard.year"
            placeholder="Год выпуска"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|numeric|min_value:1000|max_value:9999"
        />
        <i class="ri-earth-line absolute left-3 top-2 "></i>
        <ErrorMessage name="year" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="description"
            v-model="newCard.description"
            placeholder="Описание книги"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|min:10"
        />
        <i class="ri-file-text-line absolute left-3 top-2 "></i>
        <ErrorMessage name="description" class="text-red-500 text-sm" />
      </div>

      <div class="relative">
        <Field
            name="image"
            v-model="newCard.image"
            placeholder="URL изображения"
            class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
            rules="required|url"
        />
        <i class="ri-image-circle-line absolute left-3 top-2 "></i>
        <ErrorMessage name="image" class="text-red-500 text-sm" />
      </div>

      <div class="mb-8">
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
          class="w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Добавить карточку
      </button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, min, url, numeric, min_value, max_value } from "@vee-validate/rules";
import axios from "axios";
import { useCardsStore } from "@/stores/cardsStore";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
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
  setup() {
    const cardsStore = useCardsStore();

    const titleRules = async (value) => {
      if (!value) return "Поле обязательно.";
      const isUnique = await cardsStore.isTitleUnique(value);
      if (!isUnique) {
        return "Название уже существует.";
      }
      return true;
    };

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
          required: `Поле ${ctx.field} обязательно.`,
          min: `${ctx.field} должно содержать минимум ${ctx.rule.params[0]} символов.`,
          url: `${ctx.field} должно быть корректным URL.`,
          numeric: `${ctx.field} должно быть числом.`,
          min_value: `${ctx.field} должно быть не меньше ${ctx.rule.params[0]}.`,
          max_value: `${ctx.field} должно быть не больше ${ctx.rule.params[0]}.`,
        };
        return messages[ctx.rule.name] || "Ошибка.";
      },
    });

    return { titleRules };
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
