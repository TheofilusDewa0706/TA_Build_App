# 📱 Aplikasi Mobile Klasifikasi Rumah Adat NTT

Aplikasi React Native untuk klasifikasi rumah adat Nusa Tenggara Timur (NTT) menggunakan kamera atau galeri, terhubung ke backend Flask dengan model TFLite.

## 🔧 Fitur

- Ambil gambar dari kamera atau pilih dari galeri
- Kirim gambar ke server dan tampilkan hasil klasifikasi
- Menampilkan nama rumah adat, confidence, dan validasi visual

## 📂 Struktur Folder

- `android/` – Proyek Android
- `assets/` – Gambar dan ikon aplikasi
- `components/` – Komponen UI seperti tombol
- `screens/` – Halaman aplikasi (`HomeScreen`, `CameraScreen`, `ResultScreen`)
- `App.js` – Entry point aplikasi
- `config.js` – Alamat endpoint backend (`API_URL`)
- `package.json` – Konfigurasi dependensi proyek

## 🧪 Layar Utama

### 1. HomeScreen.js
- Memilih metode input: kamera atau galeri

### 2. CameraScreen.js
- Menampilkan live kamera dan mengambil foto
- Mengirim gambar ke backend untuk klasifikasi

### 3. ResultScreen.js
- Menampilkan hasil klasifikasi dari backend
- Validasi gambar berdasarkan confidence & entropy

## 🚀 Menjalankan Aplikasi

1. Install dependensi:
```bash
npm install
```

2. Jalankan di emulator/ponsel:
```bash
npx expo start
```

## 🔗 Backend

Pastikan backend Flask dengan model TFLite sudah berjalan. Alamat endpoint ditentukan di `config.js`:

```js
export const API_URL = "http://<alamat-ip>:5000/predict";
```

## 👨‍💻 Pengembang

Theofilus Dewa Arya Reinanta Putra  
Tugas akhir klasifikasi rumah adat NTT berbasis deep learning dan mobile app.
