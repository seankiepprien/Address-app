<template>
  <div id="app">
    <nav class="m-auto flex flex-col text-center p-4">
      <router-link to="/" class="font-bold text-4xl border-b-2 pb-2">Fullstack App</router-link>
      <div class="flex flex-col mt-5">
        <li class="list-none">
          <router-link to="/addresses" class="text-blue-400 hover:text-blue-800 transition-all text-3xl p-2">Addresses</router-link>
        </li>
        <li class="list-none mt-2">
          <router-link to="/add" class="text-blue-400 hover:text-blue-800 transition-all text-3xl p-2">Add</router-link>
        </li>
      </div>
    </nav>
    <header>
    </header>
    <main class="flex mt-3">
      <router-view />
    </main>
  </div>
</template>
