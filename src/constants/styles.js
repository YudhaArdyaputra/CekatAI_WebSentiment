/**
 * Style Constants
 * Reusable inline style objects for consistent styling across components
 */

// Button gradient styles
export const BUTTON_GRADIENT_STYLE = {
    background: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(37, 99, 235, 0.4)'
};

// Active tab gradient style
export const ACTIVE_TAB_STYLE = {
    background: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(37, 99, 235, 0.4)',
    zIndex: -1
};

// Navbar pill style
export const NAVBAR_PILL_STYLE = {
    boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(37, 99, 235, 0.1)'
};

// Mobile menu button style
export const MOBILE_BUTTON_STYLE = {
    background: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(37, 99, 235, 0.3)'
};

// Progress bar gradient styles
export const PROGRESS_GRADIENTS = {
    negative: 'linear-gradient(180deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
    neutral: 'linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%)',
    positive: 'linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)'
};

// Performance color styles for heatmap
export const getPerformanceColorStyle = (value) => {
    if (value < 0.5) {
        // Poor Performance - Red
        return {
            background: 'linear-gradient(145deg, #ef4444 0%, #dc2626 100%)',
            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.3), inset 0 -2px 2px rgba(0,0,0,0.2), 0 4px 6px rgba(239, 68, 68, 0.25)',
            color: 'white'
        };
    } else if (value < 0.75) {
        // Moderate Performance - Amber
        return {
            background: 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)',
            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -2px 2px rgba(0,0,0,0.1), 0 4px 6px rgba(245, 158, 11, 0.25)',
            color: 'white'
        };
    } else {
        // Good Performance - Emerald
        return {
            background: 'linear-gradient(145deg, #10b981 0%, #059669 100%)',
            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.3), inset 0 -2px 2px rgba(0,0,0,0.2), 0 4px 6px rgba(16, 185, 129, 0.25)',
            color: 'white'
        };
    }
};
