/**
 * ==============================================================================
 * E-LINTAS - QUIZ MODULE (quiz.js)
 * ==============================================================================
 * Sistem Kuis Interaktif E-Lintas
 * - Kuis 1: Peraturan dan Rambu-Rambu Lalu Lintas (35 Soal)
 * - Kuis 2: Studi Kasus Uji Teori SIM
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
    { image: 'assets/images/quiz-no-entry.jpg' },
    { image: 'assets/images/quiz-no-parking.jpg' },
    { image: 'assets/images/quiz-no-stopping.jpg' },
    { image: 'assets/images/quiz-speed-limit-40.jpg' },
    { image: 'assets/images/quiz-no-left-turn.png' },
    { image: 'assets/images/quiz-no-right-turn.png' },
    { image: 'assets/images/quiz-no-u-turn.png' },
    { image: 'assets/images/quiz-no-overtaking.png' },
    { image: 'assets/images/quiz-slippery-road.jpg' },
    { image: 'assets/images/quiz-uneven-road.jpg' },
    { image: 'assets/images/quiz-children-crossing.png' },
    { image: 'assets/images/quiz-intersection.jpg' },
    { image: 'assets/images/quiz-stop.png' },
    { image: 'assets/images/quiz-roundabout-mandatory.png' },
    { image: 'assets/images/quiz-parking.png' },
    { image: 'assets/images/quiz-road-narrows.jpg' },
    { image: 'assets/images/quiz-steep-ascent.jpg' },
    { image: 'assets/images/quiz-steep-descent.jpg' },
    { image: 'assets/images/quiz-bridge.jpg' },
    { image: 'assets/images/quiz-railway-gate.jpg' },
    { image: 'assets/images/quiz-railway-no-gate.png' },
    { image: 'assets/images/quiz-no-horn.jpg' },
    { image: 'assets/images/quiz-bicycle-lane.png' },
    { image: 'assets/images/quiz-pedestrian-crossing.png' },
    { image: 'assets/images/quiz-winding-road.png' },
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
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 50 km/jam di wilayah perkotaan. Di sebelah kiri terdapat sebuah mobil yang sedang parkir. Namun, lampu belakang mobil tersebut masih menyala dan terlihat pengemudinya masih berada di dalam mobil. Kondisi tersebut berpotensi menimbulkan bahaya apabila mobil tiba-tiba bergerak atau keluar dari tempat parkir. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk mengantisipasi terjadinya kecelakaan?',
      options: [
        'Tetap mempertahankan kecepatan 50 km/jam agar perjalanan lebih cepat.',
        'Membunyikan klakson dan langsung mendahului mobil dari sebelah kiri.',
        'Mengurangi kecepatan untuk mengantisipasi kemungkinan mobil bergerak atau keluar dari tempat parkir.',
        'Menambah kecepatan agar segera melewati mobil yang sedang parkir.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-parked-car.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor yang mendekati mobil parkir dengan lampu belakang menyala di sisi kiri jalan.',
      explanation: 'Kurangi kecepatan dan bersiap mengantisipasi pergerakan mobil. Lampu belakang yang menyala dan pengemudi yang masih berada di dalam mobil dapat menjadi tanda bahwa mobil mungkin akan bergerak atau keluar dari tempat parkir.'
    },
    {
      id: 2,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 30 km/jam di wilayah permukiman. Di bahu jalan terdapat anak-anak yang sedang bermain bola. Kondisi tersebut berpotensi membahayakan keselamatan karena bola atau anak-anak dapat tiba-tiba bergerak ke arah jalan raya. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk mencegah terjadinya kecelakaan?',
      options: [
        'Menambah kecepatan agar segera melewati anak-anak yang sedang bermain.',
        'Membunyikan klakson dan tetap mempertahankan kecepatan kendaraan.',
        'Mengurangi jarak aman dengan anak-anak agar tidak menghambat perjalanan.',
        'Melakukan pengereman untuk mengurangi kecepatan dan mencegah terjadinya kecelakaan.'
      ],
      correct: 3,
      image: 'assets/images/quiz-case-playing-children.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor yang mendekati anak-anak bermain bola di tepi jalan permukiman.',
      explanation: 'Lakukan pengereman untuk mengurangi kecepatan dan tetap waspada terhadap gerakan anak-anak atau bola yang dapat tiba-tiba memasuki jalan. Dengan kecepatan lebih rendah, pengendara memiliki lebih banyak waktu untuk bereaksi dan mencegah kecelakaan.'
    },
    {
      id: 3,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 50 km/jam di jalan dalam kota. Pengendara tersebut akan berbelok ke kiri ketika melewati sebuah simpang tiga. Di sekitar persimpangan terdapat kemungkinan pejalan kaki yang akan menyeberang jalan. Kondisi ini mengharuskan pengendara lebih berhati-hati agar tidak membahayakan pengguna jalan lainnya. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk mencegah terjadinya kecelakaan, terutama dengan pejalan kaki yang akan menyeberang jalan?',
      options: [
        'Menambah kecepatan agar segera melewati persimpangan.',
        'Membunyikan klakson dan langsung berbelok ke kiri.',
        'Mengurangi kecepatan untuk mengantisipasi pejalan kaki yang akan menyeberang jalan.',
        'Mempertahankan kecepatan 50 km/jam saat berbelok ke kiri.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-left-turn-pedestrian.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor mendekati simpang tiga dengan pejalan kaki di sekitar penyeberangan.',
      explanation: 'Kurangi kecepatan saat mendekati simpang dan mengantisipasi pejalan kaki yang mungkin menyeberang. Kecepatan yang lebih rendah memberi waktu untuk bereaksi dan mendahulukan pejalan kaki dengan aman.'
    },
    {
      id: 4,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 50 km/jam di kawasan pertokoan. Di depan pengendara terdapat polisi tidur dan sebuah mobil yang akan mundur. Kondisi tersebut berpotensi menimbulkan kecelakaan apabila pengendara tidak menjaga jarak dan kecepatan kendaraannya. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk mengantisipasi terjadinya kecelakaan dengan mobil yang akan mundur di depannya?',
      options: [
        'Menambah kecepatan agar segera melewati polisi tidur.',
        'Mempertahankan kecepatan 50 km/jam dan tetap mendekati mobil di depan.',
        'Membunyikan klakson dan langsung mendahului mobil tersebut.',
        'Mengurangi kecepatan untuk mengantisipasi mobil yang akan mundur dan mencegah terjadinya kecelakaan.'
      ],
      correct: 3,
      image: 'assets/images/quiz-case-reversing-car-speed-bump.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor di kawasan pertokoan, mendekati polisi tidur dan kendaraan di depannya.',
      explanation: 'Kurangi kecepatan dan jaga jarak aman dari mobil yang akan mundur, terutama saat mendekati polisi tidur. Ini memberi waktu dan ruang untuk bereaksi jika mobil bergerak mundur.'
    },
    {
      id: 5,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 20 km/jam di jalan dalam kota. Di depan pengendara terdapat genangan air yang cukup luas dan dapat mengganggu perjalanan. Jika pengendara melaju terlalu cepat melewati genangan tersebut, percikan air dapat mengenai pengguna jalan lainnya sehingga mengganggu kenyamanan mereka. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk menjaga keselamatan dan kenyamanan pengguna jalan lainnya?',
      options: [
        'Menambah kecepatan agar segera melewati genangan air.',
        'Mempertahankan kecepatan 20 km/jam saat melewati genangan air.',
        'Mengurangi kecepatan untuk mencegah percikan air yang dapat mengganggu pengguna jalan lainnya.',
        'Membunyikan klakson dan melewati genangan air dengan cepat.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-water-puddle.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor mendekati genangan air di jalan permukiman.',
      explanation: 'Kurangi kecepatan saat melewati genangan air. Selain menjaga kendali sepeda motor, hal ini mengurangi percikan yang dapat mengenai atau mengganggu pengguna jalan lain.'
    },
    {
      id: 6,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 50 km/jam di jalan dalam kota. Di depan pengendara terdapat kemacetan lalu lintas yang menyebabkan kendaraan bergerak sangat lambat bahkan berhenti. Kondisi tersebut mengharuskan pengendara berhati-hati agar tidak menabrak kendaraan lain di depannya. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk menghindari terjadinya kecelakaan akibat kemacetan lalu lintas?',
      options: [
        'Menambah kecepatan agar dapat melewati kemacetan dengan cepat.',
        'Membunyikan klakson secara terus-menerus agar kendaraan di depan segera berjalan.',
        'Tetap mempertahankan kecepatan 50 km/jam meskipun kondisi jalan macet.',
        'Melakukan pengereman dan berhenti sampai kondisi lalu lintas memungkinkan untuk melanjutkan perjalanan.'
      ],
      correct: 3,
      image: 'assets/images/quiz-case-traffic-jam.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor mendekati antrean kendaraan yang melaju lambat di jalan dalam kota.',
      explanation: 'Lakukan pengereman secara terkendali dan berhenti dengan jarak aman jika kendaraan di depan berhenti. Lanjutkan perjalanan hanya ketika arus lalu lintas kembali memungkinkan.'
    },
    {
      id: 7,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 20 km/jam di kawasan permukiman. Kondisi jalan di depan pengendara terlihat lengang dan tidak terdapat kendaraan lain yang melintas. Meskipun kondisi jalan cukup aman, pengendara tetap harus memperhatikan situasi lalu lintas di sekitarnya untuk menjaga keselamatan selama perjalanan. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor ketika kondisi jalan di kawasan permukiman sedang lengang?',
      options: [
        'Menambah kecepatan agar perjalanan lebih cepat sampai tujuan.',
        'Melanjutkan perjalanan dengan kecepatan stabil serta tetap memperhatikan kondisi lalu lintas di sekitar.',
        'Menghentikan kendaraan meskipun kondisi jalan aman dan tidak ada hambatan.',
        'Mengurangi kecepatan secara terus-menerus hingga kendaraan hampir berhenti.'
      ],
      correct: 1,
      image: 'assets/images/quiz-case-quiet-residential-road.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor melaju di jalan permukiman yang lengang.',
      explanation: 'Lanjutkan perjalanan dengan kecepatan stabil dan tetap waspada terhadap lingkungan sekitar. Jalan yang terlihat lengang bukan alasan untuk menambah kecepatan atau mengabaikan kemungkinan munculnya pengguna jalan lain.'
    },
    {
      id: 8,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 40 km/jam di jalan dalam kota. Kondisi lalu lintas di depan pengendara terpantau lancar dengan jarak aman antar kendaraan. Tidak terdapat hambatan yang mengganggu perjalanan. Meskipun kondisi lalu lintas lancar, pengendara tetap harus memperhatikan situasi di sekitarnya agar perjalanan tetap aman. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor ketika kondisi lalu lintas di depannya lancar dan aman?',
      options: [
        'Menambah kecepatan secara berlebihan agar lebih cepat sampai tujuan.',
        'Melakukan pengereman dan berhenti meskipun kondisi lalu lintas lancar.',
        'Melanjutkan perjalanan dengan kecepatan stabil serta tetap memperhatikan kondisi lalu lintas di sekitar.',
        'Mengurangi kecepatan secara tiba-tiba tanpa adanya hambatan di jalan.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-clear-traffic.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor di jalan dalam kota dengan kondisi lalu lintas lancar.',
      explanation: 'Pertahankan kecepatan yang stabil dan sesuai kondisi jalan, serta tetap perhatikan situasi di sekitar. Lalu lintas yang lancar bukan alasan untuk menambah kecepatan secara berlebihan atau mengurangi kewaspadaan.'
    },
    {
      id: 9,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 30 km/jam di jalan dalam kota. Pengendara tersebut akan berbelok ke kiri ketika melewati sebuah simpang empat. Saat mendekati persimpangan, lampu APILL (Alat Pemberi Isyarat Lalu Lintas) sedang menyala merah dan terdapat pejalan kaki yang sedang menyeberang jalan. Kondisi tersebut mengharuskan pengendara berhati-hati agar tidak membahayakan pejalan kaki maupun pengguna jalan lainnya. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk mencegah terjadinya kecelakaan di persimpangan tersebut?',
      options: [
        'Menambah kecepatan agar segera melewati persimpangan sebelum pejalan kaki selesai menyeberang.',
        'Membunyikan klakson dan langsung berbelok ke kiri tanpa berhenti.',
        'Mempertahankan kecepatan 30 km/jam sambil tetap berbelok ke kiri.',
        'Melakukan pengereman dan berhenti sebelum garis henti serta memberikan kesempatan kepada pejalan kaki untuk menyeberang.'
      ],
      correct: 3,
      image: 'assets/images/quiz-case-red-light-pedestrian.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor mendekati persimpangan dengan lampu merah dan pejalan kaki menyeberang.',
      explanation: 'Berhenti sebelum garis henti saat lampu APILL merah dan berikan kesempatan kepada pejalan kaki untuk menyelesaikan penyeberangan. Jangan menerobos lampu merah atau membahayakan pejalan kaki.'
    },
    {
      id: 10,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 25 km/jam di jalan dalam kota. Di depan pengendara terdapat kabut yang cukup tebal sehingga jarak pandang menjadi terbatas dan menyulitkan pengendara untuk melihat kondisi arus lalu lintas di depannya. Kondisi tersebut dapat meningkatkan risiko terjadinya kecelakaan apabila pengendara tidak berhati-hati. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk menghindari terjadinya tabrakan dengan kendaraan lain saat melintasi kawasan berkabut?',
      options: [
        'Menambah kecepatan agar segera melewati kawasan berkabut.',
        'Mempertahankan kecepatan 25 km/jam tanpa memperhatikan jarak pandang.',
        'Mengurangi kecepatan untuk mengantisipasi kendaraan lain dan mencegah terjadinya tabrakan.',
        'Membunyikan klakson secara terus-menerus dan tetap melaju dengan kecepatan semula.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-foggy-road.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor di jalan berkabut dengan jarak pandang terbatas.',
      explanation: 'Kurangi kecepatan agar tersedia waktu dan jarak yang cukup untuk bereaksi terhadap kendaraan di depan yang sulit terlihat. Tetap waspada dan sesuaikan laju dengan jarak pandang.'
    },
    {
      id: 11,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 30 km/jam di jalan dalam kota. Di depan pengendara terdapat perlintasan kereta api. Saat mendekati perlintasan, palang pintu kereta api sudah ditutup sebagai tanda bahwa kereta akan segera melintas. Kondisi tersebut mengharuskan pengendara berhenti dan menunggu hingga kereta selesai melintas serta situasi dinyatakan aman. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor ketika palang pintu perlintasan kereta api sudah ditutup?',
      options: [
        'Menambah kecepatan agar dapat melewati rel sebelum kereta melintas.',
        'Membunyikan klakson dan menerobos palang pintu kereta api.',
        'Mempertahankan kecepatan 30 km/jam sambil melewati perlintasan.',
        'Melakukan pengereman dan berhenti sampai seluruh gerbong kereta selesai melintas serta kondisi aman untuk melanjutkan perjalanan.'
      ],
      correct: 3,
      image: 'assets/images/quiz-case-railway-crossing-closed.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor berhenti di depan palang perlintasan kereta api yang tertutup.',
      explanation: 'Berhenti sebelum palang perlintasan dan tunggu sampai seluruh kereta melintas, palang terbuka, serta kondisi dipastikan aman sebelum melanjutkan perjalanan. Jangan menerobos palang yang sudah tertutup.'
    },
    {
      id: 12,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 40 km/jam di jalan dalam kota. Di depan pengendara terdapat seorang pesepeda yang sedang menyeberangi jalan raya. Kondisi tersebut mengharuskan pengendara sepeda motor berhati-hati agar tidak membahayakan pesepeda dan memberikan kesempatan untuk menyeberang dengan aman. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk menjaga keselamatan pesepeda yang sedang menyeberang jalan?',
      options: [
        'Menambah kecepatan agar segera melewati pesepeda tersebut.',
        'Membunyikan klakson dan tetap mempertahankan kecepatan 40 km/jam.',
        'Mengurangi kecepatan agar dapat memberikan kesempatan kepada pesepeda untuk menyeberang dengan aman.',
        'Mendahului pesepeda tanpa mengurangi kecepatan kendaraan.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-cyclist-crossing.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor mendekati pesepeda yang sedang menyeberang jalan.',
      explanation: 'Kurangi kecepatan dan beri pesepeda kesempatan untuk menyeberang dengan aman. Tetap waspada serta jangan mendahului dengan kecepatan yang dapat membahayakan pengguna jalan lain.'
    },
    {
      id: 13,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 30 km/jam di jalan dalam kota. Di depan pengendara terdapat seseorang yang sedang melakukan kegiatan bongkar muat barang dan hendak menyeberang jalan. Pada saat yang bersamaan, terdapat mobil yang akan melintas dari arah berlawanan. Kondisi tersebut dapat menimbulkan risiko kecelakaan apabila pengendara tidak berhati-hati dan tidak memberikan ruang yang cukup bagi pengguna jalan lainnya. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk menghindari terjadinya kecelakaan dalam kondisi tersebut?',
      options: [
        'Menambah kecepatan agar dapat melewati orang dan mobil tersebut dengan cepat.',
        'Mempertahankan kecepatan 30 km/jam sambil melewati orang yang sedang menyeberang.',
        'Membunyikan klakson dan langsung mendahului mobil dari arah berlawanan.',
        'Melakukan pengereman dan berhenti sejenak untuk memberikan kesempatan kepada orang tersebut menyelesaikan penyeberangan serta menunggu mobil dari arah berlawanan melintas.'
      ],
      correct: 3,
      image: 'assets/images/quiz-case-loading-pedestrian.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor mendekati orang yang melakukan bongkar muat dan hendak menyeberang jalan.',
      explanation: 'Kurangi kecepatan dan berhenti sejenak agar orang tersebut dapat menyelesaikan penyeberangan. Tunggu sampai mobil dari arah berlawanan melintas dan ruang jalan cukup aman sebelum melanjutkan perjalanan.'
    },
    {
      id: 14,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 50 km/jam di jalan dalam kota. Pengendara tersebut akan berbelok ke kanan pada persimpangan dengan lampu APILL (Alat Pemberi Isyarat Lalu Lintas) terdekat. Saat mendekati persimpangan, terdapat beberapa pesepeda yang memasuki lajur yang sedang dilalui pengendara sepeda motor. Kondisi tersebut berpotensi menimbulkan kecelakaan apabila pengendara tidak menjaga jarak aman dengan pesepeda di depannya. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk menjaga jarak aman dan menghindari terjadinya kecelakaan dengan pesepeda?',
      options: [
        'Menambah kecepatan agar segera melewati pesepeda sebelum mencapai persimpangan.',
        'Membunyikan klakson dan tetap mempertahankan kecepatan 50 km/jam.',
        'Melakukan pengereman untuk mengurangi kecepatan dan menjaga jarak aman dengan pesepeda di depan.',
        'Mendahului beberapa pesepeda sekaligus tanpa mengurangi kecepatan kendaraan.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-cyclists-entering-lane.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor mendekati beberapa pesepeda yang memasuki lajur di dekat persimpangan.',
      explanation: 'Kurangi kecepatan dengan mengerem secara terkendali dan jaga jarak aman dari pesepeda. Tetap waspada di dekat persimpangan dan lanjutkan manuver hanya saat tersedia ruang yang aman.'
    },
    {
      id: 15,
      question: 'Seorang pengendara sepeda motor sedang melaju dengan kecepatan 20 km/jam di jalan dalam kota. Di depan pengendara terdapat pasar tumpah dengan masyarakat yang sedang melakukan aktivitas jual beli di sisi kanan dan kiri bahu jalan. Kondisi tersebut menyebabkan aktivitas masyarakat cukup ramai dan berpotensi mengganggu ruang gerak kendaraan yang melintas. Oleh karena itu, pengendara harus lebih berhati-hati agar tidak menyerempet masyarakat yang sedang beraktivitas. Apa tindakan yang seharusnya dilakukan oleh pengendara sepeda motor untuk menghindari terjadinya kecelakaan dengan masyarakat yang sedang beraktivitas di pasar tumpah?',
      options: [
        'Menambah kecepatan agar segera melewati kawasan pasar tumpah.',
        'Mempertahankan kecepatan 20 km/jam tanpa memperhatikan aktivitas masyarakat di sekitar jalan.',
        'Mengurangi kecepatan dan berkendara dengan hati-hati untuk mengantisipasi masyarakat yang berada di sekitar jalan.',
        'Membunyikan klakson secara terus-menerus agar masyarakat segera menjauh dari jalan.'
      ],
      correct: 2,
      image: 'assets/images/quiz-case-roadside-market.png',
      imageAlt: 'Sudut pandang pengendara sepeda motor melewati pasar tumpah dengan masyarakat beraktivitas di kedua sisi jalan.',
      explanation: 'Kurangi kecepatan dan berkendara dengan hati-hati di sekitar pasar tumpah. Waspadai pergerakan masyarakat di kedua sisi jalan dan berikan ruang yang cukup agar tidak menyerempet mereka.'
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
    const quiz2QuestionCount = document.getElementById('quiz-2-question-count');
    if (quiz2QuestionCount) {
      quiz2QuestionCount.textContent = QUIZ_2_QUESTIONS.length.toString();
    }

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
      : [...QUIZ_2_QUESTIONS];
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
            image.alt = '';
            image.draggable = false;
            signImage.appendChild(image);
          } else {
            signImage.innerHTML = createTrafficSignSvg(sign);
          }
        } else {
          signImage.innerHTML = '';
        }
      }
    }

    const caseImageContainer = document.getElementById(`quiz-${qId}-case-image`);
    if (caseImageContainer) {
      caseImageContainer.classList.toggle('hidden', !q.image);
      caseImageContainer.replaceChildren();
      if (q.image) {
        const image = document.createElement('img');
        image.src = q.image;
        image.alt = q.imageAlt || '';
        image.draggable = false;
        caseImageContainer.appendChild(image);
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
        if (selectedIndex !== -1 && i === q.correct) {
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
        const unanswered = ans.selectedIndex === -1;
        const div = document.createElement('div');
        const statusClass = unanswered ? 'review-unanswered' : ans.isCorrect ? 'review-correct' : 'review-wrong';
        const badgeClass = unanswered ? 'badge-unanswered' : ans.isCorrect ? 'badge-correct' : 'badge-wrong';
        const badgeText = unanswered ? '–' : ans.isCorrect ? '✓' : '✗';
        div.className = `review-item ${statusClass}`;
        div.innerHTML = `
          <div class="review-q-header">
            <span class="review-badge ${badgeClass}">${badgeText}</span>
            <strong>Soal ${idx + 1}</strong>
          </div>
          <p class="review-question">${q.question}</p>
          ${!ans.isCorrect && ans.selectedIndex !== -1 ? `<p class="review-selected">Jawaban Anda: <em>${q.options[ans.selectedIndex]}</em></p>` : ''}
          ${unanswered ? `<p class="review-selected">Jawaban Anda: <em>Tidak dijawab (waktu habis)</em></p>` : ''}
          <p class="review-answer${unanswered ? ' review-answer-unanswered' : ''}">Jawaban Benar: <strong>${q.options[q.correct]}</strong></p>
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
   * 9. PUBLIC API
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
