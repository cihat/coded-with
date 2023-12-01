<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import LinkExtractor from '../logic/LinkExtractor'

const state = reactive({
  info: [] as GithubLinksInfo[],
})

onMounted(async () => {
  const links = Array.from(document.links) as LinkType[]
  const repos = new LinkExtractor(links)
  await repos.getGithubLinks()

  state.info.push(...repos.githubLinksInfo)
})
</script>

<template>
  <main>
    <ul v-if="state.info.length > 0">
      <li v-for="i in state.info" :key="i.link">
        <a :href="i.link">{{ i.link }}</a>
        - {{ i.language }}
      </li>
    </ul>
    <p v-else>
      Not found github link
    </p>
  </main>
</template>
