<template>
  <footer class="flex flex-col md:flex-row h-auto md:h-24 w-full bg-white dark:bg-[#1a1a1d] border-t border-gray-100 dark:border-[#212124] justify-between items-center px-6 md:px-16 py-6">
    <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
      <a href="/" class="flex items-center space-x-4 font-lily text-2xl">
        <div class="relative md:hidden">
          <img
              src="/logo.svg"
              alt="logo_image"
              class="w-12">
          <img
              src="/santa-hat.png"
              alt="santa-hat"
              class="absolute -top-6 -right-4 rotate-20"/>
        </div>
        <p>BookShelf</p>
      </a>
      <p class="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
        Відкрийте для себе світ книг та історій. Створено з любов'ю для книголюбів.
      </p>
    </div>
    <div class="flex items-center space-x-4 md:mr-12">
      <a href="https://github.com/luic1ff/Bookshelf" class="hover:text-[#7287fd] duration-300">
        <i class="ri-github-fill text-2xl"></i>
      </a>
      <a href="https://t.me/luiciff9" class="hover:text-[#7287fd] duration-300">
        <i class="ri-telegram-2-fill text-2xl"></i>
      </a>
      <a href="https://discordapp.com/users/649257622352035841/" class="hover:text-[#7287fd] duration-300">
        <i class="ri-discord-fill text-2xl"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>