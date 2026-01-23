import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiBarChart2, FiTerminal } from 'react-icons/fi';
import { containerVariants, itemVariants } from '../constants/animations';
import { MODEL_TYPES, MODEL_SHORT_NAMES } from '../constants/modelConfig';
import { predictAllModels } from '../utils/apiClient';
import { PROGRESS_GRADIENTS } from '../constants/styles';
import { getSentimentColorClass } from '../utils/formatters';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const LiveDemo = () => {
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!inputText) return;
        setLoading(true);
        setResults(null);

        try {
            const data = await predictAllModels(inputText);
            setResults(data.results);
        } catch (error) {
            console.error('Prediction Error:', error);
            // Set error state for all models
            const errorResults = {};
            Object.keys(MODEL_TYPES).forEach(key => {
                const modelType = MODEL_TYPES[key];
                errorResults[modelType] = {
                    sentiment: 'Error',
                    confidence: '0',
                    model: error.message || 'Terjadi kesalahan',
                    probabilities: { Negatif: 0, Netral: 0, Positif: 0 }
                };
            });
            setResults(errorResults);
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

            {/* Input Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-8"
            >
                <motion.div variants={itemVariants} className="card-clean">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Masukkan Teks</h2>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Masukkan kalimat ulasan di sini... Contoh: 'Aplikasinya bagus tapi fiturnya kurang lengkap'"
                            className="w-full h-32 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-2xl p-5 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 transition-all resize-none shadow-inner"
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
            </motion.div>

            {/* Results Grid - 4 Output Panels */}
            {!results && !loading && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="card-clean"
                >
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 py-20">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                            <FiTerminal size={32} className="text-slate-300 dark:text-slate-600 icon-emboss" />
                        </div>
                        <p className="font-medium text-slate-500 dark:text-slate-400 text-lg">Menunggu Masukan</p>
                        <p className="text-sm">Hasil analisis dari 4 model eksperimen akan muncul di sini.</p>
                    </div>
                </motion.div>
            )}

            {loading && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div key={i} variants={itemVariants} className="card-clean">
                            <LoadingSkeleton variant="custom" />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {results && !loading && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Panel untuk setiap model */}
                    {Object.entries(MODEL_TYPES).map(([key, modelType]) => {
                        const result = results[modelType];
                        if (!result) return null;

                        return (
                            <motion.div
                                key={modelType}
                                variants={itemVariants}
                                className="card-clean flex flex-col relative overflow-hidden"
                            >
                                {/* Header Bar */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-neutral-800">
                                    <div className={`h-full ${result.sentiment === 'Positif' ? 'bg-emerald-500' :
                                        result.sentiment === 'Negatif' ? 'bg-red-500' :
                                            'bg-slate-500'
                                        }`}></div>
                                </div>

                                <div className="pt-6">
                                    {/* Model Name Badge */}
                                    <div className="mb-6">
                                        <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                                                {MODEL_SHORT_NAMES[modelType]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sentiment Result */}
                                    <div className="text-center mb-6">
                                        <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Hasil Prediksi</span>
                                        <div className={`text-3xl md:text-4xl font-extrabold mt-2 tracking-tight ${getSentimentColorClass(result.sentiment)}`}>
                                            {result.sentiment}
                                        </div>
                                    </div>

                                    {/* Probability Bar */}
                                    <div>
                                        <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
                                            <span className="flex items-center gap-1.5">
                                                <FiBarChart2 className="icon-emboss" /> Probabilitas
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden flex shadow-emboss">
                                            <div
                                                style={{
                                                    width: `${result.probabilities?.Negatif || 0}%`,
                                                    background: PROGRESS_GRADIENTS.negative
                                                }}
                                                className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                            />
                                            <div
                                                style={{
                                                    width: `${result.probabilities?.Netral || 0}%`,
                                                    background: PROGRESS_GRADIENTS.neutral
                                                }}
                                                className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                            />
                                            <div
                                                style={{
                                                    width: `${result.probabilities?.Positif || 0}%`,
                                                    background: PROGRESS_GRADIENTS.positive
                                                }}
                                                className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                            />
                                        </div>

                                        {/* Legend */}
                                        <div className="flex justify-between text-xs mt-2 font-medium text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <span>Neg: {result.probabilities?.Negatif || 0}%</span>
                                            </div>
                                            {modelType !== 'no_neutral' && (
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
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </div >
    );
};

export default LiveDemo;
