import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`glass-panel fixed top-6 right-4 md:right-10 z-50 h-16 w-32 
                       hidden md:flex items-center p-2 cursor-pointer
                       ${theme === 'light' ? 'justify-start' : 'justify-end'}`}
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={`h-12 w-12 rounded-full flex items-center justify-center relative
                            ${theme === 'light' 
                                ? 'bg-gradient-to-tr from-amber-300 to-yellow-500 text-white' 
                                : 'bg-neutral-800 text-slate-200 border border-neutral-700'
                            }`}
                style={{
                    boxShadow: theme === 'light' 
                        ? 'inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(245, 158, 11, 0.4)'
                        : 'inset 0 2px 4px rgba(255, 255, 255, 0.05), inset 0 -2px 4px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)'
                }}
            >
                {theme === 'light' ? (
                    <FiSun className="w-6 h-6" />
                ) : (
                    <FiMoon className="w-6 h-6" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
