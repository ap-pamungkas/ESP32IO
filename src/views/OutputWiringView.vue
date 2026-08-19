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
.back-btn { padding: 0.6rem 1.2rem; cursor: pointer; background: #ef4444; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 1rem; transition: transform 0.2s, background 0.2s; }
.back-btn:hover { background: #dc2626; transform: translateX(-3px); }
.doc-container { background: white; width: 100%; max-width: 900px; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: left; }
.doc-container h1 { margin-top: 0; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; font-size: 2rem; }
.description { color: #475569; line-height: 1.6; font-size: 1.1rem; margin-bottom: 2rem; }

.content-section {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.content-section h3 {
  margin-top: 0;
  color: #334155;
}

.content-section p, .content-section ul {
  color: #475569;
  line-height: 1.6;
}

.ascii-art {
  width: 100%;
  background: #1e293b;
  color: #ef4444; /* matching the red theme for output */
  padding: 1.5rem;
  border-radius: 8px;
  font-family: 'Consolas', 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  font-weight: bold;
  overflow-x: auto;
  line-height: 1.2;
  margin: 1.5rem 0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
}

.inline-schema {
  background: #fef2f2; /* Light red tint for output theme */
  padding: 10px 15px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.inline-schema code {
  color: #dc2626; /* Dark red for output text */
  font-weight: bold;
}
</style>
