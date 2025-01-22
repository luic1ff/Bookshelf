<template>
  <div class="relative">
    <button
        @click="$emit('toggle-filters')"
        :class="showFilters ? 'btn_out' : 'btn_reg'"
    >
      {{ showFilters ? 'Закрити' : 'Фільтри' }}
    </button>

    <transition name="fade-scale">
      <div
          v-if="showFilters"
          class="absolute top-full left-0 z-10 mt-2 w-64 h-72 overflow-y-auto rounded-lg bg-white dark:bg-[#212124] shadow-lg border dark:border-[#2a2a2d] transition-opacity duration-300"
      >
        <div class="p-3 border-b dark:border-[#2a2a2d] bg-gray-100 dark:bg-[#1a1a1d] text-sm font-semibold text-gray-800 dark:text-white">
          Выберите фильтры
        </div>

        <nav class="flex flex-col p-3 gap-2">
          <div
              v-for="(label, key) in filterLabels"
              :key="key"
              class="flex items-center gap-3 rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-[#2a2a2d] transition"
          >
            <div class="relative">
              <input
                  type="checkbox"
                  :id="key"
                  :checked="filters[key]"
                  @change="$emit('update:filters', { ...filters, [key]: $event.target.checked })"
                  class="peer hidden"
              />
              <label
                  :for="key"
                  class="flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1d] peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:ring-2 peer-checked:ring-blue-400 transition"
              >
                <svg
                    v-if="filters[key]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="white"
                    class="h-4 w-4"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </label>
            </div>

            <label
                :for="key"
                class="cursor-pointer select-none text-gray-700 dark:text-gray-300 text-sm"
            >
              {{ label }}
            </label>
          </div>
        </nav>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showFilters: Boolean,
    filters: Object,
    filterLabels: Object,
  },
};
</script>
