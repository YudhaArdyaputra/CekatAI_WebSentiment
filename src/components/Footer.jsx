import { FiUser, FiAward, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="w-full bg-white dark:bg-black border-t border-slate-200 dark:border-neutral-800 mt-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-6xl mx-auto px-4 py-6 md:py-8"
            >
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    {/* Left Side: Context Text Only (No Logo) */}
                    <div className="text-left">
                        <div className="mb-3">
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400">
                                CekatAI Sentiment
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
                            Penelitian ini bertujuan untuk menganalisis sentimen publik terhadap implementasi AI dalam layanan pelanggan, menggunakan metode Logistic Regression dan teknik balancing data mutakhir.
                        </p>
                    </div>

                    {/* Right Side: Researcher Bio with Glossy Effect */}
                    <div className="card-glossy rounded-xl p-4">
                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-200 dark:border-neutral-700 pb-1.5">
                            Disusun Oleh
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2.5">
                                <FiUser className="text-blue-500 mt-0.5 shrink-0 w-3.5 h-3.5 icon-emboss" />
                                <div>
                                    <p className="text-slate-900 dark:text-slate-100 font-bold text-xs">GEDE YUDHA ARDYAPUTRA</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px] text-mono">NIM. 2215091017</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <FiBookOpen className="text-blue-500 mt-0.5 shrink-0 w-3.5 h-3.5 icon-emboss" />
                                <div>
                                    <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">S1 SISTEM INFORMASI</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px]">JURUSAN TEKNIK INFORMATIKA</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <FiAward className="text-blue-500 mt-0.5 shrink-0 w-3.5 h-3.5 icon-emboss" />
                                <div>
                                    <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">FAKULTAS TEKNIK DAN KEJURUAN</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px]">UNIVERSITAS PENDIDIKAN GANESHA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-neutral-800 text-center">
                    <p className="text-slate-400 dark:text-slate-500 text-[10px]">
                        &copy; {new Date().getFullYear()} CekatAI Research Project.
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
