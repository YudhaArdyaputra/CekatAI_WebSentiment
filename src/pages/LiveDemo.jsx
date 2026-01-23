import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiBarChart2, FiInfo, FiTerminal } from 'react-icons/fi';
import { containerVariants, itemVariants } from '../constants/animations';
import { MODEL_TYPES, MODEL_SHORT_NAMES } from '../constants/modelConfig';
import { predictSentiment, createErrorResult } from '../utils/apiClient';
import { PROGRESS_GRADIENTS } from '../constants/styles';
import { getSentimentColorClass } from '../utils/formatters';
import TabMenu from '../components/ui/TabMenu';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const LiveDemo = () => {
    const [inputText, setInputText] = useState('');
    const [selectedModel, setSelectedModel] = useState(MODEL_TYPES.NORMAL);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!inputText) return;
        setLoading(true);
        setResult(null);

        try {
            const data = await predictSentiment(inputText, selectedModel);
            setResult(data);
        } catch (error) {
            console.error('Prediction Error:', error);
            setResult(createErrorResult(error.message || 'Terjadi kesalahan'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                    Demo Analisis Langsung
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Uji performa model secara langsung dengan berbagai konfigurasi data pelatihan.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid lg:grid-cols-12 gap-8"
            >

                {/* Input Panel */}
                <motion.div variants={itemVariants} className="lg:col-span-7 card-clean h-full flex flex-col">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pilih Model Eksperimen</label>
                            <div className="group relative">
                                <FiInfo className="text-slate-400 dark:text-slate-500 hover:text-blue-500 cursor-help" />
                                <div className="absolute right-0 top-0 mt-8 w-64 bg-slate-800 dark:bg-neutral-800 text-white dark:text-slate-200 text-xs p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-transparent dark:border-neutral-700">
                                    Pilih model eksperimen yang digunakan untuk memprediksi dengan model Logistic Regression.
                                </div>
                            </div>
                        </div>

                        <TabMenu
                            tabs={Object.entries(MODEL_SHORT_NAMES).map(([key, label]) => ({
                                key,
                                label
                            }))}
                            activeTab={selectedModel}
                            onTabChange={setSelectedModel}
                            layoutId="model-tab-active"
                            isGrid={true}
                        />
                    </div>

                    <div className="flex-grow mb-6">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Masukkan Teks</label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Masukkan kalimat ulasan di sini... Contoh: 'Aplikasinya bagus tapi fiturnya kurang lengkap'"
                            className="w-full h-48 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-2xl p-5 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 transition-all resize-none shadow-inner"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !inputText}
                            className={`btn-primary flex items-center gap-2 ${loading || !inputText ? 'opacity-50 cursor-not-allowed shadow-none' : ''
                                }`}
                        >
                            {loading ? 'Sedang Menganalisis...' : <><FiSend className="icon-glossy" /> Analisis Sekarang</>}
                        </button>
                    </div>
                </motion.div>

                {/* Output Panel */}
                <motion.div variants={itemVariants} className="lg:col-span-5 card-clean h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-neutral-800">
                        {result && (
                            <div className={`h-full ${result.sentiment === 'Positif' ? 'bg-emerald-500' :
                                result.sentiment === 'Negatif' ? 'bg-red-500' :
                                    'bg-slate-500'
                                }`}></div>
                        )}
                    </div>

                    {!result && !loading && (
                        <div className="flex-grow flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 py-12">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                                <FiTerminal size={32} className="text-slate-300 dark:text-slate-600 icon-emboss" />
                            </div>
                            <p className="font-medium text-slate-500 dark:text-slate-400">Menunggu Masukan</p>
                            <p className="text-sm">Hasil analisis sentimen akan muncul di sini.</p>
                        </div>
                    )}

                    {loading && <LoadingSkeleton variant="custom" />}

                    {result && !loading && (
                        <div className="flex-grow flex flex-col pt-8">
                            <div className="text-center mb-8">
                                <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Hasil Prediksi Sentimen</span>
                                <div className={`text-4xl md:text-5xl font-extrabold mt-3 tracking-tight ${getSentimentColorClass(result.sentiment)}`}>
                                    {result.sentiment}
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Confidence Bar */}
                                <div>
                                    <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                                        <span className="flex items-center gap-2"><FiBarChart2 className="icon-emboss" /> Distribusi Probabilitas</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden flex shadow-emboss">
                                        <div
                                            style={{
                                                width: `${result.probabilities?.Negatif || 0}%`,
                                                background: PROGRESS_GRADIENTS.negative
                                            }}
                                            className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                        />
                                        {/* Neutral Segment */}
                                        <div
                                            style={{
                                                width: `${result.probabilities?.Netral || 0}%`,
                                                background: PROGRESS_GRADIENTS.neutral
                                            }}
                                            className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                        />
                                        {/* Positive Segment */}
                                        <div
                                            style={{
                                                width: `${result.probabilities?.Positif || 0}%`,
                                                background: PROGRESS_GRADIENTS.positive
                                            }}
                                            className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                        />
                                    </div>

                                    {/* Legend / Values below bar */}
                                    <div className="flex justify-between text-xs mt-2 font-medium text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <span>Neg: {result.probabilities?.Negatif || 0}%</span>
                                        </div>
                                        {selectedModel !== 'no_neutral' && (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                                <span>Net: {result.probabilities?.Netral || 0}%</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span>Pos: {result.probabilities?.Positif || 0}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Model Info */}
                                <div className="card-glossy rounded-xl p-5">
                                    <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">Konfigurasi Model</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Algoritma</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">Logistic Regression</span>
                                    </div>
                                    <div className="h-px bg-slate-200 dark:bg-neutral-700 my-3"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Perlakuan Data</span>
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{result.model}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div >
    );
};

export default LiveDemo;
