<template>
  <main class="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-green-100 bg-white p-6 shadow-xl shadow-green-100/60 lg:p-8">
        <div class="flex flex-col gap-6 border-b border-green-100 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">Jobs</p>
            <div>
              <h1 class="text-3xl font-black text-slate-900 md:text-4xl">Find your next Vue or Nuxt role</h1>
              <p class="mt-2 max-w-2xl text-slate-600">Search, filter, and share the exact job list you want. Every filter updates the URL so the results stay reproducible.</p>
            </div>
          </div>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-100"
            @click="resetFilters"
          >
            Clear all filters
          </button>
        </div>

        <div class="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <label class="rounded-2xl border border-green-100 bg-green-50/60 p-4 shadow-sm">
            <span class="text-sm font-semibold text-slate-700">Search keyword</span>
            <div class="mt-3 flex items-center gap-3 rounded-xl border border-green-200 bg-white p-2 shadow-sm">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Vue, Nuxt, TypeScript, React, etc."
                class="w-full border-0 bg-transparent px-3 py-2 text-slate-800 outline-none placeholder:text-slate-400"
                @keyup.enter="applySearch"
              />
              <button
                type="button"
                class="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
                @click="applySearch"
              >
                Search
              </button>
            </div>
          </label>

          <label class="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <span class="text-sm font-semibold text-slate-700">Sort jobs</span>
            <select v-model="sortBy" class="mt-3 w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-slate-800 outline-none transition focus:border-green-500 focus:bg-white">
              <option value="relevance">Most relevant</option>
              <option value="newest">Newest jobs</option>
              <option value="title">Title (A–Z)</option>
            </select>
          </label>
        </div>

        <div class="mt-6 grid gap-4 xl:grid-cols-[1fr_1fr_1fr_1fr]">
          <label class="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <span class="text-sm font-semibold text-slate-700">Location</span>
            <button
              type="button"
              class="mt-3 flex w-full items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition hover:border-green-300 hover:bg-green-100"
              @click="toggleDropdown('locations')"
            >
              <span>{{ selectedLocations.length ? `${selectedLocations.length} selected` : 'Select locations' }}</span>
              <span class="text-xs uppercase tracking-[0.25em] text-green-700">{{ dropdownOpen.locations ? 'Hide' : 'Show' }}</span>
            </button>
            <div v-if="dropdownOpen.locations" class="mt-3 rounded-2xl border border-green-100 bg-white p-3 shadow-lg">
              <input v-model="locationSearch" type="text" placeholder="Search locations" class="w-full rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm outline-none focus:border-green-400" />
              <div class="mt-3 max-h-48 space-y-2 overflow-y-auto">
                <label v-for="item in filteredLocationOptions" :key="item" class="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-sm text-slate-700 hover:bg-green-100">
                  <input v-model="selectedLocations" type="checkbox" :value="item" class="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-400" @change="resetPage" />
                  <span>{{ item }}</span>
                </label>
              </div>
            </div>
          </label>

          <label class="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <span class="text-sm font-semibold text-slate-700">Job type</span>
            <button
              type="button"
              class="mt-3 flex w-full items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition hover:border-green-300 hover:bg-green-100"
              @click="toggleDropdown('jobTypes')"
            >
              <span>{{ selectedJobTypes.length ? `${selectedJobTypes.length} selected` : 'Select job types' }}</span>
              <span class="text-xs uppercase tracking-[0.25em] text-green-700">{{ dropdownOpen.jobTypes ? 'Hide' : 'Show' }}</span>
            </button>
            <div v-if="dropdownOpen.jobTypes" class="mt-3 rounded-2xl border border-green-100 bg-white p-3 shadow-lg">
              <input v-model="jobTypeSearch" type="text" placeholder="Search job types" class="w-full rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm outline-none focus:border-green-400" />
              <div class="mt-3 max-h-48 space-y-2 overflow-y-auto">
                <label v-for="item in filteredJobTypeOptions" :key="item" class="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-sm text-slate-700 hover:bg-green-100">
                  <input v-model="selectedJobTypes" type="checkbox" :value="item" class="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-400" @change="resetPage" />
                  <span>{{ item }}</span>
                </label>
              </div>
            </div>
          </label>

          <label class="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <span class="text-sm font-semibold text-slate-700">Experience level</span>
            <button
              type="button"
              class="mt-3 flex w-full items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition hover:border-green-300 hover:bg-green-100"
              @click="toggleDropdown('experiences')"
            >
              <span>{{ selectedExperiences.length ? `${selectedExperiences.length} selected` : 'Select experience levels' }}</span>
              <span class="text-xs uppercase tracking-[0.25em] text-green-700">{{ dropdownOpen.experiences ? 'Hide' : 'Show' }}</span>
            </button>
            <div v-if="dropdownOpen.experiences" class="mt-3 rounded-2xl border border-green-100 bg-white p-3 shadow-lg">
              <input v-model="experienceSearch" type="text" placeholder="Search experience levels" class="w-full rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm outline-none focus:border-green-400" />
              <div class="mt-3 max-h-48 space-y-2 overflow-y-auto">
                <label v-for="item in filteredExperienceOptions" :key="item" class="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-sm text-slate-700 hover:bg-green-100">
                  <input v-model="selectedExperiences" type="checkbox" :value="item" class="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-400" @change="resetPage" />
                  <span>{{ item }}</span>
                </label>
              </div>
            </div>
          </label>

          <label class="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <span class="text-sm font-semibold text-slate-700">Skills</span>
            <button
              type="button"
              class="mt-3 flex w-full items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition hover:border-green-300 hover:bg-green-100"
              @click="toggleDropdown('skills')"
            >
              <span>{{ selectedSkills.length ? `${selectedSkills.length} selected` : 'Select skills' }}</span>
              <span class="text-xs uppercase tracking-[0.25em] text-green-700">{{ dropdownOpen.skills ? 'Hide' : 'Show' }}</span>
            </button>
            <div v-if="dropdownOpen.skills" class="mt-3 rounded-2xl border border-green-100 bg-white p-3 shadow-lg">
              <input
                v-model="skillSearch"
                type="text"
                placeholder="Search or type a new skill"
                class="w-full rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm outline-none focus:border-green-400"
                @keydown.enter.prevent="addSkillFromInput"
              />
              <p class="mt-2 text-xs text-slate-500">Press Enter to add a new skill that is not in the list.</p>
              <div class="mt-3 max-h-48 space-y-2 overflow-y-auto">
                <label v-for="skill in filteredSkillOptions" :key="skill" class="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-sm text-slate-700 hover:bg-green-100">
                  <input v-model="selectedSkills" type="checkbox" :value="skill" class="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-400" @change="resetPage" />
                  <span>{{ skill }}</span>
                </label>
              </div>
            </div>
          </label>
        </div>

        <div class="mt-6 flex flex-col gap-4 rounded-2xl border border-green-100 bg-green-50/70 p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <label class="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
            <input v-model="easyApplyOnly" type="checkbox" class="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-400" />
            Easy apply only
          </label>

          <div class="flex items-center gap-2 text-sm text-slate-600">
            <span class="rounded-full bg-white px-3 py-1 font-semibold text-green-800">{{ filteredJobs.length }} jobs found</span>
            <span class="rounded-full bg-white px-3 py-1">Page {{ currentPage }} of {{ totalPages || 1 }}</span>
          </div>
        </div>

        <div v-if="filteredJobs.length" class="mt-8 space-y-4">
          <article
            v-for="job in paginatedJobs"
            :key="job.id"
            class="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/60 transition hover:-translate-y-0.5 hover:border-green-300">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="space-y-3">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-green-800">{{ job.company }}</span>
                  <span v-if="job.easyApply" class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Easy apply</span>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{{ job.postedAt }}</span>
                </div>

                <div>
                  <h2 class="text-xl font-black text-slate-900">{{ job.title }}</h2>
                  <p class="mt-1 text-slate-600">{{ job.summary }}</p>
                </div>

                <div class="flex flex-wrap gap-2 text-sm text-slate-700">
                  <span class="rounded-full bg-green-50 px-3 py-1">📍 {{ job.location }}</span>
                  <span class="rounded-full bg-green-50 px-3 py-1">🧑‍💻 {{ job.jobType }}</span>
                  <span class="rounded-full bg-green-50 px-3 py-1">📈 {{ job.experience }}</span>
                  <span class="rounded-full bg-green-50 px-3 py-1">💼 {{ job.salary }}</span>
                </div>
              </div>

              <div class="w-full max-w-sm space-y-3 rounded-2xl bg-green-50 p-4 lg:text-right">
                <div class="flex flex-wrap gap-2 lg:justify-end">
                  <span v-for="skill in job.skills" :key="`${job.id}-${skill}`" class="rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">{{ skill }}</span>
                </div>

                <div>
                  <button
                    type="button"
                    class="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] lg:w-auto"
                  >
                    {{ job.easyApply ? 'Apply directly' : 'View details' }}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="mt-8 rounded-3xl border border-dashed border-green-200 bg-white p-10 text-center text-slate-600 shadow-sm">
          No jobs match this combination yet. Try removing a filter or changing the keyword.
        </div>

        <nav v-if="totalPages > 1" class="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
          <p class="text-sm text-slate-600">Showing {{ pageFrom }}–{{ pageTo }} of {{ filteredJobs.length }} jobs</p>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="rounded-xl border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              Previous
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="rounded-xl border px-3 py-2 text-sm font-semibold transition"
              :class="currentPage === page ? 'border-green-500 bg-green-600 text-white shadow-sm' : 'border-green-200 bg-white text-slate-700 hover:border-green-300 hover:bg-green-50'"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <button
              type="button"
              class="rounded-xl border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
interface Job {
  id: number
  title: string
  company: string
  location: string
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  experience: string
  salary: string
  easyApply: boolean
  postedAt: string
  skills: string[]
  summary: string
}

const jobs: Job[] = [
  { id: 1, title: 'Senior Vue Developer', company: 'LumenWorks', location: 'Bengaluru', jobType: 'Full-time', experience: 'Senior', salary: '₹25–35 LPA', easyApply: true, postedAt: '2 days ago', skills: ['Vue', 'TypeScript', 'Nuxt'], summary: 'Build high-scale dashboards and reusable component libraries for a large fintech platform.' },
  { id: 2, title: 'Nuxt Frontend Engineer', company: 'PixelForge', location: 'Remote', jobType: 'Remote', experience: 'Mid', salary: '₹16–24 LPA', easyApply: false, postedAt: '1 week ago', skills: ['Nuxt', 'Vue', 'Tailwind'], summary: 'Deliver customer-facing portals, analytics, and performance improvements for global SaaS users.' },
  { id: 3, title: 'Vue UI Engineer', company: 'InnovaHire', location: 'Hyderabad', jobType: 'Contract', experience: 'Mid', salary: '₹12–18 LPA', easyApply: true, postedAt: '3 days ago', skills: ['Vue', 'JavaScript', 'Pinia'], summary: 'Design modern UI systems and collaborate with product and design teams.' },
  { id: 4, title: 'Frontend Engineer – TypeScript', company: 'TrendGrid', location: 'Mumbai', jobType: 'Full-time', experience: 'Entry', salary: '₹8–14 LPA', easyApply: false, postedAt: '5 days ago', skills: ['TypeScript', 'Vue', 'CSS'], summary: 'Support agile delivery of internal tools and customer products for an e-commerce stack.' },
  { id: 5, title: 'Lead Nuxt Developer', company: 'Orbital Labs', location: 'Pune', jobType: 'Full-time', experience: 'Senior', salary: '₹30–40 LPA', easyApply: true, postedAt: '4 days ago', skills: ['Nuxt', 'Vue', 'Node.js'], summary: 'Lead platform engineering for next-gen digital products across multiple teams.' },
  { id: 6, title: 'Vue Consultant', company: 'BrightPath', location: 'Bengaluru', jobType: 'Part-time', experience: 'Mid', salary: '₹10–18 LPA', easyApply: true, postedAt: '6 days ago', skills: ['Vue', 'Tailwind', 'TypeScript'], summary: 'Mentor teams and implement reusable design systems for enterprise clients.' },
  { id: 7, title: 'Product Engineer (Vue)', company: 'SaasVista', location: 'Remote', jobType: 'Remote', experience: 'Entry', salary: '₹12–17 LPA', easyApply: false, postedAt: '2 days ago', skills: ['Vue', 'JavaScript', 'CSS'], summary: 'Build product dashboards, workflows, and onboarding experiences for growing startups.' },
  { id: 8, title: 'Senior Frontend Architect', company: 'CodeHorizon', location: 'Delhi', jobType: 'Full-time', experience: 'Senior', salary: '₹28–36 LPA', easyApply: true, postedAt: '1 day ago', skills: ['Vue', 'Nuxt', 'TypeScript'], summary: 'Own front-end architecture, code quality, and performance for large digital products.' },
  { id: 9, title: 'Vue Developer (Contract)', company: 'Northstar', location: 'Hybrid', jobType: 'Contract', experience: 'Mid', salary: '₹14–22 LPA', easyApply: false, postedAt: '3 days ago', skills: ['Vue', 'Pinia', 'Tailwind'], summary: 'Work on analytics dashboards and internal tooling for a global consulting client.' },
  { id: 10, title: 'Frontend Developer', company: 'Horizon Stack', location: 'Chennai', jobType: 'Full-time', experience: 'Entry', salary: '₹7–12 LPA', easyApply: true, postedAt: '1 week ago', skills: ['JavaScript', 'Vue', 'CSS'], summary: 'Join a fast-moving product and platform team building B2B experiences.' },
  { id: 11, title: 'Nuxt + TypeScript Engineer', company: 'ZealWorks', location: 'Remote', jobType: 'Remote', experience: 'Senior', salary: '₹22–30 LPA', easyApply: true, postedAt: '4 days ago', skills: ['Nuxt', 'TypeScript', 'Node.js'], summary: 'Design full-stack features with strong SSR and SEO performance goals.' },
  { id: 12, title: 'Vue QA Automation Engineer', company: 'HelixOps', location: 'Bengaluru', jobType: 'Full-time', experience: 'Mid', salary: '₹10–16 LPA', easyApply: false, postedAt: '6 days ago', skills: ['Vue', 'Testing', 'JavaScript'], summary: 'Build reliable automation for UI flows and product validation across releases.' },
  { id: 13, title: 'Frontend Intern', company: 'FreshMinds', location: 'Pune', jobType: 'Part-time', experience: 'Entry', salary: '₹4–7 LPA', easyApply: true, postedAt: '2 days ago', skills: ['Vue', 'CSS', 'TypeScript'], summary: 'Support the team with learning projects, bug fixes, and design implementation tasks.' },
  { id: 14, title: 'Senior Vue Architect', company: 'DockLine', location: 'Mumbai', jobType: 'Full-time', experience: 'Senior', salary: '₹26–35 LPA', easyApply: true, postedAt: '5 days ago', skills: ['Vue', 'Nuxt', 'Pinia'], summary: 'Guide architecture choices and mentor developers across multiple product pods.' },
  { id: 15, title: 'Growth Frontend Developer', company: 'ClickBridge', location: 'Remote', jobType: 'Contract', experience: 'Mid', salary: '₹13–19 LPA', easyApply: false, postedAt: '1 day ago', skills: ['Vue', 'Tailwind', 'TypeScript'], summary: 'Improve conversion and onboarding flows for growth-focused digital products.' },
]

const route = useRoute()
const router = useRouter()

const jobsPerPage = 10

const searchTerm = ref((route.query.query as string) || '')
const selectedLocations = ref<string[]>(normalizeMultiValue(route.query.locations || route.query.location))
const selectedJobTypes = ref<string[]>(normalizeMultiValue(route.query.jobTypes || route.query.jobType))
const easyApplyOnly = ref((route.query.easyApply as string) === 'true')
const selectedSkills = ref<string[]>(normalizeMultiValue(route.query.skills))
const selectedExperiences = ref<string[]>(normalizeMultiValue(route.query.experiences || route.query.experience))
const sortBy = ref((route.query.sort as string) || 'relevance')
const currentPage = ref(Number(route.query.page || 1))

const locationOptions = computed(() => Array.from(new Set(jobs.map((job) => job.location))))
const jobTypeOptions = ['Remote', 'Contract', 'Part-time', 'Full-time']
const experienceOptions = ['Entry', 'Mid', 'Senior']
const skillOptions = ref(['Vue', 'Nuxt', 'TypeScript', 'JavaScript', 'Pinia', 'Tailwind', 'Node.js', 'CSS'])

const dropdownOpen = ref({ locations: false, jobTypes: false, experiences: false, skills: false })
const locationSearch = ref('')
const jobTypeSearch = ref('')
const experienceSearch = ref('')
const skillSearch = ref('')

const filteredLocationOptions = computed(() =>
  locationOptions.value.filter((item) => item.toLowerCase().includes(locationSearch.value.toLowerCase()))
)
const filteredJobTypeOptions = computed(() =>
  jobTypeOptions.filter((item) => item.toLowerCase().includes(jobTypeSearch.value.toLowerCase()))
)
const filteredExperienceOptions = computed(() =>
  experienceOptions.filter((item) => item.toLowerCase().includes(experienceSearch.value.toLowerCase()))
)
const filteredSkillOptions = computed(() =>
  skillOptions.value.filter((item) => item.toLowerCase().includes(skillSearch.value.toLowerCase()))
)

const filteredJobs = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  const result = jobs.filter((job) => {
    const matchesQuery = !query || [job.title, job.company, job.location, job.summary, ...job.skills]
      .join(' ')
      .toLowerCase()
      .includes(query)

    const matchesLocation = selectedLocations.value.length === 0 || selectedLocations.value.includes(job.location)
    const matchesType = selectedJobTypes.value.length === 0 || selectedJobTypes.value.includes(job.jobType)
    const matchesEasyApply = !easyApplyOnly.value || job.easyApply
    const matchesSkills = selectedSkills.value.length === 0 || selectedSkills.value.every((skill) => job.skills.includes(skill))
    const matchesExperience = selectedExperiences.value.length === 0 || selectedExperiences.value.includes(job.experience)

    return matchesQuery && matchesLocation && matchesType && matchesEasyApply && matchesSkills && matchesExperience
  })

  const sorted = [...result]

  if (sortBy.value === 'newest') {
    return sorted.sort((first, second) => first.id - second.id)
  }

  if (sortBy.value === 'title') {
    return sorted.sort((first, second) => first.title.localeCompare(second.title))
  }

  return sorted
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredJobs.value.length / jobsPerPage)))

const paginatedJobs = computed(() => {
  const page = Math.min(currentPage.value, totalPages.value)
  const start = (page - 1) * jobsPerPage
  return filteredJobs.value.slice(start, start + jobsPerPage)
})

const pageFrom = computed(() => (filteredJobs.value.length === 0 ? 0 : (currentPage.value - 1) * jobsPerPage + 1))
const pageTo = computed(() => Math.min(currentPage.value * jobsPerPage, filteredJobs.value.length))

function toggleDropdown(name: 'locations' | 'jobTypes' | 'experiences' | 'skills') {
  dropdownOpen.value = {
    locations: false,
    jobTypes: false,
    experiences: false,
    skills: false,
    [name]: !dropdownOpen.value[name],
  }
}

function resetPage() {
  currentPage.value = 1
}

function addSkillFromInput() {
  const nextSkill = skillSearch.value.trim()

  if (!nextSkill) {
    return
  }

  const normalizedSkill = nextSkill.charAt(0).toUpperCase() + nextSkill.slice(1)

  if (!skillOptions.value.includes(normalizedSkill)) {
    skillOptions.value.unshift(normalizedSkill)
  }

  if (!selectedSkills.value.includes(normalizedSkill)) {
    selectedSkills.value = [...selectedSkills.value, normalizedSkill]
  }

  skillSearch.value = ''
  currentPage.value = 1
}

function normalizeMultiValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string' && value.trim()) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function syncRouteQuery() {
  const params: Record<string, string> = {}
  const query = searchTerm.value.trim()

  if (query) params.query = query
  if (selectedLocations.value.length) params.locations = selectedLocations.value.join(',')
  if (selectedJobTypes.value.length) params.jobTypes = selectedJobTypes.value.join(',')
  if (easyApplyOnly.value) params.easyApply = 'true'
  if (selectedSkills.value.length) params.skills = selectedSkills.value.join(',')
  if (selectedExperiences.value.length) params.experiences = selectedExperiences.value.join(',')
  if (sortBy.value !== 'relevance') params.sort = sortBy.value
  if (currentPage.value > 1) params.page = String(currentPage.value)

  router.replace({ path: '/jobs', query: params })
}

watch(
  () => route.query,
  (query) => {
    searchTerm.value = (query.query as string) || ''
    selectedLocations.value = normalizeMultiValue(query.locations || query.location)
    selectedJobTypes.value = normalizeMultiValue(query.jobTypes || query.jobType)
    easyApplyOnly.value = (query.easyApply as string) === 'true'
    selectedSkills.value = normalizeMultiValue(query.skills)
    selectedExperiences.value = normalizeMultiValue(query.experiences || query.experience)
    sortBy.value = (query.sort as string) || 'relevance'
    currentPage.value = Number(query.page || 1)
  },
  { immediate: true, deep: true }
)

watch([searchTerm, selectedLocations, selectedJobTypes, easyApplyOnly, selectedSkills, selectedExperiences, sortBy, currentPage], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }

  syncRouteQuery()
}, { deep: true })

function applySearch() {
  currentPage.value = 1
  syncRouteQuery()
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
}

function resetFilters() {
  searchTerm.value = ''
  selectedLocations.value = []
  selectedJobTypes.value = []
  easyApplyOnly.value = false
  selectedSkills.value = []
  selectedExperiences.value = []
  sortBy.value = 'relevance'
  currentPage.value = 1
  router.replace({ path: '/jobs', query: {} })
}

useSeoMeta({
  title: 'Jobs | VueJobs India',
  description: 'Browse Vue and Nuxt jobs with filters, easy apply, and shareable route query parameters.',
})
</script>
