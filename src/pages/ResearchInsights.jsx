import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, LabelList } from 'recharts';
import { COMPARATIVE_METRICS, F1_PER_CLASS, CV_VS_TEST, DATASET_INFO, MODELS, CLASSIFICATION_REPORT_DATA } from '../data/metrics';
import { FiTrendingUp, FiGrid, FiPieChart, FiBarChart2, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { ChartGradients, PIE_GRADIENT_COLORS } from '../components/ChartGradients';
import ConfusionMatrix from '../components/ui/ConfusionMatrix';
import TabMenu from '../components/ui/TabMenu';
import ClassificationHeatmap from '../components/ui/ClassificationHeatmap';
import MetricCard from '../components/ui/MetricCard';
import { COLORS } from '../constants/colors';
import { containerVariants, itemVariants } from '../constants/animations';
import { renderCustomizedLabel } from '../utils/chartHelpers';
import { formatChartLabel } from '../utils/chartHelpers';

export default function ResearchInsights() {
    const [activeHeatmapTab, setActiveHeatmapTab] = useState('normal');

    const metricsData = COMPARATIVE_METRICS.map(m => ({
        name: m.name,
        Accuracy: m.accuracy,
        Precision: m.precision,
        Recall: m.recall,
        'F1-Score': m.f1
    }));

    const distributionData = [
        { name: 'Negatif', value: DATASET_INFO.distribution.negatif.count, color: COLORS.red },
        { name: 'Netral', value: DATASET_INFO.distribution.netral.count, color: COLORS.slate },
        { name: 'Positif', value: DATASET_INFO.distribution.positif.count, color: COLORS.emerald }
    ];

    const balancedData = [
        { name: 'Negatif', value: 1427, color: COLORS.red },
        { name: 'Netral', value: 1427, color: COLORS.slate },
        { name: 'Positif', value: 1427, color: COLORS.emerald }
    ];

    const cvTestData = CV_VS_TEST.map(d => ({ name: d.name, 'CV Accuracy': d.cv, 'Test Accuracy': d.test }));

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "center center"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

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
                    Hasil Riset
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Visualisasi hasil perbandingan metrik performa antara model Baseline dan teknik balancing (SMOTE & Back-translation).
                </p>
            </motion.div>

            {/* Section 1: Comparative Metrics */}
            <motion.div
                ref={targetRef}
                className="card-clean lg:[&]:transform-gpu"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                        <FiTrendingUp className="w-6 h-6 icon-emboss" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Perbandingan Metrik</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Perbandingan metrik evaluasi antar model eksperimen.</p>
                    </div>
                </div>

                <div className="h-80 lg:h-[400px] mb-4 w-full overflow-x-auto">
                    <div className="min-w-[600px] h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }} barGap={6}>
                                <ChartGradients />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[60, 90]} />
                                <Legend
                                    iconType="circle"
                                    wrapperStyle={{ paddingTop: '30px' }}
                                    layout="horizontal"
                                    align="center"
                                    verticalAlign="bottom"
                                />
                                <Bar dataKey="Accuracy" fill="url(#blueGloss)" radius={[4, 4, 0, 0]} maxBarSize={50} filter="url(#emboss)">
                                    <LabelList dataKey="Accuracy" position="top" fill={COLORS.blue} fontSize={10} fontWeight={600} formatter={(val) => val + '%'} />
                                </Bar>
                                <Bar dataKey="Precision" fill="url(#emeraldGloss)" radius={[4, 4, 0, 0]} maxBarSize={50} filter="url(#emboss)">
                                    <LabelList dataKey="Precision" position="top" fill={COLORS.emerald} fontSize={10} fontWeight={600} formatter={(val) => val + '%'} />
                                </Bar>
                                <Bar dataKey="Recall" fill="url(#amberGloss)" radius={[4, 4, 0, 0]} maxBarSize={50} filter="url(#emboss)">
                                    <LabelList dataKey="Recall" position="top" fill={COLORS.amber} fontSize={10} fontWeight={600} formatter={(val) => val + '%'} />
                                </Bar>
                                <Bar dataKey="F1-Score" fill="url(#purpleGloss)" radius={[4, 4, 0, 0]} maxBarSize={50} filter="url(#emboss)">
                                    <LabelList dataKey="F1-Score" position="top" fill={COLORS.purple} fontSize={10} fontWeight={600} formatter={(val) => val + '%'} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-100 dark:border-neutral-700">
                    {COMPARATIVE_METRICS.map((model) => (
                        <MetricCard
                            key={model.name}
                            label={model.name}
                            value={model.accuracy}
                            unit="%"
                        />
                    ))}
                </div>
            </motion.div>

            {/* Section 2: Confusion Matrix Gallery */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                className="card-clean"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shadow-sm">
                        <FiGrid className="w-6 h-6 icon-emboss" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Galeri Confusion Matrix</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Detail prediksi benar vs salah untuk setiap model.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.values(MODELS).map((model) => (
                        <motion.div
                            key={model.id}
                            variants={itemVariants}
                            className="card-glossy rounded-2xl p-5 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 text-center">{model.name}</h3>
                            {model.isBinary ? (
                                <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 rounded-full py-1 px-3 w-fit mx-auto mb-4 flex items-center gap-1">
                                    <FiAlertCircle className="w-3 h-3" /> KELAS BINER
                                </p>
                            ) : <div className="h-6 mb-4"></div>}

                            <ConfusionMatrix confusionMatrix={model.confusionMatrix} isBinary={model.isBinary} />

                            <div className="text-center pt-4 mt-4 border-t border-slate-50 dark:border-neutral-700">
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Accuracy: <span className="text-slate-700 dark:text-slate-300 font-bold">{model.accuracy}%</span></p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Section 2.5: Classification Report Heatmap Gallery */}
            {/* Section 2.5: Classification Report Heatmap Gallery */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="card-clean"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-sm">
                            <FiBarChart2 className="w-6 h-6 icon-emboss" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Metrik Evaluasi</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Visualisasi Precision, Recall, dan F1-Score.</p>
                        </div>
                    </div>

                    {/* Tab Menu */}
                    <TabMenu
                        tabs={Object.entries(CLASSIFICATION_REPORT_DATA).map(([key, model]) => ({
                            key,
                            label: model.name
                        }))}
                        activeTab={activeHeatmapTab}
                        onTabChange={setActiveHeatmapTab}
                        layoutId="heatmap-tab-active"
                        isGrid={true}
                    />
                </div>

                <div className="mt-4">
                    <motion.div
                        key={activeHeatmapTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ClassificationHeatmap data={CLASSIFICATION_REPORT_DATA[activeHeatmapTab]} />
                    </motion.div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
                    <div className="flex items-start gap-3">
                        <FiAlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                            <strong>Skema Warna:</strong>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {/* Green - Optimal Performance */}
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-12 h-6 rounded-md shadow-sm"
                                        style={{
                                            background: 'linear-gradient(145deg, #10b981 0%, #059669 100%)',
                                            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.3), inset 0 -2px 2px rgba(0,0,0,0.2)'
                                        }}
                                    ></div>
                                    <span className="text-xs font-medium">75-100% (Optimal)</span>
                                </div>
                                {/* Yellow - Moderate Performance */}
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-12 h-6 rounded-md shadow-sm"
                                        style={{
                                            background: 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)',
                                            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -2px 2px rgba(0,0,0,0.1)'
                                        }}
                                    ></div>
                                    <span className="text-xs font-medium">50-75% (Cukup)</span>
                                </div>
                                {/* Red - Poor Performance */}
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-12 h-6 rounded-md shadow-sm"
                                        style={{
                                            background: 'linear-gradient(145deg, #ef4444 0%, #dc2626 100%)',
                                            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.3), inset 0 -2px 2px rgba(0,0,0,0.2)'
                                        }}
                                    ></div>
                                    <span className="text-xs font-medium">0-50% (Rendah)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-4">
                {/* Section 3: Data Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="card-clean h-full flex flex-col"
                >
                    <div className="flex items-center gap-4 mb-4 shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
                            <FiPieChart className="w-6 h-6 icon-emboss" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Distribusi Data</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tidak Seimbang vs Seimbang.</p>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col gap-4">
                        {/* Before */}
                        <div className="card-inner">
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center mb-1">Sebelum Balancing</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-4">Dataset Asli (Tidak Seimbang)</p>
                            <div className="flex-grow min-h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPie>
                                        <ChartGradients />
                                        <Pie
                                            data={distributionData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={4}
                                            dataKey="value"
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {distributionData.map((entry, index) => {
                                                const gradientMap = { '#10b981': 'url(#pieEmerald)', '#ef4444': 'url(#pieRed)', '#64748b': 'url(#pieSlate)' };
                                                return (<Cell key={`cell-${index}`} fill={gradientMap[entry.color] || entry.color} stroke="rgba(255,255,255,0.3)" strokeWidth={2} filter="url(#chartShadow)" />);
                                            })}
                                        </Pie>
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </RechartsPie>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* After */}
                        <div className="card-inner">
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center mb-1">Sesudah Balancing</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-4">Teknik SMOTE / Back-translation</p>
                            <div className="flex-grow min-h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPie>
                                        <ChartGradients />
                                        <Pie
                                            data={balancedData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={4}
                                            dataKey="value"
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {balancedData.map((entry, index) => {
                                                const gradientMap = { '#10b981': 'url(#pieEmerald)', '#ef4444': 'url(#pieRed)', '#64748b': 'url(#pieSlate)' };
                                                return (<Cell key={`cell-${index}`} fill={gradientMap[entry.color] || entry.color} stroke="rgba(255,255,255,0.3)" strokeWidth={2} filter="url(#chartShadow)" />);
                                            })}
                                        </Pie>
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </RechartsPie>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    {/* Section 4: F1 Score Per Class */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="card-clean"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                                <FiBarChart2 className="w-6 h-6 icon-emboss" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">F1-Score Per Kelas</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Analisis performa secara mendalam.</p>
                            </div>
                        </div>
                        <div className="h-72 w-full mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={F1_PER_CLASS} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={2}>
                                    <ChartGradients />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                    <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                                    <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="Normal" fill="url(#blueGloss)" radius={[4, 4, 0, 0]} filter="url(#emboss)">
                                        <LabelList dataKey="Normal" position="top" fill={COLORS.blue} fontSize={9} fontWeight={600} />
                                    </Bar>
                                    <Bar dataKey="TanpaNetral" name="No Neutral" fill="url(#cyanGloss)" radius={[4, 4, 0, 0]} filter="url(#emboss)">
                                        <LabelList dataKey="TanpaNetral" position="top" fill={COLORS.cyan} fontSize={9} fontWeight={600} />
                                    </Bar>
                                    <Bar dataKey="SMOTE" fill="url(#purpleGloss)" radius={[4, 4, 0, 0]} filter="url(#emboss)">
                                        <LabelList dataKey="SMOTE" position="top" fill={COLORS.purple} fontSize={9} fontWeight={600} />
                                    </Bar>
                                    <Bar dataKey="Backstranslation" name="Back-Trans" fill="url(#emeraldGloss)" radius={[4, 4, 0, 0]} filter="url(#emboss)">
                                        <LabelList dataKey="Backstranslation" position="top" fill={COLORS.emerald} fontSize={9} fontWeight={600} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
                            <strong>Temuan:</strong> Model <span className="font-bold text-cyan-700 dark:text-cyan-400">Tanpa Netral</span> memiliki performa tertinggi karena menghilangkan ambiguitas. Namun untuk 3 kelas, teknik balancing berhasil menaikkan performa kelas Netral dari <span className="font-bold">30%</span> ke <span className="font-bold">50%</span>.
                        </div>
                    </motion.div>

                    {/* Section 5: CV vs Test */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="card-clean"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-sm">
                                <FiTrendingUp className="w-6 h-6 icon-emboss" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">CV vs Test Accuracy</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Analisis stabilitas model (Overfitting).</p>
                            </div>
                        </div>
                        <div className="h-64 w-full mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cvTestData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={4}>
                                    <ChartGradients />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                    <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} />
                                    <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[65, 90]} />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="CV Accuracy" fill="url(#blueGloss)" radius={[4, 4, 0, 0]} filter="url(#emboss)">
                                        <LabelList dataKey="CV Accuracy" position="top" fill={COLORS.blue} fontSize={10} fontWeight={600} formatter={(val) => val + '%'} />
                                    </Bar>
                                    <Bar dataKey="Test Accuracy" fill="url(#redGloss)" radius={[4, 4, 0, 0]} filter="url(#emboss)">
                                        <LabelList dataKey="Test Accuracy" position="top" fill={COLORS.red} fontSize={10} fontWeight={600} formatter={(val) => val + '%'} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl items-start">
                                <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-emerald-800 dark:text-emerald-300">Model <strong>Tanpa Netral</strong> paling stabil (Selisih CV-Test &lt; 1%).</p>
                            </div>
                            <div className="flex gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl items-start">
                                <FiAlertCircle className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-red-800 dark:text-red-300">Model Balancing mengalami indikasi <strong>Overfitting</strong> (Selisih &gt; 8%).</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}
