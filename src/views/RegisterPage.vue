<template>
  <div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full bg-white dark:bg-[#2a2a2d] p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Реєстрація</h2>
      <!-- Форма прив'язана до handleSubmit -->
      <Form @submit="handleSubmit" class="space-y-4">
        <!-- Поле імені -->
        <div class="relative">
          <Field
              id="name"
              name="name"
              placeholder="Ім'я"
              type="text"
              class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
              rules="required|min:3"
          />
          <i class="ri-user-line absolute left-3 top-2"></i>
          <ErrorMessage name="name" class="text-red-500 text-sm" />
        </div>

        <!-- Поле email -->
        <div class="relative">
          <Field
              id="email"
              name="email"
              placeholder="Електронна пошта"
              type="email"
              class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
              rules="required|email"
          />
          <i class="ri-mail-line absolute left-3 top-2"></i>
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>

        <!-- Поле пароля -->
        <div class="relative">
          <Field
              id="password"
              name="password"
              placeholder="Пароль"
              type="password"
              class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
              rules="required|min:6"
          />
          <i class="ri-lock-password-line absolute left-3 top-2"></i>
          <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>

        <!-- Кнопка -->
        <button
            type="submit"
            class="w-full bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-white py-2 rounded-lg hover:opacity-80 transition"
        >
          Зареєструватися
        </button>
      </Form>
      <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Уже маєте акаунт?
        <router-link to="/login" class="text-blue-500 hover:underline">Увійти</router-link>
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
import "@vee-validate/i18n/dist/locale/uk.json";

export default {
  components: { Field, Form, ErrorMessage },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    // Визначення правил валідації
    defineRule("required", required);
    defineRule("email", email);
    defineRule("min", min);

    // Налаштування VeeValidate для локалізації
    configure({
      generateMessage: localize("uk", {
        messages: {
          required: "Поле {field} є обов'язковим.",
          email: "Введіть коректну електронну пошту.",
          min: "Поле {field} повинно містити щонайменше {length} символів.",
        },
      }),
    });

    // Обробник відправлення форми
    const handleSubmit = async (values) => {
      await authStore.register(values.name, values.email, values.password);
      if (authStore.isLoggedIn) {
        router.push("/");
      }
    };

    return {handleSubmit};
  },
};
</script>
