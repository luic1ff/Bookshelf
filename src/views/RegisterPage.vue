<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 dark:bg-[#1A1A1A]">
    <div class="max-w-md w-full bg-white dark:bg-[#2C2C2C] p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Регистрация</h2>
      <!-- Form привязан к handleSubmit -->
      <Form @submit="handleSubmit" class="space-y-4">
        <!-- Поле имени -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Имя</label>
          <Field
              id="name"
              name="name"
              type="text"
              class="mt-1 block w-full p-2 border rounded-lg dark:bg-[#212124] dark:text-white"
              rules="required|min:3"
          />
          <ErrorMessage name="name" class="text-red-500 text-sm" />
        </div>

        <!-- Поле email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <Field
              id="email"
              name="email"
              type="email"
              class="mt-1 block w-full p-2 border rounded-lg dark:bg-[#212124] dark:text-white"
              rules="required|email"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>

        <!-- Поле пароля -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Пароль</label>
          <Field
              id="password"
              name="password"
              type="password"
              class="mt-1 block w-full p-2 border rounded-lg dark:bg-[#212124] dark:text-white"
              rules="required|min:6"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>

        <!-- Кнопка -->
        <button
            type="submit"
            class="w-full bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-white py-2 rounded-lg hover:opacity-80 transition"
        >
          Зарегистрироваться
        </button>
      </Form>
      <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Уже есть аккаунт?
        <router-link to="/login" class="text-blue-500 hover:underline">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import "@vee-validate/i18n/dist/locale/ru.json";

export default {
  components: { Field, Form, ErrorMessage },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    // Define validation rules
    defineRule("required", required);
    defineRule("email", email);
    defineRule("min", min);

    // Configure VeeValidate for localization
    configure({
      generateMessage: localize("ru", {
        messages: {
          required: "Поле {field} обязательно.",
          email: "Введите корректный email.",
          min: "Поле {field} должно содержать минимум {length} символов.",
        },
      }),
    });

    // Submit handler
    const handleSubmit = async (values) => {
      await authStore.register(values.name, values.email, values.password);
      if (authStore.isLoggedIn) {
        router.push("/");
      }
    };

    return { handleSubmit };
  },
};
</script>
