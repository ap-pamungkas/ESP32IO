# ESP32IO — Dynamic Module Refactoring Plan

## 1. Context

This project is an existing Vue/Vite application called ESP32IO.

Repository:

https://github.com/ap-pamungkas/ESP32IO

The application is already implemented and deployed.

IMPORTANT:

This is NOT a new project.

Do NOT rebuild the application from scratch.

Do NOT replace the current UI with a new UI.

The goal is to CONTINUE and REFACTOR the existing implementation.

The existing application already contains:

- Home page
- Input documentation
- Input wiring
- Command documentation
- Output documentation
- Output wiring
- Integrated Arduino code
- Reusable UI components
- Router
- Existing visual design
- Existing Button → Command → LED example

The main task is to make the existing system dynamic.

---

# 2. Existing Architecture

The current application concept is:

INPUT
↓
COMMAND
↓
OUTPUT

The current documentation flow includes:

- Input Code
- Input Wiring
- Command Code
- Output Code
- Output Wiring
- Integrated Code

The current default example is:

Tactile Button
↓
Button Command
↓
LED

This existing behavior must remain working after the refactor.

---

# 3. Main Objective

Convert the existing static module documentation into a dynamic module system.

The user should be able to select:

INPUT
+
COMMAND
+
OUTPUT

and the entire application should automatically adapt.

Changing a module must update:

- Module name
- Module description
- Pin assignment
- Wiring
- Required libraries
- Input code
- Command code
- Output code
- Integrated Arduino code
- Beginner explanation
- Home page diagram

The user should NOT need to manually edit Arduino code.

---

# 4. DO NOT START FROM ZERO

Before writing code:

1. Inspect the existing repository.
2. Inspect existing Vue components.
3. Inspect existing views.
4. Inspect router.
5. Inspect existing state/data flow.
6. Inspect CSS and visual design.
7. Identify existing hard-coded Button / LED logic.
8. Identify reusable components that can remain unchanged.
9. Identify only the files that need refactoring.

Do not delete working functionality unless absolutely necessary.

Prefer incremental refactoring.

---

# 5. Existing Components Must Be Reused

The existing project already contains reusable components such as:

- CodeDocument
- ModuleBox
- WiringBlock

Reuse these components whenever possible.

Do not create duplicate components such as:

ButtonCode.vue
DHT22Code.vue
LEDCode.vue
BuzzerCode.vue

Instead, use:

InputCodeView.vue

with dynamic data.

Likewise:

InputWiringView.vue
OutputCodeView.vue
OutputWiringView.vue

must become dynamic.

---

# 6. Target Architecture

The target architecture is:

User Selection
        ↓
Project State
        ↓
Module Registry
        ↓
Dependency Resolver
        ↓
Generators
        ↓
Dynamic Documentation

The application should have a centralized project configuration.

Example:

const project = {
  input: {
    moduleId: "button"
  },

  command: {
    moduleId: "on-off"
  },

  output: {
    moduleId: "led"
  }
}

This project configuration becomes the single source of truth.

---

# 7. Module Registry

Create a centralized module registry.

Suggested structure:

src/
├── data/
│   ├── inputs/
│   ├── commands/
│   └── outputs/
│
├── generators/
│   ├── inputGenerator.js
│   ├── commandGenerator.js
│   ├── outputGenerator.js
│   ├── wiringGenerator.js
│   ├── libraryGenerator.js
│   └── integratedGenerator.js
│
└── state/
    └── projectState.js

The exact folder names can be adapted to the existing project architecture.

Do NOT blindly create this structure if an equivalent existing structure already exists.

Reuse existing patterns where appropriate.

---

# 8. Input Modules

Initial input modules:

## 8.1 Tactile Button

Type:

input

Default pin:

GPIO 4

Behavior:

Digital input.

Recommended default wiring:

GPIO 4
↓
Tactile Button
↓
GND

Use:

INPUT_PULLUP

No external library required.

---

## 8.2 Motion Switch

Type:

input

Default pin:

GPIO 27

Behavior:

Digital input.

Example:

digitalRead()

No external library required.

---

## 8.3 Potentiometer

Type:

input

Default pin:

GPIO 34

Behavior:

Analog input.

Example:

analogRead()

No external library required.

The module should expose its raw value to the command layer.

---

## 8.4 DHT22

Type:

input

Default data pin:

GPIO 15

Behavior:

Temperature and humidity sensor.

This module requires a library.

Example dependency:

DHT sensor library

The module definition must contain its required library information.

---

# 9. Command Modules

Initial command modules:

## 9.1 ON/OFF

Input:

boolean

Output:

boolean

Example:

input
↓
ON/OFF
↓
output

---

## 9.2 Threshold

Used for values such as:

- potentiometer
- temperature
- humidity

Example:

value > threshold

The threshold should be configurable.

Example:

30°C

or:

2000 ADC

---

## 9.3 AND

Example:

Button AND Motion
↓
Output

---

## 9.4 OR

Example:

Button OR Motion
↓
Output

---

# 10. Output Modules

Initial output modules:

## 10.1 LED

Default pin:

GPIO 2

Digital output.

No external library.

---

## 10.2 Buzzer

Default pin:

GPIO 5

Digital output.

No external library for the basic implementation.

---

## 10.3 Motor Driver

Use a simple digital control initially.

Default control pin:

GPIO 18

The initial implementation should keep the motor driver simple.

Do not implement advanced PWM or speed control unless required by the existing application.

---

## 10.4 MAX7219 8x32 LED Matrix

This module requires a library.

Example:

MD_MAX72XX

The module definition must specify:

- library
- data pin
- clock pin
- chip select pin
- matrix size
- code template
- wiring

---

# 11. Module Data Schema

Every module should contain enough information to generate its documentation.

Example:

const buttonModule = {
  id: "button",

  name: "Tactile Button",

  category: "input",

  description:
    "A simple digital input button.",

  defaultPins: {
    signal: 4
  },

  wiring: [
    {
      from: "GPIO 4",
      to: "Button Signal"
    },
    {
      from: "Button GND",
      to: "GND"
    }
  ],

  libraries: [],

  code: {
    includes: [],
    assign: "...",
    read: "..."
  },

  beginnerExplanation: {
    what: "...",
    wiring: "...",
    code: "..."
  }
}

The exact schema may be improved during implementation.

The important requirement is:

A module must contain its own metadata.

---

# 12. Library / Dependency System

This is an important requirement.

Modules may declare dependencies.

Example:

DHT22:

libraries: [
  {
    id: "dht",
    name: "DHT sensor library",
    include: "#include <DHT.h>"
  }
]

MAX7219:

libraries: [
  {
    id: "md-max72xx",
    name: "MD_MAX72XX",
    include: "#include <MD_MAX72xx.h>"
  }
]

The application must automatically collect dependencies from:

INPUT
COMMAND
OUTPUT

Example:

Input:
DHT22

Command:
Threshold

Output:
Buzzer

Result:

Required Libraries:

DHT sensor library

---

# 13. Dynamic Library Node

When a selected module requires a library, display a new documentation node.

Example:

┌─────────────────────────────┐
│ REQUIRED LIBRARY            │
│                             │
│ DHT sensor library          │
│                             │
│ Arduino Library Manager     │
└─────────────────────────────┘

↓

┌─────────────────────────────┐
│ INPUT WIRING                │
│ DHT22                       │
└─────────────────────────────┘

If no module requires a library:

Do not display the library node.

If multiple modules use the same library:

Display the library only once.

---

# 14. Dynamic Wiring

Current wiring documentation must be refactored.

Do NOT hard-code:

Button wiring
LED wiring

inside the Vue view.

Instead:

selected module
↓
module metadata
↓
wiring renderer

Example:

Button:

GPIO 4 → Button → GND

DHT22:

3.3V → VCC
GPIO 15 → DATA
GND → GND

Potentiometer:

3.3V → VCC
GPIO 34 → SIGNAL
GND → GND

LED:

GPIO 2 → 220Ω → LED → GND

---

# 15. Dynamic Code Documentation

The following existing pages must remain:

InputCodeView
CommandCodeView
OutputCodeView
IntegratedCodeView

But their content must become dynamic.

They should NOT contain module-specific hard-coded code strings.

Instead:

View
↓
Selected Module
↓
Generator
↓
Rendered Code

---

# 16. Code Generator

Create reusable generator functions.

Input generator:

generateInputCode(module)

Command generator:

generateCommandCode(module, input)

Output generator:

generateOutputCode(module)

Library generator:

generateLibraries(input, command, output)

Wiring generator:

generateWiring(input, output)

Integrated generator:

generateIntegratedCode(project)

---

# 17. Arduino Code Structure

Generated code should maintain the educational structure already used by ESP32IO.

The generated code should be organized as:

// LIBRARIES

// INPUT ASSIGN

// COMMAND

// OUTPUT ASSIGN

// SETUP

// LOOP

Example:

// LIBRARIES

#include <DHT.h>


// INPUT ASSIGN

...


 // COMMAND

...


 // OUTPUT ASSIGN

...


 // SETUP

...


 // LOOP

...

This structure is important for beginner education.

---

# 18. Integrated Code Flow

The integrated code must always represent:

INPUT
↓
COMMAND
↓
OUTPUT

Example:

bool input = readButton();

bool command = buttonCommand(input);

setLED(command);

For DHT22:

float temperature = readTemperature();

bool command =
  temperatureCommand(temperature);

setBuzzer(command);

---

# 19. Dynamic Home Diagram

The existing HomeView diagram must become dynamic.

Current example:

Tactile Button
↓
Command
↓
LED

After selecting:

DHT22
↓
Temperature Threshold
↓
Buzzer

the diagram must automatically become:

DHT22
↓
Temperature > 30°C
↓
Buzzer

If a library is required, optionally display:

DHT22
↓
Library
↓
Input
↓
Command
↓
Output

The visual design should remain consistent with the current application.

---

# 20. Select / Option UI

The Input and Output module selection must be dynamic.

Example:

INPUT

<select>
  Tactile Button
  Motion Switch
  Potentiometer
  DHT22
</select>

COMMAND

<select>
  ON/OFF
  Threshold
  AND
  OR
</select>

OUTPUT

<select>
  LED
  Buzzer
  Motor Driver
  MAX7219 8x32
</select>

The exact UI should reuse the existing project design.

Do not introduce a completely different design system.

---

# 21. Selection State

When the user changes:

INPUT

the selected module must update the central project state.

The same state must be consumed by:

- HomeView
- InputCodeView
- InputWiringView
- CommandCodeView
- OutputCodeView
- OutputWiringView
- IntegratedCodeView

No page should maintain its own independent module selection.

---

# 22. Preserve Current Default State

When the application starts:

INPUT:

Tactile Button

COMMAND:

ON/OFF

OUTPUT:

LED

The existing application should look and behave approximately as it does now.

This is important for backward compatibility.

---

# 23. Existing UI Preservation

Do NOT redesign the entire application.

Preserve:

- current layout
- brutalist visual style
- color semantics
- thick borders
- shadows
- typography
- educational presentation
- existing navigation
- existing page structure

Only make the data and documentation dynamic.

---

# 24. Refactoring Rules

Avoid:

- duplicated module components
- duplicated code templates
- hard-coded wiring in views
- hard-coded libraries in views
- hard-coded module names
- hard-coded pin information in multiple places

Prefer:

- module registry
- reusable generators
- centralized project state
- reusable components
- declarative module definitions

---

# 25. Pin Management

Initially use default pins.

Display them clearly.

Example:

Tactile Button
GPIO 4

LED
GPIO 2

DHT22
GPIO 15

MAX7219:

DATA → GPIO 23
CLK → GPIO 18
CS → GPIO 21

Future support for user-configurable pins can be added later.

Do NOT over-engineer pin configuration in the first implementation.

---

# 26. Documentation Requirements

Each selected module should be able to generate:

## What is it?

Simple explanation.

## How does it work?

Simple explanation.

## Wiring

Pin-to-pin explanation.

## Required Library

Only when needed.

## Input/Output Code

Generated Arduino code.

## Beginner Notes

Explain important Arduino concepts such as:

pinMode()
digitalRead()
digitalWrite()
analogRead()
INPUT_PULLUP()

Only show explanations relevant to the selected module.

---

# 27. Example Scenarios

The implementation must support at least these combinations.

### Scenario 1

Button
↓
ON/OFF
↓
LED

Expected:

No external library.

---

### Scenario 2

Motion
↓
ON/OFF
↓
Buzzer

Expected:

No external library.

---

### Scenario 3

Potentiometer
↓
Threshold
↓
LED

Expected:

No external library.

---

### Scenario 4

DHT22
↓
Threshold
↓
Buzzer

Expected:

DHT library node appears.

---

### Scenario 5

Button
↓
ON/OFF
↓
MAX7219

Expected:

MAX7219 library node appears.

---

### Scenario 6

DHT22
↓
Threshold
↓
MAX7219

Expected:

Both DHT and MAX7219 dependencies appear.

Duplicate libraries must be removed.

---

# 28. Development Phases

Do not implement all features simultaneously.

## Phase 1 — Audit

Inspect the existing project.

Deliver:

- current architecture summary
- files that need modification
- files that can remain unchanged
- current hard-coded areas

Do not modify code yet.

---

## Phase 2 — Module Registry

Create:

Input modules
Command modules
Output modules

Do not modify all views yet.

Verify that module data can be imported.

---

## Phase 3 — Project State

Create centralized selection state.

Default:

button
+
on-off
+
led

Verify all views can access the state.

---

## Phase 4 — Dynamic Input

Refactor:

InputCodeView
InputWiringView

to consume selected input module.

Test:

Button
Motion
Potentiometer
DHT22

---

## Phase 5 — Dynamic Output

Refactor:

OutputCodeView
OutputWiringView

Test:

LED
Buzzer
Motor Driver
MAX7219

---

## Phase 6 — Dynamic Command

Refactor:

CommandCodeView

Test:

ON/OFF
Threshold
AND
OR

---

## Phase 7 — Dependency System

Implement:

Library registry
Dependency collection
Duplicate removal
Dynamic library node

---

## Phase 8 — Integrated Generator

Generate:

Libraries
Input
Command
Output
Setup
Loop

from one project configuration.

---

## Phase 9 — HomeView

Make the existing diagram reflect selected modules.

---

## Phase 10 — Validation

Test all initial combinations.

---

# 29. Acceptance Criteria

The refactor is considered successful when:

- [ ] Existing application still runs.
- [ ] Existing UI style is preserved.
- [ ] Default Button → ON/OFF → LED still works.
- [ ] Input can be changed through select/option.
- [ ] Output can be changed through select/option.
- [ ] Command can be changed through select/option.
- [ ] Input documentation changes automatically.
- [ ] Input wiring changes automatically.
- [ ] Command documentation changes automatically.
- [ ] Output documentation changes automatically.
- [ ] Output wiring changes automatically.
- [ ] Integrated Arduino code changes automatically.
- [ ] Required libraries are detected automatically.
- [ ] Library documentation appears only when required.
- [ ] Duplicate libraries are removed.
- [ ] HomeView reflects selected modules.
- [ ] No module-specific duplicate Vue pages are required.
- [ ] No major UI rewrite occurs.

---

# 30. Important Instruction for AI Coding Agent

You are extending an existing project.

DO NOT:

- recreate the project
- replace Vue/Vite
- rewrite all components
- redesign the UI
- remove existing pages
- replace the current architecture without justification

DO:

- inspect first
- reuse existing code
- refactor incrementally
- preserve current behavior
- preserve current UI
- make the data dynamic
- centralize module definitions
- centralize project state
- build reusable generators

Before every major phase:

1. Explain what will change.
2. Identify affected files.
3. Implement the smallest safe change.
4. Verify the existing application still works.
5. Continue to the next phase.

---

# 31. Definition of Done

ESP32IO should behave as a visual ESP32 learning environment where users can construct:

INPUT
+
COMMAND
+
OUTPUT

without manually modifying Arduino source code.

The selected modules become the source of truth for:

- wiring
- documentation
- dependencies
- Arduino code
- integrated code
- beginner explanations
- visual diagrams

The system should feel like assembling educational blocks rather than writing Arduino code manually.