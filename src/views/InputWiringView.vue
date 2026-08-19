<script setup>
</script>

<template>
  <div class="view-container">
    <div class="nav-bar">
      <button class="back-btn" @click="$router.push('/')">← Kembali ke Utama</button>
    </div>
    
    <div class="doc-container">
      <h1>Dokumentasi Input Wiring</h1>
      <p class="description">
        Bagian ini menjelaskan bagaimana rangkaian hardware untuk <strong>Input</strong> (seperti tombol, sensor, dll) dikonfigurasi dan dihubungkan ke mikrokontroler (contohnya ESP32).
      </p>

      <div class="content-section">
        <h3>Skema Rangkaian</h3>
        <p>Pada konfigurasi <code>INPUT_PULLUP</code>, Anda hanya perlu menyambungkan pin GPIO (misal: Pin 4) ke salah satu kaki tombol, dan kaki tombol yang lain langsung disambungkan ke Ground (GND).</p>
        
        <pre class="ascii-art">
       ESP32
    ┌───────────┐
    │           │
    │ GPIO 4 ───┼─────────┐
    │           │         │
    │ GND ──────┼─────┐   │
    │           │     │   │
    └───────────┘     │   │
                      │   │
                    ┌─┴───┴─┐
                    │ BUTTON│
                    │       │
                    └───────┘
        </pre>

        <p class="inline-schema"><strong>Ringkasan Jalur:</strong> <code>ESP32 GPIO 4 ──────[ Tactile Button ]────── GND</code></p>

        <h3>Catatan Penting:</h3>
        <ul>
          <li>Tidak diperlukan resistor eksternal karena menggunakan resistor pull-up internal pada ESP32.</li>
          <li>Logika aktif: <strong>LOW</strong> (Saat tombol ditekan, arus mengalir ke Ground, tegangan di pin menjadi 0V).</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-container { padding: 2rem; display: flex; flex-direction: column; align-items: center; }
.nav-bar { width: 100%; max-width: 900px; display: flex; justify-content: flex-start; margin-bottom: 2rem; }
.back-btn { padding: 0.6rem 1.2rem; cursor: pointer; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 1rem; transition: transform 0.2s, background 0.2s; }
.back-btn:hover { background: #059669; transform: translateX(-3px); }
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
  color: #10b981;
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
  background: #e2e8f0;
  padding: 10px 15px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.inline-schema code {
  color: #059669;
  font-weight: bold;
}
</style>
