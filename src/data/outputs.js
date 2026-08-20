export const outputs = [
  {
    id: "led",
    name: "LED",
    category: "output",
    description: "Lampu LED sederhana.",
    defaultPins: {
      signal: 2
    },
    wiring: [
      { from: "GPIO 2", to: "Resistor 220Ω" },
      { from: "Resistor 220Ω", to: "Anoda LED (+)" },
      { from: "Katoda LED (-)", to: "GND" }
    ],
    libraries: [],
    code: {
      includes: [],
      assign: "const int LED_PIN = 2;\n\nvoid outputConnected() {\n  pinMode(LED_PIN, OUTPUT);\n}",
      write: "void setOutput(bool state) {\n  digitalWrite(LED_PIN, state ? HIGH : LOW);\n}"
    },
    beginnerExplanation: {
      what: "Komponen yang dapat memancarkan cahaya saat dialiri arus listrik.",
      wiring: "Sambungkan GPIO ke resistor 220 Ohm, lalu ke kaki panjang (Anoda) LED. Kaki pendek (Katoda) ke Ground.",
      code: "Pin diatur sebagai OUTPUT. Perintah digitalWrite() digunakan untuk mengirim sinyal HIGH (nyala) atau LOW (mati).",
      wiringSchema: "ESP32 GPIO 2 ───[ Resistor 220Ω ]───[ LED ]─── GND",
      asciiArt: `GPIO 2 ─── Resistor 220Ω ─── Anoda LED
                              │
                              ▼
                           LED
                              │
                              ▼
                          Katoda LED
                              │
                              ▼
                             GND`
    }
  },
  {
    id: "buzzer",
    name: "Buzzer",
    category: "output",
    description: "Modul penghasil suara sederhana.",
    defaultPins: {
      signal: 5
    },
    wiring: [
      { from: "GPIO 5", to: "Positif Buzzer (+)" },
      { from: "GND", to: "Negatif Buzzer (-)" }
    ],
    libraries: [],
    code: {
      includes: [],
      assign: "const int BUZZER_PIN = 5;\n\nvoid outputConnected() {\n  pinMode(BUZZER_PIN, OUTPUT);\n}",
      write: "void setOutput(bool state) {\n  digitalWrite(BUZZER_PIN, state ? HIGH : LOW);\n}"
    },
    beginnerExplanation: {
      what: "Komponen untuk menghasilkan bunyi (beep).",
      wiring: "Pin positif buzzer ke GPIO 5, pin negatif ke Ground.",
      code: "Seperti LED, buzzer diatur sebagai OUTPUT dan dikontrol dengan digitalWrite() untuk menyalakan/mematikan.",
      wiringSchema: "ESP32 GPIO 5 ───[ Buzzer ]─── GND",
      asciiArt: `GPIO 5 ─── Positif Buzzer
                  │
                  ▼
                Buzzer
                  │
                  ▼
                 GND`
    }
  },
  {
    id: "motor",
    name: "Motor Driver",
    category: "output",
    description: "Penggerak motor DC secara digital (ON/OFF).",
    defaultPins: {
      signal: 18
    },
    wiring: [
      { from: "GPIO 18", to: "IN1 (Driver)" },
      { from: "GND", to: "GND (Driver)" },
      { from: "Driver Motor", to: "Motor DC" }
    ],
    libraries: [],
    code: {
      includes: [],
      assign: "const int MOTOR_PIN = 18;\n\nvoid outputConnected() {\n  pinMode(MOTOR_PIN, OUTPUT);\n}",
      write: "void setOutput(bool state) {\n  digitalWrite(MOTOR_PIN, state ? HIGH : LOW);\n}"
    },
    beginnerExplanation: {
      what: "Modul yang digunakan untuk mengontrol putaran Motor DC dari sinyal mikrokontroler.",
      wiring: "Hubungkan pin kontrol driver ke GPIO 18 dan pastikan GND tersambung bersama.",
      code: "Menggunakan sinyal digital sederhana untuk menyalakan atau mematikan motor (tanpa kontrol kecepatan).",
      wiringSchema: "ESP32 GPIO 18 ───[ Driver Motor ]─── Motor DC",
      asciiArt: `GPIO 18 ── IN1 Driver
               │
            Driver
               │
           Motor DC`
    }
  },
  {
    id: "max7219",
    name: "MAX7219 8x32",
    category: "output",
    description: "Modul LED Matrix 8x32.",
    defaultPins: {
      data: 23,
      clk: 18,
      cs: 21
    },
    wiring: [
      { from: "5V/VIN", to: "VCC" },
      { from: "GND", to: "GND" },
      { from: "GPIO 23", to: "DIN (Data In)" },
      { from: "GPIO 21", to: "CS (Chip Select)" },
      { from: "GPIO 18", to: "CLK (Clock)" }
    ],
    libraries: [
      {
        id: "md-max72xx",
        name: "MD_MAX72XX",
        include: "#include <MD_MAX72xx.h>\n#include <SPI.h>"
      }
    ],
    code: {
      includes: ["#include <MD_MAX72xx.h>", "#include <SPI.h>"],
      assign: "#define HARDWARE_TYPE MD_MAX72XX::FC16_HW\n#define MAX_DEVICES 4\n#define DATA_PIN 23\n#define CS_PIN 21\n#define CLK_PIN 18\nMD_MAX72XX mx = MD_MAX72XX(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, MAX_DEVICES);\n\nvoid outputConnected() {\n  mx.begin();\n  mx.control(MD_MAX72XX::INTENSITY, 0);\n  mx.clear();\n}",
      write: "void setOutput(bool state) {\n  if(state) {\n    // Contoh: menyalakan semua LED pada baris 0\n    mx.setRow(0, 0, 0xFF);\n  } else {\n    mx.clear();\n  }\n}"
    },
    beginnerExplanation: {
      what: "Modul matriks LED yang dapat menampilkan teks atau ikon sederhana.",
      wiring: "Modul ini menggunakan antarmuka SPI, butuh 3 pin data (DIN, CS, CLK).",
      code: "Membutuhkan library MD_MAX72XX. Diatur dengan memberikan perintah render ke matriks.",
      wiringSchema: "ESP32 SPI ───[ MAX7219 ]",
      asciiArt: `ESP32      MAX7219
5V    ──── VCC
GND   ──── GND
GPIO 23 ── DIN
GPIO 21 ── CS
GPIO 18 ── CLK`
    }
  }
];
