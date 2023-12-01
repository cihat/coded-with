<script setup>
const props = defineProps(['text'])
</script>

<template>
  <p class="mt-2 opacity-50">
    <!-- This is the {{ $app.context }} page -->
    {{ props.text }}
  </p>
</template>
