/**
 * ==============================================================================
 * E-LINTAS - QUIZ MODULE (quiz.js)
 * ==============================================================================
 * Sistem Kuis Interaktif E-Lintas
 * - Kuis 1: Peraturan dan Rambu-Rambu Lalu Lintas (25 Soal)
 * - Kuis 2: Studi Kasus Uji Teori SIM (Persimpangan, Prioritas, Marka, APILL) (20 Soal)
 *
 * Fitur:
 * - Timer countdown per soal (30 detik)
 * - Navigasi soal berikutnya / sebelumnya
 * - Feedback langsung (benar/salah + penjelasan)
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
    {
      id: 1,
      question: 'Rambu lalu lintas berbentuk lingkaran dengan garis diagonal merah dan gambar tertentu di dalamnya termasuk dalam kelompok rambu apa?',
      options: ['Rambu Peringatan', 'Rambu Larangan', 'Rambu Perintah', 'Rambu Petunjuk'],
      correct: 1,
      explanation: 'Rambu Larangan berbentuk lingkaran dengan latar putih, garis tepi dan diagonal merah. Rambu ini melarang pengguna jalan melakukan hal yang digambarkan di dalamnya.'
    },
    {
      id: 2,
      question: 'Rambu berbentuk segitiga sama sisi dengan warna dasar kuning dan tepi hitam berfungsi sebagai:',
      options: ['Rambu Petunjuk', 'Rambu Perintah', 'Rambu Peringatan', 'Rambu Larangan'],
      correct: 2,
      explanation: 'Rambu Peringatan berbentuk segitiga sama sisi dengan warna dasar kuning (atau oranye) dan tepi hitam. Rambu ini memberi peringatan kepada pengguna jalan tentang kondisi berbahaya di depan.'
    },
    {
      id: 3,
      question: 'Batas kecepatan maksimum di jalan bebas hambatan (tol) dalam kota adalah:',
      options: ['60 km/jam', '80 km/jam', '100 km/jam', '120 km/jam'],
      correct: 1,
      explanation: 'Berdasarkan PP No. 79 Tahun 2013, batas kecepatan di jalan tol dalam kota adalah 80 km/jam dan di jalan tol luar kota adalah 100 km/jam.'
    },
    {
      id: 4,
      question: 'Helm yang wajib digunakan oleh pengendara sepeda motor di Indonesia harus memenuhi standar:',
      options: ['ISO 9001', 'SNI (Standar Nasional Indonesia)', 'ASTM International', 'CE EN 1078'],
      correct: 1,
      explanation: 'Berdasarkan UU No. 22 Tahun 2009 pasal 106 ayat 8, setiap pengemudi dan penumpang sepeda motor wajib menggunakan helm yang memenuhi Standar Nasional Indonesia (SNI).'
    },
    {
      id: 5,
      question: 'Ketika akan berbelok atau berpindah jalur, pengendara wajib memberi isyarat dengan:',
      options: ['Klakson', 'Lampu sein minimal 30 meter sebelum titik belok', 'Lampu hazard', 'Gerakan tangan'],
      correct: 1,
      explanation: 'UU No. 22 Tahun 2009 mewajibkan pengemudi memberi isyarat lampu sein sekurang-kurangnya 30 meter sebelum melakukan gerakan membelok atau berpindah lajur.'
    },
    {
      id: 6,
      question: 'Garis marka jalan berwarna kuning di tengah jalur menandakan:',
      options: ['Batas kecepatan', 'Batas jalur berlawanan arah, tidak boleh dilewati', 'Zona sekolah', 'Area parkir'],
      correct: 1,
      explanation: 'Garis marka berwarna kuning memisahkan arus lalu lintas dari dua arah berlawanan. Garis kuning utuh tidak boleh dilintasi, sedangkan garis kuning putus-putus boleh dilewati jika aman.'
    },
    {
      id: 7,
      question: 'Jarak minimum menyalip kendaraan lain di jalan adalah:',
      options: ['Boleh kapan saja jika jalur depan kosong', 'Hanya di jalan tol', 'Dilarang saat garis marka utuh (garis putih penuh) di tengah jalan', 'Harus ada jarak 50 meter di belakang'],
      correct: 2,
      explanation: 'Menyalip dilarang saat terdapat marka garis utuh (tidak terputus) di tengah jalan. Garis tersebut menandakan bahwa kondisi jalan tidak aman untuk menyalip.'
    },
    {
      id: 8,
      question: 'Kendaraan manakah yang mendapat prioritas utama di jalan raya?',
      options: ['Kendaraan pemerintah dengan sirine', 'Kendaraan yang datang dari kanan', 'Kendaraan gawat darurat (ambulans, pemadam kebakaran, mobil polisi) dengan sirine menyala', 'Truk besar'],
      correct: 2,
      explanation: 'Berdasarkan UU No. 22 Tahun 2009 pasal 134, kendaraan bermotor yang mendapat prioritas adalah: pemadam kebakaran, ambulans, kendaraan untuk memberi pertolongan kecelakaan, kendaraan pimpinan negara, dan kendaraan pengawalan oleh kepolisian.'
    },
    {
      id: 9,
      question: 'Rambu petunjuk berwarna hijau umumnya menandakan:',
      options: ['Tempat istirahat', 'Petunjuk arah jalan non-tol', 'Fasilitas umum', 'Petunjuk arah jalan tol atau jalan bebas hambatan'],
      correct: 3,
      explanation: 'Rambu petunjuk berwarna hijau digunakan untuk menunjukkan petunjuk arah pada jalan bebas hambatan (tol). Warna biru digunakan untuk jalan non-tol.'
    },
    {
      id: 10,
      question: 'Apa yang dimaksud dengan marka zebra cross (penyeberangan pejalan kaki)?',
      options: ['Tempat parkir kendaraan', 'Tempat menunggu bus', 'Jalur khusus untuk pejalan kaki menyeberang, kendaraan wajib mendahulukan pejalan kaki', 'Batas wilayah kecepatan'],
      correct: 2,
      explanation: 'Zebra cross adalah marka berupa garis-garis putih yang sejajar. Kendaraan bermotor wajib mendahulukan pejalan kaki yang sedang menyeberang di zebra cross sesuai UU No. 22 Tahun 2009.'
    },
    {
      id: 11,
      question: 'Batas kecepatan untuk pengendara sepeda motor di kawasan permukiman adalah:',
      options: ['30 km/jam', '25 km/jam', '40 km/jam', '50 km/jam'],
      correct: 0,
      explanation: 'Sesuai PP No. 79 Tahun 2013, batas kecepatan di kawasan permukiman adalah 30 km/jam untuk semua kendaraan bermotor.'
    },
    {
      id: 12,
      question: 'Menyalakan lampu utama sepeda motor di siang hari bertujuan untuk:',
      options: ['Kewajiban hukum agar lebih mudah terlihat pengendara lain', 'Menghemat daya aki', 'Menandakan kendaraan baru', 'Tidak ada fungsi khusus'],
      correct: 0,
      explanation: 'UU No. 22 Tahun 2009 mewajibkan pengemudi sepeda motor untuk menyalakan lampu utama pada siang hari. Ini meningkatkan visibilitas motor di jalan dan mengurangi risiko kecelakaan.'
    },
    {
      id: 13,
      question: 'Jika rambu "STOP" terpasang di suatu persimpangan, pengendara harus:',
      options: ['Melambat dan melihat kondisi persimpangan', 'Berhenti penuh sebelum garis berhenti, meskipun jalan kosong, kemudian periksa kondisi aman', 'Berhenti jika ada kendaraan lain', 'Memprioritaskan kendaraan dari kiri'],
      correct: 1,
      explanation: 'Rambu STOP (garis segidelapan merah) mewajibkan kendaraan berhenti penuh (complete stop) sebelum garis stop, periksa kondisi lalu lintas dari semua arah, dan baru melanjutkan perjalanan jika aman.'
    },
    {
      id: 14,
      question: 'Sabuk keselamatan (safety belt) wajib digunakan oleh:',
      options: ['Hanya pengemudi saja', 'Pengemudi dan semua penumpang di kursi depan', 'Pengemudi dan semua penumpang di semua kursi', 'Tidak diwajibkan untuk penumpang belakang'],
      correct: 2,
      explanation: 'UU No. 22 Tahun 2009 pasal 106 mewajibkan pengemudi dan seluruh penumpang (di semua kursi) untuk mengenakan sabuk keselamatan ketika berkendara dengan kendaraan roda empat atau lebih.'
    },
    {
      id: 15,
      question: 'Marka garis putus-putus putih di tengah jalan menandakan:',
      options: ['Batas jalur berlawanan arah yang tidak boleh dilewati', 'Pemisah jalur searah yang boleh dilewati jika aman', 'Zona pejalan kaki', 'Batas jalan berbayar'],
      correct: 1,
      explanation: 'Marka garis putus-putus putih di tengah jalan adalah pemisah jalur yang diperbolehkan untuk dilewati atau digunakan sebagai area menyalip apabila kondisi jalan di depan kosong dan aman.'
    },
    {
      id: 16,
      question: 'Pengendara motor yang menggunakan HP saat berkendara dapat dikenakan sanksi karena:',
      options: ['Melanggar etika berkendara', 'Melanggar UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan', 'Hanya berlaku untuk pengemudi mobil', 'Tidak ada aturan tertulis mengenai hal ini'],
      correct: 1,
      explanation: 'UU No. 22 Tahun 2009 pasal 283 melarang pengemudi mengoperasikan perangkat elektronik (termasuk HP) yang dapat mengganggu konsentrasi saat berkendara. Pelanggar dapat dikenai denda atau kurungan.'
    },
    {
      id: 17,
      question: 'Rambu lingkaran dengan garis merah diagonal tanpa gambar di dalamnya ("O" dengan garis merah diagonal) berarti:',
      options: ['Rambu umum area larangan', 'Dilarang masuk (No Entry) untuk semua kendaraan', 'Kawasan bebas polusi', 'Jalur satu arah'],
      correct: 1,
      explanation: 'Rambu lingkaran merah polos (tanpa gambar, dengan garis diagonal merah) adalah rambu "Dilarang Masuk" (No Entry). Artinya semua kendaraan dilarang memasuki jalan tersebut dari arah rambu dipasang.'
    },
    {
      id: 18,
      question: 'Batas kecepatan di lingkungan sekolah atau zona keselamatan adalah:',
      options: ['25 km/jam', '20 km/jam', '30 km/jam', '40 km/jam'],
      correct: 2,
      explanation: 'Di kawasan tertentu seperti zona sekolah, permukiman, dan kawasan keselamatan, batas kecepatan ditetapkan 30 km/jam sesuai peraturan lalu lintas yang berlaku di Indonesia.'
    },
    {
      id: 19,
      question: 'Rambu berbentuk lingkaran dengan latar biru dan angka putih menunjukkan:',
      options: ['Larangan melewati angka tersebut', 'Kecepatan minimum wajib yang harus dipatuhi', 'Jarak ke kota berikutnya', 'Kecepatan maksimum yang disarankan'],
      correct: 1,
      explanation: 'Rambu lingkaran biru dengan angka putih adalah rambu perintah kecepatan minimum. Kendaraan wajib melaju minimal dengan kecepatan yang tertera agar tidak menghambat arus lalu lintas.'
    },
    {
      id: 20,
      question: 'Ketika lampu lalu lintas berwarna kuning (amber) menyala:',
      options: ['Kendaraan boleh terus melaju kencang', 'Kendaraan yang belum melewati garis stop wajib bersiap berhenti dengan aman', 'Segera mempercepat kendaraan sebelum merah', 'Kendaraan dari arah berlawanan boleh melaju'],
      correct: 1,
      explanation: 'Lampu kuning adalah tanda peringatan bahwa lampu akan segera berubah menjadi merah. Kendaraan yang belum melewati garis stop wajib bersiap untuk berhenti. Mempercepat kendaraan saat kuning adalah pelanggaran berbahaya.'
    },
    {
      id: 21,
      question: 'Marka garis serong (diagonal) berwarna putih atau kuning di persimpangan atau ujung jalan menandakan:',
      options: ['Jalur penyeberangan pejalan kaki', 'Area yang tidak boleh dimasuki atau ditempati kendaraan', 'Jalur bus khusus', 'Pembatas jalan biasa'],
      correct: 1,
      explanation: 'Marka serong (garis-garis diagonal) menandakan area yang tidak boleh dimasuki atau ditempati kendaraan, misalnya di dekat persimpangan atau area netral di tengah jalan.'
    },
    {
      id: 22,
      question: 'Saat berkendara di malam hari dalam kondisi hujan deras, lampu yang wajib dinyalakan adalah:',
      options: ['Lampu hazard saja', 'Lampu utama (dekat) dan lampu belakang', 'Lampu jauh saja', 'Tidak perlu lampu jika ada lampu jalan'],
      correct: 1,
      explanation: 'Saat kondisi jarak pandang terbatas (malam/hujan deras), wajib menyalakan lampu utama (lampu dekat) dan lampu belakang. Lampu jauh (high beam) sebaiknya tidak digunakan saat ada kendaraan dari arah berlawanan karena dapat menyilaukan.'
    },
    {
      id: 23,
      question: 'Apa yang dimaksud "Defensive Driving" atau berkendara defensif?',
      options: ['Berkendara sepelan mungkin agar aman', 'Teknik berkendara yang mengutamakan keselamatan dengan mengantisipasi potensi bahaya dari pengguna jalan lain', 'Menghindari jalan ramai', 'Selalu menggunakan jalur kanan'],
      correct: 1,
      explanation: 'Defensive Driving adalah teknik berkendara yang mengutamakan keselamatan dengan cara selalu waspada, mengantisipasi risiko, menjaga jarak aman, dan siap merespons perilaku pengguna jalan lain yang tidak terduga.'
    },
    {
      id: 24,
      question: 'Berapa jarak aman minimum yang harus dijaga antara kendaraan bermotor di belakang kendaraan di depan pada kecepatan 60 km/jam?',
      options: ['5 meter', '15 meter', '30-40 meter (setara ~3 detik waktu reaksi)', '10 meter'],
      correct: 2,
      explanation: 'Jarak aman minimum disarankan menggunakan "aturan 3 detik": pilih titik tetap di jalan, saat kendaraan di depan melewatinya, hitung 3 detik sebelum kendaraan Anda melewati titik yang sama. Pada 60 km/jam, ini setara sekitar 50 meter.'
    },
    {
      id: 25,
      question: 'Tanda YIELD (segitiga terbalik dengan tepi merah) mewajibkan pengendara untuk:',
      options: ['Berhenti penuh seperti rambu STOP', 'Memberikan prioritas kepada kendaraan dari arah jalan utama, boleh melanjutkan jika aman tanpa berhenti penuh', 'Memberi jalan kepada pejalan kaki saja', 'Menyalakan lampu sein kiri'],
      correct: 1,
      explanation: 'Rambu YIELD (beri jalan) tidak mewajibkan berhenti penuh seperti STOP. Kendaraan harus memperlambat dan memberikan prioritas kepada kendaraan yang memiliki hak jalan (right of way) dari arah jalan utama, dan boleh melanjutkan ketika aman.'
    }
  ];

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
    quizState.currentQuizId = quizId;
    quizState.questions = quizId === '1'
      ? shuffleArray([...QUIZ_1_QUESTIONS]).slice(0, 15) // 15 random from 25
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
    if (qNumEl) qNumEl.textContent = `Soal ${current}`;
    if (qTextEl) qTextEl.textContent = q.question;

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
      if (selectedIndex === -1) {
        feedbackEl.classList.add('feedback-timeout');
        feedbackEl.innerHTML = `<span class="feedback-icon">⏰</span><div><strong>Waktu Habis!</strong><p>${q.explanation}</p></div>`;
      } else if (isCorrect) {
        feedbackEl.classList.add('feedback-correct');
        feedbackEl.innerHTML = `<span class="feedback-icon">✓</span><div><strong>Benar!</strong><p>${q.explanation}</p></div>`;
      } else {
        feedbackEl.classList.add('feedback-wrong');
        feedbackEl.innerHTML = `<span class="feedback-icon">✗</span><div><strong>Kurang Tepat.</strong><p>${q.explanation}</p></div>`;
      }
    }

    // Show next button
    const nextBtn = document.getElementById(`quiz-${qId}-next-btn`);
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.onclick = handleNext;
    }
  }

  /* --------------------------------------------------------------------------
   * 7. NAVIGASI SOAL
   * -------------------------------------------------------------------------- */
  function handleNext() {
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
      retryBtn.onclick = () => startQuiz(qId);
    }

    // Back to intro button
    const backBtn = document.getElementById(`quiz-${qId}-back-btn`);
    if (backBtn) {
      backBtn.onclick = () => {
        const introSection = document.getElementById(`quiz-${qId}-intro`);
        const resultSec = document.getElementById(`quiz-${qId}-result`);
        if (introSection) introSection.classList.remove('hidden');
        if (resultSec) resultSec.classList.add('hidden');
      };
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
    start: startQuiz
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
  } else {
    initQuiz();
  }

})(window);
