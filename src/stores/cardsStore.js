import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCardsStore = defineStore("cards", {
    state: () => ({
        cards: ref([]), // Массив для карточек
        isLoading: ref(false), // Индикатор загрузки
    }),

    actions: {
        async fetchCards() {
            this.isLoading = true;
            try {
                const response = await axios.get("http://localhost:3000/cards", {
                    headers: { "Cache-Control": "no-cache" },
                });
                this.cards = response.data;
                console.log("Данные загружены:", response.data);
            } catch (error) {
                console.error("Ошибка при загрузке карточек:", error);
            } finally {
                this.isLoading = false;
            }
        },

        async deleteCard(id) {
            try {
                await axios.delete(`http://localhost:3000/cards/${id}`); // Исправлено на обратные кавычки

                // Удаляем карточку из локального массива после успешного удаления
                this.cards = this.cards.filter((card) => card.id !== id);
            } catch (error) {
                console.error("Ошибка при удалении карточки:", error);
            }
        },


        async addCard(card) {
            try {
                const response = await axios.post("http://localhost:3000/cards", card);
                this.cards.push(response.data);
            } catch (error) {
                console.error("Ошибка при добавлении карточки:", error);
            }
        },

        async fetchCardById(id) {
            // Новый метод для получения одной карточки по ID
            this.isLoading = true;
            try {
                const response = await axios.get(`http://localhost:3000/cards/${id}`);
                return response.data; // Возвращаем карточку
            } catch (error) {
                console.error("Ошибка при загрузке карточки:", error);
                return null;
            } finally {
                this.isLoading = false;
            }
        },
    },
});
