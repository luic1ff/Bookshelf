<template>
	<div>
		<!-- ErrorMessage -->
		<ErrorModal v-if="errorMessage" :error="errorMessage" @close="clearError" />

		<!--    Header    -->
		<Header />

		<!--    Books    -->
		<transition
			enter-active-class="transition-opacity duration-1000"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity duration-1000"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
			mode="out-in"
		>
			<router-view />
		</transition>

		<!--    Footer    -->
		<Footer v-if="showFooter" />

		<!--    Scroll-Up    -->
		<ScrollUp />
	</div>
</template>

<script>
import ErrorModal from '@/components/Layout/ErrorModal.vue'
import Footer from '@/components/Layout/Footer.vue'
import Header from '@/components/Layout/Header.vue'
import ScrollUp from '@/components/Layout/ScrollUp.vue'
import { useErrorStore } from '@/stores/errorStore'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const router = useRouter()
		const errorStore = useErrorStore()
		const showFooter = ref(true)

		const updateFooterVisibility = () => {
			const currentPath = router.currentRoute.value.path
			showFooter.value = !(
				currentPath.startsWith('/edit/') ||
				currentPath === '/create' ||
				currentPath === '/login' ||
				currentPath === '/register'
			)
		}

		watch(() => router.currentRoute.value.path, updateFooterVisibility, {
			immediate: true,
		})

		const clearError = () => {
			errorStore.clearError()
		}

		return {
			showFooter,
			clearError,
			errorMessage: errorStore.errorMessage,
		}
	},
	components: {
		Header,
		Footer,
		ScrollUp,
		ErrorModal,
	},
}
</script>
