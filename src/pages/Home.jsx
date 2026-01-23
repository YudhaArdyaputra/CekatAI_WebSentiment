import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDatabase, FiLayers, FiTrendingUp, FiBarChart2, FiAlertTriangle, FiTarget, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList } from 'recharts';
import { SENTIMENT_DISTRIBUTION, PLATFORM_COMPARISON, WORDCLOUDS, KEY_FINDINGS, TOPIC_MODELING_DATA, TOPIC_SENTIMENT_DISTRIBUTION } from '../data/homeData';
import OrbitalSystem from '../components/OrbitalSystem';
import { ChartGradients, PIE_GRADIENT_COLORS, GRADIENT_COLORS } from '../components/ChartGradients';

const Home = () => {
    const [activeDistTab, setActiveDistTab] = useState('gabungan');
    const [activeWCTab, setActiveWCTab] = useState('normal');
    const [activeTopicTab, setActiveTopicTab] = useState('gabungan');
    const [selectedImage, setSelectedImage] = useState(null);
    const [openTopicId, setOpenTopicId] = useState(null);

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start']
    });
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const distData = SENTIMENT_DISTRIBUTION[activeDistTab];
    const wcData = WORDCLOUDS[activeWCTab];
    const topicData = TOPIC_MODELING_DATA[activeTopicTab];
    const topicSentimentData = TOPIC_SENTIMENT_DISTRIBUTION[activeTopicTab];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent < 0.05) return null;

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold pointer-events-none">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="flex flex-col items-center w-full">
            <section className="min-h-[70vh] md:min-h-[calc(90vh-4rem)] w-full flex flex-col justify-start pt-4 md:pt-20 items-center text-center px-4 max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-900 dark:text-white tracking-tight leading-tight">
                        Analisis Sentimen <br className="hidden md:block" />
                        <span className="text-brand-blue">Teks Bahasa Indonesia</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Platform riset berbasis Logistic Regression dan TF-IDF untuk menganalisis dan memetakan persepsi publik terhadap implementasi Cekat AI sebagai pengganti customer service pada data X dan TikTok.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xs sm:max-w-none mx-auto">
                        <Link to="/demo" className="w-full sm:w-auto">
                            <button className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto">
                                Coba Demo
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform icon-glossy" />
                            </button>
                        </Link>
                        <Link to="/research" className="w-full sm:w-auto">
                            <button className="btn-secondary w-full sm:w-auto">Lihat Hasil Riset</button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            <div className="w-full max-w-7xl px-4 space-y-4">
                <section className="flex flex-col justify-center py-4">
                    <div className="grid lg:grid-cols-2 gap-4 h-full">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-clean h-full flex flex-col justify-between">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Distribusi Sentimen</h2>
                            <div className="flex p-1 bg-slate-100 dark:bg-neutral-800 rounded-xl mb-6 self-start overflow-x-auto max-w-full gap-1">
                                {['gabungan', 'tiktok', 'x'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveDistTab(tab)}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 ${activeDistTab === tab ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                                    >
                                        {activeDistTab === tab && (
                                            <motion.div
                                                layoutId="dist-tab-active"
                                                className="absolute inset-0 rounded-lg"
                                                style={{
                                                    background: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
                                                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(37, 99, 235, 0.4)',
                                                    zIndex: -1
                                                }}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab === 'x' ? 'X (Twitter)' : tab}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex-grow flex items-center justify-center min-h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <ChartGradients />
                                        <Pie
                                            data={distData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={100}
                                            outerRadius={140}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {distData.map((entry, index) => {
                                                const gradientMap = {
                                                    '#10b981': 'url(#pieEmerald)',
                                                    '#ef4444': 'url(#pieRed)',
                                                    '#94a3b8': 'url(#pieSlate)',
                                                    '#64748b': 'url(#pieSlate)'
                                                };
                                                const colorKey = entry.color.toLowerCase();
                                                return (<Cell key={`cell-${index}`} fill={gradientMap[colorKey] || entry.color} stroke="rgba(255,255,255,0.3)" strokeWidth={2} filter="url(#chartShadow)" />);
                                            })}
                                        </Pie>
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="circle"
                                            formatter={(value, entry, index) => {
                                                const data = distData[index];
                                                return (<span className="text-slate-600 dark:text-slate-300 font-medium text-sm ml-1">{value} <span className="text-slate-400 dark:text-slate-500 font-normal">({data.value.toLocaleString()})</span></span>);
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="card-clean h-full flex flex-col justify-between">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Perbandingan Platform</h2>
                                <p className="text-slate-500 dark:text-slate-400">Perbandingan jumlah data sentimen antara TikTok dan X (Twitter).</p>
                            </div>
                            <div className="flex-grow min-h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={PLATFORM_COMPARISON} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barGap={12}>
                                        <ChartGradients />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.6} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                                        <Bar dataKey="TikTok" fill="url(#blueGloss)" radius={[6, 6, 0, 0]} maxBarSize={80} animationDuration={1500} filter="url(#emboss)">
                                            <LabelList dataKey="TikTok" position="top" fill="#64748B" fontSize={12} fontWeight={600} />
                                        </Bar>
                                        <Bar dataKey="Twitter" fill="url(#cyanGloss)" radius={[6, 6, 0, 0]} maxBarSize={80} animationDuration={1500} filter="url(#emboss)">
                                            <LabelList dataKey="Twitter" position="top" fill="#64748B" fontSize={12} fontWeight={600} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="flex flex-col justify-center py-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="card-clean h-full flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Wordcloud Analisis</h2>
                                <p className="text-slate-500 dark:text-slate-400">Visualisasi kata yang paling sering muncul dalam setiap kategori sentimen.</p>
                            </div>
                            <div className="grid grid-cols-2 md:inline-flex p-1 bg-slate-100 dark:bg-neutral-800 rounded-xl gap-1 w-full md:w-auto">
                                {Object.keys(WORDCLOUDS).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveWCTab(key)}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 whitespace-nowrap ${activeWCTab === key ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                                    >
                                        {activeWCTab === key && (
                                            <motion.div
                                                layoutId="wc-tab-active"
                                                className="absolute inset-0 rounded-lg"
                                                style={{
                                                    background: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
                                                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(37, 99, 235, 0.4)',
                                                    zIndex: -1
                                                }}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{WORDCLOUDS[key].title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <motion.div key={activeWCTab} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} className="grid md:grid-cols-3 gap-6 flex-grow">
                            {wcData.images.map((img, idx) => (
                                <motion.div key={idx} variants={itemVariants} className="card-inner items-center justify-between h-full">
                                    <span className={`badge-glossy mb-4 ${img.sentiment === 'Positif' ? 'badge-positive' :
                                        img.sentiment === 'Negatif' ? 'badge-negative' :
                                            'badge-neutral'
                                        }`}>
                                        <span>{img.sentiment}</span>
                                    </span>
                                    <div className="w-full aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-4 shadow-sm flex-grow">
                                        <img src={img.src} alt={`Wordcloud ${img.sentiment}`} onClick={() => setSelectedImage(img)} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 cursor-pointer" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                <section className="flex flex-col justify-center py-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} className="card-clean h-full flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Topik Pembicaraan</h2>
                                <p className="text-slate-500 dark:text-slate-400">Analisis topik dominan yang dibahas netizen menggunakan Latent Dirichlet Allocation (LDA).</p>
                            </div>
                            <div className="flex p-1 bg-slate-100 dark:bg-neutral-800 rounded-xl self-start md:self-auto gap-1">
                                {['gabungan', 'tiktok', 'x'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTopicTab(tab)}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 ${activeTopicTab === tab ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                                    >
                                        {activeTopicTab === tab && (
                                            <motion.div
                                                layoutId="topic-tab-active"
                                                className="absolute inset-0 rounded-lg"
                                                style={{
                                                    background: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
                                                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(37, 99, 235, 0.4)',
                                                    zIndex: -1
                                                }}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab === 'x' ? 'X (Twitter)' : tab}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} className="grid grid-cols-1 gap-4 flex-grow justify-center">
                            {topicData.map((topic) => {
                                const sentiment = topicSentimentData?.find(s => s.topic_id === topic.id);
                                if (!sentiment) return null;
                                let dominantPct = 0;
                                let progressGradient = 'linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%)';
                                let tagColorClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
                                if (sentiment.dominant === 'Positif') {
                                    dominantPct = sentiment.sentiment.positif;
                                    progressGradient = 'linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)';
                                    tagColorClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
                                } else if (sentiment.dominant === 'Negatif') {
                                    dominantPct = sentiment.sentiment.negatif;
                                    progressGradient = 'linear-gradient(180deg, #f87171 0%, #ef4444 50%, #dc2626 100%)';
                                    tagColorClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
                                } else {
                                    dominantPct = sentiment.sentiment.netral;
                                    progressGradient = 'linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%)';
                                    tagColorClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
                                }
                                const isOpen = openTopicId === topic.id;
                                return (
                                    <motion.div key={topic.id} variants={itemVariants} className="lg:space-y-2">
                                        {/* Mobile: Accordion Style */}
                                        <div className="lg:hidden">
                                            <button
                                                onClick={() => setOpenTopicId(isOpen ? null : topic.id)}
                                                className="w-full p-4 bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600 transition-colors"
                                            >
                                                <div className="space-y-2">
                                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base text-left">{topic.label.split(': ')[1]}</h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tagColorClass}`}>
                                                            {dominantPct}% {sentiment.dominant.toLowerCase()}
                                                        </span>
                                                        {isOpen ? <FiChevronUp className="w-5 h-5 text-slate-400" /> : <FiChevronDown className="w-5 h-5 text-slate-400" />}
                                                    </div>
                                                </div>
                                            </button>
                                            {isOpen && (
                                                <div className="mt-2 p-4 bg-slate-50 dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-700 space-y-3">
                                                    <div className="h-2 w-full bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner">
                                                        <div className="h-full rounded-full transition-all duration-1000 ease-out progress-glossy" style={{ width: `${dominantPct}%`, background: progressGradient }} />
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {topic.keywords.map((keywordObj, idx) => {
                                                            let kwColorClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
                                                            const text = typeof keywordObj === 'string' ? keywordObj : keywordObj.text;
                                                            const sentiment = typeof keywordObj === 'string' ? null : keywordObj.sentiment;
                                                            if (sentiment === 'Positif') {
                                                                kwColorClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
                                                            } else if (sentiment === 'Negatif') {
                                                                kwColorClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
                                                            } else if (sentiment === 'Netral') {
                                                                kwColorClass = 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
                                                            } else if (!sentiment) {
                                                                kwColorClass = tagColorClass;
                                                            }
                                                            return (<span key={idx} className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${kwColorClass}`}>{text}</span>);
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Desktop: Always Expanded */}
                                        <div className="hidden lg:block space-y-2">
                                            <div className="flex justify-between items-end">
                                                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg line-clamp-1" title={topic.label.split(': ')[1]}>{topic.label.split(': ')[1]}</h3>
                                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{dominantPct}% {sentiment.dominant.toLowerCase()}</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner">
                                                <div className="h-full rounded-full transition-all duration-1000 ease-out progress-glossy" style={{ width: `${dominantPct}%`, background: progressGradient }} />
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {topic.keywords.map((keywordObj, idx) => {
                                                    let kwColorClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
                                                    const text = typeof keywordObj === 'string' ? keywordObj : keywordObj.text;
                                                    const sentiment = typeof keywordObj === 'string' ? null : keywordObj.sentiment;
                                                    if (sentiment === 'Positif') {
                                                        kwColorClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
                                                    } else if (sentiment === 'Negatif') {
                                                        kwColorClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
                                                    } else if (sentiment === 'Netral') {
                                                        kwColorClass = 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
                                                    } else if (!sentiment) {
                                                        kwColorClass = tagColorClass;
                                                    }
                                                    return (<span key={idx} className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${kwColorClass}`}>{text}</span>);
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </section>

                <section className="flex flex-col justify-center items-center py-4">
                    <motion.div ref={targetRef} style={{ opacity }} className="relative w-full">
                        <motion.div style={{ y, scale }} className="relative z-10">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Metodologi</h2>
                                <p className="text-lg text-slate-500 dark:text-slate-400">Visualisasi alur kerja Penelitian Sentiment.</p>
                            </div>
                            <OrbitalSystem />
                        </motion.div>
                    </motion.div>
                </section>

                <section className="flex flex-col justify-center py-4 pb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="h-full flex flex-col justify-center">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Temuan Utama</h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Hasil perbandingan teknik balancing menunjukkan temuan menarik tentang penanganan data tidak seimbang.</p>
                        </div>
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} className="grid md:grid-cols-2 gap-8">
                            {KEY_FINDINGS.map((item, idx) => {
                                const Icon = { 'FiTrendingUp': FiTrendingUp, 'FiBarChart2': FiBarChart2, 'FiAlertTriangle': FiAlertTriangle, 'FiTarget': FiTarget }[item.icon];
                                const colorClasses = { emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400', blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400', purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' }[item.color];
                                return (
                                    <motion.div key={idx} variants={itemVariants} className="card-clean hover:shadow-clean-hover transition-all duration-300 p-8 flex flex-col justify-center">
                                        <div className="flex items-start gap-6">
                                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${colorClasses}`}>
                                                <Icon size={32} className="icon-emboss" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{item.title}</h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                                    {item.desc.split(/(~?\d+(?:\.\d+)?%)/g).map((part, i) => part.match(/^~?\d+(?:\.\d+)?%$/) ? <span key={i} className="font-bold text-slate-900 dark:text-white">{part}</span> : part)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </section>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all" onClick={() => setSelectedImage(null)}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative max-w-4xl w-full bg-white dark:bg-neutral-900 rounded-2xl p-2 shadow-2xl overflow-hidden border border-transparent dark:border-neutral-800" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center">
                            <div className={`w-full py-3 px-6 mb-2 flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 ${selectedImage.sentiment === 'Positif' ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : selectedImage.sentiment === 'Negatif' ? 'bg-red-50/50 dark:bg-red-900/10' : 'bg-slate-50/50 dark:bg-slate-800/30'}`}>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Wordcloud Sentimen {selectedImage.sentiment}</h3>
                                    <span className={`badge-glossy badge-glossy-sm ${selectedImage.sentiment === 'Positif' ? 'badge-positive' :
                                        selectedImage.sentiment === 'Negatif' ? 'badge-negative' :
                                            'badge-neutral'
                                        }`}>
                                        <span>{selectedImage.sentiment}</span>
                                    </span>
                                </div>
                                <button onClick={() => setSelectedImage(null)} className="p-2 bg-white/50 hover:bg-slate-200 dark:bg-black/20 dark:hover:bg-neutral-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">
                                    <FiX size={20} />
                                </button>
                            </div>
                            <div className="w-full p-4 bg-slate-50 dark:bg-black min-h-[400px] flex items-center justify-center rounded-xl">
                                <img src={selectedImage.src} alt={`Detail Wordcloud ${selectedImage.sentiment}`} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Home;
