<script setup>
import { ref } from 'vue'

const codeString = `// ================================
// COMMAND
// ================================

bool buttonCommand(bool buttonState) {
  return buttonState;
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
      <h1>Documentasi Command Code</h1>
      <p class="description">
        Kode di bawah ini merupakan lapisan command logic. Bagian ini menerima state dari input dan meneruskannya (atau memodifikasinya jika perlu) untuk dieksekusi oleh output.
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
.back-btn { padding: 0.6rem 1.2rem; cursor: pointer; background: #f59e0b; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 1rem; transition: transform 0.2s, background 0.2s; }
.back-btn:hover { background: #d97706; transform: translateX(-3px); }
.doc-container { background: white; width: 100%; max-width: 900px; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: left; }
.doc-container h1 { margin-top: 0; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; font-size: 2rem; }
.description { color: #475569; line-height: 1.6; font-size: 1.1rem; margin-bottom: 2rem; }
.code-block-wrapper { background: #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.code-header { display: flex; justify-content: space-between; align-items: center; background: #334155; padding: 10px 20px; }
.lang-label { color: #cbd5e1; font-family: monospace; font-size: 0.95rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
.copy-btn { background: #475569; color: white; border: none; border-radius: 6px; padding: 8px 16px; font-size: 0.9rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s, transform 0.1s; }
.copy-btn:active { transform: scale(0.95); }
.copy-btn:hover { background: #64748b; }
.code-content { margin: 0; padding: 20px; overflow-x: auto; overflow-y: auto; max-height: 400px; color: #f8fafc; font-family: 'Consolas', 'Courier New', Courier, monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre; }
</style>
