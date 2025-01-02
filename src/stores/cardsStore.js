import { useAuthStore } from '@/stores/authStore'
import { useErrorStore } from '@/stores/errorStore'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardsStore = defineStore('cards', {
	state: () => ({
		cards: ref([]),
		isLoading: ref(false),
	}),

	actions: {
		async fetchCards() {
			const errorStore = useErrorStore()
			this.isLoading = true
			try {
				const response = await axios.get('http://localhost:3000/cards', {
					headers: { 'Cache-Control': 'no-cache' },
				})
				this.cards = response.data
			} catch (error) {
				errorStore.setError('Помилка при завантаженні карток: ' + error.message)
			} finally {
				this.isLoading = false
			}
		},

		async deleteCard(id) {
			const errorStore = useErrorStore()
			try {
				await axios.delete(`http://localhost:3000/cards/${id}`)
				this.cards = this.cards.filter(card => card.id !== id)
			} catch (error) {
				errorStore.setError('Помилка при видаленні картки: ' + error.message)
			}
		},

		async addCard(card) {
			const errorStore = useErrorStore()
			try {
				const authStore = useAuthStore()
				if (!authStore.user || !authStore.user.email) {
					errorStore.setError('Ви не авторизовані для додання карток.')
					return
				}

				card.userEmail = authStore.user.email

				const response = await axios.post('http://localhost:3000/cards', card)
				this.cards.push(response.data)
			} catch (error) {
				errorStore.setError('Помилка при додаванні картки: ' + error.message)
			}
		},

		async fetchCardById(id) {
			const errorStore = useErrorStore()
			this.isLoading = true
			try {
				const response = await axios.get(`http://localhost:3000/cards/${id}`)
				return response.data
			} catch (error) {
				errorStore.setError('Помилка при завантаженні картки: ' + error.message)
				return null
			} finally {
				this.isLoading = false
			}
		},

		isTitleUnique(title, excludeId = null) {
			return this.cards.every(card => {
				return card.title !== title || card.id === excludeId
			})
		},
	},
})
