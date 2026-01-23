import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFileText, FiBarChart2, FiShuffle, FiCpu, FiActivity } from 'react-icons/fi';

const OrbitalSystem = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navigate = useNavigate();

    const handleOrbitClick = (id) => {
        navigate('/methodology', { state: { targetId: id } });
    };

    // Configuration for each orbit
    const orbits = [
        { id: 1, label: "Text Preprocessing", icon: FiFileText, color: "text-blue-500", bg: "bg-blue-100", radius: isMobile ? 40 : 80, duration: 20, startAngle: 0 },
        { id: 2, label: "TF-IDF Vectorization", icon: FiBarChart2, color: "text-purple-500", bg: "bg-purple-100", radius: isMobile ? 65 : 120, duration: 25, reverse: true, startAngle: 120 },
        { id: 3, label: "Data Balancing", icon: FiShuffle, color: "text-amber-500", bg: "bg-amber-100", radius: isMobile ? 90 : 160, duration: 30, startAngle: 240 },
        { id: 4, label: "Model Training", icon: FiCpu, color: "text-emerald-500", bg: "bg-emerald-100", radius: isMobile ? 115 : 200, duration: 35, reverse: true, startAngle: 60 },
        { id: 5, label: "Evaluation", icon: FiActivity, color: "text-red-500", bg: "bg-red-100", radius: isMobile ? 140 : 240, duration: 40, startAngle: 300 },
    ];

    const containerHeight = isMobile ? "h-[420px]" : "h-[650px]";

    return (
        <div className={`relative w-full ${containerHeight} flex items-center justify-center overflow-hidden mt-2 mb-4 md:mt-2 md:mb-6 origin-top transition-all duration-300 scale-90 md:scale-100`}>
            {/* Central Core with Glossy Effect */}
            <div className="relative z-20 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center relative z-20 border-4 border-slate-50 dark:border-neutral-700 overflow-hidden"
                    style={{
                        boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 -2px 6px rgba(255, 255, 255, 0.1), 0 6px 20px rgba(37, 99, 235, 0.15)'
                    }}
                >
                    <div className="relative w-16 h-16 rounded-full flex items-center justify-center flex-col p-1 overflow-hidden"
                        style={{
                            background: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(37, 99, 235, 0.25)'
                        }}
                    >
                        <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none" />
                        <span className="text-white text-[11px] font-bold text-center leading-tight relative z-10">
                            Metodologi<br />Sentiment
                        </span>
                    </div>
                    {/* Pulse Effect */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-blue-500 rounded-full -z-10"
                    />
                </div>
            </div>

            {/* Orbits and Planets */}
            {orbits.map((orbit, index) => (
                <div
                    key={orbit.id}
                    className="absolute flex items-center justify-center rounded-full border-2 border-blue-200/60 dark:border-blue-900/40 transition-all duration-500"
                    style={{
                        width: orbit.radius * 2,
                        height: orbit.radius * 2,
                        zIndex: 10 - index,
                        boxShadow: 'inset 0 2px 4px rgba(37, 99, 235, 0.05), 0 0 20px rgba(37, 99, 235, 0.02)'
                    }}
                >
                    {/* Orbital Rotation */}
                    <motion.div
                        className="absolute w-full h-full"
                        initial={{ rotate: orbit.startAngle }}
                        animate={{ rotate: orbit.startAngle + (orbit.reverse ? -360 : 360) }}
                        transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Planet Node with Glossy Effect */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <motion.div
                                className="relative group"
                                initial={{ rotate: -orbit.startAngle }}
                                animate={{ rotate: -orbit.startAngle + (orbit.reverse ? 360 : -360) }}
                                transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                            >
                                <div
                                    onClick={() => handleOrbitClick(orbit.id)}
                                    className={`relative overflow-hidden w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white dark:bg-neutral-800 ${orbit.color} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border border-blue-100 dark:border-blue-900`}
                                    style={{
                                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 -2px 4px rgba(255, 255, 255, 0.05), 0 6px 20px rgba(37, 99, 235, 0.12)'
                                    }}
                                >
                                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-2xl" />
                                    <orbit.icon className="w-4 h-4 md:w-5 md:h-5 relative z-10 icon-emboss" />
                                </div>

                                {/* Label with Glossy Effect */}
                                <div
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 md:px-2.5 md:py-0.5 bg-white dark:bg-neutral-800 rounded-lg border border-slate-100 dark:border-neutral-700 whitespace-nowrap z-20 flex items-center justify-center overflow-hidden"
                                    style={{
                                        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 8px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-lg" />
                                    <span className={`text-[9px] md:text-[10px] font-bold ${orbit.color} relative z-10`}>{orbit.label}</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            ))}

            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-radial-gradient from-blue-50/50 to-transparent opacity-50 pointer-events-none dark:opacity-10 dark:from-blue-900/20" />
        </div>
    );
};

export default OrbitalSystem;
