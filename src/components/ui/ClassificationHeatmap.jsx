/**
 * ClassificationHeatmap Component
 * Displays classification metrics (Precision, Recall, F1-Score) as colored blocks
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getPerformanceColorStyle } from '../../constants/styles';
import { getPerformanceIndicatorClass } from '../../utils/chartHelpers';

/**
 * MetricBlock Component
 * Displays a single metric with performance-based coloring
 */
const MetricBlock = ({ label, value }) => {
    const colorStyle = getPerformanceColorStyle(value);

    return (
        <div
            className="rounded-lg p-3 text-center relative overflow-hidden"
            style={colorStyle}
        >
            {/* Glossy overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

            <p className="text-[9px] font-bold uppercase tracking-widest opacity-90 mb-0.5 relative z-10">
                {label}
            </p>
            <p className="text-lg font-extrabold tracking-tight relative z-10 drop-shadow-sm">
                {(value * 100).toFixed(1)}%
            </p>
        </div>
    );
};

MetricBlock.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

/**
 * ClassRow Component
 * Displays metrics for a single class
 */
const ClassRow = ({ classData }) => {
    const indicatorClass = getPerformanceIndicatorClass(classData.f1Score);

    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5 border border-slate-200 dark:border-slate-700/50">
            {/* Class header */}
            <div className="flex items-center gap-2 mb-2 px-1">
                <div className={`w-2 h-2 rounded-full ${indicatorClass}`}></div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {classData.label}
                </p>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-2">
                <MetricBlock label="Precision" value={classData.precision} />
                <MetricBlock label="Recall" value={classData.recall} />
                <MetricBlock label="F1-Score" value={classData.f1Score} />
            </div>
        </div>
    );
};

ClassRow.propTypes = {
    classData: PropTypes.shape({
        label: PropTypes.string.isRequired,
        precision: PropTypes.number.isRequired,
        recall: PropTypes.number.isRequired,
        f1Score: PropTypes.number.isRequired
    }).isRequired
};

/**
 * ClassificationHeatmap Component
 * Displays classification report as a heatmap with color-coded performance
 */
const ClassificationHeatmap = ({ data }) => {
    if (!data || !data.classes) {
        return null;
    }

    return (
        <div className="space-y-3">
            {data.classes.map((classData, idx) => (
                <ClassRow key={idx} classData={classData} />
            ))}
        </div>
    );
};

ClassificationHeatmap.propTypes = {
    data: PropTypes.shape({
        classes: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                precision: PropTypes.number.isRequired,
                recall: PropTypes.number.isRequired,
                f1Score: PropTypes.number.isRequired
            })
        ).isRequired
    })
};

export default ClassificationHeatmap;
