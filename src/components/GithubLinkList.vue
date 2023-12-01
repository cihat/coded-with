<script setup lang="ts">
const { info, isLoading } = defineProps<{
  info: GithubLinksInfo[]
  isLoading: boolean
}>()
</script>

<template>
  <main>
    <ul v-if="info.length > 0">
      <li v-for="item in info" :key="item.link">
        <a :href="item.link">{{ item.link }}</a> - {{ item.language }}
      </li>
    </ul>
    <div v-else-if="isLoading" flex items-center justify-center>
      <eos-icons:bubble-loading class="text-lg mr-2" />
      <p text-lg>
        Loading
      </p>
    </div>
    <p v-else>
      Not found github link
    </p>
  </main>
</template>
