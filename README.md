# E-Lintas

> **Platform Edukasi & Simulasi Interaktif Uji Keterampilan Berkendara**  
> *"Belajar Lalu Lintas, Pahami Aturan, Tingkatkan Keselamatan."*

---

## 1. Tentang E-Lintas

**E-Lintas** adalah platform edukasi digital independen berbasis website yang dirancang untuk membantu masyarakat mempelajari peraturan lalu lintas, memahami situasi berkendara melalui kuis, serta mengenal jalur ujian praktik SIM C melalui simulasi berkendara interaktif 2D.

Aplikasi ini dibangun menggunakan teknologi web murni (**Vanilla HTML5, CSS3, dan JavaScript**) tanpa framework pihak ketiga atau backend database, sehingga ringan, cepat, dan dapat dijalankan langsung di berbagai peramban modern (*desktop*, tablet, maupun *smartphone*).

---

## 2. Struktur Folder Project

Struktur berkas proyek telah ditata secara modular dan rapi:

```text
E-Lintas/
├── index.html                  # Struktur utama dokumen HTML & 5 tampilan (SPA)
├── css/
│   └── style.css               # Desain, tema palet resmi, responsivitas & tombol virtual
├── js/
│   ├── app.js                  # Navigasi, SPA view switching, routing & siklus hidup
│   └── simulation.js           # Mesin fisika, loop Canvas 2D, HUD, dan kontrol kendaraan
├── assets/
│   └── images/
│       ├── logo.png            # Gambar logo & maskot resmi E-Lintas
│       ├── track.png           # Gambar peta/jalur ujian praktik SIM C (1024 x 810)
│       └── motorcycle.png      # Gambar karakter motor roda dua tampak atas (transparan)
└── README.md                   # Petunjuk instalasi, penggunaan, dan konfigurasi teknis
```

---

## 3. Cara Menjalankan Project di Komputer Lokal

Karena proyek ini menggunakan HTML5 Canvas dan modul pemuatan aset gambar lokal, sangat disarankan untuk menjalankannya melalui server lokal sederhana (*Local Web Server*) agar peramban tidak membatasi pemuatan file gambar lokal akibat aturan keamanan peramban (*CORS / local file restrictions*).

### Opsi A: Menggunakan Ekstensi VS Code (Live Server) — Paling Mudah
1. Buka folder `E-Lintas` menggunakan aplikasi **Visual Studio Code**.
2. Pasang ekstensi **Live Server** (oleh *Ritwick Dey*) dari menu Extensions.
3. Klik kanan pada berkas `index.html` lalu pilih **"Open with Live Server"**.
4. Website akan terbuka secara otomatis di browser pada alamat `http://127.0.0.1:5500/`.

### Opsi B: Menggunakan Python (Tersedia Bawaan di Kebanyakan Sistem)
Buka Terminal / Command Prompt / PowerShell di dalam folder `E-Lintas`, lalu jalankan:
```bash
# Python 3
python -m http.server 8000
```
Lalu buka peramban dan akses alamat: `http://localhost:8000`

### Opsi C: Menggunakan Node.js
Jika Anda memiliki Node.js terpasang, jalankan perintah sekali jalan:
```bash
npx serve .
```

---

## 4. Cara Mengoperasikan Kuis dan Simulasi

### A. Kuis Peraturan dan Rambu-Rambu Lalu Lintas
1. Dari Beranda, pilih **"Kuis Peraturan dan Rambu-Rambu Lalu Lintas"**.
2. Jawab seluruh **35 soal** secara berurutan: **25 soal rambu lalu lintas** dengan ilustrasi, dilanjutkan **10 soal peraturan dan dasar berkendara**. Setiap soal memiliki empat pilihan dan waktu 30 detik.
3. Setelah menjawab, baca penjelasan dan tunggu soal berikutnya tampil otomatis: 3 detik untuk jawaban benar atau 5 detik untuk jawaban salah maupun waktu habis. Hasil akhir menampilkan nilai dan tinjauan jawaban.

### B. Simulasi Berkendara
Masuk ke menu **"Simulasi Berkendara Jalur Uji SIM C"** pada Beranda atau melalui bilah navigasi atas.

### Kontrol Keyboard (Desktop / Laptop)
* **Gas (Maju):** Tombol <kbd>W</kbd> atau Panah Atas <kbd>↑</kbd>
* **Rem / Mundur:** Tombol <kbd>S</kbd> atau Panah Bawah <kbd>↓</kbd>. Rem memperlambat atau menghentikan motor. Mundur hanya tersedia setelah motor keluar jalur.
* **Belok Kiri:** Tombol <kbd>A</kbd> atau Panah Kiri <kbd>←</kbd>
* **Belok Kanan:** Tombol <kbd>D</kbd> atau Panah Kanan <kbd>→</kbd>
* **Jeda / Lanjut Cepat:** Tombol <kbd>Spasi</kbd>
* *Mendukung kombinasi tombol:* Anda dapat menekan **Gas + Belok Kiri/Kanan** secara bersamaan.

### Kontrol Layar Sentuh Virtual (Smartphone / Tablet)
Pada layar ponsel atau tablet, panel kontrol virtual interaktif akan otomatis muncul di bawah area canvas:
* **Tombol Gas (Hijau):** Tekan dan tahan untuk menambah kecepatan maju.
* **Tombol Rem (Merah):** Tekan dan tahan untuk mengerem atau menghentikan kendaraan. Jika motor keluar jalur, tahan rem untuk mundur kembali ke jalur.
* **Tombol Kiri & Kanan:** Tekan untuk mengarahkan laju roda motor.
* *Mendukung Multi-Touch:* Jempol kanan dapat menahan Gas sambil jempol kiri menekan kemudi arah.

Garis biru batas jalur masih dapat dilintasi, tetapi menyentuhnya langsung mengubah status poin menjadi **Gagal** dan mengurangi poin. Rumput di luar jalur menjadi dinding, sehingga motor berhenti sebelum dapat melintas lebih jauh. Tahan rem untuk mundur kembali ke jalur. Status gagal tetap berlaku sampai ujian diulang, sehingga mencapai garis finis setelah keluar jalur tetap menampilkan hasil gagal dan tombol **Coba Lagi**.

### Tombol Aksi Permainan & Evaluasi Ujian
* **Jeda / Lanjutkan:** Menghentikan sementara pergerakan motor atau melanjutkan simulasi.
* **Ulangi:** Mengembalikan posisi motor, arah hadap, dan kecepatan kembali ke titik awal (kotak START), serta mereset poin ujian kembali ke 100 poin.
* **Kembali:** Berpindah kembali ke Halaman Beranda tanpa membebani memori (*game loop* otomatis dimatikan).
* **Efek suara:** Suara mesin bernada rendah dan lembut mengikuti laju kendaraan, lalu berhenti saat motor berhenti. Pastikan volume perangkat aktif.

---

## 5. Sistem Evaluasi & Poin Uji Praktik SIM C

1. **Perspektif Kamera Mengikuti Motor (*Chase / Follow Camera*):**
   * Sudut pandang kamera berputar secara dinamis mengunci arah hadap motor.
   * Arah maju motor selalu menghadap ke atas layar untuk pengalaman simulasi berkendara yang realistis.
2. **Skor Keberhasilan:**
   * Peserta memulai simulasi dengan **100 Poin**.
   * **Batas Kelulusan:** Nilai minimal adalah **75 Poin**.
   * **Pelanggaran Garis Biru (Keluar Jalur):** Menyentuh garis batas biru atau rumput memicu peringatan seketika (*toast alert*) dan pengurangan **10 Poin**.
   * **Pelanggaran Batas Kecepatan 30 km/jam:** Melebihi rambu 30 km/jam memicu peringatan kecepatan dan pengurangan **5 Poin**.
   * **Peringatan Mengulang (Tidak Lulus):** Jika total poin berada di bawah **75 Poin**, simulasi otomatis berhenti dan memunculkan kotak dialog peringatan ujian tidak lulus beserta tombol **"Ulangi Ujian"**.

---

## 6. Panduan Kustomisasi & Konfigurasi Simulasi

Seluruh parameter fisika, kamera, dan penalti dapat disesuaikan melalui objek `CONFIG` di [`js/simulation.js`](file:///c:/Users/Hype/Documents/E-Lintas/js/simulation.js):

```javascript
const CONFIG = {
  worldWidth: 1024,
  worldHeight: 810,

  // 1. Posisi dan Arah Awal
  initialX: 98,
  initialY: 100,
  initialAngle: 0,

  // 2. Kamera Dinamis
  cameraZoom: 2.8,
  cameraAheadOffset: 0.72,

  // 3. Aturan Nilai & Batas Ujian
  maxExamPoints: 100,
  minimumPassPoints: 75,
  speedLimitKmH: 30,
  offTrackPenalty: 10,
  speedLimitPenalty: 5,
  turnSpeed: 2.5,
  speedDisplayRatio: 0.22
};
```

---

## 7. Rencana Pengembangan Selanjutnya (Roadmap)

1. **Kuis 2: Studi Kasus Uji Teori SIM**
   * Pembelajaran skenario visual (persimpangan 4 arah tanpa lampu, marka serong, prioritas ambulans/pemadam).
2. **Simulasi SIM C Lanjutan (Deteksi Jalur & Sensor Kaki)**
   * Menambahkan sensor *collision detection* garis batas putih/kuning.
   * Indikator peringatan jika ban motor menginjak garis marka atau keluar dari lintasan.
   * Fitur lampu sein (kiri/kanan) sebelum memasuki tikungan Y.

---

## 7. Pernyataan Independensi & Sumber Referensi

* **Sumber Referensi:** Materi edukasi dan pedoman peraturan disadur dan merujuk pada materi publikasi resmi **E-Avis Korlantas Polri** ([https://e-avis.korlantas.polri.go.id/ebook/](https://e-avis.korlantas.polri.go.id/ebook/)).
* **Penafian Hukum:** Website E-Lintas adalah platform edukasi digital independen dan **TIDAK terafiliasi, bekerjasama, atau mewakili Korlantas Polri**. Seluruh materi referensi disadur semata-mata untuk tujuan pembelajaran dan peningkatan literasi keselamatan berkendara masyarakat. Simulasi digital ini tidak menggantikan pelatihan fisik maupun ujian resmi penerbitan Surat Izin Mengemudi (SIM).

---

*© 2026 E-Lintas. Dikembangkan untuk tujuan edukasi keselamatan berkendara.*
