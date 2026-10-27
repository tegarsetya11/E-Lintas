/**
 * ==============================================================================
 * E-LINTAS - QUIZ MODULE (quiz.js)
 * ==============================================================================
 * Sistem Kuis Interaktif E-Lintas
 * - Kuis 1: Peraturan dan Rambu-Rambu Lalu Lintas (35 Soal)
 * - Kuis 2: Studi Kasus Uji Teori SIM (Persimpangan, Prioritas, Marka, APILL) (20 Soal)
 *
 * Fitur:
 * - Timer countdown per soal (30 detik)
 * - Ilustrasi rambu untuk 25 soal pertama Kuis 1
 * - Feedback langsung (benar/salah + penjelasan)
 * - Pindah otomatis ke soal berikutnya setelah countdown jawaban
 * - Halaman hasil akhir dengan skor, grade, dan review jawaban
 * ==============================================================================
 */

(function (window) {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. BANK SOAL
   * -------------------------------------------------------------------------- */

  /** KUIS 1: Peraturan dan Rambu-Rambu Lalu Lintas */
  const QUIZ_1_QUESTIONS = [
    // Soal 1-25: pengenalan dan arti rambu lalu lintas.
    {
      id: 1,
      question: 'Apa arti rambu lingkaran merah dengan bidang putih mendatar di tengahnya?',
      options: ['Dilarang masuk dari arah tersebut', 'Dilarang parkir', 'Wajib berjalan lurus', 'Tempat penyeberangan'],
      correct: 0,
      explanation: 'Lingkaran merah dengan bidang putih mendatar adalah rambu dilarang masuk. Kendaraan tidak boleh memasuki jalan dari arah rambu tersebut.'
    },
    {
      id: 2,
      question: 'Rambu huruf P dengan garis merah menyilang berarti:',
      options: ['Parkir wajib di sisi kiri', 'Tempat parkir khusus', 'Dilarang parkir', 'Parkir hanya untuk kendaraan kecil'],
      correct: 2,
      explanation: 'Huruf P menandakan parkir, sedangkan garis merah menyilang menunjukkan larangan parkir di area tersebut.'
    },
    {
      id: 3,
      question: 'Apa arti rambu huruf S yang dicoret tanda silang merah?',
      options: ['Dilarang berhenti', 'Dilarang menyalip', 'Wajib berhenti', 'Akhir batas kecepatan'],
      correct: 0,
      explanation: 'Huruf S dengan tanda silang merah berarti dilarang berhenti di lokasi yang diatur rambu tersebut.'
    },
    {
      id: 4,
      question: 'Rambu lingkaran putih bertepi merah dengan angka 40 menunjukkan:',
      options: ['Kecepatan minimum 40 km/jam', 'Kecepatan maksimum 40 km/jam', 'Jarak 40 meter ke persimpangan', 'Anjuran melaju 40 km/jam'],
      correct: 1,
      explanation: 'Angka pada rambu larangan berbentuk lingkaran putih bertepi merah menunjukkan batas kecepatan maksimum yang tidak boleh dilampaui.'
    },
    {
      id: 5,
      question: 'Rambu panah kiri yang dicoret garis merah berarti:',
      options: ['Belok kiri wajib dilakukan', 'Dilarang berbelok ke kiri', 'Dilarang berhenti', 'Jalan satu arah ke kiri'],
      correct: 1,
      explanation: 'Panah kiri yang dicoret merah melarang kendaraan berbelok ke kiri pada persimpangan atau ruas jalan tersebut.'
    },
    {
      id: 6,
      question: 'Apa arti rambu panah kanan yang dicoret merah?',
      options: ['Belok kanan wajib dilakukan', 'Dilarang berbelok ke kanan', 'Dilarang mendahului', 'Jalan satu arah ke kanan'],
      correct: 1,
      explanation: 'Panah kanan yang dicoret merah melarang kendaraan berbelok ke kanan pada persimpangan atau ruas jalan tersebut.'
    },
    {
      id: 7,
      question: 'Rambu panah putar balik yang dicoret merah menandakan:',
      options: ['Putar balik wajib dilakukan', 'Dilarang putar balik di lokasi tersebut', 'Jalan berakhir', 'Kendaraan wajib berputar di depan'],
      correct: 1,
      explanation: 'Tanda larangan pada panah putar balik berarti pengendara tidak boleh melakukan putar balik di lokasi tersebut.'
    },
    {
      id: 8,
      question: 'Apa yang dilarang oleh rambu dua kendaraan dengan garis merah?',
      options: ['Dilarang mendahului kendaraan lain', 'Wajib menjaga jarak dua meter', 'Jalur hanya untuk dua kendaraan', 'Dilarang parkir'],
      correct: 0,
      explanation: 'Rambu tersebut melarang pengendara mendahului kendaraan lain pada ruas jalan yang ditunjuk.'
    },
    {
      id: 9,
      question: 'Rambu peringatan bergambar kendaraan tergelincir memperingatkan tentang:',
      options: ['Jalan licin', 'Jalan menurun', 'Jalan satu arah', 'Dilarang berhenti'],
      correct: 0,
      explanation: 'Rambu jalan licin mengingatkan pengendara untuk mengurangi kecepatan dan menghindari pengereman atau manuver mendadak.'
    },
    {
      id: 10,
      question: 'Rambu peringatan bergambar permukaan jalan bergelombang berarti:',
      options: ['Jalan bergelombang di depan', 'Jalan licin', 'Jalan buntu', 'Wajib mengikuti bundaran'],
      correct: 0,
      explanation: 'Rambu jalan bergelombang memperingatkan adanya permukaan jalan yang tidak rata. Kurangi kecepatan dan kendalikan kendaraan.'
    },
    {
      id: 11,
      question: 'Rambu bergambar anak-anak yang menyeberang mengingatkan pengendara bahwa:',
      options: ['Ada kawasan atau penyeberangan anak-anak di depan', 'Anak-anak dilarang menyeberang', 'Jalan khusus untuk bermain', 'Kendaraan wajib berhenti di sepanjang jalan'],
      correct: 0,
      explanation: 'Rambu anak-anak memperingatkan pengendara agar waspada terhadap anak-anak yang mungkin menyeberang atau beraktivitas di sekitar jalan.'
    },
    {
      id: 12,
      question: 'Rambu peringatan persimpangan jalan menunjukkan bahwa:',
      options: ['Ada persimpangan jalan di depan', 'Jalan hanya satu arah', 'Dilarang melewati persimpangan', 'Tempat parkir berada di depan'],
      correct: 0,
      explanation: 'Rambu persimpangan memperingatkan adanya pertemuan arus jalan di depan. Kurangi kecepatan dan perhatikan kendaraan dari arah lain.'
    },
    {
      id: 13,
      question: 'Apa tindakan yang diwajibkan oleh rambu STOP?',
      options: ['Kurangi kecepatan tanpa berhenti', 'Berhenti penuh, periksa keadaan, lalu lanjut jika aman', 'Berhenti hanya jika ada kendaraan lain', 'Membunyikan klakson sebelum melintas'],
      correct: 1,
      explanation: 'Rambu STOP mewajibkan kendaraan berhenti penuh sebelum garis berhenti atau persimpangan, kemudian melanjutkan perjalanan setelah dipastikan aman.'
    },
    {
      id: 14,
      question: 'Rambu lingkaran biru dengan tiga panah melingkar mewajibkan pengendara untuk:',
      options: ['Mengikuti arah putaran bundaran', 'Berhenti sebelum bundaran', 'Berputar balik sebelum bundaran', 'Memilih jalur paling kanan'],
      correct: 0,
      explanation: 'Rambu perintah bundaran mewajibkan pengendara mengikuti arah putaran lalu lintas pada bundaran.'
    },
    {
      id: 15,
      question: 'Rambu huruf P berwarna putih pada lingkaran biru menunjukkan:',
      options: ['Dilarang parkir', 'Tempat parkir', 'Dilarang berhenti', 'Parkir khusus kendaraan besar'],
      correct: 1,
      explanation: 'Huruf P putih pada lingkaran biru menunjukkan tempat parkir yang disediakan atau diperbolehkan.'
    },
    {
      id: 16,
      question: 'Rambu peringatan bergambar jalan yang menyempit menunjukkan bahwa:',
      options: ['Lebar jalan berkurang di depan', 'Jalan berakhir tanpa jalan keluar', 'Jalur khusus kendaraan besar', 'Ada persimpangan bundaran di depan'],
      correct: 0,
      explanation: 'Rambu jalan menyempit memperingatkan bahwa lebar jalan berkurang. Kurangi kecepatan dan bersiaplah menyesuaikan posisi kendaraan.'
    },
    {
      id: 17,
      question: 'Apa arti rambu peringatan yang menunjukkan jalan menanjak?',
      options: ['Ada tanjakan di depan', 'Jalan menurun tajam', 'Jalan hanya untuk kendaraan kecil', 'Dilarang menggunakan gigi rendah'],
      correct: 0,
      explanation: 'Rambu jalan menanjak memperingatkan adanya tanjakan di depan. Jaga kendali kendaraan dan sesuaikan kecepatan.'
    },
    {
      id: 18,
      question: 'Apa arti rambu peringatan yang menunjukkan jalan menurun?',
      options: ['Ada turunan di depan', 'Ada tanjakan di depan', 'Jalan buntu', 'Dilarang melewati kendaraan lain'],
      correct: 0,
      explanation: 'Rambu jalan menurun memperingatkan adanya turunan di depan. Kendalikan kecepatan dan kendaraan, terutama saat melintasi turunan.'
    },
    {
      id: 19,
      question: 'Rambu peringatan bergambar jembatan menunjukkan bahwa:',
      options: ['Ada jembatan di depan', 'Jalan berakhir di tepi sungai', 'Kendaraan wajib berhenti di jembatan', 'Jembatan hanya untuk pejalan kaki'],
      correct: 0,
      explanation: 'Rambu jembatan memperingatkan pengendara tentang jembatan di depan. Kurangi kecepatan dan perhatikan kondisi jalan.'
    },
    {
      id: 20,
      question: 'Apa yang harus dilakukan saat melihat rambu perlintasan kereta api dengan palang pintu?',
      options: ['Tetap melaju karena palang akan terbuka otomatis', 'Kurangi kecepatan dan berhenti jika palang tertutup atau ada kereta', 'Mendahului kendaraan lain sebelum rel', 'Berhenti hanya jika ada petugas'],
      correct: 1,
      explanation: 'Rambu ini memperingatkan adanya perlintasan kereta api dengan palang pintu. Patuhi palang dan isyarat yang ada, serta berhenti saat kereta akan melintas.'
    },
    {
      id: 21,
      question: 'Apa yang harus dilakukan saat mendekati perlintasan kereta api tanpa palang pintu?',
      options: ['Melaju tanpa melihat karena tidak ada palang', 'Berhenti atau kurangi kecepatan, tengok kiri-kanan, dan pastikan aman sebelum melintas', 'Membunyikan klakson lalu langsung melintas', 'Mengikuti kendaraan di depan tanpa memeriksa keadaan'],
      correct: 1,
      explanation: 'Pada perlintasan tanpa palang, pengendara harus waspada, melihat ke kiri dan kanan, serta memastikan tidak ada kereta sebelum melintas.'
    },
    {
      id: 22,
      question: 'Apa arti rambu larangan membunyikan klakson?',
      options: ['Klakson hanya boleh digunakan pada malam hari', 'Pengendara tidak boleh membunyikan klakson di area tersebut kecuali untuk keadaan darurat', 'Klakson wajib dibunyikan sebelum melewati area tersebut', 'Kendaraan tanpa klakson dilarang melintas'],
      correct: 1,
      explanation: 'Rambu ini melarang penggunaan klakson di area yang ditentukan. Gunakan klakson hanya sesuai kebutuhan dan ketentuan keselamatan.'
    },
    {
      id: 23,
      question: 'Rambu jalur khusus sepeda menunjukkan bahwa:',
      options: ['Jalur tersebut diperuntukkan bagi pesepeda', 'Sepeda dilarang melintas', 'Sepeda motor wajib menggunakan jalur itu', 'Tempat parkir sepeda berada di depan'],
      correct: 0,
      explanation: 'Rambu jalur khusus sepeda menunjukkan jalur yang disediakan bagi pesepeda. Pengendara kendaraan lain harus menghormati jalur tersebut.'
    },
    {
      id: 24,
      question: 'Rambu peringatan tempat penyeberangan pejalan kaki mengingatkan pengendara untuk:',
      options: ['Waspada dan mengurangi kecepatan karena ada penyeberangan pejalan kaki', 'Berhenti dan parkir di area tersebut', 'Membunyikan klakson agar pejalan kaki menepi', 'Menggunakan jalur khusus sepeda'],
      correct: 0,
      explanation: 'Rambu ini menandakan tempat penyeberangan pejalan kaki. Kurangi kecepatan dan dahulukan pejalan kaki yang menyeberang.'
    },
    {
      id: 25,
      question: 'Apa arti rambu peringatan jalan berliku di depan?',
      options: ['Ada beberapa tikungan berurutan di depan', 'Jalan menyempit di depan', 'Dilarang berbelok di persimpangan', 'Jalan hanya satu arah'],
      correct: 0,
      explanation: 'Rambu jalan berliku memperingatkan adanya beberapa tikungan berurutan. Kurangi kecepatan dan kendalikan kendaraan saat melintas.'
    },
    // Soal 26-35: peraturan dan dasar berkendara aman.
    {
      id: 26,
      question: 'Apa standar helm yang wajib digunakan pengendara dan penumpang sepeda motor di Indonesia?',
      options: ['Helm apa saja yang ukurannya sesuai', 'Helm berlabel SNI dan terpasang dengan benar', 'Helm sepeda tanpa pengikat', 'Tidak perlu helm jika berkendara dekat'],
      correct: 1,
      explanation: 'Pengendara dan penumpang sepeda motor wajib menggunakan helm yang memenuhi Standar Nasional Indonesia (SNI). Pastikan helm terpasang erat dan tali pengikatnya dikunci.'
    },
    {
      id: 27,
      question: 'Apa yang wajib dilakukan pengendara sepeda motor terhadap lampu utama pada siang hari?',
      options: ['Menyalakannya saat hujan saja', 'Menyalakannya hanya di jalan tol', 'Menyalakannya saat berkendara', 'Menggantinya dengan lampu hazard'],
      correct: 2,
      explanation: 'Pengendara sepeda motor wajib menyalakan lampu utama pada siang hari agar lebih mudah terlihat oleh pengguna jalan lain.'
    },
    {
      id: 28,
      question: 'Apa tindakan yang benar sebelum berbelok atau berpindah jalur?',
      options: ['Langsung bergerak jika tidak ada klakson', 'Nyalakan lampu sein, periksa kondisi sekitar, lalu bergerak jika aman', 'Nyalakan lampu hazard dan tetap bergerak', 'Ikuti kendaraan di depan tanpa memeriksa spion'],
      correct: 1,
      explanation: 'Berikan isyarat dengan lampu sein sebelum berbelok atau berpindah jalur. Periksa spion dan kondisi sekitar, lalu lakukan manuver hanya jika aman.'
    },
    {
      id: 29,
      question: 'Mengapa pengendara tidak boleh menggunakan ponsel sambil mengendarai kendaraan?',
      options: ['Karena mengganggu konsentrasi dan meningkatkan risiko kecelakaan', 'Karena membuat kendaraan lebih boros bahan bakar', 'Karena ponsel hanya boleh digunakan penumpang depan', 'Karena mengurangi jarak pandang lampu kendaraan'],
      correct: 0,
      explanation: 'Mengoperasikan ponsel dapat mengalihkan perhatian dari jalan dan mengganggu konsentrasi. Berhentilah di tempat yang aman sebelum menggunakan ponsel.'
    },
    {
      id: 30,
      question: 'Saat lampu lalu lintas berwarna merah, pengendara harus:',
      options: ['Memperlambat kendaraan lalu melaju jika jalan tampak kosong', 'Berhenti sebelum garis henti dan menunggu lampu mengizinkan jalan', 'Membunyikan klakson agar kendaraan lain berhenti', 'Mengikuti kendaraan di depan'],
      correct: 1,
      explanation: 'Lampu merah berarti kendaraan harus berhenti sebelum garis henti. Tunggu sampai sinyal lalu lintas mengizinkan perjalanan dilanjutkan.'
    },
    {
      id: 31,
      question: 'Apa sikap yang tepat saat lampu lalu lintas berubah menjadi kuning?',
      options: ['Menambah kecepatan untuk segera melewati persimpangan', 'Bersiap berhenti dengan aman jika belum melewati garis henti', 'Berhenti mendadak di mana pun posisi kendaraan', 'Menganggap lampu kuning sama dengan lampu hijau'],
      correct: 1,
      explanation: 'Lampu kuning memperingatkan bahwa sinyal akan berubah. Bersiaplah untuk berhenti dengan aman; jangan menambah kecepatan untuk menerobos persimpangan.'
    },
    {
      id: 32,
      question: 'Apa yang harus dilakukan pengendara ketika pejalan kaki sedang menyeberang di zebra cross?',
      options: ['Membunyikan klakson agar pejalan kaki mempercepat langkah', 'Mendahulukan pejalan kaki dan berhenti bila diperlukan', 'Melewati pejalan kaki dari sisi mana pun', 'Menambah kecepatan sebelum pejalan kaki sampai'],
      correct: 1,
      explanation: 'Pengendara harus mengutamakan keselamatan pejalan kaki yang menyeberang. Kurangi kecepatan dan berhenti untuk memberi kesempatan menyeberang.'
    },
    {
      id: 33,
      question: 'Ketika ambulans menyalakan sirene dan meminta prioritas, pengendara lain sebaiknya:',
      options: ['Tetap mempertahankan posisi dan kecepatannya', 'Memberi jalan dengan tetap memperhatikan keselamatan dan kondisi sekitar', 'Mengikuti ambulans agar lebih cepat sampai', 'Berhenti mendadak di tengah persimpangan'],
      correct: 1,
      explanation: 'Ambulans yang sedang menjalankan tugas dengan isyarat prioritas harus diberi jalan. Beri ruang dengan aman dan jangan membuat manuver mendadak yang membahayakan.'
    },
    {
      id: 34,
      question: 'Bagaimana cara sederhana menjaga jarak aman dengan kendaraan di depan?',
      options: ['Menempel dekat agar kendaraan lain tidak masuk', 'Menjaga jarak yang cukup untuk bereaksi dan berhenti dengan aman', 'Mengikuti tepat di belakang kendaraan besar', 'Menjaga jarak hanya saat malam hari'],
      correct: 1,
      explanation: 'Jaga jarak yang cukup agar tersedia waktu untuk bereaksi dan mengerem ketika kendaraan di depan melambat atau berhenti. Tambah jarak saat hujan atau jalan licin.'
    },
    {
      id: 35,
      question: 'Siapa yang wajib menggunakan sabuk keselamatan pada mobil yang dilengkapi sabuk keselamatan?',
      options: ['Hanya pengemudi', 'Pengemudi dan penumpang yang duduk di samping pengemudi', 'Hanya penumpang di kursi belakang', 'Tidak ada yang wajib jika perjalanan dekat'],
      correct: 1,
      explanation: 'Pengemudi dan penumpang yang duduk di samping pengemudi wajib mengenakan sabuk keselamatan. Gunakan sabuk dengan benar setiap kali berkendara.'
    }
  ];

  /** Ilustrasi untuk 25 soal pertama yang membahas rambu. */
  const QUIZ_1_SIGN_ILLUSTRATIONS = [
    { image: 'assets/images/quiz-no-entry.jpg', label: 'Dilarang Masuk' },
    { image: 'assets/images/quiz-no-parking.jpg', label: 'Dilarang Parkir' },
    { image: 'assets/images/quiz-no-stopping.jpg', label: 'Dilarang Berhenti' },
    { image: 'assets/images/quiz-speed-limit-40.jpg', label: 'Batas Kecepatan Maksimum 40 km/jam' },
    { image: 'assets/images/quiz-no-left-turn.png', label: 'Dilarang Belok Kiri' },
    { image: 'assets/images/quiz-no-right-turn.png', label: 'Dilarang Belok Kanan' },
    { image: 'assets/images/quiz-no-u-turn.png', label: 'Dilarang Putar Balik' },
    { image: 'assets/images/quiz-no-overtaking.png', label: 'Dilarang Mendahului' },
    { image: 'assets/images/quiz-slippery-road.jpg', label: 'Jalan Licin' },
    { image: 'assets/images/quiz-uneven-road.jpg', label: 'Jalan Bergelombang' },
    { image: 'assets/images/quiz-children-crossing.png', label: 'Banyak Anak-Anak' },
    { image: 'assets/images/quiz-intersection.jpg', label: 'Persimpangan Jalan' },
    { image: 'assets/images/quiz-stop.png', label: 'Rambu Berhenti (STOP)' },
    { image: 'assets/images/quiz-roundabout-mandatory.png', label: 'Wajib Ikuti Bundaran' },
    { image: 'assets/images/quiz-parking.png', label: 'Tempat Parkir' },
    { image: 'assets/images/quiz-road-narrows.jpg', label: 'Jalan Menyempit' },
    { image: 'assets/images/quiz-steep-ascent.jpg', label: 'Jalan Menanjak' },
    { image: 'assets/images/quiz-steep-descent.jpg', label: 'Jalan Menurun' },
    { image: 'assets/images/quiz-bridge.jpg', label: 'Jembatan' },
    { image: 'assets/images/quiz-railway-gate.jpg', label: 'Perlintasan Kereta Api dengan Palang Pintu' },
    { image: 'assets/images/quiz-railway-no-gate.png', label: 'Perlintasan Kereta Api tanpa Palang Pintu' },
    { image: 'assets/images/quiz-no-horn.jpg', label: 'Dilarang Membunyikan Klakson' },
    { image: 'assets/images/quiz-bicycle-lane.png', label: 'Jalur Khusus Sepeda' },
    { image: 'assets/images/quiz-pedestrian-crossing.png', label: 'Tempat Penyeberangan Pejalan Kaki' },
    { image: 'assets/images/quiz-winding-road.png', label: 'Jalan Berliku di Depan' },
  ];

  function createSignGlyph(symbol, color) {
    const stroke = `stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
    switch (symbol) {
      case 'car':
      case 'overtaking':
        return `<g fill="none" stroke="${color}" stroke-width="4" stroke-linejoin="round"><path d="M27 59h9l6-10h26l8 10h7v17H27z"/><circle cx="41" cy="78" r="5" fill="${color}"/><circle cx="70" cy="78" r="5" fill="${color}"/>${symbol === 'overtaking' ? '<path d="M13 48h15m-5-6 6 6-6 6" stroke="' + color + '" stroke-width="4" fill="none"/>' : ''}</g>`;
      case 'arrow-up':
        return `<path d="M60 78V37m-17 17 17-17 17 17" ${stroke}/>`;
      case 'arrow-left':
        return `<path d="M79 60H39m17-17L39 60l17 17" ${stroke}/>`;
      case 'arrow-right':
        return `<path d="M41 60h40M64 43l17 17-17 17" ${stroke}/>`;
      case 'u-turn':
        return `<path d="M42 78V51a18 18 0 0 1 36 0v9M65 48l13 13 13-13" ${stroke}/>`;
      case 'P':
      case 'S':
      case 'H':
        return `<text x="60" y="76" text-anchor="middle" font-family="Arial,sans-serif" font-size="53" font-weight="800" fill="${color}">${symbol}</text>`;
      case '40':
        return `<text x="60" y="71" text-anchor="middle" font-family="Arial,sans-serif" font-size="35" font-weight="800" fill="${color}">40</text>`;
      case '2.5m':
      case '8t':
        return `<text x="60" y="69" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" font-weight="800" fill="${color}">${symbol}</text>`;
      case 'stop':
        return `<text x="60" y="67" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#fff">STOP</text>`;
      case 'yield':
        return `<text x="60" y="62" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="800" fill="${color}">BERI</text><text x="60" y="73" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="800" fill="${color}">JALAN</text>`;
      case 'band':
        return '<rect x="24" y="49" width="72" height="18" rx="2" fill="#fff"/>';
      case 'exclamation':
        return `<path d="M60 38v28" ${stroke}/><circle cx="60" cy="78" r="3.5" fill="${color}"/>`;
      case 'curve-right':
        return `<path d="M45 80V62c0-18 13-28 29-28h8m-14-12 14 12-14 12" ${stroke}/>`;
      case 'curve-left':
        return `<path d="M75 80V62c0-18-13-28-29-28h-8m14-12L38 34l14 12" ${stroke}/>`;
      case 'winding':
        return `<path d="M43 82V69c0-10 19-10 19-20s-19-10-19-20m34 53V69c0-10-19-10-19-20s19-10 19-20" ${stroke}/>`;
      case 'descent':
        return `<path d="M34 40h22l30 25H34z" fill="${color}"/><path d="M42 57h20l7 8H42z" fill="#fff"/><circle cx="48" cy="70" r="4" fill="${color}"/><circle cx="66" cy="70" r="4" fill="${color}"/>`;
      case 'slippery':
        return `<path d="M31 68h9l6-9h25l8 9h8v12H31z" fill="${color}"/><circle cx="46" cy="82" r="4" fill="${color}"/><circle cx="70" cy="82" r="4" fill="${color}"/><path d="m38 43 10-5m5 10 10-5m5 10 10-5" ${stroke}/>`;
      case 'narrowing':
        return `<path d="M34 32v53m52-53v53M34 32l20 24m32-24L66 56" ${stroke}/>`;
      case 'intersection':
        return `<path d="M60 30v60M30 60h60" ${stroke}/>`;
      case 'traffic-light':
        return `<rect x="44" y="28" width="32" height="59" rx="8" fill="${color}"/><circle cx="60" cy="41" r="6" fill="#DC2626"/><circle cx="60" cy="57" r="6" fill="#FACC15"/><circle cx="60" cy="73" r="6" fill="#16A34A"/>`;
      case 'pedestrian':
      case 'school':
        return `<g ${stroke}><circle cx="60" cy="38" r="6" fill="${color}" stroke="none"/><path d="M60 47v20m0-13-12 10m12-10 12 8m-12 5-10 16m10-16 11 16"/>${symbol === 'school' ? '<circle cx="39" cy="48" r="4" fill="' + color + '"/><path d="M39 54v17m0-10-8 8m8-8 8 7m-8 3-7 11m7-11 7 11" stroke="' + color + '" stroke-width="4" stroke-linecap="round" fill="none"/>' : ''}</g>`;
      case 'railway':
        return `<rect x="39" y="30" width="42" height="48" rx="7" fill="${color}"/><path d="M45 40h12v12H45zm19 0h12v12H64zM49 79l-9 10m31-10 9 10M35 88h50" stroke="${color}" stroke-width="4" fill="none"/>`;
      case 'roadwork':
        return `<path d="m42 80 24-38m-18 38 34 0" ${stroke}/><circle cx="68" cy="34" r="6" fill="${color}"/><path d="m68 42-9 19 15 5m-15-5-10 15m23-10 9 15" ${stroke}/>`;
      default:
        return '';
    }
  }

  function createTrafficSignSvg(sign) {
    let plate;
    let glyphColor = '#17212b';
    switch (sign.kind) {
      case 'warning':
        plate = '<path d="M60 8 111 98H9z" fill="#FDE047" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>';
        break;
      case 'mandatory':
        plate = '<circle cx="60" cy="53" r="46" fill="#0876C9"/>';
        glyphColor = '#fff';
        break;
      case 'information':
        plate = '<rect x="13" y="8" width="94" height="91" rx="5" fill="#0876C9"/>';
        glyphColor = '#fff';
        break;
      case 'stop':
        plate = '<polygon points="38,8 82,8 105,31 105,75 82,98 38,98 15,75 15,31" fill="#DC2626" stroke="#fff" stroke-width="4"/>';
        break;
      case 'yield':
        plate = '<path d="M10 12h100L60 98z" fill="#fff" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>';
        glyphColor = '#DC2626';
        break;
      case 'no-entry':
        plate = '<circle cx="60" cy="53" r="46" fill="#DC2626"/>';
        break;
      case 'no-parking':
      case 'no-stopping':
        plate = '<circle cx="60" cy="53" r="44" fill="#0876C9" stroke="#DC2626" stroke-width="7"/>';
        glyphColor = '#fff';
        break;
      default:
        plate = '<circle cx="60" cy="53" r="44" fill="#fff" stroke="#DC2626" stroke-width="7"/>';
    }

    const slash = sign.slash
      ? '<path d="m29 84 62-62" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>'
      : '';
    const cross = sign.cross
      ? '<path d="m34 27 52 52m0-52L34 79" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>'
      : '';
    const glyph = createSignGlyph(sign.symbol, glyphColor);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" aria-hidden="true"><path d="M60 99v35" stroke="#64748B" stroke-width="7"/><path d="M46 135h28" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>${plate}${glyph}${slash}${cross}</svg>`;
  }

  /** KUIS 2: Studi Kasus Uji Teori SIM */
  const QUIZ_2_QUESTIONS = [
    {
      id: 1,
      question: 'STUDI KASUS - PERSIMPANGAN: Anda akan masuk ke persimpangan tanpa lampu lalu lintas dan tanpa rambu prioritas. Ada kendaraan dari sebelah kanan Anda. Apa yang harus Anda lakukan?',
      options: ['Mempercepat laju agar lebih dahulu melewati persimpangan', 'Mendahulukan kendaraan dari sebelah kanan karena memiliki hak prioritas', 'Membunyikan klakson dan terus melaju', 'Berhenti, lalu melanjutkan kapan saja'],
      correct: 1,
      explanation: 'Aturan "prioritas kanan" berlaku di persimpangan tanpa rambu prioritas: kendaraan dari sebelah kanan Anda memiliki hak untuk lebih dahulu melewati persimpangan. Anda wajib memberikan prioritas kepada mereka.'
    },
    {
      id: 2,
      question: 'STUDI KASUS - APILL: Lampu lalu lintas berwarna merah menyala, tetapi ada tulisan "BELOK KIRI LANGSUNG" di bawah lampu. Apa yang boleh Anda lakukan?',
      options: ['Tetap berhenti, tulisan itu tidak berlaku', 'Boleh belok kiri tanpa harus berhenti di lampu merah, namun tetap mendahulukan pejalan kaki dan kendaraan dari arah lain', 'Belok kiri hanya jika lampu kuning', 'Dilarang belok kiri saat merah apapun kondisinya'],
      correct: 1,
      explanation: 'Tanda "BELOK KIRI LANGSUNG" (LTOR - Left Turn On Red) berarti kendaraan boleh berbelok ke kiri meskipun lampu merah, TANPA perlu berhenti. Namun pengemudi tetap wajib mendahulukan pejalan kaki yang menyeberang dan kendaraan dari arah lain yang mendapat lampu hijau.'
    },
    {
      id: 3,
      question: 'STUDI KASUS - MARKA JALAN: Anda sedang berkendara di jalan dua arah. Di tengah jalan terdapat garis kuning utuh (tidak terputus). Bolehkah Anda menyalip kendaraan di depan?',
      options: ['Boleh, jika jalan di depan kosong sejauh 200 meter', 'Tidak boleh dalam kondisi apapun karena garis kuning utuh melarang menyalip', 'Boleh jika kecepatan lebih dari 60 km/jam', 'Boleh jika darurat'],
      correct: 1,
      explanation: 'Garis kuning utuh (tidak terputus) di tengah jalan menandakan larangan mutlak untuk menyalip atau berpindah jalur ke arah berlawanan. Ini biasanya dipasang di tikungan, tanjakan, atau area berbahaya lainnya.'
    },
    {
      id: 4,
      question: 'STUDI KASUS - PRIORITAS: Saat lampu hijau menyala, Anda ingin berbelok kanan di persimpangan. Di hadapan Anda ada kendaraan dari arah berlawanan yang bergerak lurus. Apa yang benar?',
      options: ['Anda punya hak jalan karena lampu hijau', 'Berbelok kanan secepat mungkin', 'Anda harus menunggu dan mendahulukan kendaraan lurus dari arah berlawanan', 'Kendaraan dari berlawanan yang harus berhenti'],
      correct: 2,
      explanation: 'Kendaraan yang berbelok kanan (atau berbelok kiri melewati arus berlawanan) selalu harus mendahulukan kendaraan yang bergerak lurus dari arah berlawanan. Lampu hijau bukan berarti Anda langsung mendapat prioritas berbelok.'
    },
    {
      id: 5,
      question: 'STUDI KASUS - BUNDARAN: Anda memasuki bundaran (roundabout). Kendaraan mana yang harus Anda dahulukan?',
      options: ['Kendaraan yang hendak masuk bundaran dari kanan Anda', 'Kendaraan yang sudah berada di dalam bundaran', 'Kendaraan yang paling besar', 'Tidak ada prioritas di bundaran'],
      correct: 1,
      explanation: 'Di bundaran (roundabout), kendaraan yang sudah berada di dalam bundaran memiliki prioritas. Anda yang baru akan masuk harus memberikan jalan kepada semua kendaraan yang sudah berputar di dalam bundaran.'
    },
    {
      id: 6,
      question: 'STUDI KASUS - APILL: Lampu lalu lintas kuning menyala saat Anda sedang berkendara mendekati persimpangan. Kendaraan Anda masih sekitar 15 meter dari garis stop. Apa yang paling tepat?',
      options: ['Mempercepat kendaraan agar bisa lewat sebelum merah', 'Tetap melaju dengan kecepatan sama', 'Mulai mengurangi kecepatan dan bersiap untuk berhenti sebelum garis stop', 'Menyalakan lampu hazard dan terus melaju'],
      correct: 2,
      explanation: 'Lampu kuning berarti bersiap berhenti. Karena masih 15 meter dari garis stop, Anda masih bisa berhenti dengan aman. Mempercepat kendaraan saat kuning adalah perilaku berbahaya dan merupakan pelanggaran.'
    },
    {
      id: 7,
      question: 'STUDI KASUS - PERSIMPANGAN: Di persimpangan dengan lampu lalu lintas mati (padam). Bagaimana cara mengaturnya?',
      options: ['Kendaraan di jalan utama selalu didahulukan', 'Semua kendaraan harus berhenti sejenak dan bergantian seperti aturan persimpangan tanpa lampu, menggunakan aturan prioritas kanan', 'Kendaraan yang bergerak lebih cepat didahulukan', 'Abaikan saja dan lanjutkan'],
      correct: 1,
      explanation: 'Saat lampu lalu lintas padam, persimpangan diperlakukan seperti persimpangan tanpa rambu. Pengemudi harus berhenti, memperhatikan kondisi, dan menggunakan aturan prioritas kanan atau bergantian dengan tertib.'
    },
    {
      id: 8,
      question: 'STUDI KASUS - MARKA JALAN: Anda melihat marka zebra cross (garis putih sejajar) di depan Anda. Seorang pejalan kaki baru saja mulai menyeberang. Apa yang harus Anda lakukan?',
      options: ['Membunyikan klakson agar pejalan kaki lebih cepat menyeberang', 'Tetap melaju dengan kecepatan yang sama', 'Hentikan kendaraan dan berikan prioritas kepada pejalan kaki hingga selesai menyeberang', 'Menyalip dari sisi lain untuk menghindari pejalan kaki'],
      correct: 2,
      explanation: 'UU No. 22 Tahun 2009 mewajibkan pengemudi untuk mendahulukan pejalan kaki yang sedang menyeberang di zebra cross. Melanggar aturan ini dapat dikenai sanksi pidana dan denda.'
    },
    {
      id: 9,
      question: 'STUDI KASUS - APILL: Lampu hijau tanda panah ke kanan menyala. Apa artinya?',
      options: ['Semua kendaraan boleh bergerak ke segala arah', 'Hanya kendaraan yang akan belok kanan yang mendapat izin bergerak pada fase ini', 'Pejalan kaki boleh menyeberang', 'Jalur berlawanan mendapat prioritas'],
      correct: 1,
      explanation: 'Lampu hijau dengan tanda panah (directional green arrow) berarti HANYA gerakan yang ditunjukkan panah yang diizinkan pada fase tersebut. Tanda panah ke kanan berarti hanya kendaraan yang belok kanan yang boleh bergerak.'
    },
    {
      id: 10,
      question: 'STUDI KASUS - PRIORITAS KENDARAAN: Anda sedang berkendara di jalan dan mendengar sirine ambulans dari belakang. Apa tindakan yang benar?',
      options: ['Mempertahankan posisi, ambulans yang harus mencari jalan lain', 'Segera menepi ke sisi kiri jalan dan berhenti untuk memberikan jalan kepada ambulans', 'Mempercepat kendaraan agar ambulans bisa mengikuti', 'Pindah ke jalur tengah'],
      correct: 1,
      explanation: 'Kendaraan darurat (ambulans, pemadam kebakaran, polisi) dengan sirine aktif memiliki prioritas tertinggi di jalan. Pengemudi wajib segera menepi ke kiri dan berhenti untuk memberikan jalan. Menghalangi laju kendaraan darurat adalah pelanggaran serius.'
    },
    {
      id: 11,
      question: 'STUDI KASUS - MARKA JALAN: Tanda "kuning kotak" (yellow box junction) di tengah persimpangan berarti:',
      options: ['Area parkir darurat', 'Kendaraan dilarang berhenti di dalam kotak tersebut, bahkan saat lampu merah, kecuali saat berbelok', 'Jalur prioritas ambulans', 'Batas kecepatan 20 km/jam'],
      correct: 1,
      explanation: 'Yellow Box Junction adalah marka kotak kuning di persimpangan yang melarang kendaraan berhenti di dalamnya. Tujuannya mencegah antrian yang memblokir persimpangan. Kendaraan hanya boleh memasuki kotak jika sudah ada ruang kosong di sisi yang dituju.'
    },
    {
      id: 12,
      question: 'STUDI KASUS - PERSIMPANGAN: Anda berkendara di jalan minor (jalan kecil/gang) dan akan masuk ke jalan utama. Apa yang harus Anda lakukan?',
      options: ['Masuk ke jalan utama jika tidak ada kendaraan dalam radius 100 meter', 'Berhenti atau sangat memperlambat kendaraan dan memberikan prioritas kepada semua kendaraan di jalan utama', 'Menyalakan lampu hazard dan masuk perlahan', 'Kendaraan dari jalan minor selalu didahulukan'],
      correct: 1,
      explanation: 'Kendaraan yang keluar dari jalan minor atau gang selalu harus memberikan prioritas kepada semua kendaraan yang sedang melaju di jalan utama. Anda harus berhenti, memeriksa kondisi aman, baru kemudian masuk.'
    },
    {
      id: 13,
      question: 'STUDI KASUS - APILL: Lampu lalu lintas hijau menyala, namun di depan persimpangan ada kemacetan panjang sehingga kendaraan tidak dapat bergerak. Apa yang sebaiknya dilakukan?',
      options: ['Tetap maju karena lampu hijau memberikan hak melaju', 'Tidak memasuki persimpangan meskipun lampu hijau, tunggu sampai ada ruang kosong di depan', 'Masuk persimpangan dan berhenti di tengah', 'Gunakan jalur darurat'],
      correct: 1,
      explanation: 'Meskipun lampu hijau menyala, Anda tidak boleh memasuki persimpangan jika tidak ada ruang yang cukup di sisi keluar. Ini akan menyebabkan "gridlock" (persimpangan macet total) dan memblokir kendaraan dari arah lain. Tunggu di belakang garis stop hingga ruang di depan tersedia.'
    },
    {
      id: 14,
      question: 'STUDI KASUS - MARKA JALAN: Anda melewati marka "chevron" (panah V berderet) di tikungan tajam. Apa artinya?',
      options: ['Jalan satu arah ke kiri', 'Petunjuk arah tikungan, menunjukkan bahwa jalan berbelok ke arah panah', 'Kawasan konstruksi', 'Batas jalur bus'],
      correct: 1,
      explanation: 'Marka chevron (panah V yang berderet) dipasang di tikungan tajam untuk menunjukkan arah tikungan jalan. Fungsinya sebagai panduan visual agar pengemudi dapat mengikuti alur jalan dengan aman, terutama di malam hari atau kondisi jarak pandang rendah.'
    },
    {
      id: 15,
      question: 'STUDI KASUS - PRIORITAS: Seorang pengendara motor sedang berkendara di bahu jalan (shoulder). Apakah ini diizinkan?',
      options: ['Ya, boleh untuk menghindari kemacetan', 'Tidak, bahu jalan diperuntukkan untuk kedaruratan, bukan untuk berkendara reguler', 'Boleh jika kecepatan di bawah 20 km/jam', 'Boleh untuk kendaraan roda dua saja'],
      correct: 1,
      explanation: 'Bahu jalan (shoulder/jalur darurat) diperuntukkan khusus untuk kendaraan yang mengalami kerusakan, kendaraan darurat, dan pejalan kaki. Berkendara di bahu jalan adalah pelanggaran UU LLAJ meskipun kondisi sedang macet.'
    },
    {
      id: 16,
      question: 'STUDI KASUS - PERSIMPANGAN KERETA API: Anda mendekati perlintasan kereta api tanpa palang pintu. Apa tindakan yang benar?',
      options: ['Melaju jika tidak terdengar suara kereta', 'Berhenti, lihat ke kiri dan kanan untuk memastikan tidak ada kereta, baru menyeberang dengan cepat', 'Mempercepat kendaraan untuk segera melewati perlintasan', 'Ikuti kendaraan di depan saja'],
      correct: 1,
      explanation: 'Di perlintasan kereta api tanpa palang pintu, pengemudi WAJIB berhenti dan memeriksa keamanan dari kedua arah sebelum melintas. Kereta api selalu mendapat prioritas dan tidak bisa berhenti mendadak, sehingga pengemudi yang harus sangat berhati-hati.'
    },
    {
      id: 17,
      question: 'STUDI KASUS - APILL: Anda berkendara di persimpangan dan lampu bagi arah Anda baru saja berubah menjadi hijau. Apa yang harus Anda perhatikan sebelum melaju?',
      options: ['Langsung gas karena sudah hijau', 'Periksa dahulu apakah ada kendaraan dari arah lain yang masih menerobos lampu merah, baru melaju dengan aman', 'Bunyikan klakson sebagai tanda siap', 'Tidak perlu cek apapun, hijau berarti aman'],
      correct: 1,
      explanation: 'Meskipun lampu sudah hijau, selalu periksa kondisi persimpangan terlebih dahulu sebelum melaju. Ada kemungkinan kendaraan dari arah lain menerobos lampu merah. Kehati-hatian ini adalah prinsip dasar defensive driving.'
    },
    {
      id: 18,
      question: 'STUDI KASUS - MARKA JALAN: Garis marka putih di sisi paling kiri jalan (antara jalur kendaraan dan bahu jalan) adalah:',
      options: ['Garis batas kecepatan', 'Garis tepi jalan yang menandakan batas lajur kendaraan dengan bahu jalan atau median', 'Garis jalur sepeda', 'Batas parkir'],
      correct: 1,
      explanation: 'Garis marka putih di tepi paling kiri jalan adalah garis tepi (edge line) yang menandakan batas antara jalur lalu lintas dengan bahu jalan. Kendaraan tidak boleh melewati garis ini kecuali dalam keadaan darurat atau untuk berhenti.'
    },
    {
      id: 19,
      question: 'STUDI KASUS - KONDISI HUJAN: Saat hujan deras, jarak pandang sangat terbatas. Tindakan keselamatan yang tepat adalah:',
      options: ['Nyalakan lampu hazard dan tetap melaju kencang', 'Kurangi kecepatan, tingkatkan jarak aman dengan kendaraan di depan, nyalakan lampu utama (dekat)', 'Berhenti di tepi jalan dan nyalakan lampu hazard selamanya', 'Menyalakan lampu jauh agar terlihat'],
      correct: 1,
      explanation: 'Dalam kondisi hujan deras: (1) Kurangi kecepatan secara signifikan, (2) Tingkatkan jarak aman (lebih dari 3 detik), (3) Nyalakan lampu utama dekat (bukan jauh, karena pantulan dapat mengurangi pandangan), (4) Waspada terhadap aquaplaning (ban terangkat di atas genangan air).'
    },
    {
      id: 20,
      question: 'STUDI KASUS - BLIND SPOT: Anda akan berganti jalur ke kanan. Setelah memeriksa spion kanan dan tampaknya kosong, apa langkah keselamatan tambahan yang perlu dilakukan?',
      options: ['Langsung pindah jalur', 'Palingkan kepala sebentar untuk memeriksa blind spot di area yang tidak terjangkau spion, baru pindah jalur jika aman', 'Cukup bunyikan sein kanan', 'Percayakan sepenuhnya pada sensor parkir'],
      correct: 1,
      explanation: 'Setiap kendaraan memiliki "blind spot" (titik buta) yang tidak dapat dilihat melalui spion. Sebelum berpindah jalur, selalu palingkan kepala untuk memeriksa blind spot secara langsung. Ini adalah teknik keselamatan fundamental yang tidak dapat digantikan oleh teknologi spion manapun.'
    }
  ];

  /* --------------------------------------------------------------------------
   * 2. STATE KUIS
   * -------------------------------------------------------------------------- */
  const quizState = {
    currentQuizId: null,       // '1' atau '2'
    questions: [],
    currentIndex: 0,
    answers: [],               // Array of { selectedIndex, correct }
    timerInterval: null,
    advanceInterval: null,
    timeLeft: 30,
    isAnswered: false
  };

  /* --------------------------------------------------------------------------
   * 3. INISIALISASI KUIS
   * -------------------------------------------------------------------------- */
  function initQuiz() {
    // Quiz 1 - Start button
    const startQ1Btn = document.getElementById('quiz-1-start-btn');
    if (startQ1Btn) {
      startQ1Btn.addEventListener('click', () => startQuiz('1'));
    }

    // Quiz 2 - Start button
    const startQ2Btn = document.getElementById('quiz-2-start-btn');
    if (startQ2Btn) {
      startQ2Btn.addEventListener('click', () => startQuiz('2'));
    }
  }

  function startQuiz(quizId) {
    stopTimer();
    stopAutoAdvance();
    quizState.currentQuizId = quizId;
    quizState.questions = quizId === '1'
      ? [...QUIZ_1_QUESTIONS]
      : shuffleArray([...QUIZ_2_QUESTIONS]).slice(0, 15); // 15 random from 20
    quizState.currentIndex = 0;
    quizState.answers = [];
    quizState.isAnswered = false;

    // Show quiz section, hide intro
    const introSection = document.getElementById(`quiz-${quizId}-intro`);
    const quizSection = document.getElementById(`quiz-${quizId}-session`);
    const resultSection = document.getElementById(`quiz-${quizId}-result`);

    if (introSection) introSection.classList.add('hidden');
    if (quizSection) quizSection.classList.remove('hidden');
    if (resultSection) resultSection.classList.add('hidden');

    renderQuestion();
  }

  /* --------------------------------------------------------------------------
   * 4. RENDER SOAL
   * -------------------------------------------------------------------------- */
  function renderQuestion() {
    stopAutoAdvance();
    const q = quizState.questions[quizState.currentIndex];
    const qId = quizState.currentQuizId;
    const total = quizState.questions.length;
    const current = quizState.currentIndex + 1;

    // Progress
    const progressBar = document.getElementById(`quiz-${qId}-progress-bar`);
    const progressText = document.getElementById(`quiz-${qId}-progress-text`);
    if (progressBar) progressBar.style.width = `${(current / total) * 100}%`;
    if (progressText) progressText.textContent = `Soal ${current} dari ${total}`;

    // Question number & text
    const qNumEl = document.getElementById(`quiz-${qId}-question-num`);
    const qTextEl = document.getElementById(`quiz-${qId}-question-text`);
    if (qNumEl) {
      const category = qId === '1'
        ? current <= QUIZ_1_SIGN_ILLUSTRATIONS.length ? 'Rambu Lalu Lintas' : 'Peraturan dan Dasar Berkendara'
        : '';
      qNumEl.textContent = category ? `Soal ${current} · ${category}` : `Soal ${current}`;
    }
    if (qTextEl) qTextEl.textContent = q.question;

    if (qId === '1') {
      const signImage = document.getElementById('quiz-1-sign');
      const sign = QUIZ_1_SIGN_ILLUSTRATIONS[q.id - 1];
    if (signImage) {
      signImage.classList.toggle('hidden', !sign);
      if (sign) {
        signImage.innerHTML = '';
        if (sign.image) {
          const image = document.createElement('img');
          image.src = sign.image;
          image.alt = sign.label;
          image.draggable = false;
          signImage.appendChild(image);
        } else {
          signImage.innerHTML = createTrafficSignSvg(sign);
        }
        signImage.setAttribute('aria-label', sign.label);
        signImage.setAttribute('title', sign.label);
        const caption = document.createElement('span');
        caption.className = 'quiz-sign-caption';
        caption.textContent = sign.label;
        signImage.appendChild(caption);
      } else {
        signImage.innerHTML = '';
        signImage.removeAttribute('title');
      }
    }
    }

    // Options
    const optionsContainer = document.getElementById(`quiz-${qId}-options`);
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        btn.id = `quiz-${qId}-opt-${i}`;
        btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + i)}</span><span class="option-text">${opt}</span>`;
        btn.addEventListener('click', () => handleAnswer(i));
        optionsContainer.appendChild(btn);
      });
    }

    // Feedback area (hidden initially)
    const feedbackEl = document.getElementById(`quiz-${qId}-feedback`);
    if (feedbackEl) feedbackEl.classList.add('hidden');

    // Next button
    const nextBtn = document.getElementById(`quiz-${qId}-next-btn`);
    if (nextBtn) {
      nextBtn.classList.add('hidden');
      nextBtn.textContent = current < total ? 'Soal Berikutnya →' : 'Lihat Hasil';
    }

    // Reset state
    quizState.isAnswered = false;

    // Start timer
    startTimer(qId);
  }

  /* --------------------------------------------------------------------------
   * 5. TIMER
   * -------------------------------------------------------------------------- */
  function startTimer(qId) {
    if (quizState.timerInterval) {
      clearInterval(quizState.timerInterval);
    }
    quizState.timeLeft = 30;

    const timerEl = document.getElementById(`quiz-${qId}-timer`);
    const timerCircle = document.getElementById(`quiz-${qId}-timer-circle`);

    function updateTimer() {
      if (timerEl) timerEl.textContent = quizState.timeLeft;
      if (timerCircle) {
        const pct = quizState.timeLeft / 30;
        const circumference = 2 * Math.PI * 18;
        timerCircle.style.strokeDasharray = `${pct * circumference} ${circumference}`;
        timerCircle.style.stroke = quizState.timeLeft > 10 ? '#007de2' : '#DC2626';
      }
    }

    updateTimer();
    quizState.timerInterval = setInterval(() => {
      quizState.timeLeft--;
      updateTimer();
      if (quizState.timeLeft <= 0) {
        clearInterval(quizState.timerInterval);
        if (!quizState.isAnswered) {
          handleAnswer(-1); // Time's up - no answer selected
        }
      }
    }, 1000);
  }

  function stopTimer() {
    if (quizState.timerInterval) {
      clearInterval(quizState.timerInterval);
      quizState.timerInterval = null;
    }
  }

  function stopAutoAdvance() {
    if (quizState.advanceInterval) {
      clearInterval(quizState.advanceInterval);
      quizState.advanceInterval = null;
    }
  }

  function startAutoAdvance(seconds, quizId) {
    stopAutoAdvance();
    let remaining = seconds;
    const countdown = document.getElementById(`quiz-${quizId}-advance-countdown`);

    quizState.advanceInterval = setInterval(() => {
      remaining--;
      if (countdown) countdown.textContent = remaining.toString();
      if (remaining <= 0) {
        stopAutoAdvance();
        handleNext();
      }
    }, 1000);
  }

  function stopQuiz() {
    stopTimer();
    stopAutoAdvance();
    if (!quizState.currentQuizId) return;

    const quizId = quizState.currentQuizId;
    document.getElementById(`quiz-${quizId}-intro`)?.classList.remove('hidden');
    document.getElementById(`quiz-${quizId}-session`)?.classList.add('hidden');
    document.getElementById(`quiz-${quizId}-result`)?.classList.add('hidden');
    quizState.currentQuizId = null;
  }

  /* --------------------------------------------------------------------------
   * 6. HANDLE JAWABAN
   * -------------------------------------------------------------------------- */
  function handleAnswer(selectedIndex) {
    if (quizState.isAnswered) return;
    quizState.isAnswered = true;
    stopTimer();

    const q = quizState.questions[quizState.currentIndex];
    const qId = quizState.currentQuizId;
    const isCorrect = selectedIndex === q.correct;

    // Record answer
    quizState.answers.push({ selectedIndex, correct: q.correct, isCorrect });

    // Show visual feedback on options
    const optionsContainer = document.getElementById(`quiz-${qId}-options`);
    if (optionsContainer) {
      const btns = optionsContainer.querySelectorAll('.quiz-option-btn');
      btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
          btn.classList.add('correct');
        } else if (i === selectedIndex && !isCorrect) {
          btn.classList.add('wrong');
        }
      });
    }

    // Show feedback
    const feedbackEl = document.getElementById(`quiz-${qId}-feedback`);
    if (feedbackEl) {
      feedbackEl.classList.remove('hidden', 'feedback-correct', 'feedback-wrong', 'feedback-timeout');
      const countdownSeconds = isCorrect ? 3 : 5;
      const countdownMarkup = `<div class="quiz-auto-advance"><span>Lanjut dalam</span><strong id="quiz-${qId}-advance-countdown" aria-live="polite" aria-atomic="true">${countdownSeconds}</strong><span>detik</span><button type="button" class="btn btn-primary quiz-auto-next-btn">Soal Berikutnya →</button></div>`;
      if (selectedIndex === -1) {
        feedbackEl.classList.add('feedback-timeout');
        feedbackEl.innerHTML = `<span class="feedback-icon">⏰</span><div class="quiz-feedback-content"><strong>Waktu Habis!</strong><p>${q.explanation}</p>${countdownMarkup}</div>`;
      } else if (isCorrect) {
        feedbackEl.classList.add('feedback-correct');
        feedbackEl.innerHTML = `<span class="feedback-icon">✓</span><div class="quiz-feedback-content"><strong>Benar!</strong><p>${q.explanation}</p>${countdownMarkup}</div>`;
      } else {
        feedbackEl.classList.add('feedback-wrong');
        feedbackEl.innerHTML = `<span class="feedback-icon">✗</span><div class="quiz-feedback-content"><strong>Kurang Tepat.</strong><p>${q.explanation}</p>${countdownMarkup}</div>`;
      }
      feedbackEl.querySelector('.quiz-auto-next-btn')?.addEventListener('click', handleNext);
      startAutoAdvance(countdownSeconds, qId);
    }
  }

  /* --------------------------------------------------------------------------
   * 7. NAVIGASI SOAL
   * -------------------------------------------------------------------------- */
  function handleNext() {
    stopAutoAdvance();
    quizState.currentIndex++;
    if (quizState.currentIndex < quizState.questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }

  /* --------------------------------------------------------------------------
   * 8. TAMPILKAN HASIL
   * -------------------------------------------------------------------------- */
  function showResults() {
    stopTimer();
    stopAutoAdvance();
    const qId = quizState.currentQuizId;
    const total = quizState.questions.length;
    const correct = quizState.answers.filter(a => a.isCorrect).length;
    const score = Math.round((correct / total) * 100);

    // Hide quiz session, show result
    const quizSection = document.getElementById(`quiz-${qId}-session`);
    const resultSection = document.getElementById(`quiz-${qId}-result`);
    if (quizSection) quizSection.classList.add('hidden');
    if (resultSection) resultSection.classList.remove('hidden');

    // Score display
    const scoreEl = document.getElementById(`quiz-${qId}-result-score`);
    const correctEl = document.getElementById(`quiz-${qId}-result-correct`);
    const totalEl = document.getElementById(`quiz-${qId}-result-total`);
    const gradeEl = document.getElementById(`quiz-${qId}-result-grade`);
    const gradeTextEl = document.getElementById(`quiz-${qId}-result-grade-text`);
    const resultHeaderEl = document.getElementById(`quiz-${qId}-result-header`);

    if (scoreEl) scoreEl.textContent = score;
    if (correctEl) correctEl.textContent = correct;
    if (totalEl) totalEl.textContent = total;

    let grade, gradeText, headerClass;
    if (score >= 85) {
      grade = 'A'; gradeText = 'Sangat Baik! Pemahaman Anda tentang peraturan lalu lintas sangat baik.'; headerClass = 'result-header-a';
    } else if (score >= 75) {
      grade = 'B'; gradeText = 'Baik! Anda memahami peraturan lalu lintas dengan cukup baik.'; headerClass = 'result-header-b';
    } else if (score >= 60) {
      grade = 'C'; gradeText = 'Cukup. Pelajari kembali materi yang masih kurang dipahami.'; headerClass = 'result-header-c';
    } else {
      grade = 'D'; gradeText = 'Perlu banyak belajar. Pelajari ulang seluruh materi dan coba lagi.'; headerClass = 'result-header-d';
    }

    if (gradeEl) gradeEl.textContent = grade;
    if (gradeTextEl) gradeTextEl.textContent = gradeText;
    if (resultHeaderEl) {
      resultHeaderEl.className = `result-header ${headerClass}`;
    }

    // Review answers
    const reviewContainer = document.getElementById(`quiz-${qId}-review`);
    if (reviewContainer) {
      reviewContainer.innerHTML = '';
      quizState.answers.forEach((ans, idx) => {
        const q = quizState.questions[idx];
        const div = document.createElement('div');
        div.className = `review-item ${ans.isCorrect ? 'review-correct' : 'review-wrong'}`;
        div.innerHTML = `
          <div class="review-q-header">
            <span class="review-badge ${ans.isCorrect ? 'badge-correct' : 'badge-wrong'}">${ans.isCorrect ? '✓' : '✗'}</span>
            <strong>Soal ${idx + 1}</strong>
          </div>
          <p class="review-question">${q.question}</p>
          ${!ans.isCorrect && ans.selectedIndex !== -1 ? `<p class="review-selected">Jawaban Anda: <em>${q.options[ans.selectedIndex]}</em></p>` : ''}
          ${ans.selectedIndex === -1 ? `<p class="review-selected">Jawaban Anda: <em>Tidak dijawab (waktu habis)</em></p>` : ''}
          <p class="review-answer">Jawaban Benar: <strong>${q.options[q.correct]}</strong></p>
        `;
        reviewContainer.appendChild(div);
      });
    }

    // Retry button
    const retryBtn = document.getElementById(`quiz-${qId}-retry-btn`);
    if (retryBtn) {
      retryBtn.onclick = stopQuiz;
    }
  }

  /* --------------------------------------------------------------------------
   * 9. UTILITIES
   * -------------------------------------------------------------------------- */
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* --------------------------------------------------------------------------
   * 10. PUBLIC API
   * -------------------------------------------------------------------------- */
  window.ELintasQuiz = {
    init: initQuiz,
    start: startQuiz,
    stop: stopQuiz
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
  } else {
    initQuiz();
  }

})(window);
