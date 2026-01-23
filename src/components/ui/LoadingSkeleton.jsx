/**
 * LoadingSkeleton Component
 * Displays animated loading skeleton for various UI elements
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingSkeleton Component
 * Displays an animated loading placeholder
 * 
 * @param {Object} props
 * @param {string} props.variant - Skeleton variant: 'text', 'card', 'chart', 'custom'
 */
const LoadingSkeleton = ({ variant = 'custom' }) => {
    if (variant === 'text') {
        return (
            <div className="space-y-3 animate-pulse">
                <div className="h-4 w-32 bg-slate-200 dark:bg-neutral-800 rounded"></div>
                <div className="h-12 w-48 bg-slate-200 dark:bg-neutral-800 rounded"></div>
            </div>
        );
    }

    if (variant === 'chart') {
        return (
            <div className="space-y-6 animate-pulse px-4">
                <div className="h-4 w-32 bg-slate-200 dark:bg-neutral-800 rounded mx-auto"></div>
                <div className="h-12 w-48 bg-slate-200 dark:bg-neutral-800 rounded mx-auto"></div>
                <div className="h-2 w-full bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-200 dark:bg-neutral-700 w-2/3"></div>
                </div>
                <div className="space-y-4 pt-4">
                    <div className="h-20 bg-slate-50 dark:bg-neutral-800 rounded-xl w-full"></div>
                </div>
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-32 bg-slate-200 dark:bg-neutral-800 rounded-xl"></div>
                <div className="h-4 bg-slate-200 dark:bg-neutral-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-neutral-800 rounded w-1/2"></div>
            </div>
        );
    }

    // Custom variant - for LiveDemo
    return (
        <div className="flex-grow flex flex-col justify-center py-12 space-y-6 animate-pulse px-4">
            <div className="h-4 w-32 bg-slate-200 dark:bg-neutral-800 rounded mx-auto"></div>
            <div className="h-12 w-48 bg-slate-200 dark:bg-neutral-800 rounded mx-auto"></div>
            <div className="h-2 w-full bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-200 dark:bg-neutral-700 w-2/3"></div>
            </div>
            <div className="space-y-4 pt-4">
                <div className="h-20 bg-slate-50 dark:bg-neutral-800 rounded-xl w-full"></div>
            </div>
        </div>
    );
};

LoadingSkeleton.propTypes = {
    variant: PropTypes.oneOf(['text', 'card', 'chart', 'custom'])
};

export default LoadingSkeleton;
