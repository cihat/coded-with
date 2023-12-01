<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { reactive, ref, watch } from 'vue'
import LinkExtractor from '~/logic/LinkExtractor'

const isLoading = ref(false)
const { info } = reactive({
  info: [] as GithubLinksInfo[],
})
const [show, toggle] = useToggle(false)

watch(show, async () => {
  if (show.value && info.length === 0) {
    const links = Array.from(document.links) as LinkType[]
    const repos = new LinkExtractor(links)

    isLoading.value = true

    await repos.getGithubLinks()
      .then(() => {
        info.push(...repos.githubLinksInfo)
      })
      .catch((error) => {
        console.error('Error fetching Github links:', error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
})
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min" p="x-4 y-2" m="y-auto r-2"
      transition="opacity duration-300" :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg">
        Codificato
      </h1>
      <SharedSubtitle title="Github Links" />
      <GithubLinkList :info="info" :is-loading="isLoading" />
    </div>
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none" bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <grommet-icons:github class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
