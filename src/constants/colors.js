/**
 * Color Constants
 * Centralized color definitions for consistent theming across the application
 */

// Base color palette
export const COLORS = {
    blue: '#2563eb',
    emerald: '#10b981',
    red: '#ef4444',
    amber: '#f59e0b',
    slate: '#64748b',
    cyan: '#06b6d4',
    purple: '#8b5cf6'
};

// Sentiment-specific colors
export const SENTIMENT_COLORS = {
    positive: COLORS.emerald,
    negative: COLORS.red,
    neutral: COLORS.slate
};

// Chart gradient colors for Recharts
export const CHART_COLORS = {
    blue: COLORS.blue,
    emerald: COLORS.emerald,
    red: COLORS.red,
    amber: COLORS.amber,
    cyan: COLORS.cyan,
    purple: COLORS.purple,
    slate: COLORS.slate
};

// Color mapping for different UI elements
export const COLOR_MAP = {
    blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        bgLight: 'bg-blue-50 dark:bg-blue-900/10'
    },
    emerald: {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
        bgLight: 'bg-emerald-50 dark:bg-emerald-900/10'
    },
    amber: {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        bgLight: 'bg-amber-50 dark:bg-amber-900/10'
    },
    purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        bgLight: 'bg-purple-50 dark:bg-purple-900/10'
    },
    red: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        bgLight: 'bg-red-50 dark:bg-red-900/10'
    }
};

// Performance-based color thresholds
export const PERFORMANCE_THRESHOLDS = {
    poor: 0.5,    // < 50% - Red
    moderate: 0.75, // 50-75% - Yellow/Amber
    good: 1.0     // 75-100% - Green/Emerald
};

// Gradient map for pie charts
export const PIE_GRADIENT_MAP = {
    '#10b981': 'url(#pieEmerald)',
    '#ef4444': 'url(#pieRed)',
    '#64748b': 'url(#pieSlate)'
};
