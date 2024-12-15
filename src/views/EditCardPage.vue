<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Редактировать карточку</h1>
    <Form @submit="updateCard" class="space-y-6">
      <div>
        <label class="block mb-1">Название карточки</label>
        <Field
            name="title"
            v-model="card.title"
            placeholder="Название карточки"
            class="w-full border dark:bg-gray-700 dark:text-white rounded-md p-2"
            :rules="titleRules"
        />
        <ErrorMessage name="title" class="text-red-500 text-sm" />
      </div>

      <div>
        <label class="block mb-1">Описание карточки</label>
        <Field
            name="description"
            v-model="card.description"
            placeholder="Описание карточки"
            class="w-full border dark:bg-gray-700 dark:text-white rounded-md p-2"
            rules="required|min:10"
        />
        <ErrorMessage name="description" class="text-red-500 text-sm" />
      </div>

      <div>
        <label class="block mb-1">URL изображения</label>
        <Field
            name="image"
            v-model="card.image"
            placeholder="URL изображения"
            class="w-full border dark:bg-gray-700 dark:text-white rounded-md p-2"
            rules="required|url"
        />
        <ErrorMessage name="image" class="text-red-500 text-sm" />
      </div>

      <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Сохранить изменения
      </button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, min, url } from "@vee-validate/rules";
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
      card: {
        id: null,
        title: "",
        description: "",
        image: "",
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
      console.error("Ошибка при загрузке карточки:", error);
    }
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

    configure({
      validateOnInput: true,
      generateMessage: (ctx) => {
        const messages = {
          required: `Поле ${ctx.field} обязательно.`,
          min: `${ctx.field} должно содержать минимум ${ctx.rule.params[0]} символов.`,
          url: `${ctx.field} должно быть корректным URL.`,
        };
        return messages[ctx.rule.name] || "Ошибка.";
      },
    });

    return { titleRules };
  },
  methods: {
    async updateCard() {
      const { id } = this.$route.params;
      try {
        await axios.put(`http://localhost:3000/cards/${id}`, this.card);
        this.$router.push("/");
      } catch (error) {
        console.error("Ошибка при обновлении карточки:", error.message);
      }
    },
  },
};
</script>

