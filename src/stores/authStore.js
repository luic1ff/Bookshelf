import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        isLoggedIn: !!localStorage.getItem("user"),
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axios.get(`http://localhost:3000/users`, {
                    params: { email, password },
                });

                if (response.data.length > 0) {
                    this.user = response.data[0];
                    this.isLoggedIn = true;

                    // Зберігаємо користувача в localStorage
                    localStorage.setItem("user", JSON.stringify(this.user));

                    const router = useRouter();
                    router.push("/");
                } else {
                    alert("Невірний email або пароль.");
                }
            } catch (error) {
                console.error("Помилка входу:", error);
            }
        },

        async register(name , email, password) {
            try {
                const existingUser = await axios.get(`http://localhost:3000/users`, {
                    params: { email },
                });

                if (existingUser.data.length > 0) {
                    alert("Користувач з таким email вже існує.");
                    return;
                }

                const newUser = {name, email, password };
                const response = await axios.post(`http://localhost:3000/users`, newUser);
                this.user = response.data;
                this.isLoggedIn = true;

                localStorage.setItem("user", JSON.stringify(this.user));

                const router = useRouter();
                router.push("/");
            } catch (error) {
                console.error("Помилка реєстрації:", error);
            }
        },

        logout() {
            localStorage.removeItem("user");

            this.user = null;
            this.isLoggedIn = false;
        },
    },
});