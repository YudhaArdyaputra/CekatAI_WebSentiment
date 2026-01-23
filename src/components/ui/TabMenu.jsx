/**
 * TabMenu Component
 * Reusable animated tab menu with fluid motion effects
 */

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ACTIVE_TAB_STYLE } from '../../constants/styles';
import { tabSpringTransition } from '../../constants/animations';

/**
 * TabMenu Component
 * Displays an animated tab menu with active state indicator
 * 
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects with { key, label }
 * @param {string} props.activeTab - Currently active tab key
 * @param {Function} props.onTabChange - Callback when tab is clicked
 * @param {string} props.layoutId - Unique layout ID for Framer Motion (default: 'tab-active')
 * @param {boolean} props.isGrid - Use grid layout for responsive design (default: false)
 */
const TabMenu = ({
    tabs,
    activeTab,
    onTabChange,
    layoutId = 'tab-active',
    isGrid = false
}) => {
    const containerClasses = isGrid
        ? 'grid grid-cols-2 md:inline-flex p-1 bg-slate-100 dark:bg-neutral-800 rounded-xl gap-1 w-full md:w-auto'
        : 'inline-flex p-1 bg-slate-100 dark:bg-neutral-800 rounded-xl gap-1';

    return (
        <div className={containerClasses}>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 whitespace-nowrap ${activeTab === tab.key
                            ? 'text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                >
                    {activeTab === tab.key && (
                        <motion.div
                            layoutId={layoutId}
                            className="absolute inset-0 rounded-lg"
                            style={{
                                ...ACTIVE_TAB_STYLE
                            }}
                            transition={tabSpringTransition}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

TabMenu.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
    layoutId: PropTypes.string,
    isGrid: PropTypes.bool
};

export default TabMenu;
