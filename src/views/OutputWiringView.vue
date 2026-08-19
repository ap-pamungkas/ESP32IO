<script setup>
</script>

<template>
  <div class="view-container">
    <div class="nav-bar">
      <button class="back-btn" @click="$router.push('/')">← Kembali ke Utama</button>
    </div>
    
    <div class="doc-container">
      <h1>Dokumentasi Output Wiring</h1>
      <p class="description">
        Bagian ini menjelaskan bagaimana rangkaian hardware untuk <strong>Output</strong> (seperti LED, Relay, Motor, dll) dikonfigurasi dan dihubungkan ke mikrokontroler.
      </p>

      <div class="content-section">
        <h3>Skema Rangkaian</h3>
        <p>Sebagai contoh pada penggunaan LED, pin GPIO (misal: Pin 2) dihubungkan ke kutub positif (Anoda) LED melalui sebuah resistor pembatas arus, kemudian kutub negatif (Katoda) LED dihubungkan ke Ground (GND).</p>
        
        <pre class="ascii-art">
GPIO 2 ─── Resistor 220Ω ─── Anoda LED
                              │
                              ▼
                           LED
                              │
                              ▼
                          Katoda LED
                              │
                              ▼
                             GND
        </pre>

        <p class="inline-schema"><strong>Ringkasan Jalur:</strong> <code>GPIO 2 ───[ Resistor 220Ω ]───[ LED ]─── GND</code></p>

        <h3>Catatan Penting:</h3>
        <ul>
          <li>Jangan lupa menggunakan resistor (misal 220 Ohm atau 330 Ohm) secara seri dengan LED untuk mencegah kerusakan akibat arus berlebih.</li>
          <li>Logika aktif: <strong>HIGH</strong> (Saat pin diset ke tegangan tinggi/3.3V, arus akan mengalir dan menghidupkan perangkat output).</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.view-container { padding: 2rem; display: flex; flex-direction: column; align-items: center; }
.nav-bar { width: 100%; max-width: 900px; display: flex; justify-content: flex-start; margin-bottom: 2rem; }
.back-btn { 
  padding: 0.6rem 1.2rem; cursor: pointer; 
  background: var(--wiring-out-color); color: var(--text-main); 
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
  background: var(--output-color); padding: 10px 15px; border: var(--border-thick);
  display: inline-block; margin-bottom: 1.5rem; box-shadow: 2px 2px 0px var(--shadow-color);
  color: var(--text-main);
}
.inline-schema code { color: var(--text-main); font-weight: 900; }
</style>
