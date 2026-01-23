import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFileText, FiChevronDown, FiChevronUp, FiArrowRight, FiActivity, FiBarChart2, FiCpu, FiShuffle, FiGlobe, FiCheckCircle, FiXCircle, FiCode } from 'react-icons/fi';

const WORKFLOW_STEPS = [
    {
        id: 1, title: 'Text Preprocessing', icon: FiFileText, color: 'blue',
        description: 'Pembersihan dan normalisasi teks',
        details: [
            'Cleaning: Menghapus URL, mention, hashtag, angka, dan karakter non-ASCII',
            'Case Folding: Mengubah semua huruf menjadi huruf kecil',
            'Tokenization: Memecah teks menjadi token/kata',
            'Normalization: Mengubah slangword ke bentuk formal (4.331 kata)',
            'Stopword Removal: Menghapus kata-kata umum menggunakan Sastrawi',
            'Stemming: Mengubah kata ke bentuk dasar menggunakan Sastrawi'
        ]
    },
    {
        id: 2, title: 'TF-IDF Vectorization', icon: FiBarChart2, color: 'purple',
        description: 'Ekstraksi fitur dari teks',
        details: [
            'Term Frequency (TF): Frekuensi kata dalam dokumen',
            'Inverse Document Frequency (IDF): Bobot kata berdasarkan keunikan',
            'N-Gram Range: Eksperimen dengan (1,1), (1,2), (1,3), dan (2,2)',
            'Max Features: 5.000 fitur teratas',
            'Min DF: 2 (kata harus muncul minimal di 2 dokumen)'
        ]
    },
    {
        id: 3, title: 'Data Balancing', icon: FiShuffle, color: 'amber',
        description: 'Menyeimbangkan distribusi kelas',
        details: [
            'Pembagian Data: 70% pelatihan, 30% pengujian (sebelum balancing)',
            'SMOTE: Membuat sampel sintetis dari kelas minoritas',
            'Back-translation: Augmentasi via terjemahan ID→FR→ID',
            'Hanya Training: Balancing hanya pada data pelatihan'
        ]
    },
    {
        id: 4, title: 'Model Training', icon: FiCpu, color: 'emerald',
        description: 'Pelatihan Logistic Regression',
        details: [
            'Algoritma: Logistic Regression (sklearn)',
            'Iterasi Maksimal: 1000',
            'Random State: 42 (untuk reprodusibilitas)',
            'Multi-class: One-vs-Rest (OvR)'
        ]
    },
    {
        id: 5, title: 'Evaluation', icon: FiActivity, color: 'red',
        description: 'Validasi dan evaluasi model',
        details: [
            'K-Fold Cross Validation: 5-fold terstratifikasi',
            'Metrik: Accuracy, Precision, Recall, F1-Score',
            'Confusion Matrix: Analisis per kelas',
            'Evaluasi Test Set: Pada data asli'
        ]
    }
];

const TECHNIQUES = [
    {
        id: 'smote', title: 'SMOTE', fullTitle: 'Synthetic Minority Over-sampling Technique',
        icon: FiShuffle, color: 'purple',
        description: 'Teknik oversampling yang membuat sampel sintetis baru untuk kelas minoritas.',
        howItWorks: [
            'Pilih sampel dari kelas minoritas',
            'Cari k-nearest neighbors (k=5 secara default)',
            'Buat sampel sintetis pada garis antara sampel asli dan tetangga',
            'Ulangi hingga kelas seimbang'
        ],
        pros: ['Menghindari overfitting dibanding random oversampling', 'Menciptakan variasi data yang lebih beragam', 'Bekerja baik untuk data numerik (TF-IDF)'],
        cons: ['Dapat membuat noise jika kelas tumpang tindih', 'Tidak mempertimbangkan distribusi mayoritas'],
        results: { trainBefore: 2718, trainAfter: 4281, syntheticAdded: 1563, accuracy: 70.93, f1: 71.48, netralRecall: 64.14 }
    },
    {
        id: 'backstranslation', title: 'Back-translation', fullTitle: 'Back-translation Augmentation',
        icon: FiGlobe, color: 'emerald',
        description: 'Teknik augmentasi data teks dengan menerjemahkan ke bahasa lain lalu kembali ke bahasa asli.',
        howItWorks: [
            'Ambil teks dari kelas minoritas',
            'Terjemahkan ke bahasa perantara (Prancis)',
            'Terjemahkan kembali ke bahasa Indonesia',
            'Hasil terjemahan menjadi sampel baru'
        ],
        pros: ['Menghasilkan parafrase alami', 'Mempertahankan makna semantik', 'Cocok untuk data teks/NLP'],
        cons: ['Membutuhkan API terjemahan', 'Kualitas bergantung pada bahasa perantara'],
        results: { trainBefore: 2718, trainAfter: 4281, syntheticAdded: 1563, accuracy: 71.61, f1: 71.20, netralRecall: 43.45 }
    }
];

const colorMap = {
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800', bgLight: 'bg-blue-50 dark:bg-blue-900/10' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800', bgLight: 'bg-purple-50 dark:bg-purple-900/10' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', bgLight: 'bg-amber-50 dark:bg-amber-900/10' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', bgLight: 'bg-emerald-50 dark:bg-emerald-900/10' },
    red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800', bgLight: 'bg-red-50 dark:bg-red-900/10' }
};

function AccordionItem({ step, isOpen, onToggle, id }) {
    const Icon = step.icon;
    const colors = colorMap[step.color];

    return (
        <div id={id} className="card-clean p-0 overflow-hidden">
            <button onClick={onToggle} className="w-full p-5 lg:p-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${colors.text} icon-emboss`} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{step.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{step.description}</p>
                    </div>
                </div>
                {isOpen ? <FiChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <FiChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
            </button>
            {isOpen && (
                <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-2 border-t border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50">
                    <ul className="space-y-2 ml-16">
                        {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function TechniqueCard({ technique }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const Icon = technique.icon;
    const colors = colorMap[technique.color];

    return (
        <div className="card-clean p-4 lg:p-6">
            <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-7 h-7 ${colors.text} icon-emboss`} />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 text-lg">{technique.fullTitle}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{technique.description}</p>
                </div>
            </div>

            <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 font-medium transition-colors">
                {isExpanded ? 'Sembunyikan detail' : 'Lihat detail'}
                {isExpanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>

            {isExpanded && (
                <div className="mt-6 space-y-6">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Cara Kerja</h4>
                        <ol className="space-y-2">
                            {technique.howItWorks.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <span className={`w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold shrink-0`}>{idx + 1}</span>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                            <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                                <FiCheckCircle className="w-4 h-4" /> Kelebihan
                            </h4>
                            <ul className="space-y-1">
                                {technique.pros.map((pro, idx) => (
                                    <li key={idx} className="text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                                        <span className="mt-1">•</span> {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                                <FiXCircle className="w-4 h-4" /> Kekurangan
                            </h4>
                            <ul className="space-y-1">
                                {technique.cons.map((con, idx) => (
                                    <li key={idx} className="text-xs text-red-800 dark:text-red-300 flex items-start gap-2">
                                        <span className="mt-1">•</span> {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700">
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Hasil Eksperimen</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="text-center p-3 bg-white dark:bg-neutral-700 rounded-lg border border-slate-200 dark:border-neutral-600">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Data Latih Sebelum</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{technique.results.trainBefore}</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-neutral-700 rounded-lg border border-slate-200 dark:border-neutral-600">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Data Latih Sesudah</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{technique.results.trainAfter}</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-neutral-700 rounded-lg border border-slate-200 dark:border-neutral-600">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Data Sintetis</p>
                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">+{technique.results.syntheticAdded}</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-neutral-700 rounded-lg border border-slate-200 dark:border-neutral-600">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Accuracy</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{technique.results.accuracy}%</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-neutral-700 rounded-lg border border-slate-200 dark:border-neutral-600">
                                <p className="text-xs text-slate-500 dark:text-slate-400">F1-Score</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{technique.results.f1}%</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-neutral-700 rounded-lg border border-slate-200 dark:border-neutral-600">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Recall Netral</p>
                                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{technique.results.netralRecall}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Methodology() {
    const [openStep, setOpenStep] = useState(1);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.targetId) {
            setOpenStep(location.state.targetId);
            setTimeout(() => {
                const element = document.getElementById(`step-${location.state.targetId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300); // Slight delay for rendering
        }
    }, [location]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8
            }
        }
    };

    return (
        <div className="space-y-4 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center pb-4"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                    Metodologi
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Dokumentasi teknis alur kerja penelitian, dari Text Preprocessing hingga Evaluation model.
                </p>
            </motion.div>

            {/* Section 1: Workflow Diagram */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold shadow-sm">1</div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Diagram Alur Kerja</h2>
                </div>

                {/* Visual Flowchart */}
                <div className="card-clean p-4 lg:p-6 mb-4">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
                        {WORKFLOW_STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            const colors = colorMap[step.color];
                            const isActive = openStep === step.id;
                            return (
                                <div key={step.id} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                                    <button
                                        onClick={() => {
                                            setOpenStep(step.id);
                                            setTimeout(() => {
                                                const element = document.getElementById(`step-${step.id}`);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }
                                            }, 100);
                                        }}
                                        className={`w-full lg:w-36 p-4 rounded-xl text-center transition-all duration-200 ${isActive ? `${colors.bgLight} ${colors.border} border-2 ring-2 ring-offset-2 ring-blue-100 dark:ring-blue-900` : 'bg-slate-50 dark:bg-neutral-800 border-2 border-slate-100 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-500'}`}
                                    >
                                        <Icon className={`w-6 h-6 mx-auto mb-3 ${isActive ? colors.text : 'text-slate-400'} icon-emboss`} />
                                        <p className={`text-xs font-bold leading-tight ${isActive ? colors.text : 'text-slate-600 dark:text-slate-400'}`}>{step.title}</p>
                                    </button>
                                    {idx < WORKFLOW_STEPS.length - 1 && (
                                        <>
                                            <FiArrowRight className="hidden lg:block w-5 h-5 text-slate-300 dark:text-slate-600 mx-2 shrink-0" />
                                            <FiChevronDown className="lg:hidden w-5 h-5 text-slate-300 dark:text-slate-600 my-2 shrink-0" />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Accordion Details */}
                <div className="space-y-3">
                    {WORKFLOW_STEPS.map((step) => (
                        <AccordionItem
                            id={`step-${step.id}`}
                            key={step.id}
                            step={step}
                            isOpen={openStep === step.id}
                            onToggle={() => setOpenStep(openStep === step.id ? null : step.id)}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Section 2: Techniques */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm font-bold shadow-sm">2</div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Penjelasan Teknik Balancing</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                    {TECHNIQUES.map((technique) => (
                        <motion.div key={technique.id} variants={itemVariants}>
                            <TechniqueCard technique={technique} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Section 3: Tools & Libraries */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-bold shadow-sm">3</div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Alat & Pustaka</h2>
                </div>

                <div className="card-clean p-4 lg:p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { name: 'Python', category: 'Bahasa Pemrograman' },
                            { name: 'Scikit-learn', category: 'Pustaka ML' },
                            { name: 'Pandas', category: 'Pemrosesan Data' },
                            { name: 'NumPy', category: 'Komputasi Numerik' },
                            { name: 'Sastrawi', category: 'NLP Indonesia' },
                            { name: 'Imbalanced-learn', category: 'SMOTE' },
                            { name: 'Deep Translator', category: 'API Terjemahan' },
                            { name: 'Matplotlib', category: 'Visualisasi' },
                            { name: 'Seaborn', category: 'Visualisasi' }
                        ].map((tool) => (
                            <div key={tool.name} className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                    <FiCode className="w-6 h-6 text-blue-600 dark:text-blue-400 icon-emboss" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{tool.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{tool.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
