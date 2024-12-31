<template>
	<div
		v-if="error"
		class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
	>
		<div
			class="w-96 bg-white dark:bg-[#212124] border dark:border-gray-700 rounded-lg shadow-lg p-6 space-y-4"
		>
			<h3 class="text-lg font-semibold text-red-600 dark:text-red-500">
				Помилка
			</h3>
			<p class="text-gray-700 dark:text-gray-300">
				{{ error }}
			</p>
			<div class="flex justify-end space-x-4">
				<button
					@click="onClose"
					class="py-2 px-4 rounded bg-gradient-to-br from-[#7287fd] to-[#314AD5] text-white hover:opacity-90 transition"
				>
					Закрити
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		error: {
			type: String,
			required: true,
		},
	},
	methods: {
		onClose() {
			this.$emit('close')
		},
	},
}
</script>
