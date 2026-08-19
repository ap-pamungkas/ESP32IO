<script setup>
import CodeDocument from '../components/CodeDocument.vue'
import ModuleBox from '../components/ModuleBox.vue'
import WiringBlock from '../components/WiringBlock.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="edu-container">
    <header class="edu-header">
      <h1>THE TINKER-DEVBOARD AND IO</h1>
      <p>Mari belajar bagaimana sistem bekerja!</p>
    </header>

    <div class="diagram-board">
      
      <!-- Top Level -->
      <div class="row level-top">
        <div class="box integrated clickable" @click="router.push('/integrated')">
          Integrated Code
        </div>
      </div>

      <!-- Middle Level -->
      <div class="row level-middle">
        
        <!-- Left Wiring -->
        <div @click="router.push('/input-wiring')" class="clickable">
          <WiringBlock alignment="left" bgClass="input-wiring-bg" title="Input Wiring" />
        </div>

        <!-- Center Codes (Inverted Trapezoid) -->
        <div class="center-codes">
          <div class="trapezoid-down main-bg">
            <div class="files-wrapper">
              <div @click="router.push('/input')" class="clickable"><CodeDocument typeClass="input-file" icon="" title="Input Assign Code" /></div>
              <div @click="router.push('/command')" class="clickable"><CodeDocument typeClass="command-file" icon="" title="Command Code" /></div>
              <div @click="router.push('/output')" class="clickable"><CodeDocument typeClass="output-file" icon="" title="Output Assign Code" /></div>
            </div>
          </div>
        </div>

        <!-- Right Wiring -->
        <div @click="router.push('/output-wiring')" class="clickable">
          <WiringBlock alignment="right" bgClass="output-wiring-bg" title="Output Wiring" />
        </div>

      </div>

      <!-- Bottom Level -->
      <div class="row level-bottom">
        <ModuleBox typeClass="module-in" title="Modul Input" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="cond-in" title="Input Conditioner" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="read-in" title="Input Read" />
        <div class="arrow">➔</div>
        
        <ModuleBox typeClass="cmd-box" title="Command" />
        <div class="arrow">➔</div>
        
        <ModuleBox typeClass="write-out" title="Output Write" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="cond-out" title="Output Conditioner" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="module-out" title="Output Module" />
      </div>

    </div>
  </div>
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

.clickable {
  cursor: pointer;
  transition: transform 0.2s;
}

.clickable:hover {
  transform: scale(1.05);
}

.edu-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.edu-header {
  text-align: center;
  margin-bottom: 3rem;
}

.edu-header h1 {
  font-size: 2.5rem;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.edu-header p {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0;
}

.diagram-board {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
  position: relative;
  overflow: hidden;
  border: 4px solid #e2e8f0;
}

/* Rows Layout */
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.level-top {
  margin-bottom: 2rem;
}

.level-middle {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
}

.level-bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

/* General Boxes */
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: default;
}

.box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.integrated {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  padding: 1rem 3rem;
  font-size: 1.5rem;
  border: 3px solid #e0e7ff;
  border-radius: 100px; /* Pill shape */
}

.integrated .icon {
  margin-right: 10px;
  font-size: 1.8rem;
}

/* Trapezoids using clip-path */
.trapezoid-up {
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
}

.trapezoid-down {
  clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 60px 60px 60px;
}

.main-bg {
  background: #1e293b;
  width: 100%;
  min-width: 500px;
  position: relative;
}

.wiring-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.wiring-shape {
  width: 200px;
  height: 120px;
}

.input-wiring-bg {
  background: #d1fae5;
}
.output-wiring-bg {
  background: #fee2e2;
}

.wiring {
  padding: 0.75rem 1.5rem;
  background: white;
  color: var(--text-main);
  border: 3px solid currentColor;
  border-radius: 8px;
}
.input-wiring-bg .wiring { color: var(--input-color); }
.output-wiring-bg .wiring { color: var(--output-color); }

/* Files Wrapper */
.files-wrapper {
  display: flex;
  gap: 1.5rem;
  z-index: 2;
}

/* Document Icon CSS - Notepad Style */
.file-doc {
  width: 110px;
  height: 140px;
  background: repeating-linear-gradient(
    white, white 20px, #f1f5f9 21px, white 22px
  );
  position: relative;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 10px 10px 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  transition: transform 0.2s;
  border-top: 15px solid #334155;
}

.file-doc::after {
  content: "";
  position: absolute;
  left: 15px;
  top: 15px;
  bottom: 0;
  width: 2px;
  background-color: rgba(239, 68, 68, 0.4); /* Red line of notepad */
}

.file-doc:hover {
  transform: translateY(-5px) scale(1.05);
}

.icon-book {
  font-size: 2.2rem;
  margin-bottom: 8px;
  z-index: 1;
}

.file-text {
  z-index: 1;
  background: rgba(255, 255, 255, 0.7);
  padding: 2px 4px;
  border-radius: 4px;
}

.input-file { color: var(--input-color); border: 2px solid var(--input-color); border-top-width: 15px; }
.command-file { color: var(--command-color); border: 2px solid var(--command-color); border-top-width: 15px; }
.output-file { color: var(--output-color); border: 2px solid var(--output-color); border-top-width: 15px; }


/* Bottom Boxes */
.small-box {
  width: 110px;
  height: 110px;
  font-size: 0.9rem;
  padding: 0.8rem;
  border: 3px solid rgba(255,255,255,0.2);
}

.arrow {
  color: #94a3b8;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Coloring the bottom boxes */
.module-in { background: #059669; }
.cond-in { background: #10b981; }
.read-in { background: #34d399; }

.cmd-box { background: #f59e0b; font-size: 1.1rem; }

.write-out { background: #fb7185; }
.cond-out { background: #ef4444; }
.module-out { background: #b91c1c; }

/* Responsive tweaks */
@media (max-width: 1024px) {
  .diagram-board { padding: 1.5rem; }
  .small-box { width: 90px; height: 90px; font-size: 0.75rem; padding: 0.5rem; }
  .file-doc { width: 75px; height: 100px; font-size: 0.7rem; }
  .wiring-shape { width: 150px; height: 100px; }
  .main-bg { min-width: 350px; }
}
</style>
