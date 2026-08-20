<script setup>
import CodeDocument from '../components/CodeDocument.vue'
import ModuleBox from '../components/ModuleBox.vue'
import WiringBlock from '../components/WiringBlock.vue'
import { useRouter } from 'vue-router'
import { projectState, selectedInput, selectedCommand, selectedOutput } from '../state/projectState'
import { inputs } from '../data/inputs'
import { commands } from '../data/commands'
import { outputs } from '../data/outputs'

const router = useRouter()
</script>

<template>
  <div class="edu-container">
    <header class="edu-header">
      <h1>THE TINKER-DEVBOARD AND IO</h1>
      <p>Mari belajar bagaimana sistem bekerja!</p>

      <div class="control-panel">
        <div class="control-group">
          <label>INPUT</label>
          <select v-model="projectState.inputId">
            <option v-for="input in inputs" :key="input.id" :value="input.id">{{ input.name }}</option>
          </select>
        </div>
        <div class="control-group">
          <label>COMMAND</label>
          <select v-model="projectState.commandId">
            <option v-for="cmd in commands" :key="cmd.id" :value="cmd.id">{{ cmd.name }}</option>
          </select>
        </div>
        <div class="control-group">
          <label>OUTPUT</label>
          <select v-model="projectState.outputId">
            <option v-for="out in outputs" :key="out.id" :value="out.id">{{ out.name }}</option>
          </select>
        </div>
      </div>

      <div class="config-summary">
        <h2>CONFIGURATION</h2>
        <div class="config-flow">
          <div class="config-item input-item">{{ selectedInput.name }}</div>
          <div class="arrow-sym">➔</div>
          <div class="config-item command-item">{{ selectedCommand.name }}</div>
          <div class="arrow-sym">➔</div>
          <div class="config-item output-item">{{ selectedOutput.name }}</div>
        </div>
        <p class="config-description">
          {{ selectedInput.beginnerExplanation.what }}<br/>
          The {{ selectedCommand.name }} command decides whether the {{ selectedOutput.name }} should activate.
        </p>
      </div>
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
        <template v-if="selectedInput.libraries && selectedInput.libraries.length > 0">
          <div class="library-node">
            <ModuleBox typeClass="module-in" title="REQUIRED LIBRARY" />
            <div class="lib-list">
              <div v-for="lib in selectedInput.libraries" :key="lib.id">{{ lib.name }}</div>
            </div>
          </div>
          <div class="arrow">➔</div>
        </template>
        
        <ModuleBox typeClass="module-in" :title="selectedInput.name" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="cond-in" title="Input Conditioner" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="read-in" title="Input Read" />
        <div class="arrow">➔</div>
        
        <ModuleBox typeClass="cmd-box" :title="selectedCommand.name" />
        <div class="arrow">➔</div>
        
        <ModuleBox typeClass="write-out" title="Output Write" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="cond-out" title="Output Conditioner" />
        <div class="arrow">➔</div>
        <ModuleBox typeClass="module-out" :title="selectedOutput.name" />
      </div>

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800;900&display=swap');

/* Basic resets and clickable */
.clickable {
  cursor: pointer;
  transition: transform 0.1s;
}

.clickable:active {
  transform: translate(4px, 4px);
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
  background: var(--surface-color);
  padding: 1rem 2rem;
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow);
}

.edu-header h1 {
  font-size: 2.5rem;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
  font-weight: 900;
  text-transform: uppercase;
}

.edu-header p {
  font-size: 1.2rem;
  color: var(--text-main);
  font-weight: 800;
  margin: 0;
}

.control-panel {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 900;
  font-size: 1rem;
  color: var(--text-main);
}

.control-group select {
  padding: 0.5rem 1rem;
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  background: var(--surface-color);
  color: var(--text-main);
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow-sm);
  cursor: pointer;
}

.config-summary {
  margin-top: 2rem;
  background: var(--surface-color);
  padding: 1.5rem;
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow-sm);
  text-align: center;
}

.config-summary h2 {
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--text-main);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
}

.config-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.config-item {
  padding: 0.5rem 1rem;
  border: var(--border-thick);
  font-weight: 900;
  font-size: 1.1rem;
  color: var(--text-main);
}

.input-item { background: var(--input-color); }
.command-item { background: var(--command-color); }
.output-item { background: var(--output-color); }

.arrow-sym {
  color: var(--text-main);
  font-size: 1.5rem;
  font-weight: 900;
}

.config-description {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
  line-height: 1.5;
}

.diagram-board {
  background: var(--surface-color);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 1100px;
  position: relative;
  overflow: hidden;
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow);
}

/* Rows Layout */
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.level-top { margin-bottom: 1rem; }
.level-middle {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  margin-bottom: 1rem;
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
  font-weight: 900;
  color: var(--text-main);
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow-sm);
  text-align: center;
  transition: transform 0.1s, box-shadow 0.1s;
  cursor: default;
}

/* Active state for click */
.clickable .box:active, .box.clickable:active {
  transform: translate(4px, 4px) !important;
  box-shadow: none !important;
}

.integrated {
  background: var(--integrated-color);
  padding: 1rem 4rem;
  font-size: 1.8rem;
  text-transform: uppercase;
}

/* Replaced Trapezoids with Brutal Rectangles */
.trapezoid-up, .trapezoid-down {
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow);
}

.trapezoid-up {
  padding: 2rem;
  height: 100%;
}

.trapezoid-down {
  padding: 3rem;
  background: var(--surface-color);
}

.main-bg {
  width: 100%;
  min-width: 500px;
}

.wiring-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch; /* fill height */
}

.wiring-shape {
  width: 100%;
  max-width: 200px;
}

.input-wiring-bg { background: var(--wiring-in-color); }
.output-wiring-bg { background: var(--wiring-out-color); }

.wiring {
  padding: 1rem 1.5rem;
  background: var(--surface-color);
  color: var(--text-main);
}

/* Files Wrapper */
.files-wrapper {
  display: flex;
  gap: 2rem;
  z-index: 2;
}

/* Document Icon CSS - Brutalist Style */
.file-doc {
  width: 120px;
  height: 140px;
  background: var(--surface-color);
  color: var(--text-main);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: var(--border-thick);
  box-shadow: var(--brutal-shadow-sm);
  text-align: center;
  font-size: 0.9rem;
  font-weight: 800;
  transition: transform 0.1s, box-shadow 0.1s;
}

.clickable .file-doc:active {
  transform: translate(4px, 4px) !important;
  box-shadow: none !important;
}

.icon-book {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.input-file { background: var(--input-color); }
.command-file { background: var(--command-color); }
.output-file { background: var(--output-color); }

/* Bottom Boxes */
.small-box {
  width: 110px;
  height: 110px;
  font-size: 1rem;
  padding: 0.8rem;
  background: var(--surface-color); /* Overridden with specific colors */
  color: var(--text-main);
}

.arrow {
  color: var(--text-main);
  font-size: 2rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Coloring the bottom boxes */
.module-in, .cond-in, .read-in { background: var(--input-color); }
.cmd-box { background: var(--command-color); font-size: 1.2rem; }
.write-out, .cond-out, .module-out { background: var(--output-color); }

/* Responsive tweaks */
@media (max-width: 1024px) {
  .diagram-board { padding: 1.5rem; }
  .small-box { width: 90px; height: 90px; font-size: 0.8rem; padding: 0.5rem; }
  .file-doc { width: 90px; height: 110px; font-size: 0.8rem; }
  .wiring-shape { max-width: 150px; }
  .main-bg { min-width: 350px; }
  .edu-header h1 { font-size: 1.8rem; }
}
</style>
