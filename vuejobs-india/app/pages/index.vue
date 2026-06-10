<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-white">

    <!-- Floating logos - Left and Right side only -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      <div class="mx-auto max-w-7xl px-6 h-full flex flex-col mt-52">
        <div class="flex justify-between">
          <!-- Left side icons -->
          <div class="flex flex-col gap-36">
            <div class="flex justify-center animate-pulse opacity-30">
              <Icon icon="logos:vue" class="h-20 w-20" />
            </div>
            <div class="flex justify-center animate-pulse opacity-30">
              <Icon icon="logos:typescript-icon" class="h-20 w-20" />
            </div>
            <div class="flex justify-center animate-pulse opacity-30">
              <Icon icon="logos:pinia" class="h-20 w-20" />
            </div>
          </div>

          <!-- Right side icons -->
          <div class="flex flex-col gap-36">
            <div class="flex justify-center animate-pulse opacity-30">
              <Icon icon="logos:vitejs" class="h-20 w-20" />
            </div>
            <div class="flex justify-center animate-pulse opacity-30">
              <Icon icon="logos:nuxt-icon" class="h-20 w-20" />
            </div>
            <div class="flex justify-center animate-pulse opacity-30">
              <Icon icon="logos:tailwindcss-icon" class="h-20 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero -->
    <section class="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 pb-24 pt-12">

      <div class="mx-auto max-w-5xl text-center">

        <!-- badge -->
        <div class="inline-flex items-center rounded-full border border-green-200 bg-white px-5 py-2 shadow-lg">
          🔥 500+ Vue Jobs Available
        </div>

        <!-- Logo -->
        <div class="my-6 flex justify-center">
          <img src="../assets/images/vue.svg" class="w-32 drop-shadow-[0_0_80px_rgba(34,197,94,0.7)]" />
        </div>

        <!-- Heading -->
        <h1 class="mx-auto max-w-4xl text-5xl font-black leading-tight text-slate-900 md:text-8xl">
          Find all the
          <span class="text-green-600">Vue.js Jobs</span>

          in

          <span class="text-green-600">
            India
          </span>

          with

          <span class="text-green-600">
            VueVerse
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="mx-auto my-8 max-w-3xl text-xl leading-9 text-slate-600">
          India's dedicated Vue.js & Nuxt job portal for developers looking for their next opportunity.
        </p>

        <!-- Search -->
        <div class="mx-auto flex max-w-3xl rounded-2xl border border-green-100 bg-white p-3 shadow-2xl">
          <input
            v-model="searchedKeyWord"
            type="text"
            placeholder="Search Vue.js, Nuxt, TypeScript jobs..."
            class="flex-1 bg-transparent px-4 outline-none"
            @keydown.enter.prevent="searchJobs"
          />

          <button
            class="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-semibold text-white transition hover:scale-105"
            @click="searchJobs"
          >
            Search Jobs
          </button>
        </div>

      </div>

    </section>

    <footer class="border-t border-green-100 bg-white">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <p>© 2026 Jobs.VueVerse.in. Built with 💚 by VueVerse.</p>

        <div class="flex gap-6">
          <a href="#" class="hover:text-green-700">
            About
          </a>

          <a href="#" class="hover:text-green-700">
            Contact
          </a>

          <a href="#" class="hover:text-green-700">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

useSeoMeta({
  title: 'Vue Jobs India | Find Vue.js & Nuxt Jobs in India - VueVerse',
  description:
    'Find the latest Vue.js and Nuxt jobs in India. Discover remote, hybrid, and onsite opportunities for Vue developers. Built by VueVerse for the Vue community.',
  keywords:
    'Vue jobs India, Vue.js jobs India, Nuxt jobs India, Frontend jobs India, Vue developer jobs, Remote Vue jobs, VueVerse jobs, JavaScript jobs India, TypeScript jobs India, Vue careers',
  ogTitle: 'Vue Jobs India | Find Vue.js & Nuxt Jobs in India',
  ogDescription:
    'Discover the best Vue.js and Nuxt opportunities in India. Built by VueVerse.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'canonical',
      href: 'https://jobs.vueverse.in',
    },
  ],
})

const searchedKeyWord = ref('');

function searchJobs() {
  const keyword = searchedKeyWord.value.trim()

  if (!keyword) {
    return
  }

  navigateTo(`/jobs?query=${encodeURIComponent(keyword)}&page=1`)
}
</script>