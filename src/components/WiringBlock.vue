<script setup>
defineProps({
  bgClass: String,
  title: String,
  alignment: String // 'left' or 'right'
})
</script>

<template>
  <div class="wiring-container" :class="alignment">
    <div class="trapezoid-up wiring-shape" :class="bgClass">
      <div class="box wiring">{{ title }}</div>
    </div>
  </div>
</template>
