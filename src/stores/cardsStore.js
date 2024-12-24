import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCardsStore = defineStore("cards", {
    state: () => ({
        cards: ref([]),
        isLoading: ref(false),
    }),

    actions: {
        async fetchCards() {
            this.isLoading = true;
            try {
                const response = await axios.get("http://localhost:3000/cards", {
                    headers: { "Cache-Control": "no-cache" },
                });
                this.cards = response.data;
                console.log("Дані завантажено:", response.data);
            } catch (error) {
                console.error("Помилка при завантаженні карток:", error);
            } finally {
                this.isLoading = false;
            }
        },
        async deleteCard(id) {
            try {
                await axios.delete(`http://localhost:3000/cards/${id}`);
                this.cards = this.cards.filter((card) => card.id !== id);
            } catch (error) {
                console.error("Помилка при видаленні картки:", error);
            }
        },

        async addCard(card) {
            try {
                const response = await axios.post("http://localhost:3000/cards", card);
                this.cards.push(response.data);
            } catch (error) {
                console.error("Помилка при додаванні картки:", error);
            }
        },

        async fetchCardById(id) {
            this.isLoading = true;
            try {
                const response = await axios.get(`http://localhost:3000/cards/${id}`);
                return response.data;
            } catch (error) {
                console.error("Помилка при завантаженні картки:", error);
                return null;
            } finally {
                this.isLoading = false;
            }
        },

        isTitleUnique(title, excludeId = null) {
            return this.cards.every((card) => {
                return card.title !== title || card.id === excludeId;
            });
        }

    },
});
