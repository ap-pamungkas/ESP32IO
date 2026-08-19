<script setup>
import { ref } from 'vue'

const codeString = `// ================================
// OUTPUT ASSIGN
// ================================

const int LED_PIN = 2;

void outputConnected() {
  pinMode(LED_PIN, OUTPUT);
}

void setLED(bool state) {
  digitalWrite(LED_PIN, state ? HIGH : LOW);
}`

const isCopied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(codeString)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}
</script>

<template>
  <div class="view-container">
    <div class="nav-bar">
      <button class="back-btn" @click="$router.push('/')">← Kembali ke Utama</button>
    </div>
    
    <div class="doc-container">
      <h1>Documentasi Output Assign Code</h1>
      <p class="description">
        Kode di bawah ini mengatur perangkat output, dalam contoh ini adalah LED. Pin diinisialisasi sebagai <code>OUTPUT</code> dan perintah <code>digitalWrite</code> digunakan untuk mengubah status LED.
      </p>

      <div class="code-block-wrapper">
        <div class="code-header">
          <span class="lang-label">cpp</span>
          <button class="copy-btn" @click="copyCode">
            <span v-if="!isCopied">📋 Copy Code</span>
            <span v-else>✅ Copied!</span>
          </button>
        </div>
        <pre class="code-content"><code>{{ codeString }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>

.view-container { padding: 2rem; display: flex; flex-direction: column; align-items: center; }
.nav-bar { width: 100%; max-width: 900px; display: flex; justify-content: flex-start; margin-bottom: 2rem; }
.back-btn { 
  padding: 0.6rem 1.2rem; cursor: pointer; 
  background: var(--output-color); color: var(--text-main); 
  border: var(--border-thick); 
  box-shadow: var(--brutal-shadow-sm); 
  font-weight: 900; font-size: 1rem; 
  transition: transform 0.1s, box-shadow 0.1s; 
}
.back-btn:active { transform: translate(4px, 4px); box-shadow: none; }
.doc-container { 
  background: var(--surface-color); width: 100%; max-width: 900px; padding: 2.5rem; 
  border: var(--border-thick); box-shadow: var(--brutal-shadow); 
  text-align: left; 
}
.doc-container h1 { margin-top: 0; color: var(--text-main); border-bottom: var(--border-thick); padding-bottom: 12px; font-size: 2.2rem; font-weight: 900; text-transform: uppercase; }
.description { color: var(--text-main); font-weight: 700; line-height: 1.6; font-size: 1.2rem; margin-bottom: 2rem; }
.code-block-wrapper { 
  background: var(--code-bg); 
  border: var(--border-thick); 
  box-shadow: var(--brutal-shadow-sm); 
  overflow: hidden; 
}
.code-header { display: flex; justify-content: space-between; align-items: center; background: var(--grid-color); border-bottom: var(--border-thick); padding: 10px 20px; }
.lang-label { color: var(--text-main); font-family: monospace; font-size: 1.1rem; font-weight: 900; text-transform: uppercase; }
.copy-btn { 
  background: var(--surface-color); color: var(--text-main); border: var(--border-thick); 
  box-shadow: 2px 2px 0px var(--shadow-color); 
  padding: 6px 12px; font-size: 0.9rem; font-weight: 900; cursor: pointer; 
  transition: transform 0.1s; 
}
.copy-btn:active { transform: translate(2px, 2px); box-shadow: none; }
.code-content { margin: 0; padding: 20px; overflow-x: auto; overflow-y: auto; max-height: 400px; color: var(--code-text); font-family: 'Consolas', 'Courier New', Courier, monospace; font-size: 1rem; font-weight: bold; line-height: 1.5; white-space: pre; }

/* Specific to Wiring Views */
.content-section {
  background: var(--surface-color);
  padding: 1.5rem;
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow-sm);
}
.content-section h3 { margin-top: 0; color: var(--text-main); font-weight: 900; text-transform: uppercase; }
.content-section p, .content-section ul { color: var(--text-main); font-weight: 700; line-height: 1.6; font-size: 1.1rem; }
.ascii-art {
  width: 100%; background: var(--code-bg); color: var(--code-text);
  padding: 1.5rem; border: var(--border-thick);
  font-family: 'Consolas', 'Courier New', Courier, monospace;
  font-size: 1.2rem; font-weight: bold; overflow-x: auto;
  line-height: 1.2; margin: 1.5rem 0;
}
.inline-schema {
  background: var(--surface-color); padding: 10px 15px; border: var(--border-thick);
  display: inline-block; margin-bottom: 1.5rem; box-shadow: 2px 2px 0px var(--shadow-color);
  color: var(--text-main);
}
.inline-schema code { color: var(--text-main); font-weight: 900; }
</style>
