import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { NAVBAR_PILL_STYLE, MOBILE_BUTTON_STYLE, ACTIVE_TAB_STYLE } from '../constants/styles';
import { mobileMenuVariants, springTransition } from '../constants/animations';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const links = [
        { name: 'Beranda', path: '/' },
        { name: 'Demo Langsung', path: '/demo' },
        { name: 'Hasil Riset', path: '/research' },
        { name: 'Metodologi', path: '/methodology' },
    ];

    return (
        <>
            <nav className="nav-pill h-16 flex items-center justify-between px-2 pl-6 pr-2 relative overflow-hidden" style={NAVBAR_PILL_STYLE}>
                {/* Glossy overlay for emboss effect */}
                <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-full" />
                {/* Brand */}
                <div className="flex items-center shrink-0 relative z-10">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                            Cekat<span className="text-brand-blue">AI</span> Sentiment
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu - Right Aligned */}
                <div className="hidden md:flex items-center gap-2 relative z-10">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isActive
                                    ? 'text-white'
                                    : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="navbar-active-pill"
                                        className="absolute inset-0 rounded-full"
                                        style={ACTIVE_TAB_STYLE}
                                        transition={springTransition}
                                    >
                                        <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
                                    </motion.span>
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        )
                    })}
                </div>



                {/* Mobile Toggle & Theme */}
                <div className="flex md:hidden ml-auto items-center gap-2 relative z-10">
                    <button
                        onClick={toggleTheme}
                        className="relative overflow-hidden p-2 rounded-full transition-all duration-300"
                        style={MOBILE_BUTTON_STYLE}
                        aria-label="Toggle Theme"
                    >
                        <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
                        {theme === 'light' ? <FiMoon size={18} className="text-white relative z-10 icon-emboss" /> : <FiSun size={18} className="text-white relative z-10 icon-emboss" />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative overflow-hidden inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 focus:outline-none"
                        style={MOBILE_BUTTON_STYLE}
                    >
                        <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
                        {isOpen ? <FiX size={22} className="text-white relative z-10 icon-emboss" /> : <FiMenu size={22} className="text-white relative z-10 icon-emboss" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={mobileMenuVariants}
                    className="fixed top-24 left-4 right-4 z-40 bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-slate-100 dark:border-neutral-800 p-4 md:hidden"
                >
                    <div className="flex flex-col space-y-2">
                        {links.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`relative overflow-hidden block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-neutral-800'}`}
                                    style={isActive ? {
                                        ...MOBILE_BUTTON_STYLE
                                    } : {}}
                                >
                                    {isActive && (
                                        <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl pointer-events-none" />
                                    )}
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default Navbar;
