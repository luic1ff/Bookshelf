<template>
  <div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full bg-white dark:bg-[#2a2a2d] p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Вхід</h2>
      <Form @submit="handleSubmit" class="space-y-4">
        <div class="relative">
          <Field
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
              rules="required|email"
          />
          <i class="ri-mail-line absolute left-3 top-2 "></i>
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>
        <div class="relative">
          <Field
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              class="w-full dark:bg-[#212124] border dark:border-none dark:text-white outline-none rounded-md py-2 pl-10 pr-4"
              rules="required|min:6"
          />
          <i class="ri-lock-password-line absolute left-3 top-2"></i>
          <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>
        <button
            type="submit"
            class="w-full bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-white py-2 rounded-lg hover:opacity-80 transition"
        >
          Ввійти
        </button>
      </Form>
      <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Немає акаунту?
        <router-link to="/register" class="text-blue-500 hover:underline">Зареєструватися</router-link>
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

    // Define rules
    defineRule("required", required);
    defineRule("email", email);
    defineRule("min", min);

    // Configure localization
    configure({
      generateMessage: localize("ua", {
        messages: {
          required: "Поле {field} обов'язково.",
          email: "Введіть коректний email.",
          min: "Поле {field} має містити мінімум {length} символів.",
        },
      }),
    });

    // Submit handler
    const handleSubmit = async (values) => {
      await authStore.login(values.email, values.password);
      if (authStore.isLoggedIn) {
        router.push("/");
      }
    };

    return { handleSubmit };
  },
};
</script>
