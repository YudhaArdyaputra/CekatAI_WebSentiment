import { useState } from 'react';
import { FiSend, FiBarChart2, FiTerminal } from 'react-icons/fi';
import { MODEL_TYPES } from '../constants/modelConfig';
import { predictSentiment } from '../utils/apiClient';
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
            const data = await predictSentiment(inputText, MODEL_TYPES.SMOTE);
            setResults(data);
        } catch (error) {
            console.error('Prediction Error:', error);
            // Set error state
            setResults({
                sentiment: 'Error',
                confidence: '0',
                model: error.message || 'Terjadi kesalahan',
                probabilities: { Negatif: 0, Netral: 0, Positif: 0 }
            });
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
                    Analisis sentimen menggunakan model terbaik dengan augmentasi SMOTE.
                </p>
            </div>

            {/* Side by Side Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section - Left Side */}
                <div className="card-clean h-fit">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Masukkan Teks</h2>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Masukkan kalimat ulasan di sini... Contoh: 'Aplikasinya bagus tapi fiturnya kurang lengkap'"
                            className="w-full h-64 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-2xl p-5 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 transition-all resize-none shadow-inner"
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
                </div>

                {/* Results Panel - Right Side */}
                {!results && !loading && (
                    <div className="card-clean flex flex-col h-full">
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                            <div className="w-24 h-24 bg-slate-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                                <FiTerminal size={48} className="text-slate-300 dark:text-slate-600 icon-emboss" />
                            </div>
                            <p className="font-medium text-slate-500 dark:text-slate-400 text-xl md:text-2xl mb-2">Menunggu Masukan</p>
                            <p className="text-base md:text-lg text-slate-400 dark:text-slate-500">Hasil analisis sentimen akan muncul di sini.</p>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="card-clean flex flex-col h-full">
                        <div className="flex-1 flex items-center justify-center">
                            <LoadingSkeleton variant="custom" />
                        </div>
                    </div>
                )}

                {results && !loading && (
                    <div className="card-clean flex flex-col relative overflow-hidden h-full">
                        {/* Header Bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-neutral-800">
                            <div className={`h-full ${results.sentiment === 'Positif' ? 'bg-emerald-500' :
                                results.sentiment === 'Negatif' ? 'bg-red-500' :
                                    'bg-slate-500'
                                }`}></div>
                        </div>

                        <div className="flex flex-col justify-center flex-1">
                            {/* Sentiment Result */}
                            <div className="text-center mb-12">
                                <span className="text-sm md:text-base font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Hasil Prediksi</span>
                                <div className={`text-6xl md:text-7xl font-extrabold mt-6 tracking-tight ${getSentimentColorClass(results.sentiment)}`}>
                                    {results.sentiment}
                                </div>
                                <div className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mt-6 font-semibold">
                                    Confidence: {results.confidence}%
                                </div>
                            </div>

                            {/* Probability Bar */}
                            <div>
                                <div className="flex justify-between text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 mb-3">
                                    <span className="flex items-center gap-2">
                                        <FiBarChart2 className="icon-emboss" size={18} /> Probabilitas
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-neutral-800 rounded-full h-4 overflow-hidden flex shadow-emboss">
                                    <div
                                        style={{
                                            width: `${results.probabilities?.Negatif || 0}%`,
                                            background: PROGRESS_GRADIENTS.negative
                                        }}
                                        className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                    />
                                    <div
                                        style={{
                                            width: `${results.probabilities?.Netral || 0}%`,
                                            background: PROGRESS_GRADIENTS.neutral
                                        }}
                                        className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                    />
                                    <div
                                        style={{
                                            width: `${results.probabilities?.Positif || 0}%`,
                                            background: PROGRESS_GRADIENTS.positive
                                        }}
                                        className="h-full hover:opacity-90 transition-opacity relative progress-glossy"
                                    />
                                </div>

                                {/* Legend */}
                                <div className="flex justify-between text-base md:text-lg mt-4 font-medium text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                        <span>Negatif: {results.probabilities?.Negatif || 0}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                                        <span>Netral: {results.probabilities?.Netral || 0}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                                        <span>Positif: {results.probabilities?.Positif || 0}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveDemo;
