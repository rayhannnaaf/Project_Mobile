export const hospitalList = [
  {
    id: '1',
    name: 'RS Cipto Mangunkusumo',
    city: 'Jakarta Pusat',
    type: 'Rumah Sakit Umum',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&q=80',
  },
  {
    id: '2',
    name: 'RS Pondok Indah',
    city: 'Jakarta Selatan',
    type: 'Rumah Sakit Swasta',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  },
  {
    id: '3',
    name: 'RS Siloam Hospitals',
    city: 'Tangerang',
    type: 'Rumah Sakit Swasta',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&q=80',
  },
  {
    id: '4',
    name: 'RS Hasan Sadikin',
    city: 'Bandung',
    type: 'Rumah Sakit Umum',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&q=80',
  },
  {
    id: '5',
    name: 'RS Panti Rapih',
    city: 'Yogyakarta',
    type: 'Rumah Sakit Swasta',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=80',
  },
  {
    id: '6',
    name: 'RS Dr. Soetomo',
    city: 'Surabaya',
    type: 'Rumah Sakit Umum',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400&q=80',
  },
];

export const faqSections = [
  {
    title: '📋 Pendaftaran & Aktivasi',
    data: [
      {
        id: 'f1',
        question: 'Bagaimana cara mendaftar asuransi HealthShield?',
        answer:
          'Kamu bisa mendaftar 100% online melalui aplikasi ini. Isi data diri, pilih paket, dan lakukan pembayaran. Polis aktif dalam 5 menit setelah pembayaran berhasil.',
      },
      {
        id: 'f2',
        question: 'Apakah perlu medical check-up untuk mendaftar?',
        answer:
          'Untuk Paket Basic dan Standard, tidak diperlukan medical check-up. Paket Premium memerlukan pemeriksaan kesehatan dasar yang bisa dilakukan di klinik mitra kami.',
      },
      {
        id: 'f3',
        question: 'Berapa lama proses aktivasi polis?',
        answer:
          'Polis digital aktif dalam 5 menit setelah pembayaran. Kartu fisik akan dikirimkan dalam 3-5 hari kerja ke alamat yang terdaftar.',
      },
    ],
  },
  {
    title: '💊 Manfaat & Klaim',
    data: [
      {
        id: 'f4',
        question: 'Apa saja yang ditanggung oleh asuransi ini?',
        answer:
          'HealthShield menanggung rawat inap, rawat jalan, operasi, obat-obatan, perawatan gigi, pemeriksaan mata, dan layanan darurat 24 jam sesuai paket yang dipilih.',
      },
      {
        id: 'f5',
        question: 'Bagaimana cara mengajukan klaim?',
        answer:
          'Klaim bisa diajukan melalui aplikasi dengan upload foto nota/kwitansi dan surat dokter. Proses verifikasi maksimal 24 jam, dan dana ditransfer ke rekeningmu dalam 3 hari kerja.',
      },
      {
        id: 'f6',
        question: 'Apakah klaim bisa ditolak?',
        answer:
          'Klaim dapat ditolak jika kondisi sudah ada sebelum polis aktif (pre-existing condition), atau tidak sesuai dengan cakupan paket yang dipilih. Tingkat persetujuan klaim kami 99%.',
      },
    ],
  },
  {
    title: '💳 Pembayaran & Paket',
    data: [
      {
        id: 'f7',
        question: 'Apa saja metode pembayaran yang tersedia?',
        answer:
          'Tersedia transfer bank (BCA, Mandiri, BNI, BRI), kartu kredit/debit, GoPay, OVO, DANA, dan ShopeePay. Pembayaran otomatis tersedia untuk kemudahan perpanjangan.',
      },
      {
        id: 'f8',
        question: 'Bisakah saya ganti paket di tengah periode?',
        answer:
          'Upgrade paket bisa dilakukan kapan saja dan langsung aktif setelah pembayaran selisih premi. Downgrade paket hanya bisa dilakukan saat perpanjangan polis.',
      },
    ],
  },
];

export const planList = [
  {
    id: 'p1',
    name: 'Basic',
    price: 'Rp 99.000',
    icon: '🌱',
    color: '#E3F2FD',
    borderColor: '#1565C0',
    popular: false, // ✅ explicit boolean
    benefits: [
      'Rawat inap Rp 50 juta/tahun',
      'Rawat jalan 6x/tahun',
      '500+ rumah sakit',
      'Klaim online 24 jam',
    ],
  },
  {
    id: 'p2',
    name: 'Standard',
    price: 'Rp 199.000',
    icon: '⚡',
    color: '#E8F5E9',
    borderColor: '#2E7D32',
    popular: true, // ✅ explicit boolean
    benefits: [
      'Rawat inap Rp 150 juta/tahun',
      'Rawat jalan unlimited',
      '2.000+ rumah sakit',
      'Gigi & mata included',
      'Proteksi 1 anak',
    ],
  },
  {
    id: 'p3',
    name: 'Premium',
    price: 'Rp 349.000',
    icon: '👑',
    color: '#FFF3E0',
    borderColor: '#E65100',
    popular: false, // ✅ explicit boolean
    benefits: [
      'Rawat inap Rp 500 juta/tahun',
      'Spesialis unlimited',
      'RS internasional',
      'Mental health cover',
      'Proteksi 3 anak',
      'Medical check-up tahunan',
    ],
  },
];

export const bannerList = [
  {
    id: 'b1',
    title: 'Promo Ramadan\nDiskon 30%',
    subtitle: 'Berlaku s/d 31 Maret',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    color: '#0A2540',
  },
  {
    id: 'b2',
    title: 'Gratis Konsultasi\nDokter Online',
    subtitle: 'Untuk member baru',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    color: '#1B5E20',
  },
  {
    id: 'b3',
    title: 'Cashback 50K\nPembayaran Pertama',
    subtitle: 'Pakai GoPay & OVO',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80',
    color: '#4A148C',
  },
];