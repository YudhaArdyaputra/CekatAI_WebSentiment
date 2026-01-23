/**
 * Formatter Utilities
 * Helper functions for formatting data for display
 */

import { SENTIMENT_COLORS } from '../constants/colors';

/**
 * Format a decimal value as a percentage string
 * @param {number} value - Decimal value (0-1)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage (e.g., "85.5%")
 */
export const formatPercentage = (value, decimals = 1) => {
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format a number value as a percentage string
 * @param {number} value - Number value
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted percentage (e.g., "85%")
 */
export const formatNumberAsPercentage = (value, decimals = 0) => {
    return `${value.toFixed(decimals)}%`;
};

/**
 * Get color based on sentiment type
 * @param {string} sentiment - Sentiment type ('Positif', 'Negatif', 'Netral')
 * @returns {string} Color hex code
 */
export const getSentimentColor = (sentiment) => {
    const sentimentLower = sentiment.toLowerCase();

    if (sentimentLower.includes('positif') || sentimentLower.includes('positive')) {
        return SENTIMENT_COLORS.positive;
    } else if (sentimentLower.includes('negatif') || sentimentLower.includes('negative')) {
        return SENTIMENT_COLORS.negative;
    } else {
        return SENTIMENT_COLORS.neutral;
    }
};

/**
 * Get Tailwind CSS class for sentiment color
 * @param {string} sentiment - Sentiment type
 * @returns {string} Tailwind CSS class
 */
export const getSentimentColorClass = (sentiment) => {
    const sentimentLower = sentiment.toLowerCase();

    if (sentimentLower.includes('positif') || sentimentLower.includes('positive')) {
        return 'text-emerald-500';
    } else if (sentimentLower.includes('negatif') || sentimentLower.includes('negative')) {
        return 'text-red-500';
    } else {
        return 'text-slate-600 dark:text-slate-400';
    }
};
