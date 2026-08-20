import { reactive, computed } from 'vue'
import { inputs } from '../data/inputs'
import { commands } from '../data/commands'
import { outputs } from '../data/outputs'

export const projectState = reactive({
  inputId: 'button',
  commandId: 'on-off',
  outputId: 'led'
})

export const selectedInput = computed(() => {
  return inputs.find(i => i.id === projectState.inputId) || inputs[0]
})

export const selectedCommand = computed(() => {
  return commands.find(c => c.id === projectState.commandId) || commands[0]
})

export const selectedOutput = computed(() => {
  return outputs.find(o => o.id === projectState.outputId) || outputs[0]
})
