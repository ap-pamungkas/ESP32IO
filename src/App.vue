<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.body.classList.add('dark-mode')
  }
})

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.body.classList.add('dark-mode')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
  }
})
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme">
    {{ isDarkMode ? '🌞 Colorful Mode' : '🌙 Dark Mode' }}
  </button>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap');

:root {
  /* Surface and Text Colors */
  --bg-color: #fef08a; /* Bright yellow */
  --text-main: #000000;
  --text-inverted: #ffffff;
  --surface-color: #ffffff;
  --shadow-color: #000000;
  --grid-color: #cbd5e1;
  
  /* Brutalist Shapes */
  --border-thick: 4px solid var(--text-main);
  --border-thin: 2px solid var(--text-main);
  --brutal-shadow: 6px 6px 0px var(--shadow-color);
  --brutal-shadow-sm: 4px 4px 0px var(--shadow-color);
  
  /* Feature Colors */
  --integrated-color: #fca5a5;
  --input-color: #86efac;
  --command-color: #fde047;
  --output-color: #93c5fd;
  --wiring-in-color: #bef264;
  --wiring-out-color: #c4b5fd;
  
  /* Code specific */
  --code-bg: #1e293b;
  --code-text: #10b981;
}

body.dark-mode {
  --bg-color: #000000;
  --text-main: #ffffff;
  --text-inverted: #000000;
  --surface-color: #000000;
  --shadow-color: #ffffff;
  --grid-color: #333333;
  
  --border-thick: 4px solid var(--text-main);
  --border-thin: 2px solid var(--text-main);
  --brutal-shadow: 6px 6px 0px var(--shadow-color);
  --brutal-shadow-sm: 4px 4px 0px var(--shadow-color);
  
  --integrated-color: #000000;
  --input-color: #000000;
  --command-color: #000000;
  --output-color: #000000;
  --wiring-in-color: #000000;
  --wiring-out-color: #000000;
  
  --code-bg: #000000;
  --code-text: #ffffff;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Nunito', sans-serif;
  background-color: var(--bg-color);
  background-image: 
    linear-gradient(var(--grid-color) 2px, transparent 2px),
    linear-gradient(90deg, var(--grid-color) 2px, transparent 2px);
  background-size: 40px 40px;
  background-position: -1px -1px;
  color: var(--text-main);
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  background: var(--surface-color);
  color: var(--text-main);
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow-sm);
  font-weight: 900;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: transform 0.1s;
}

.theme-toggle:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}
</style>
