<script setup>
defineProps({
  typeClass: String,
  icon: String,
  title: String
})
</script>

<template>
  <div class="file-doc" :class="typeClass">
    <div class="icon-book">{{ icon }}</div>
    <div class="file-text">{{ title }}</div>
  </div>
</template>
