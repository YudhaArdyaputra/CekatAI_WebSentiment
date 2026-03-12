export const SENTIMENT_DISTRIBUTION = {
    gabungan: [
        { name: 'Negatif', value: 2039, color: '#EF4444', percentage: '52.5%' },
        { name: 'Netral', value: 482, color: '#94A3B8', percentage: '12.4%' },
        { name: 'Positif', value: 1363, color: '#10B981', percentage: '35.1%' },
    ],
    tiktok: [
        { name: 'Negatif', value: 1598, color: '#EF4444', percentage: '55.5%' },
        { name: 'Netral', value: 312, color: '#94A3B8', percentage: '10.8%' },
        { name: 'Positif', value: 967, color: '#10B981', percentage: '33.6%' },
    ],
    x: [
        { name: 'Negatif', value: 440, color: '#EF4444', percentage: '43.6%' },
        { name: 'Netral', value: 170, color: '#94A3B8', percentage: '16.9%' },
        { name: 'Positif', value: 396, color: '#10B981', percentage: '39.3%' },
    ],
};

export const PLATFORM_COMPARISON = [
    {
        name: 'Negatif',
        TikTok: 1598,
        Twitter: 440,
    },
    {
        name: 'Netral',
        TikTok: 312,
        Twitter: 170,
    },
    {
        name: 'Positif',
        TikTok: 967,
        Twitter: 396,
    },
];

export const WORDCLOUDS = {
    normal: {
        title: 'Normal (Baseline)',
        images: [
            { sentiment: 'Negatif', src: '/assets/wordclouds/normal_wc_negatif.png' },
            { sentiment: 'Netral', src: '/assets/wordclouds/normal_wc_netral.png' },
            { sentiment: 'Positif', src: '/assets/wordclouds/normal_wc_positif.png' },
        ]
    },
    smote: {
        title: 'SMOTE',
        images: [
            { sentiment: 'Negatif', src: '/assets/wordclouds/smote_wc_negatif.png' },
            { sentiment: 'Netral', src: '/assets/wordclouds/smote_wc_netral.png' },
            { sentiment: 'Positif', src: '/assets/wordclouds/smote_wc_positif.png' },
        ]
    },
    backtrans: {
        title: 'Back-translation',
        images: [
            { sentiment: 'Negatif', src: '/assets/wordclouds/backtrans_wc_negatif.png' },
            { sentiment: 'Netral', src: '/assets/wordclouds/backtrans_wc_netral.png' },
            { sentiment: 'Positif', src: '/assets/wordclouds/backtrans_wc_positif.png' },
        ]
    }
};

export const KEY_FINDINGS = [
    {
        title: 'Peningkatan Recall Kelas Minoritas',
        desc: 'SMOTE berhasil meningkatkan recall kelas Netral dari 18.62% menjadi 64.14%.',
        icon: 'FiTrendingUp',
        color: 'emerald'
    },
    {
        title: 'Pertukaran Akurasi vs Keseimbangan',
        desc: 'Teknik balancing menurunkan akurasi keseluruhan, namun menghasilkan F1-Score per kelas yang lebih seimbang.',
        icon: 'FiBarChart2',
        color: 'blue'
    },
    {
        title: 'Overfitting pada Data Sintetis',
        desc: 'Selisih antara CV accuracy (~80%) dan test accuracy (~71%) mengindikasikan overfitting pada data sintetis.',
        icon: 'FiAlertTriangle',
        color: 'amber'
    },
    {
        title: 'Model Seimbang: SMOTE',
        desc: 'Mencatatkan rata-rata akurasi validasi tinggi 79.98%, menawarkan prediksi paling seimbang.',
        icon: 'FiTarget',
        color: 'purple'
    }
];

export const TOPIC_MODELING_DATA = {
    gabungan: [
        {
            id: 1,
            label: "TOPIK 1: Cekatai Bikin Semua",
            keywords: [
                { text: "cekatai bikin semua", sentiment: "Negatif" },
                { text: "gua lihat satu", sentiment: "Negatif" },
                { text: "satu per satu", sentiment: "Negatif" },
                { text: "pakai cekat ai", sentiment: "Negatif" },
                { text: "cs hilang kerja", sentiment: "Negatif" }
            ]
        },
        {
            id: 2,
            label: "TOPIK 2: Ganti Admin dengan AI",
            keywords: [
                { text: "paling malas kalo", sentiment: "Negatif" },
                { text: "gua enggak erti", sentiment: "Negatif" },
                { text: "di ganti ai", sentiment: "Negatif" },
                { text: "kalau balas bot", sentiment: "Negatif" },
                { text: "mecat semua admin", sentiment: "Negatif" }
            ]
        },
        {
            id: 3,
            label: "TOPIK 3: Dunia Kerja Sekarang",
            keywords: [
                { text: "kerja lebih baik", sentiment: "Positif" },
                { text: "dunia kerja sekarang", sentiment: "Negatif" },
                { text: "mau enggak mau", sentiment: "Negatif" },
                { text: "cekatai jadi alas", sentiment: "Negatif" },
                { text: "semangat kak moga", sentiment: "Positif" }
            ]
        },
        {
            id: 4,
            label: "TOPIK 4: Moga Cepat Kerja",
            keywords: [
                { text: "jadi tulang punggung", sentiment: "Negatif" },
                { text: "kena lay off", sentiment: "Negatif" },
                { text: "moga cepat kerja", sentiment: "Positif" },
                { text: "yang lebih baik", sentiment: "Positif" },
                { text: "cari kerja susah", sentiment: "Negatif" }
            ]
        },
        {
            id: 5,
            label: "TOPIK 5: Sistem Kayak Cekatai",
            keywords: [
                { text: "ganti sama ai", sentiment: "Negatif" },
                { text: "sistem kayak cekatai", sentiment: "Negatif" },
                { text: "tulang punggung keluarga", sentiment: "Negatif" },
                { text: "susah cari kerja", sentiment: "Negatif" },
                { text: "bikin omzet turun", sentiment: "Negatif" }
            ]
        }
    ],
    tiktok: [
        {
            id: 1,
            label: "TOPIK 1: Susah Cari Kerja",
            keywords: [
                { text: "susah cari kerja", sentiment: "Negatif" },
                { text: "pakai emosi enggak", sentiment: "Negatif" },
                { text: "emosi enggak fleksibel", sentiment: "Negatif" },
                { text: "enggak fleksibel malah", sentiment: "Negatif" },
                { text: "cekat ai bagus", sentiment: "Negatif" }
            ]
        },
        {
            id: 2,
            label: "TOPIK 2: Kerja & Kena & Jauh",
            keywords: [
                { text: "kena lay off", sentiment: "Negatif" },
                { text: "jauh lebih baik", sentiment: "Positif" },
                { text: "ai enggak sambung", sentiment: "Negatif" },
                { text: "moga segera kerja", sentiment: "Positif" },
                { text: "kalau balas bot", sentiment: "Negatif" }
            ]
        },
        {
            id: 3,
            label: "TOPIK 3: Mecat Semua Admin",
            keywords: [
                { text: "pakai cekat ai", sentiment: "Negatif" },
                { text: "semua pakai ai", sentiment: "Negatif" },
                { text: "mecat semua admin", sentiment: "Negatif" },
                { text: "kalo balas ai", sentiment: "Negatif" },
                { text: "cari kerja baru", sentiment: "Negatif" }
            ]
        },
        {
            id: 4,
            label: "TOPIK 4: Moga Cepat Kerja",
            keywords: [
                { text: "ganti sama ai", sentiment: "Negatif" },
                { text: "moga cepat kerja", sentiment: "Positif" },
                { text: "paling malas kalo", sentiment: "Negatif" },
                { text: "semangat kak moga", sentiment: "Positif" },
                { text: "tulang punggung keluarga", sentiment: "Negatif" }
            ]
        },
        {
            id: 5,
            label: "TOPIK 5: Kerja Lebih Baik",
            keywords: [
                { text: "kerja lebih baik", sentiment: "Positif" },
                { text: "di ganti ai", sentiment: "Negatif" },
                { text: "cari kerja susah", sentiment: "Negatif" },
                { text: "moga kerja lebih", sentiment: "Positif" },
                { text: "ganti kerja lebih", sentiment: "Positif" }
            ]
        }
    ],
    x: [
        {
            id: 1,
            label: "TOPIK 1: Cekatai Punya Fitur",
            keywords: [
                { text: "gua lihat satu", sentiment: "Negatif" },
                { text: "cekatai punya fitur", sentiment: "Positif" },
                { text: "video cs pamit", sentiment: "Negatif" },
                { text: "gua lihat orang", sentiment: "Negatif" },
                { text: "satu cs pamit", sentiment: "Negatif" }
            ]
        },
        {
            id: 2,
            label: "TOPIK 2: Cekatai Punya Struktur",
            keywords: [
                { text: "gua enggak erti", sentiment: "Negatif" },
                { text: "satu per satu", sentiment: "Negatif" },
                { text: "cekatai punya struktur", sentiment: "Positif" },
                { text: "gua suka fitur", sentiment: "Positif" },
                { text: "satu tim cs", sentiment: "Negatif" }
            ]
        },
        {
            id: 3,
            label: "TOPIK 3: Cekatai Bikin Kerja",
            keywords: [
                { text: "gua lihat cs", sentiment: "Negatif" },
                { text: "cekatai bikin kerja", sentiment: "Negatif" },
                { text: "cekatai kayak ai", sentiment: "Negatif" },
                { text: "cekatai enggak yang", sentiment: "Negatif" },
                { text: "lihat cs pamit", sentiment: "Negatif" }
            ]
        },
        {
            id: 4,
            label: "TOPIK 4: Sistem Kayak Cekatai",
            keywords: [
                { text: "sistem kayak cekatai", sentiment: "Negatif" },
                { text: "cekatai jadi alas", sentiment: "Negatif" },
                { text: "bikin banyak orang", sentiment: "Negatif" },
                { text: "gua kagum sama", sentiment: "Positif" },
                { text: "banyak orang hilang", sentiment: "Negatif" }
            ]
        },
        {
            id: 5,
            label: "TOPIK 5: Dunia Kerja Sekarang",
            keywords: [
                { text: "cekatai bikin semua", sentiment: "Negatif" },
                { text: "dunia kerja sekarang", sentiment: "Negatif" },
                { text: "enggak ruang buat", sentiment: "Negatif" },
                { text: "ganti sistem cekatai", sentiment: "Negatif" },
                { text: "bikin semua jadi", sentiment: "Negatif" }
            ]
        }
    ]
};

export const TOPIC_SENTIMENT_DISTRIBUTION = {
    gabungan: [
        { topic_id: 1, sentiment: { negatif: 50.5, netral: 14.8, positif: 34.8 }, dominant: 'Negatif' },
        { topic_id: 2, sentiment: { negatif: 62.5, netral: 9.1, positif: 28.4 }, dominant: 'Negatif' },
        { topic_id: 3, sentiment: { negatif: 53.8, netral: 3.3, positif: 42.9 }, dominant: 'Negatif' },
        { topic_id: 4, sentiment: { negatif: 57.5, netral: 5.9, positif: 36.6 }, dominant: 'Negatif' },
        { topic_id: 5, sentiment: { negatif: 55.3, netral: 8.2, positif: 36.6 }, dominant: 'Negatif' }
    ],
    tiktok: [
        { topic_id: 1, sentiment: { negatif: 55.6, netral: 12.8, positif: 31.6 }, dominant: 'Negatif' },
        { topic_id: 2, sentiment: { negatif: 55.9, netral: 6.7, positif: 37.4 }, dominant: 'Negatif' },
        { topic_id: 3, sentiment: { negatif: 61.8, netral: 5.6, positif: 32.6 }, dominant: 'Negatif' },
        { topic_id: 4, sentiment: { negatif: 55.1, netral: 5.7, positif: 39.2 }, dominant: 'Negatif' },
        { topic_id: 5, sentiment: { negatif: 50.0, netral: 5.2, positif: 44.8 }, dominant: 'Negatif' }
    ],
    x: [
        { topic_id: 1, sentiment: { negatif: 31.8, netral: 24.1, positif: 44.0 }, dominant: 'Positif' },
        { topic_id: 2, sentiment: { negatif: 60.0, netral: 11.5, positif: 28.5 }, dominant: 'Negatif' },
        { topic_id: 3, sentiment: { negatif: 48.1, netral: 9.6, positif: 42.2 }, dominant: 'Negatif' },
        { topic_id: 4, sentiment: { negatif: 49.6, netral: 14.3, positif: 36.1 }, dominant: 'Negatif' },
        { topic_id: 5, sentiment: { negatif: 57.8, netral: 7.8, positif: 34.4 }, dominant: 'Negatif' }
    ]
};

export const SENTIMENT_EXAMPLES = [
    { text: "Gua suka kagum fitur CekatAI bisa bikin jalur komunikasi makin rapih.", sentiment: "Positif" },
    { text: "Liat demo CekatAI di event kemaren gila itu sistem smooth banget. Keren dah pokonya ni AI local", sentiment: "Positif" },
    { text: "Gua liat CekatAI respons-nya cepet parah langsung jawab tanpa delay. Gokil bgt dah ini AI!!!", sentiment: "Positif" },
    { text: "Responnya CekatAI bener-bener real-time. Gak delay", sentiment: "Positif" },
    { text: "Gua impressed gimana CekatAI bisa stabil 24/7 tanpa delay", sentiment: "Positif" },
    { text: "memang mending pakai ai. pusing pakai karyawan, gaji minta layak giliran masuk kerja ada saja alasan untuk ng masuk kerja", sentiment: "Positif" },
    { text: "bayar ato free ka AI nya?", sentiment: "Netral" },
    { text: "CekatAI bisa dipakai buat ticketing juga? Atau fokusnya ke chatbot doang?", sentiment: "Netral" },
    { text: "CekatAI katanya support integrasi multi-channel. Tapi real-nya udah jalan belum ya?", sentiment: "Netral" },
    { text: "Trusted ga sih CekatAI?", sentiment: "Netral" },
    { text: "Gua penasaran siapa target utama dari CekatAI sebenernya? Korporat atau startup kecil juga bisa?", sentiment: "Netral" },
    { text: "CekatAI punya fitur fallback ke CS manusia gak sih kalau gagal jawab?", sentiment: "Netral" },
    { text: "bayangin, semua pakai AI, terus banyak pengangguran, akhirnya daya beli masyarakat turun, bisnismu otomatis juga turun karena gaada yg beli", sentiment: "Negatif" },
    { text: "Gw benci banget kalo komplain yg jawab bot. Ada lagi nih cekat ai, lah laahh", sentiment: "Negatif" },
    { text: "CekatAI responya ngaco + ga nyambung", sentiment: "Negatif" },
    { text: "CekatAI suka salah tag kategori. Masalah billing malah masuk ke teknis ribet banget", sentiment: "Negatif" },
    { text: "jika AI menguasai segalanya..banyak pengangguran..terus yg jd konsumen juga merosot..krn banyak yg gk punya duit (nganggur)..perputarannya gimna?", sentiment: "Negatif" },
    { text: "tapi untuk pertanyaan spesifik AI gak bisa jawab sampai buat kesal customer gak nemu jawaban contoh di platform orange mau complain jawabannya mutar2", sentiment: "Negatif" }
];
