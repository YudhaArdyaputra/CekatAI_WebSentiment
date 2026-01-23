/**
 * MetricCard Component
 * Displays a metric value with label in a card format
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * MetricCard Component
 * 
 * @param {Object} props
 * @param {string} props.label - Metric label
 * @param {string|number} props.value - Metric value
 * @param {string} props.unit - Unit suffix (e.g., '%')
 * @param {string} props.size - Card size: 'sm', 'md', 'lg' (default: 'md')
 */
const MetricCard = ({ label, value, unit = '', size = 'md' }) => {
    const sizeClasses = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl'
    };

    const valueClass = sizeClasses[size] || sizeClasses.md;

    return (
        <div className="card-info">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
                {label}
            </p>
            <p className={`${valueClass} font-extrabold text-slate-900 dark:text-white mb-1`}>
                {value}{unit}
            </p>
            <span className="inline-block px-2 py-0.5 bg-white dark:bg-neutral-700 rounded border border-slate-200 dark:border-neutral-600 text-[10px] font-medium text-slate-400 dark:text-slate-300">
                Accuracy
            </span>
        </div>
    );
};

MetricCard.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default MetricCard;
