/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                brand: {
                    blue: '#2563eb', // Royal Blue
                    dark: '#1e293b',
                },
                sentiment: {
                    pos: '#10b981', // Emerald
                    neg: '#ef4444', // Red
                    neu: '#64748b', // Slate
                }
            },
            boxShadow: {
                'clean': '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
                'clean-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.06)',
                'glossy': '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)',
                'emboss': 'inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08)',
                'emboss-hover': 'inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)',
                'chart-emboss': 'inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
