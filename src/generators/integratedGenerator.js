import { selectedInput, selectedCommand, selectedOutput } from '../state/projectState'

export function generateLibraries() {
  const input = selectedInput.value;
  const output = selectedOutput.value;
  const libs = [];
  
  if (input.libraries) {
    input.libraries.forEach(lib => {
      if (!libs.find(l => l.id === lib.id)) libs.push(lib);
    });
  }
  if (output.libraries) {
    output.libraries.forEach(lib => {
      if (!libs.find(l => l.id === lib.id)) libs.push(lib);
    });
  }
  
  return libs;
}

export function generateIntegratedCode() {
  const input = selectedInput.value;
  const command = selectedCommand.value;
  const output = selectedOutput.value;
  const libs = generateLibraries();

  let code = `// ========================================\n// ESP32 - ${input.name.toUpperCase()} -> ${command.name.toUpperCase()} -> ${output.name.toUpperCase()}\n// ========================================\n\n`;

  if (libs.length > 0) {
    code += `// ========================================\n// LIBRARIES\n// ========================================\n\n`;
    libs.forEach(lib => {
      code += `${lib.include}\n`;
    });
    code += `\n`;
  }

  code += `// ========================================\n// INPUT ASSIGN\n// ========================================\n\n`;
  if (input.code.includes && input.code.includes.length > 0) {
    code += input.code.includes.join('\n') + `\n\n`;
  }
  code += `${input.code.assign}\n\n`;
  code += `${input.code.read}\n\n\n`;

  code += `// ========================================\n// COMMAND\n// ========================================\n\n`;
  code += `${command.code.logic}\n\n\n`;

  code += `// ========================================\n// OUTPUT ASSIGN\n// ========================================\n\n`;
  if (output.code.includes && output.code.includes.length > 0) {
    code += output.code.includes.join('\n') + `\n\n`;
  }
  code += `${output.code.assign}\n\n`;
  code += `${output.code.write}\n\n\n`;

  code += `// ========================================\n// SETUP\n// ========================================\n\n`;
  code += `void setup() {\n  inputConnected();\n  outputConnected();\n}\n\n\n`;

  code += `// ========================================\n// LOOP\n// ========================================\n\n`;
  code += `void loop() {\n  // INPUT\n  auto inputState = readInput();\n\n  // COMMAND\n  auto cmdState = processCommand(inputState);\n\n  // OUTPUT\n  setOutput(cmdState);\n}`;

  return code;
}
