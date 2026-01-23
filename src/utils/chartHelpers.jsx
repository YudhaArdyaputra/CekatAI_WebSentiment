/**
 * Chart Helper Utilities
 * Reusable functions for chart rendering and customization
 */

import { PERFORMANCE_THRESHOLDS } from '../constants/colors';

/**
 * Render customized label for pie charts
 * Used by Recharts Pie component
 * @param {Object} props - Recharts label props
 * @returns {JSX.Element|null} Label element or null if too small
 */
export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Don't render label if segment is too small
    if (percent < 0.05) return null;

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-bold pointer-events-none"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

/**
 * Get gradient URL based on color value
 * @param {string} color - Color hex code
 * @param {Object} gradientMap - Mapping of colors to gradient URLs
 * @returns {string} Gradient URL or original color
 */
export const getGradientForValue = (color, gradientMap) => {
    return gradientMap[color] || color;
};

/**
 * Get color indicator class based on performance value
 * @param {number} value - Performance value (0-1)
 * @returns {string} Tailwind CSS class for color indicator
 */
export const getPerformanceIndicatorClass = (value) => {
    if (value > PERFORMANCE_THRESHOLDS.moderate) {
        return 'bg-emerald-500';
    } else if (value > PERFORMANCE_THRESHOLDS.poor) {
        return 'bg-amber-500';
    } else {
        return 'bg-red-500';
    }
};

/**
 * Format value for chart label display
 * @param {number} value - Numeric value
 * @param {string} suffix - Suffix to append (e.g., '%')
 * @returns {string} Formatted label
 */
export const formatChartLabel = (value, suffix = '%') => {
    return `${value}${suffix}`;
};
