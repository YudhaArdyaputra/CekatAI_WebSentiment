/**
 * ConfusionMatrix Component
 * Displays confusion matrix for binary or multi-class classification
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a single confusion matrix cell
 */
const MatrixCell = ({ value, isCorrect }) => {
    const cellClasses = `py-3 rounded-lg font-bold border ${isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800'
        }`;

    return <div className={cellClasses}>{value}</div>;
};

MatrixCell.propTypes = {
    value: PropTypes.number.isRequired,
    isCorrect: PropTypes.bool.isRequired
};

/**
 * Renders column headers for the matrix
 */
const MatrixHeaders = ({ labels }) => (
    <>
        <div></div>
        {labels.map((label, index) => (
            <div
                key={`header-${index}`}
                className="text-slate-500 dark:text-slate-400 py-2 font-bold uppercase tracking-wider text-[10px]"
            >
                {label}
            </div>
        ))}
    </>
);

MatrixHeaders.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired
};

/**
 * Renders a single row of the matrix
 */
const MatrixRow = ({ label, values, rowIndex }) => (
    <div className="contents">
        <div className="text-slate-500 dark:text-slate-400 py-3 flex items-center justify-center font-bold uppercase tracking-wider text-[10px]">
            {label}
        </div>
        {values.map((value, colIndex) => (
            <MatrixCell
                key={`${rowIndex}-${colIndex}`}
                value={value}
                isCorrect={rowIndex === colIndex}
            />
        ))}
    </div>
);

MatrixRow.propTypes = {
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    rowIndex: PropTypes.number.isRequired
};

/**
 * Main ConfusionMatrix Component
 * Displays confusion matrix for binary or multi-class classification
 */
const ConfusionMatrix = ({ confusionMatrix, isBinary = false }) => {
    const labels = isBinary ? ['Neg', 'Pos'] : ['Neg', 'Net', 'Pos'];
    const gridCols = isBinary ? 'grid-cols-3' : 'grid-cols-4';

    return (
        <div className={`grid ${gridCols} gap-1.5 text-center text-xs`}>
            <MatrixHeaders labels={labels} />
            {labels.map((label, rowIndex) => (
                <MatrixRow
                    key={`row-${rowIndex}`}
                    label={label}
                    values={confusionMatrix[rowIndex]}
                    rowIndex={rowIndex}
                />
            ))}
        </div>
    );
};

ConfusionMatrix.propTypes = {
    confusionMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    isBinary: PropTypes.bool
};

export default ConfusionMatrix;
