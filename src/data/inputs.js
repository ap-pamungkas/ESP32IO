export const inputs = [
  {
    id: "button",
    name: "Tactile Button",
    category: "input",
    description: "A simple digital input button.",
    defaultPins: {
      signal: 4
    },
    wiring: [
      { from: "GPIO 4", to: "Button Signal" },
      { from: "Button GND", to: "GND" }
    ],
    libraries: [],
    code: {
      includes: [],
      assign: "const int BUTTON_PIN = 4;\n\nvoid inputConnected() {\n  pinMode(BUTTON_PIN, INPUT_PULLUP);\n}",
      read: "bool readInput() {\n  return digitalRead(BUTTON_PIN) == LOW;\n}"
    },
    beginnerExplanation: {
      what: "Sebuah saklar mekanik yang aktif ketika ditekan.",
      wiring: "Pada konfigurasi INPUT_PULLUP, Anda hanya perlu menyambungkan pin GPIO ke salah satu kaki tombol, dan kaki lainnya ke Ground (GND).",
      code: "Pin diatur dengan pull-up internal (INPUT_PULLUP), dan membaca logika rendah (LOW) saat tombol ditekan.",
      wiringSchema: "ESP32 GPIO 4 ──────[ Tactile Button ]────── GND",
      asciiArt: `       ESP32
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
                    └───────┘`
    }
  },
  {
    id: "motion",
    name: "Motion Switch",
    category: "input",
    description: "Digital motion sensor (PIR).",
    defaultPins: {
      signal: 27
    },
    wiring: [
      { from: "3.3V", to: "VCC" },
      { from: "GPIO 27", to: "OUT/SIGNAL" },
      { from: "GND", to: "GND" }
    ],
    libraries: [],
    code: {
      includes: [],
      assign: "const int PIR_PIN = 27;\n\nvoid inputConnected() {\n  pinMode(PIR_PIN, INPUT);\n}",
      read: "bool readInput() {\n  return digitalRead(PIR_PIN) == HIGH;\n}"
    },
    beginnerExplanation: {
      what: "Sensor gerak pasif infra merah (PIR).",
      wiring: "Sambungkan VCC ke 3.3V, GND ke Ground, dan pin OUT ke GPIO 27.",
      code: "Pin diatur sebagai INPUT biasa. Saat mendeteksi gerakan, sensor akan mengirim sinyal HIGH.",
      wiringSchema: "ESP32 3.3V ──[VCC] PIR [OUT]── GPIO 27, [GND]── GND",
      asciiArt: `       ESP32
    ┌───────────┐
    │           │
    │ 3.3V  ────┼──────── VCC
    │ GPIO 27 ──┼──────── OUT
    │ GND ──────┼──────── GND
    │           │
    └───────────┘`
    }
  },
  {
    id: "potentiometer",
    name: "Potentiometer",
    category: "input",
    description: "Analog input from a variable resistor.",
    defaultPins: {
      signal: 34
    },
    wiring: [
      { from: "3.3V", to: "VCC (Pin Kiri)" },
      { from: "GPIO 34", to: "SIGNAL (Pin Tengah)" },
      { from: "GND", to: "GND (Pin Kanan)" }
    ],
    libraries: [],
    code: {
      includes: [],
      assign: "const int POT_PIN = 34;\n\nvoid inputConnected() {\n  // GPIO 34 tidak perlu pinMode untuk analogRead\n}",
      read: "int readInput() {\n  return analogRead(POT_PIN);\n}"
    },
    beginnerExplanation: {
      what: "Resistor variabel yang nilai hambatannya dapat diubah dengan cara diputar.",
      wiring: "Sambungkan ujung-ujungnya ke 3.3V dan GND, dan pin tengah (wiper) ke GPIO 34.",
      code: "Fungsi analogRead(POT_PIN) digunakan untuk membaca nilai tegangan (0-4095 pada ESP32).",
      wiringSchema: "ESP32 3.3V ──[VCC] POT [SIG]── GPIO 34, [GND]── GND",
      asciiArt: `       ESP32
    ┌───────────┐
    │           │
    │ 3.3V  ────┼──────── VCC
    │ GPIO 34 ──┼──────── SIG
    │ GND ──────┼──────── GND
    │           │
    └───────────┘`
    }
  },
  {
    id: "dht22",
    name: "DHT22",
    category: "input",
    description: "Temperature and humidity sensor.",
    defaultPins: {
      signal: 15
    },
    wiring: [
      { from: "3.3V", to: "VCC" },
      { from: "GPIO 15", to: "DATA" },
      { from: "GND", to: "GND" }
    ],
    libraries: [
      {
        id: "dht",
        name: "DHT sensor library",
        include: "#include <DHT.h>"
      }
    ],
    code: {
      includes: ["#include <DHT.h>"],
      assign: "const int DHT_PIN = 15;\n#define DHTTYPE DHT22\nDHT dht(DHT_PIN, DHTTYPE);\n\nvoid inputConnected() {\n  dht.begin();\n}",
      read: "float readInput() {\n  return dht.readTemperature();\n}"
    },
    beginnerExplanation: {
      what: "Sensor pembaca suhu dan kelembaban ruangan.",
      wiring: "Sambungkan VCC ke 3.3V, GND ke Ground, dan pin DATA ke GPIO 15.",
      code: "Membutuhkan library DHT. Sensor ini dibaca menggunakan perintah dht.readTemperature().",
      wiringSchema: "ESP32 3.3V ──[VCC] DHT22 [DATA]── GPIO 15, [GND]── GND",
      asciiArt: `       ESP32
    ┌───────────┐
    │           │
    │ 3.3V  ────┼──────── VCC
    │ GPIO 15 ──┼──────── DATA
    │ GND ──────┼──────── GND
    │           │
    └───────────┘`
    }
  }
];
