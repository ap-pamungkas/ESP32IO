export const commands = [
  {
    id: "on-off",
    name: "ON / OFF",
    category: "command",
    description: "Meneruskan logika input langsung ke output.",
    code: {
      logic: "bool processCommand(bool inputState) {\n  return inputState;\n}"
    },
    beginnerExplanation: {
      what: "Command paling sederhana: Jika input nyala, output nyala.",
      code: "Fungsi ini menerima nilai boolean (true/false) dan langsung mengembalikannya tanpa perubahan."
    }
  },
  {
    id: "threshold",
    name: "Threshold (>)",
    category: "command",
    description: "Menghasilkan logika HIGH jika nilai input melebihi batas.",
    code: {
      logic: "const float THRESHOLD_VALUE = 30.0; // Sesuaikan batas ini\n\nbool processCommand(float inputState) {\n  return inputState > THRESHOLD_VALUE;\n}"
    },
    beginnerExplanation: {
      what: "Command bersyarat (If-Then): Menentukan batas nilai analog atau suhu untuk mengaktifkan output.",
      code: "Fungsi ini membandingkan inputState dengan THRESHOLD_VALUE. Mengembalikan true jika lebih besar."
    }
  },
  {
    id: "and",
    name: "Logika AND",
    category: "command",
    description: "Membutuhkan 2 kondisi benar untuk mengaktifkan output.",
    code: {
      logic: "bool processCommand(bool inputState) {\n  bool condition2 = true; // Contoh kondisi kedua\n  return inputState && condition2;\n}"
    },
    beginnerExplanation: {
      what: "Kedua syarat harus terpenuhi agar output aktif.",
      code: "Menggunakan operator && (AND) untuk membandingkan inputState dengan kondisi lainnya."
    }
  },
  {
    id: "or",
    name: "Logika OR",
    category: "command",
    description: "Cukup 1 kondisi benar untuk mengaktifkan output.",
    code: {
      logic: "bool processCommand(bool inputState) {\n  bool condition2 = false; // Contoh kondisi kedua\n  return inputState || condition2;\n}"
    },
    beginnerExplanation: {
      what: "Salah satu syarat terpenuhi, maka output aktif.",
      code: "Menggunakan operator || (OR) untuk membandingkan inputState dengan kondisi lainnya."
    }
  }
];
