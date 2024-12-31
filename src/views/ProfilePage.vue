<template>
	<div class="profile-page mx-12 my-12">
		<h1
			class="text-3xl font-bold bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-transparent bg-clip-text"
		>
			Профіль користувача
		</h1>
		<div v-if="user" class="mt-5">
			<p><strong>Ім'я:</strong> {{ user.name }}</p>
			<p><strong>Email:</strong> {{ user.email }}</p>
			<button
				@click="logout"
				class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
			>
				Вийти
			</button>
		</div>
		<div v-else>
			<p>
				Ви не авторизовані.
				<router-link to="/login" class="text-blue-500">Увійти</router-link>
			</p>
		</div>

		<!-- Секция с книгами -->
		<div v-if="userCards.length > 0" class="mt-10">
			<h2 class="text-2xl font-semibold">Мої книги:</h2>
			<div
				v-auto-animate="{ duration: 300 }"
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
			>
				<div
					v-for="card in userCards"
					:key="card.id"
					class="relative dark:bg-[#212124] bg-gray-100 rounded-lg transition duration-300 hover:shadow-xl hover:scale-[103%] p-5"
				>
					<div
						class="absolute -top-3 -right-3 size-16 bg-gray-200 dark:bg-[#2a2a2d] font-semibold rounded-full grid place-items-center"
					>
						<span>{{ card.year }}</span>
					</div>
					<router-link :to="{ name: 'BookDetails', params: { id: card.id } }">
						<img
							:src="card.image"
							alt="Зображення книги"
							class="w-full h-60 object-cover rounded-md mb-4"
						/>
					</router-link>
					<h3 class="text-lg text-center font-bold mb-2 line-clamp-1">
						{{ card.title }}
					</h3>
					<p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
						{{ card.author }}
					</p>
					<p class="text-gray-700 dark:text-gray-500 mb-2 line-clamp-1">
						{{ card.description }}
					</p>
				</div>
			</div>
		</div>
		<div v-else-if="user" class="mt-10">
			<p class="text-center text-xl">У вас ще немає доданих книг.</p>
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { useCardsStore } from '@/stores/cardsStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const authStore = useAuthStore()
		const cardsStore = useCardsStore()
		const router = useRouter()

		// Получаем данные о текущем пользователе
		const user = computed(() => authStore.user)

		// Загружаем книги
		onMounted(() => {
			cardsStore.fetchCards()
		})

		// Фильтруем книги для текущего пользователя
		const userCards = computed(() => {
			return cardsStore.cards.filter(
				card => card.userEmail === user.value?.email
			)
		})

		// Логика выхода
		const logout = () => {
			router.push('/')
			authStore.logout()
		}

		return {
			user,
			userCards,
			logout,
		}
	},
}
</script>
