<script setup>
defineProps({
  typeClass: String,
  title: String
})
</script>

<template>
  <div class="box small-box" :class="typeClass">
    {{ title }}
  </div>
</template>
