<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap');

:root {
  --bg-color: #f4f9ff;
  --text-main: #334155;
  --integrated-color: #6366f1;
  --input-color: #10b981;
  --command-color: #f59e0b;
  --output-color: #ef4444;
  --wiring-in-color: #34d399;
  --wiring-out-color: #f87171;
  --main-center-bg: #1e293b;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Nunito', sans-serif;
  background-color: var(--bg-color);
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 20px 20px;
  color: var(--text-main);
}
</style>
