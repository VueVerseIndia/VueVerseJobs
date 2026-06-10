<template>
  <header class="border-b border-green-100 bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="../assets/images/vueverse_logo1.png" class="h-10" alt="VueVerse logo" />

        <div>
          <h2 class="text-xl font-bold text-slate-800 sm:text-2xl">VueJobs India</h2>
        </div>
      </NuxtLink>

      <nav class="hidden gap-8 text-sm font-medium md:flex">
        <NuxtLink class="hover:text-green-600" to="/jobs">Jobs</NuxtLink>
        <a class="hover:text-green-600" href="#">Companies</a>
        <a class="hover:text-green-600" href="#">Remote Jobs</a>
      </nav>

      <div class="flex items-center gap-3">
        <button
          class="hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 font-semibold text-white transition hover:scale-105 md:inline-flex"
        >
          Sign in
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl border border-green-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-green-300 hover:text-green-700 md:hidden"
          aria-label="Toggle navigation menu"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path v-if="!isMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="border-t border-green-100 bg-white md:hidden">
      <nav class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 text-sm font-medium sm:px-6">
        <NuxtLink class="rounded-lg px-2 py-2 text-slate-700 hover:bg-green-50 hover:text-green-700" to="/jobs">Jobs</NuxtLink>
        <a class="rounded-lg px-2 py-2 text-slate-700 hover:bg-green-50 hover:text-green-700" href="#">Companies</a>
        <a class="rounded-lg px-2 py-2 text-slate-700 hover:bg-green-50 hover:text-green-700" href="#">Remote Jobs</a>
        <button class="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 font-semibold text-white text-left transition hover:scale-[1.02]">
          Sign in
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>